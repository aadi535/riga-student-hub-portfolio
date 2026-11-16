package lv.rigastudenthub;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/api")
class HubController {
    static final String CONSENT = "2026-10-11";
    private final JdbcTemplate db;
    private final ObjectMapper json;
    private final NotificationWorker notifications;
    HubController(JdbcTemplate db, ObjectMapper json, NotificationWorker notifications) { this.db=db; this.json=json; this.notifications=notifications; }
    record Help(@NotBlank @Size(max=100) String name,
        @NotBlank @Pattern(regexp="(?:\\+?[0-9][0-9 ()-]{6,30}|@[A-Za-z0-9_]{5,32})") String contact,
        @NotNull @Email @Size(max=254) String email,
        @NotBlank @Size(max=120) String university,
        @NotBlank @Size(max=160) String interestedIn,
        @NotNull @Size(max=1500) String notes, @AssertTrue boolean consent,
        @NotNull @Pattern(regexp="2026-10-11") String consentVersion) {}
    record Step(@Min(1) @Max(6) int step, @NotBlank @Size(max=120) String title, @NotBlank @Size(max=800) String detail) {}
    record Offer(@NotBlank @Size(max=120) String title, @NotBlank @Size(max=60) String category,
        @NotBlank @Size(max=120) String rewardText, @NotNull @Size(max=100) String referralCode,
        @NotBlank @Size(max=1000) String referralLink, @NotBlank @Size(max=600) String shortSummary,
        @NotEmpty @Size(max=6) List<@Valid Step> termsAndSteps, boolean isSample) {}
    @GetMapping("/csrf") Map<String,String> csrf(CsrfToken token) { return Map.of("token",token.getToken(),"headerName",token.getHeaderName()); }
    @GetMapping("/health") Map<String,String> health() { db.queryForObject("SELECT 1",Integer.class); return Map.of("status","ok"); }
    @GetMapping("/config") Map<String,Object> config(@Value("${hub.notification-to}") String contact) {
        return Map.of("mode","live","privacyContact",contact,"retentionDays",90,"consentVersion",CONSENT,"notificationConfigured",notifications.configured());
    }
    @GetMapping("/offers") List<Map<String,Object>> offers() {
        return db.query("SELECT * FROM offers ORDER BY created_at DESC", (r,n) -> {
            Map<String,Object> item = new LinkedHashMap<>();
            item.put("id",r.getString("id")); item.put("title",r.getString("title")); item.put("category",r.getString("category"));
            item.put("rewardText",r.getString("reward_text")); item.put("referralCode",r.getString("referral_code"));
            item.put("referralLink",r.getString("referral_link")); item.put("shortSummary",r.getString("short_summary"));
            item.put("isSample",r.getBoolean("is_sample")); item.put("status",r.getBoolean("is_sample") ? "Sample preview" : "Published offer"); item.put("companyLogo","🎁");
            try { item.put("termsAndSteps",json.readValue(r.getString("terms_and_steps"),new TypeReference<List<Step>>(){})); }
            catch(Exception e) { throw new IllegalStateException("Invalid offer data"); } return item;
        });
    }
    @PostMapping("/help-requests")
    @Transactional
    Map<String,Object> submit(@RequestHeader("Idempotency-Key") UUID key, @Valid @RequestBody Help help, HttpServletResponse response) throws Exception {
        String hash = RateLimitFilter.hash(json.writeValueAsString(help)); UUID id = UUID.randomUUID();
        int inserted = db.update("INSERT INTO help_requests(id,idempotency_key,payload_hash,name,contact,email,university,interested_in,notes,consent_version) VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT(idempotency_key) DO NOTHING", id,key,hash,help.name().trim(),help.contact().trim(),help.email().trim(),help.university(),help.interestedIn(),help.notes().trim(),help.consentVersion());
        var saved = db.queryForMap("SELECT id,payload_hash FROM help_requests WHERE idempotency_key=?",key);
        if (!hash.equals(saved.get("payload_hash"))) throw new ResponseStatusException(HttpStatus.CONFLICT,"This submission key belongs to a different request. Start a new submission.");
        if (inserted == 1) db.update("INSERT INTO notification_outbox(id) VALUES (?)",id);
        response.setStatus(inserted == 1 ? 201 : 200);
        return Map.of("id",saved.get("id"),"saved",true,"notificationStatus",db.queryForObject("SELECT state FROM notification_outbox WHERE id=?",String.class,saved.get("id")));
    }
    @GetMapping("/manager/me") Map<String,Boolean> me() { return Map.of("authenticated",true); }
    @GetMapping("/manager/requests") List<Map<String,Object>> requests() {
        return db.query("SELECT r.*,o.state,o.attempts FROM help_requests r JOIN notification_outbox o ON r.id=o.id ORDER BY r.created_at DESC LIMIT 200",(r,n) -> {
            Map<String,Object> item=new LinkedHashMap<>();
            for(String field:List.of("id","name","contact","email","university","notes")) item.put(field,r.getString(field));
            item.put("interestedIn",r.getString("interested_in")); item.put("submittedAt",r.getTimestamp("created_at").toInstant().toString());
            item.put("notificationStatus",r.getString("state")); item.put("notificationAttempts",r.getInt("attempts")); return item;
        });
    }
    @PostMapping("/manager/offers") @ResponseStatus(HttpStatus.CREATED)
    Map<String,UUID> addOffer(@Valid @RequestBody Offer offer) throws Exception {
        URI url;
        try { url=URI.create(offer.referralLink()); } catch (IllegalArgumentException e) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Enter a valid HTTPS offer URL."); }
        if (!"https".equalsIgnoreCase(url.getScheme()) || url.getHost()==null || url.getUserInfo()!=null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Offer links must use HTTPS without embedded credentials.");
        for (int i=0;i<offer.termsAndSteps().size();i++) if (offer.termsAndSteps().get(i).step()!=i+1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Number offer steps sequentially.");
        UUID id=UUID.randomUUID(); db.update("INSERT INTO offers(id,title,category,reward_text,referral_code,referral_link,short_summary,terms_and_steps,is_sample) VALUES (?,?,?,?,?,?,?,?::jsonb,?)",id,offer.title(),offer.category(),offer.rewardText(),offer.referralCode(),offer.referralLink(),offer.shortSummary(),json.writeValueAsString(offer.termsAndSteps()),offer.isSample());
        return Map.of("id",id);
    }
    @DeleteMapping("/manager/offers/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) void removeOffer(@PathVariable UUID id) { db.update("DELETE FROM offers WHERE id=?",id); }
    @DeleteMapping("/manager/requests/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) void deleteRequest(@PathVariable UUID id) { db.update("DELETE FROM help_requests WHERE id=?",id); }
    @PostMapping("/manager/requests/{id}/retry") Map<String,String> retry(@PathVariable UUID id) {
        int changed=db.update("UPDATE notification_outbox SET state='PENDING',attempts=0,next_attempt=now(),last_error=NULL WHERE id=? AND state='FAILED'",id);
        if(changed==0) throw new ResponseStatusException(HttpStatus.CONFLICT,"Only failed notifications can be retried."); return Map.of("status","PENDING");
    }
}

package lv.rigastudenthub;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.net.URI;
import java.net.http.*;
import java.time.Duration;
import java.util.*;

interface NotificationSender { String send(UUID id) throws Exception; boolean configured(); }

@Component
class ResendSender implements NotificationSender {
    private final String key,from,to,url;
    private final ObjectMapper json;
    private final HttpClient client=HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();
    ResendSender(ObjectMapper json,@Value("${hub.resend-api-key}") String key,@Value("${hub.notification-from}") String from,
                 @Value("${hub.notification-to}") String to,@Value("${hub.public-url}") String url) {
        this.json=json;this.key=key;this.from=from;this.to=to;this.url=url;
    }
    public boolean configured() { return !key.isBlank() && !from.isBlank(); }
    public String send(UUID id) throws Exception {
        String body=json.writeValueAsString(Map.of("from",from,"to",List.of(to),"subject","New Student Hub help request",
            "text","A student request has been saved. Reference: "+id+"\nSign in to your protected manager panel: "+url+"\nPersonal contact details are available only after manager sign-in."));
        HttpRequest req=HttpRequest.newBuilder(URI.create("https://api.resend.com/emails")).timeout(Duration.ofSeconds(15))
            .header("Authorization","Bearer "+key).header("Content-Type","application/json").header("Idempotency-Key","student-help-"+id)
            .POST(HttpRequest.BodyPublishers.ofString(body)).build();
        var result=client.send(req,HttpResponse.BodyHandlers.ofString());
        if(result.statusCode()/100!=2) throw new IllegalStateException("Email provider did not accept notification");
        return json.readTree(result.body()).required("id").asText();
    }
}

@Component
class NotificationWorker {
    private final JdbcTemplate db; private final NotificationSender sender; private final boolean enabled;
    NotificationWorker(JdbcTemplate db, NotificationSender sender,@Value("${hub.notifications-enabled}") boolean enabled) { this.db=db;this.sender=sender;this.enabled=enabled; }
    boolean configured() { return enabled && sender.configured(); }
    @Scheduled(fixedDelayString="${hub.worker-delay:30000}", initialDelayString="${hub.worker-initial-delay:10000}")
    @Transactional
    public void deliverNext() {
        if(!configured()) return;
        var ids=db.query("SELECT id FROM notification_outbox WHERE state='PENDING' AND next_attempt<=now() ORDER BY next_attempt LIMIT 1 FOR UPDATE SKIP LOCKED",(r,n)->r.getObject("id",UUID.class));
        if(ids.isEmpty()) return; UUID id=ids.getFirst();
        int attempts=db.queryForObject("SELECT attempts FROM notification_outbox WHERE id=?",Integer.class,id)+1;
        try { String providerId=sender.send(id); db.update("UPDATE notification_outbox SET state='PROVIDER_ACCEPTED',attempts=?,provider_id=?,last_error=NULL WHERE id=?",attempts,providerId,id); }
        catch(Exception e) { db.update("UPDATE notification_outbox SET state=?,attempts=?,next_attempt=now()+(? * interval '1 second'),last_error='Provider unavailable or rejected request' WHERE id=?",attempts>=5 ? "FAILED" : "PENDING",attempts,Math.min(1800,30*(1<<attempts)),id); }
    }
    @Scheduled(fixedDelay=3600000, initialDelay=60000)
    @Transactional
    public void cleanup() {
        db.update("DELETE FROM help_requests WHERE created_at<now()-interval '90 days'");
        db.update("DELETE FROM rate_limits WHERE expires_at<now()");
    }
}

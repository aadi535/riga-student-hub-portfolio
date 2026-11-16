package lv.rigastudenthub;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties={"hub.worker-initial-delay=600000","hub.notifications-enabled=true","hub.rate-limit-salt=synthetic-test-salt-at-least-32-characters","server.servlet.session.cookie.secure=false"})
@AutoConfigureMockMvc
class HubIntegrationTest {
    @DynamicPropertySource static void settings(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url",()->System.getenv().getOrDefault("TEST_DATABASE_URL","jdbc:postgresql://127.0.0.1:55432/studenthub_test"));
        registry.add("spring.datasource.username",()->System.getenv().getOrDefault("TEST_DATABASE_USERNAME","hubtest"));
        registry.add("spring.datasource.password",()->System.getenv().getOrDefault("TEST_DATABASE_PASSWORD",""));
        registry.add("hub.manager-password-hash",()->new BCryptPasswordEncoder().encode("test-only-password"));
    }
    @TestConfiguration static class FakeEmail {
        @Bean @Primary TestSender testSender() { return new TestSender(); }
    }
    static class TestSender implements NotificationSender {
        boolean fails; int sent; boolean ready=true;
        public boolean configured() { return ready; }
        public String send(UUID id) { sent++; if(fails) throw new IllegalStateException("synthetic failure"); return "test-provider-id"; }
    }
    @Autowired MockMvc mvc; @Autowired JdbcTemplate db; @Autowired ObjectMapper json;
    @Autowired NotificationWorker worker; @Autowired TestSender sender;
    @BeforeEach void reset() { db.update("DELETE FROM help_requests"); db.update("DELETE FROM offers"); db.update("DELETE FROM rate_limits"); sender.fails=false; sender.sent=0; sender.ready=true; }
    Map<String,Object> validHelp() { return new LinkedHashMap<>(Map.of("name","Synthetic Student","contact","@teststudent","email","student@example.test","university","RTU","interestedIn","Accommodation","notes","Test data only","consent",true,"consentVersion",HubController.CONSENT)); }
    String submit(UUID key, Map<String,Object> body, int status) throws Exception {
        return mvc.perform(post("/api/help-requests").with(csrf()).header("Idempotency-Key",key).contentType("application/json").content(json.writeValueAsString(body))).andExpect(status().is(status)).andReturn().getResponse().getContentAsString();
    }
    @Test void publicCannotReadOrChangeManagerData() throws Exception {
        mvc.perform(get("/api/manager/requests")).andExpect(status().isUnauthorized());
        mvc.perform(post("/api/manager/offers").with(csrf()).contentType("application/json").content("{}")).andExpect(status().isUnauthorized());
        mvc.perform(post("/api/help-requests").contentType("application/json").content("{}")).andExpect(status().isForbidden());
    }
    @Test void loginAndLogoutUseProtectedSession() throws Exception {
        var result=mvc.perform(post("/api/manager/login").with(csrf()).param("username","manager").param("password","test-only-password")).andExpect(status().isOk()).andReturn();
        var session=(org.springframework.mock.web.MockHttpSession)result.getRequest().getSession(false);
        mvc.perform(get("/api/manager/me").session(session)).andExpect(status().isOk());
        mvc.perform(post("/api/manager/logout").session(session).with(csrf())).andExpect(status().isNoContent());
        mvc.perform(post("/api/manager/login").with(csrf()).param("username","manager").param("password","wrong")).andExpect(status().isUnauthorized());
    }
    @Test void serverTokenCanBeUsedByBrowser() throws Exception {
        var result=mvc.perform(get("/api/csrf")).andExpect(status().isOk()).andReturn();
        var token=json.readTree(result.getResponse().getContentAsString());
        mvc.perform(post("/api/help-requests").session((org.springframework.mock.web.MockHttpSession)result.getRequest().getSession(false)).header(token.get("headerName").asText(),token.get("token").asText()).header("Idempotency-Key",UUID.randomUUID()).contentType("application/json").content(json.writeValueAsString(validHelp()))).andExpect(status().isCreated());
    }
    @Test void persistsRequestEmailAndOutboxAndPreventsDuplicates() throws Exception {
        UUID key=UUID.randomUUID(); String first=submit(key,validHelp(),201); String second=submit(key,validHelp(),200);
        assertThat(json.readTree(first).get("id")).isEqualTo(json.readTree(second).get("id"));
        assertThat(db.queryForObject("SELECT count(*) FROM help_requests",Integer.class)).isEqualTo(1);
        assertThat(db.queryForObject("SELECT email FROM help_requests",String.class)).isEqualTo("student@example.test");
        assertThat(db.queryForObject("SELECT state FROM notification_outbox",String.class)).isEqualTo("PENDING");
        var changed=validHelp();changed.put("name","Changed Student");submit(key,changed,409);
    }
    @Test void invalidInputAndMissingConsentAreRejectedWithoutSaving() throws Exception {
        for(var entry:Map.of("contact","garbage","email","invalid-email","name","","notes","x".repeat(1501),"consent",false,"consentVersion","old").entrySet()) {
            var data=validHelp();data.put(entry.getKey(),entry.getValue());submit(UUID.randomUUID(),data,400);
        }
        assertThat(db.queryForObject("SELECT count(*) FROM help_requests",Integer.class)).isZero();
    }
    @Test void offersPersistAndUnsafeLinksAreRejected() throws Exception {
        var offer=new LinkedHashMap<String,Object>(Map.of("title","Test Offer","category","Banking","rewardText","Subject to terms","referralCode","TEST","referralLink","https://example.com/referral","shortSummary","Synthetic sample offer","termsAndSteps",List.of(Map.of("step",1,"title","Review terms","detail","Check current provider terms")),"isSample",true));
        mvc.perform(post("/api/manager/offers").with(user("manager").roles("MANAGER")).with(csrf()).contentType("application/json").content(json.writeValueAsString(offer))).andExpect(status().isCreated());
        mvc.perform(get("/api/offers")).andExpect(jsonPath("$[0].isSample").value(true)).andExpect(jsonPath("$[0].title").value("Test Offer"));
        offer.put("referralLink","javascript:alert(1)");
        mvc.perform(post("/api/manager/offers").with(user("manager").roles("MANAGER")).with(csrf()).contentType("application/json").content(json.writeValueAsString(offer))).andExpect(status().isBadRequest());
    }
    @Test void notificationFailureRetriesAndProviderAcceptanceIsRecorded() throws Exception {
        submit(UUID.randomUUID(),validHelp(),201);sender.fails=true;worker.deliverNext();
        assertThat(db.queryForObject("SELECT state FROM notification_outbox",String.class)).isEqualTo("PENDING");
        assertThat(db.queryForObject("SELECT attempts FROM notification_outbox",Integer.class)).isEqualTo(1);
        db.update("UPDATE notification_outbox SET next_attempt=now()-interval '1 second'");sender.fails=false;worker.deliverNext();worker.deliverNext();
        assertThat(db.queryForObject("SELECT state FROM notification_outbox",String.class)).isEqualTo("PROVIDER_ACCEPTED");assertThat(sender.sent).isEqualTo(2);
    }
    @Test void exhaustedNotificationCanBeRetriedAndRequestDeleted() throws Exception {
        UUID id=UUID.fromString(json.readTree(submit(UUID.randomUUID(),validHelp(),201)).get("id").asText());sender.fails=true;
        for(int i=0;i<5;i++) { db.update("UPDATE notification_outbox SET next_attempt=now()-interval '1 second'");worker.deliverNext(); }
        assertThat(db.queryForObject("SELECT state FROM notification_outbox",String.class)).isEqualTo("FAILED");
        mvc.perform(post("/api/manager/requests/"+id+"/retry").with(user("manager").roles("MANAGER")).with(csrf())).andExpect(status().isOk());
        mvc.perform(delete("/api/manager/requests/"+id).with(user("manager").roles("MANAGER")).with(csrf())).andExpect(status().isNoContent());
        assertThat(db.queryForObject("SELECT count(*) FROM notification_outbox",Integer.class)).isZero();
    }
    @Test void retentionRemovesOldPersonalDataAndRateLimitBlocksAbuse() throws Exception {
        submit(UUID.randomUUID(),validHelp(),201);db.update("UPDATE help_requests SET created_at=now()-interval '91 days'");worker.cleanup();
        assertThat(db.queryForObject("SELECT count(*) FROM help_requests",Integer.class)).isZero();
        for(int i=0;i<9;i++) submit(UUID.randomUUID(),validHelp(),201);
        submit(UUID.randomUUID(),validHelp(),429);
    }
    @Test void missingEmailCredentialsKeepDurableRequestPending() throws Exception {
        submit(UUID.randomUUID(),validHelp(),201);sender.ready=false;worker.deliverNext();
        assertThat(sender.sent).isZero();assertThat(db.queryForObject("SELECT state FROM notification_outbox",String.class)).isEqualTo("PENDING");
    }
}

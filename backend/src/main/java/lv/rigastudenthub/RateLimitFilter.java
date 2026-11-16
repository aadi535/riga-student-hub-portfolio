package lv.rigastudenthub;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.HexFormat;

@Component
class RateLimitFilter extends OncePerRequestFilter {
    private final JdbcTemplate db;
    private final String salt;
    RateLimitFilter(JdbcTemplate db, @Value("${hub.rate-limit-salt}") String salt) {
        if (salt.length() < 32) throw new IllegalStateException("RATE_LIMIT_SALT must have at least 32 characters");
        this.db = db; this.salt = salt;
    }
    static String hash(String value) {
        try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8))); }
        catch (Exception e) { throw new IllegalStateException(e); }
    }
    @Override protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        String path = req.getRequestURI().substring(req.getContextPath().length());
        boolean login = path.equals("/api/manager/login");
        if (req.getContentLengthLong() > 16384 && path.startsWith("/api/")) { res.sendError(413); return; }
        if (req.getMethod().equals("POST") && (login || path.equals("/api/help-requests"))) {
            // The direct peer cannot be spoofed by a client-supplied forwarding header.
            // Behind a reverse proxy this conservatively shares the limit between clients.
            long window = Instant.now().getEpochSecond() / (login ? 60 : 3600);
            String key = (login ? "login:" : "help:") + hash(salt + req.getRemoteAddr() + window);
            Integer count = db.queryForObject("INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,now()+interval '2 hours') ON CONFLICT(key) DO UPDATE SET count=rate_limits.count+1 RETURNING count", Integer.class, key);
            if (count > 10) { res.setStatus(429); res.setHeader("Retry-After", login ? "60" : "3600"); res.setContentType("application/json"); res.getWriter().write("{\"message\":\"Too many attempts. Please try again later.\"}"); return; }
        }
        chain.doFilter(req,res);
    }
}

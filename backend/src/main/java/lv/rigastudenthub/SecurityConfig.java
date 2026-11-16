package lv.rigastudenthub;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
class SecurityConfig {
    @Bean UserDetailsService users(@Value("${hub.manager-username}") String username,
                                  @Value("${hub.manager-password-hash}") String hash) {
        if (!hash.matches("\\$2[aby]\\$\\d{2}\\$.{53}")) throw new IllegalStateException("Configure MANAGER_PASSWORD_HASH as a BCrypt hash");
        return new InMemoryUserDetailsManager(User.withUsername(username).password("{bcrypt}" + hash).roles("MANAGER").build());
    }
    @Bean SecurityFilterChain security(HttpSecurity http, RateLimitFilter rateLimit) throws Exception {
        return http.cors(c -> {}).csrf(c -> c.csrfTokenRepository(new HttpSessionCsrfTokenRepository()))
            .authorizeHttpRequests(a -> a.requestMatchers("/api/manager/login").permitAll()
                .requestMatchers("/api/manager/**").hasRole("MANAGER").anyRequest().permitAll())
            .formLogin(f -> f.loginProcessingUrl("/api/manager/login")
                .successHandler((q,s,a) -> { s.setContentType("application/json"); s.getWriter().write("{\"authenticated\":true}"); })
                .failureHandler((q,s,e) -> { s.setStatus(401); s.setContentType("application/json"); s.getWriter().write("{\"message\":\"Incorrect manager credentials.\"}"); }))
            .logout(l -> l.logoutUrl("/api/manager/logout").logoutSuccessHandler((q,s,a) -> s.setStatus(204)))
            .exceptionHandling(e -> e.authenticationEntryPoint((q,s,x) -> { s.setStatus(401); s.setContentType("application/json"); s.getWriter().write("{\"message\":\"Please sign in as manager.\"}"); })
                .accessDeniedHandler((q,s,x) -> { s.setStatus(403); s.setContentType("application/json"); s.getWriter().write("{\"message\":\"Session expired or request not authorised. Refresh and try again.\"}"); }))
            .headers(h -> h.contentSecurityPolicy(c -> c.policyDirectives("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'")))
            .addFilterBefore(rateLimit, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class).build();
    }
    @Bean CorsConfigurationSource cors(@Value("${hub.allowed-origin}") String origin) {
        CorsConfiguration c = new CorsConfiguration(); c.setAllowedOrigins(List.of(origin));
        c.setAllowedMethods(List.of("GET", "POST", "DELETE", "OPTIONS"));
        c.setAllowedHeaders(List.of("Content-Type", "X-CSRF-TOKEN", "Idempotency-Key")); c.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); source.registerCorsConfiguration("/api/**", c); return source;
    }
    @Bean org.springframework.boot.web.servlet.FilterRegistrationBean<RateLimitFilter> registration(RateLimitFilter filter) {
        var registration = new org.springframework.boot.web.servlet.FilterRegistrationBean<>(filter);
        registration.setEnabled(false); return registration;
    }
}

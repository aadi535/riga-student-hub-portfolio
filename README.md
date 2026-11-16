# Riga Student Hub

An independent student-support project with a React interface, a Java 21 / Spring Boot 3.5 backend and PostgreSQL storage. The project helps students arriving in Riga browse resources and request help. A manager can review requests and maintain offers through a protected dashboard.

[Try the sample preview](https://aditya-portfolio-web-amber.vercel.app/student-hub/) · [Read the architecture guide](docs/architecture.md)

## What works

- Public offer listings read from PostgreSQL; only an authenticated manager can create or remove offers.
- Help requests are validated on the server, require privacy consent, preserve optional email, and receive a server-generated reference after the transaction commits.
- A submission UUID prevents duplicate requests when the same form is retried after a network timeout. Changing form contents starts a new submission.
- Manager sessions use HttpOnly cookies, CSRF protection and BCrypt credentials configured outside source code. No student records or authentication tokens are stored in browser localStorage; old prototype storage is removed on load.
- Request and notification queue are saved in one database transaction. A background worker uses Resend's HTTPS API with an idempotency key and retries failures up to five times. Managers can retry failed notifications and delete requests.
- Privacy details and consent explain collection, access, deletion and third-party processing. Requests and their notification records are removed after 90 days while the service runs.

## Demo versus live

`npm run build:demo` creates an explicitly labelled sample preview. The old referral codes and amounts are examples, not verified active promotions. Registration and code copying are disabled for samples, and the help form does not collect personal data. `vercel.json` selects this safe static preview on Vercel.

`npm run build` builds the real service frontend. It must be served alongside the backend (the Docker image does this). If the API cannot be reached, the form is disabled; it never substitutes a fake success or saves personal data locally. The live database starts with **no offers or student requests**. Sign in and publish provider-checked offers, or add clearly labelled samples.

Housing, grocery, job and visa sections are informational resources inherited from the prototype. Addresses, prices, work rules and residence requirements must be checked with the linked provider or official authority; this project does not provide legal advice or guarantee eligibility.

## Local setup

Requirements: Node 24, Java 21+ and Maven 3.9+, plus PostgreSQL 17 (or Docker).

1. `npm ci`
2. `mvn -f backend/pom.xml -DskipTests package`
3. Generate a manager BCrypt hash in an interactive terminal:
   ```sh
   java -Dloader.main=lv.rigastudenthub.PasswordHashTool -cp backend/target/student-hub-1.0.0.jar org.springframework.boot.loader.launch.PropertiesLauncher
   ```
   The tool reads a password without echoing it. Keep the password private and place only the resulting hash in the environment. There is no default manager password.
4. Copy `.env.example` to `.env`, replace all placeholders, and choose a long random database password and rate-limit salt. In Compose, single-quote the BCrypt hash to preserve `$` characters. Do not commit this file.
5. `docker compose up --build` serves the complete application at `http://localhost:8080`. PostgreSQL uses a named volume and is not exposed outside the Docker network. The Compose app is bound to localhost and uses HTTP cookies **only for local development**.

Without Docker, create a PostgreSQL database, set the equivalent environment variables in your terminal, set `COOKIE_SECURE=false` locally, then run `mvn -f backend/pom.xml spring-boot:run` and `npm run dev`. Vite proxies `/api` to port 8080. `.env` is used by Compose; Maven does not automatically load it. Never use insecure cookies on a public deployment.

## Published sample preview

The sample frontend is hosted under the existing portfolio at [Student Hub preview](https://aditya-portfolio-web-amber.vercel.app/student-hub/). It contains no real student requests and does not activate the backend. The portfolio copy is a static build, not a live link to this repository. To refresh it after frontend edits, run `vite build --mode demo --base=/student-hub/` (or the equivalent npm build arguments), copy `dist/index.html`, `dist/hub.svg` and the matching `dist/assets` into the portfolio repository’s `public/student-hub`, then redeploy the portfolio. Remove obsolete preview assets when replacing the bundle.

## Free hosting: Neon + Render + Resend

The repository includes `render.yaml` and a multi-stage Dockerfile. No live cloud database, backend or email credentials have been provisioned by this commit.

1. In your Neon account, create a **PostgreSQL 17** project in an EU region. Copy the database hostname, database name, role and password into Render's secret settings. Use `DATABASE_URL=jdbc:postgresql://HOST/DATABASE?sslmode=verify-full` and set `DATABASE_USERNAME` / `DATABASE_PASSWORD` separately. Do not paste a `provider URL containing embedded credentials` URL into the JDBC setting or commit credentials.
2. Connect this repository as a Render Blueprint (or Docker web service). Choose the free instance. Set the required secret values in `render.yaml`, including the BCrypt hash. Set `PUBLIC_URL` and `ALLOWED_ORIGIN` to the exact HTTPS service URL. `COOKIE_SECURE=true` is the production default.
3. Create a Resend account, verify a sender domain, and set `RESEND_API_KEY` and `NOTIFICATION_FROM` as server secrets. Set `NOTIFICATION_TO` to a publicly shareable service address. In live mode, the form displays this address for privacy enquiries. Resend's sandbox sender can send only to the account owner's email; a verified domain is needed for other recipients. This uses HTTPS because Render free services block common SMTP ports.
4. Check `/api/health`, sign in through Manager, publish a checked offer and submit a synthetic help request. Confirm its database reference, manager access and notification state before accepting real student details. Do not use real personal data for deployment smoke tests.
5. Update the privacy text if the actual hosting/database/email providers differ from Neon, Render and Resend. Configure backups and access in the provider dashboards. The app deletes active database records; it cannot erase provider backups by itself.

### Reliability limits

Render free services sleep after inactivity. The durable queue survives a restart, but email processing resumes only when the app runs again; immediate or continuous delivery is not guaranteed. For prompt notifications, use an always-on instance. `PROVIDER_ACCEPTED` means the provider accepted the email, **not that the inbox received it**. Missing email configuration leaves requests safely queued. A manual retry long after Resend's idempotency window may send a duplicate alert; it never duplicates the student request.

The initial limiter uses the direct network peer instead of trusting client-supplied forwarding headers: 10 help submissions/hour and 10 manager login attempts/minute. Behind a shared proxy, users may share this allowance. Before a larger public rollout, configure a trusted proxy boundary and per-client rate limiting at the host; do not blindly trust `X-Forwarded-For`. Session storage is per-instance: restarts require manager sign-in again; multiple app instances require a shared session store.

## Verification

`npm run lint`, `npm run build`, `npm run build:demo` and `npm audit` check the frontend. Some unused legacy prototype components have existing lint warnings.

Backend integration tests use **real PostgreSQL**, never H2. Set `TEST_DATABASE_URL`, `TEST_DATABASE_USERNAME`, `TEST_DATABASE_PASSWORD` to a disposable test database and run `mvn -f backend/pom.xml verify`. They clear that test database's Hub tables between cases. Default test connection is `localhost:55432/studenthub_test` with role `hubtest`, for local isolated testing only. GitHub Actions provisions a disposable PostgreSQL 17 service and runs the same checks.

The tests cover private manager access, login/logout, CSRF, validation and consent, request/offer persistence, idempotency, unsafe links, notification retries and failure recovery, deletion, retention and abuse limiting. The email sender is replaced with a fake: automated tests do not send emails.

## Key files

- `backend/src/main/java/lv/rigastudenthub/HubController.java`: public requests and protected manager endpoints.
- `backend/src/main/java/lv/rigastudenthub/SecurityConfig.java`: authentication, cookies, CSRF, CORS and response headers.
- `backend/src/main/java/lv/rigastudenthub/NotificationWorker.java`: persistent notification processing and retention.
- `backend/src/main/resources/db/migration/V1__hub.sql`: PostgreSQL schema managed by Flyway.
- `src/lib/api.js`: authenticated requests and CSRF handling.
- `src/context/AppContext.jsx`: live/demo state without browser-stored student data.
- `src/components/StudentContactForm.jsx`: confirmed submission and privacy information.
- `src/components/ManagerPanel.jsx`: sign-in, request review, retries, deletion and offer publishing.

## Provider documentation

[Neon free plan](https://neon.com/blog/neon-free-plan-1-gb-per-project) · [Render free service limits](https://render.com/docs/free) · [Resend email API](https://resend.com/docs/api-reference/emails/send-email) · [Spring Security CSRF](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html)

## Source

This public snapshot is based on `2d58a94` from the original private project. Set `NOTIFICATION_TO` to your public service contact before accepting live requests.

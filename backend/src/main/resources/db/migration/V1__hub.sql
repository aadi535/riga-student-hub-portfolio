CREATE TABLE offers (
  id uuid PRIMARY KEY, title varchar(120) NOT NULL, category varchar(60) NOT NULL,
  reward_text varchar(120) NOT NULL, referral_code varchar(100) NOT NULL,
  referral_link varchar(1000) NOT NULL, short_summary varchar(600) NOT NULL,
  terms_and_steps jsonb NOT NULL, is_sample boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE help_requests (
  id uuid PRIMARY KEY, idempotency_key uuid UNIQUE NOT NULL, payload_hash varchar(64) NOT NULL,
  name varchar(100) NOT NULL, contact varchar(100) NOT NULL, email varchar(254) NOT NULL,
  university varchar(120) NOT NULL, interested_in varchar(160) NOT NULL, notes varchar(1500) NOT NULL,
  consent_version varchar(30) NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE notification_outbox (
  id uuid PRIMARY KEY REFERENCES help_requests(id) ON DELETE CASCADE,
  state varchar(30) NOT NULL DEFAULT 'PENDING', attempts int NOT NULL DEFAULT 0,
  next_attempt timestamptz NOT NULL DEFAULT now(), provider_id varchar(100), last_error varchar(100)
);
CREATE INDEX outbox_due ON notification_outbox(next_attempt) WHERE state = 'PENDING';
CREATE TABLE rate_limits (key varchar(80) PRIMARY KEY, count int NOT NULL, expires_at timestamptz NOT NULL);

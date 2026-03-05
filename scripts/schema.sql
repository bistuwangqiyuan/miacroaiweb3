-- Neon schema for Weisuàn website

CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name_zh TEXT NOT NULL,
  client_name_en TEXT NOT NULL,
  deploy_days TEXT,
  outcome_zh TEXT NOT NULL,
  outcome_en TEXT NOT NULL,
  source TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  keywords TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  source TEXT,
  published_at TIMESTAMPTZ,
  summary_zh TEXT,
  summary_en TEXT,
  keywords TEXT[] DEFAULT '{}',
  url_ref TEXT
);

CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  rating SMALLINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  locale TEXT
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_created_at ON case_studies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_source ON case_studies(source);
CREATE INDEX IF NOT EXISTS idx_market_data_published_at ON market_data(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_market_data_source ON market_data(source);
CREATE INDEX IF NOT EXISTS idx_user_feedback_user_created ON user_feedback(user_id, created_at DESC);

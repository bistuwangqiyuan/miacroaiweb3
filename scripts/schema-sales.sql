-- Schema for AI Sales System (leads + blog)
-- Run this against your Neon database to create the required tables

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  company_size TEXT DEFAULT '',
  need_type TEXT DEFAULT '',
  message TEXT DEFAULT '',
  source TEXT DEFAULT 'website',
  score INTEGER DEFAULT 0,
  grade CHAR(1) DEFAULT 'D',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  locale TEXT DEFAULT 'zh',
  summary TEXT DEFAULT '',
  keywords TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_grade ON leads(grade);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_locale ON blog_posts(locale, published);

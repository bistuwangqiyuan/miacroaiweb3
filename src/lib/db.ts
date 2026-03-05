import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;
let sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!connectionString) return null;
  if (!sql) sql = neon(connectionString);
  return sql;
}

export async function queryCaseStudies(opts: {
  page: number;
  pageSize: number;
  sort: string;
  order: 'asc' | 'desc';
  source?: string;
  keyword?: string;
}) {
  const db = getDb();
  if (!db) return { items: [], total: 0 };
  const offset = (opts.page - 1) * opts.pageSize;

  const countResult = await db`SELECT count(*)::int as c FROM case_studies`;
  const total = (countResult as { c: number }[])?.[0]?.c ?? 0;

  const rows =
    opts.order === 'asc'
      ? await db`
          SELECT id, client_name_zh, client_name_en, deploy_days, outcome_zh, outcome_en, source, industry, created_at, keywords
          FROM case_studies
          ORDER BY created_at ASC
          LIMIT ${opts.pageSize} OFFSET ${offset}
        `
      : await db`
          SELECT id, client_name_zh, client_name_en, deploy_days, outcome_zh, outcome_en, source, industry, created_at, keywords
          FROM case_studies
          ORDER BY created_at DESC
          LIMIT ${opts.pageSize} OFFSET ${offset}
        `;
  return { items: rows as unknown[], total };
}

export async function queryMarketData(opts: {
  page: number;
  pageSize: number;
  sort: string;
  order: 'asc' | 'desc';
  source?: string;
  keyword?: string;
}) {
  const db = getDb();
  if (!db) return { items: [], total: 0 };
  const offset = (opts.page - 1) * opts.pageSize;

  const countResult = await db`SELECT count(*)::int as c FROM market_data`;
  const total = (countResult as { c: number }[])?.[0]?.c ?? 0;

  const rows =
    opts.order === 'asc'
      ? await db`
          SELECT id, title_zh, title_en, source, published_at, summary_zh, summary_en, keywords, url_ref
          FROM market_data
          ORDER BY published_at ASC NULLS LAST
          LIMIT ${opts.pageSize} OFFSET ${offset}
        `
      : await db`
          SELECT id, title_zh, title_en, source, published_at, summary_zh, summary_en, keywords, url_ref
          FROM market_data
          ORDER BY published_at DESC NULLS LAST
          LIMIT ${opts.pageSize} OFFSET ${offset}
        `;
  return { items: rows as unknown[], total };
}

export async function insertFeedback(userId: string, content: string, locale: string) {
  const db = getDb();
  if (!db) return null;
  await db`INSERT INTO user_feedback (user_id, content, locale) VALUES (${userId}, ${content}, ${locale})`;
  return true;
}

export async function queryFeedback(userId: string, page: number, pageSize: number) {
  const db = getDb();
  if (!db) return { items: [], total: 0 };
  const offset = (page - 1) * pageSize;
  const countResult = await db`SELECT count(*)::int as c FROM user_feedback WHERE user_id = ${userId}`;
  const total = (countResult as { c: number }[])?.[0]?.c ?? 0;
  const rows = await db`
    SELECT id, content, created_at FROM user_feedback
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `;
  return { items: rows as unknown[], total };
}

export async function insertContact(name: string, email: string, message: string) {
  const db = getDb();
  if (!db) return null;
  await db`INSERT INTO contact_submissions (name, email, message) VALUES (${name}, ${email}, ${message})`;
  return true;
}

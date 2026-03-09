import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, industry, size, need_type, message, source } = body || {};
    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 });
    }
    const db = getDb();
    if (db) {
      await db`
        INSERT INTO leads (name, email, phone, company, industry, company_size, need_type, message, source)
        VALUES (${name}, ${email}, ${phone || ''}, ${company || ''}, ${industry || ''}, ${size || ''}, ${need_type || ''}, ${message || ''}, ${source || 'website'})
      `;
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    if (!db) return NextResponse.json({ items: [], total: 0 });

    const url = new URL(request.url);
    const since = url.searchParams.get('since');
    const stats = url.searchParams.get('stats');

    if (stats === 'true') {
      const result = await db`SELECT count(*)::int as total FROM leads`;
      const total = (result as { total: number }[])?.[0]?.total ?? 0;
      return NextResponse.json({ total });
    }

    if (since) {
      const hours = parseInt(since.replace('h', ''), 10) || 8;
      const rows = await db`
        SELECT id, name, email, phone, company, industry, company_size, need_type, message, source, created_at
        FROM leads
        WHERE created_at > NOW() - make_interval(hours => ${hours})
        ORDER BY created_at DESC
      `;
      return NextResponse.json({ items: rows });
    }

    const rows = await db`
      SELECT id, name, email, phone, company, industry, company_size, need_type, message, source, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 100
    `;
    return NextResponse.json({ items: rows });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

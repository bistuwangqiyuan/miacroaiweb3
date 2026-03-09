import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, slug, locale, summary, keywords } = body || {};
    if (!title || !content || !slug) {
      return NextResponse.json({ error: 'title, content, and slug are required' }, { status: 400 });
    }
    const db = getDb();
    if (db) {
      await db`
        INSERT INTO blog_posts (title, content, slug, locale, summary, keywords, published)
        VALUES (${title}, ${content}, ${slug}, ${locale || 'zh'}, ${summary || ''}, ${keywords || ''}, true)
      `;
    }
    return NextResponse.json({ ok: true, slug });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    if (!db) return NextResponse.json({ items: [], total: 0 });

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const locale = url.searchParams.get('locale') || 'zh';

    if (slug) {
      const rows = await db`
        SELECT id, title, content, slug, locale, summary, keywords, published, created_at
        FROM blog_posts WHERE slug = ${slug} AND published = true LIMIT 1
      `;
      const post = (rows as unknown[])?.[0];
      return post ? NextResponse.json(post) : NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const rows = await db`
      SELECT id, title, slug, locale, summary, keywords, created_at
      FROM blog_posts
      WHERE published = true AND locale = ${locale}
      ORDER BY created_at DESC
      LIMIT 50
    `;
    return NextResponse.json({ items: rows });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

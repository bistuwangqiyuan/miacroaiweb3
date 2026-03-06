import { NextRequest, NextResponse } from 'next/server';
import { queryFeedback, insertFeedback, queryLatestFeedback } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latest = searchParams.get('latest');
    if (latest) {
      const items = await queryLatestFeedback(parseInt(latest, 10) || 3);
      return NextResponse.json({ items });
    }
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10)));
    const userId = request.headers.get('x-user-id') || 'guest';
    const { items, total } = await queryFeedback(userId, page, pageSize);
    return NextResponse.json({ items, total });
  } catch {
    return NextResponse.json({ items: [], total: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, locale } = body || {};
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 });
    }
    const userId = request.headers.get('x-user-id') || 'guest';
    const ok = await insertFeedback(userId, content, String(locale || 'zh'));
    return NextResponse.json({ ok: ok ?? true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

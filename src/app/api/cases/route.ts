import { NextRequest, NextResponse } from 'next/server';
import { queryCaseStudies } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10)));
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';
    const source = searchParams.get('source') || '';
    const keyword = searchParams.get('keyword') || '';
    const { items, total } = await queryCaseStudies({
      page,
      pageSize,
      sort,
      order,
      source: source || undefined,
      keyword: keyword || undefined,
    });
    return NextResponse.json({ items, total });
  } catch {
    return NextResponse.json({ items: [], total: 0 });
  }
}

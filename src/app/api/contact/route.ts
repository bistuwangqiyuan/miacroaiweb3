import { NextRequest, NextResponse } from 'next/server';
import { insertContact } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const ok = await insertContact(String(name), String(email), String(message));
    return NextResponse.json({ ok: ok ?? true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

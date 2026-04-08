import { NextResponse } from 'next/server';
import { resetBooks } from '@/lib/books-data';

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  resetBooks();
  return NextResponse.json({ ok: true });
}

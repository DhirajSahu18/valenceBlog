// lib/api-utils.ts
import { NextResponse } from 'next/server';

export function handleError(error: unknown) {
  console.error('[API ERROR]:', error);
  return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
}

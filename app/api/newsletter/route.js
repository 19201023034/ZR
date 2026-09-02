import { NextResponse } from 'next/server';

import { subscribe } from '@/lib/newsletter';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe żądanie.' }, { status: 400 });
  }

  const email = String(body?.email ?? '').trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Podaj poprawny adres e-mail.' }, { status: 400 });
  }

  // Consent is a legal requirement, not a UI nicety — never accept without it.
  if (body?.consent !== true) {
    return NextResponse.json(
      { error: 'Zaznacz zgodę na otrzymywanie newslettera.' },
      { status: 400 }
    );
  }

  const result = await subscribe(email);

  if (!result.ok) {
    // Log the real reason for us, show the visitor something useful.
    console.error('[newsletter]', result.reason);
    return NextResponse.json({ error: result.message }, { status: result.status ?? 502 });
  }

  return NextResponse.json({ ok: true });
}

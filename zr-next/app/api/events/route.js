import { NextResponse } from 'next/server';
import { getEvents, createEvent } from '@/lib/store';

export const dynamic = 'force-dynamic';

const REQUIRED = ['artist', 'date', 'venue'];

export async function GET() {
  return NextResponse.json({ events: await getEvents() });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowy JSON.' }, { status: 400 });
  }

  const missing = REQUIRED.filter(k => !body?.[k]);
  if (missing.length) {
    return NextResponse.json(
      { error: `Brakuje pól: ${missing.join(', ')}.` },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    return NextResponse.json({ error: 'Data musi być w formacie RRRR-MM-DD.' }, { status: 400 });
  }

  const num = v => (v === '' || v == null ? null : Number(v));

  const event = await createEvent({
    artist: String(body.artist).trim(),
    support: body.support ? String(body.support).trim() : null,
    genre: body.genre || 'Rock',
    date: body.date,
    doors: body.doors || '19:00',
    start: body.start || '20:00',
    venue: body.venue,
    priceFrom: num(body.priceFrom),
    priceDay: num(body.priceDay),
    pool: num(body.pool),
    capacity: num(body.capacity),
    ageMin: num(body.ageMin),
    ticketUrl: body.ticketUrl ? String(body.ticketUrl).trim() : null,
    status: body.status || 'dostepne',
    description: body.description || '',
    featured: Boolean(body.featured),
  });

  return NextResponse.json({ event }, { status: 201 });
}

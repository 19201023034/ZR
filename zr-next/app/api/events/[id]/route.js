import { NextResponse } from 'next/server';
import { getEvent, updateEvent, deleteEvent } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) return NextResponse.json({ error: 'Nie znaleziono.' }, { status: 404 });
  return NextResponse.json({ event });
}

export async function PATCH(request, { params }) {
  const { id } = await params;

  let patch;
  try {
    patch = await request.json();
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowy JSON.' }, { status: 400 });
  }

  // id is owned by the store, never by the client
  delete patch.id;

  const event = await updateEvent(id, patch);
  if (!event) return NextResponse.json({ error: 'Nie znaleziono.' }, { status: 404 });
  return NextResponse.json({ event });
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const ok = await deleteEvent(id);
  if (!ok) return NextResponse.json({ error: 'Nie znaleziono.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

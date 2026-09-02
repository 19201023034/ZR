import { NextResponse } from 'next/server';
import { getEvent, updateEvent, deleteEvent, StoreReadOnlyError } from '@/lib/store';

const DEMO_MESSAGE =
  'Tryb demo: to środowisko nie zapisuje zmian. Podgląd działa w pełni, edycja wymaga podpięcia bazy danych.';

function demoResponse() {
  return NextResponse.json({ error: DEMO_MESSAGE }, { status: 503 });
}

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

  let event;
  try {
    event = await updateEvent(id, patch);
  } catch (err) {
    if (err instanceof StoreReadOnlyError) return demoResponse();
    throw err;
  }
  if (!event) return NextResponse.json({ error: 'Nie znaleziono.' }, { status: 404 });
  return NextResponse.json({ event });
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  let ok;
  try {
    ok = await deleteEvent(id);
  } catch (err) {
    if (err instanceof StoreReadOnlyError) return demoResponse();
    throw err;
  }
  if (!ok) return NextResponse.json({ error: 'Nie znaleziono.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

import 'server-only';

import { promises as fs } from 'fs';
import path from 'path';

import { eventSlug, daysUntil } from './events';

const FILE = path.join(process.cwd(), 'data', 'events.json');

/**
 * File-backed event store.
 *
 * This is the seam where a real database goes later — every caller talks to
 * these functions, never to the JSON directly, so swapping in Supabase/Sanity
 * means rewriting this file only.
 *
 * Writes are serialised through `queue`: two requests landing at once would
 * otherwise read the same array and the second write would drop the first.
 */
let queue = Promise.resolve();

async function readAll() {
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.events) ? parsed.events : [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

/** Thrown when the host filesystem is read-only (Vercel & friends). */
export class StoreReadOnlyError extends Error {
  constructor() {
    super('Event store is read-only in this environment');
    this.name = 'StoreReadOnlyError';
  }
}

const READ_ONLY_CODES = new Set(['EROFS', 'EACCES', 'EPERM']);

async function writeAll(events) {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    // write-then-rename so a crash mid-write can't leave a truncated file
    const tmp = FILE + '.tmp';
    await fs.writeFile(tmp, JSON.stringify({ events }, null, 2), 'utf-8');
    await fs.rename(tmp, FILE);
  } catch (err) {
    // Serverless hosts mount the bundle read-only. Reads keep working, so the
    // public site is fine — only the panel needs to say so plainly.
    if (READ_ONLY_CODES.has(err.code)) throw new StoreReadOnlyError();
    throw err;
  }
}

function mutate(fn) {
  const next = queue.then(async () => {
    const events = await readAll();
    const result = await fn(events);
    await writeAll(result.events);
    return result.value;
  });
  // keep the chain alive even if this mutation rejects
  queue = next.catch(() => {});
  return next;
}

/** Slug is derived from artist+date, so it can never drift out of sync. */
// Adres i odliczanie doklejamy w jednym miejscu, przy odczycie ze store'u.
// Dzięki temu liczba dni powstaje raz, na serwerze — komponenty ją tylko wyświetlają.
function withSlug(event) {
  return { ...event, slug: eventSlug(event), daysUntil: daysUntil(event.date) };
}

export async function getEvents() {
  const events = await readAll();
  return events.map(withSlug).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getEventBySlug(slug) {
  const events = await getEvents();
  return events.find(e => e.slug === slug) ?? null;
}

/** Events that already happened, newest first — for the archive. */
export async function getPast() {
  const today = new Date().toISOString().slice(0, 10);
  const events = await getEvents();
  return events.filter(e => e.date < today).reverse();
}

export async function getEvent(id) {
  const events = await readAll();
  const found = events.find(e => e.id === id);
  return found ? withSlug(found) : null;
}

/** Upcoming events, today included, soonest first. */
export async function getUpcoming() {
  const today = new Date().toISOString().slice(0, 10);
  const events = await getEvents();
  return events.filter(e => e.date >= today);
}

/**
 * The event the homepage leads with: an explicitly featured one if the
 * panel pinned it, otherwise simply the next date.
 */
export async function getHeroEvent() {
  const upcoming = await getUpcoming();
  return upcoming.find(e => e.featured) ?? upcoming[0] ?? null;
}

export async function createEvent(data) {
  return mutate(events => {
    const event = {
      id: String(Date.now()),
      artist: '',
      support: null,
      genre: 'Rock',
      date: '',
      doors: '19:00',
      start: '20:00',
      venue: 'Sala Duża',
      capacity: null,
      priceFrom: null,
      priceDay: null,
      pool: null,
      sold: 0,
      status: 'dostepne',
      poster: null,
      // sales live on Stage24 — this is the outbound link, not a local checkout
      ticketUrl: null,
      description: '',
      ageMin: null,
      featured: false,
      ...data,
    };
    return { events: [...events, event], value: event };
  });
}

export async function updateEvent(id, patch) {
  return mutate(events => {
    const i = events.findIndex(e => e.id === id);
    if (i === -1) return { events, value: null };

    const next = [...events];
    next[i] = { ...next[i], ...patch, id: next[i].id };

    // `featured` is a single pin, not a per-row flag
    if (patch.featured === true) {
      for (let j = 0; j < next.length; j++) {
        if (j !== i) next[j] = { ...next[j], featured: false };
      }
    }

    return { events: next, value: next[i] };
  });
}

export async function deleteEvent(id) {
  return mutate(events => {
    const exists = events.some(e => e.id === id);
    return { events: events.filter(e => e.id !== id), value: exists };
  });
}

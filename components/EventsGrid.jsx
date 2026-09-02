'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventCard from './EventCard';
import Reveal, { RevealGroup } from './Reveal';
import s from './EventsGrid.module.css';

export default function EventsGrid({ events }) {
  const [genre, setGenre] = useState('Wszystkie');

  // only offer filters that would actually return something
  const used = [...new Set(events.map(e => e.genre))].filter(Boolean).sort();

  const filtered = genre === 'Wszystkie'
    ? events
    : events.filter(e => e.genre === genre);

  const [first, ...rest] = filtered;

  return (
    <section className={'section ' + s.section}>
      <Reveal variant="mask" className={s.header}>
        <h2 className={s.heading + ' display'}>Nadchodzące wydarzenia</h2>
        <Link href="/repertuar" className={s.allLink}>
          Cały kalendarz · {events.length} dat →
        </Link>
      </Reveal>

      <RevealGroup variant="up" step={45} className={s.filters}>
        {['Wszystkie', ...used].map(g => (
          <button
            key={g}
            className={s.filter + (genre === g ? ' ' + s.filterActive : '')}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </RevealGroup>

      {filtered.length === 0 ? (
        <p className={s.empty}>Brak wydarzeń w tej kategorii.</p>
      ) : (
        <RevealGroup variant="up" step={90} className={s.grid} key={genre}>
          {first && <EventCard event={first} featured />}
          {rest.map(e => <EventCard key={e.id} event={e} />)}
          <Link href="/repertuar" className={s.calendarTile}>
            <span className="section-label">KALENDARZ</span>
            <h3 className={s.calendarTitle + ' display'}>Cały repertuar · {events.length} dat</h3>
            <span className={s.calendarCta + ' mono'}>ZOBACZ WSZYSTKIE →</span>
          </Link>
        </RevealGroup>
      )}
    </section>
  );
}

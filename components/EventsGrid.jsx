'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventCard from './EventCard';
import Reveal, { RevealGroup } from './Reveal';
import s from './EventsGrid.module.css';

export default function EventsGrid({ events, t, locale = 'pl' }) {
  const [genre, setGenre] = useState(t.common.all);

  // only offer filters that would actually return something
  const used = [...new Set(events.map(e => e.genre))].filter(Boolean).sort();

  const ALL = t.common.all;
  const filtered = genre === ALL
    ? events
    : events.filter(e => e.genre === genre);


  return (
    <section className={'section ' + s.section}>
      <Reveal variant="mask" className={s.header}>
        <h2 className={s.heading + ' display'}>{t.home.upcoming}</h2>
        <Link href="/repertuar" className={s.allLink}>
          {t.home.calendarLink} · {events.length} {t.home.dates} →
        </Link>
      </Reveal>

      <RevealGroup variant="up" step={45} className={s.filters}>
        {[t.common.all, ...used].map(g => (
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
        <p className={s.empty}>{t.common.noEvents}</p>
      ) : (
        <RevealGroup variant="up" step={90} className={s.grid} key={genre}>
          {filtered.map(e => <EventCard key={e.id} event={e} t={t} locale={locale} />)}
          <Link href="/repertuar" className={s.calendarTile}>
            <span className="section-label">{t.home.calendarTile}</span>
            <h3 className={s.calendarTitle + ' display'}>{t.home.calendarTileTitle} · {events.length} {t.home.dates}</h3>
            <span className={s.calendarCta + ' mono'}>{t.home.seeAll}</span>
          </Link>
        </RevealGroup>
      )}
    </section>
  );
}

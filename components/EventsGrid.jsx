'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventRow from './EventRow';
import { translateGenre } from '@/lib/events';
import Reveal, { RevealGroup } from './Reveal';
import s from './EventsGrid.module.css';

/**
 * Lista nadchodzących wydarzeń w układzie wierszowym.
 *
 * Wiersz zamiast kafla, bo przy skanowaniu terminarza liczy się porównanie
 * dat między pozycjami — a to działa tylko wtedy, gdy stoją jedna pod drugą
 * w tej samej kolumnie. Kafle rozrzucają datę po siatce.
 */
export default function EventsGrid({ events, t, locale = 'pl' }) {
  const [genre, setGenre] = useState('ALL');

  const used = [...new Set(events.map(e => e.genre))].filter(Boolean).sort();
  const filtered = genre === 'ALL' ? events : events.filter(e => e.genre === genre);

  return (
    <>
      {/* ─── Kategorie ─── */}
      <section className={'section ' + s.cats}>
        <Reveal variant="mask" className={s.catsHead}>
          <span className="section-label">{t.home.catLabel}</span>
        </Reveal>
        <RevealGroup variant="up" step={45} className={s.chips}>
          {['ALL', ...used].map(g => (
            <button
              key={g}
              type="button"
              className={s.chip + (genre === g ? ' ' + s.chipOn : '')}
              onClick={() => setGenre(g)}
            >
              {g === 'ALL' ? t.common.all : translateGenre(g, locale)}
            </button>
          ))}
          <Link href="/repertuar" className={s.chip + ' ' + s.chipLink}>
            {t.home.catAll} →
          </Link>
        </RevealGroup>
      </section>

      {/* ─── Wydarzenia ─── */}
      <section className={'section ' + s.section}>
        <Reveal variant="mask" className={s.header}>
          <h2 className={s.heading + ' display'}>{t.home.upcoming}</h2>
          <Link href="/repertuar" className={s.allLink}>
            {t.home.calendarLink} · {events.length} {t.home.dates} →
          </Link>
        </Reveal>

        {filtered.length === 0 ? (
          <p className={s.empty}>{t.common.noEvents}</p>
        ) : (
          <RevealGroup variant="up" step={55} className={s.rows} key={genre}>
            {filtered.map(e => (
              <EventRow key={e.id} event={e} t={t} locale={locale} showGenre />
            ))}
          </RevealGroup>
        )}
      </section>
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import TicketButton from './TicketButton';
import { IconClock } from './EventIcons';
import { getStatusColor, getStatusLabel, formatDate, countdownLabel, translateGenre, translateRoom } from '@/lib/events';
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
            {filtered.map(e => {
              const sold = e.status === 'wyprzedane';
              const countdown = sold ? null : countdownLabel(e.daysUntil, locale);
              return (
                <article key={e.id} className={s.row + (sold ? ' ' + s.rowSold : '')}>
                  <Link href={`/wydarzenie/${e.slug}`} className={s.thumb + ' led-grid'} tabIndex={-1} aria-hidden="true">
                    {e.poster && <img src={e.poster} alt="" className={s.thumbImg} />}
                  </Link>

                  <div className={s.main}>
                    <h3 className={s.artist}>
                      <Link href={`/wydarzenie/${e.slug}`} className={s.artistLink}>{e.artist}</Link>
                    </h3>
                    {e.support && <p className={s.support}>+ {e.support}</p>}
                    <p className={s.meta}>
                      <IconClock className={s.metaIcon} />
                      <span>
                        <strong>{formatDate(e.date, locale)}{e.start ? ` · ${e.start}` : ''}</strong>
                        <span className={s.metaMuted}> · {translateRoom(e.venue, locale)}</span>
                      </span>
                      {countdown && <span className={s.countdown}>{countdown}</span>}
                    </p>
                  </div>

                  <div className={s.side}>
                    <span className={s.status + ' mono'} style={{ color: getStatusColor(e.status) }}>
                      {getStatusLabel(e, locale)}
                    </span>
                    <div className={s.actions}>
                      <Link href={`/wydarzenie/${e.slug}`} className={s.details}>{t.common.details}</Link>
                      <TicketButton event={e} t={t.ticket} style={{ padding: '12px 22px', fontSize: 14 }} />
                    </div>
                  </div>
                </article>
              );
            })}
          </RevealGroup>
        )}
      </section>
    </>
  );
}

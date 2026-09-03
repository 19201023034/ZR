'use client';

import { useState } from 'react';
import Link from 'next/link';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import Reveal, { RevealGroup } from './Reveal';
import s from './RepertuarBody.module.css';

function monthLabel(ym) {
  const [y, m] = ym.split('-');
  const names = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
                  'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
  return `${names[parseInt(m) - 1]} ${y}`;
}

export default function RepertuarBody({ events = [] }) {
  const [genre, setGenre] = useState('Wszystkie');

  const MONTHS = [...new Set(events.map(e => e.date.slice(0, 7)))].sort();
  const used = [...new Set(events.map(e => e.genre))].filter(Boolean).sort();

  const filtered = genre === 'Wszystkie'
    ? events
    : events.filter(e => e.genre === genre);

  const grouped = MONTHS.reduce((acc, ym) => {
    const monthEvents = filtered.filter(e => e.date.startsWith(ym));
    if (monthEvents.length) acc[ym] = monthEvents;
    return acc;
  }, {});

  return (
    <>
      {/* ─── HEADER ─── */}
      <section className={'section ' + s.intro}>
        <div className={s.introRow}>
          <div className="enter-mask d1">
            <span className="section-label">Klub koncertowy</span>
            <h1 className={'display ' + s.heading}>Repertuar</h1>
          </div>
          <div className={s.filters + ' enter d3'}>
            {['Wszystkie', ...used].map(g => (
              <button
                key={g}
                className={s.filter + (genre === g ? ' ' + s.filterActive : '')}
                onClick={() => setGenre(g)}
              >{g}</button>
            ))}
          </div>
        </div>
        <div className={s.meta + ' mono enter-fade d4'}>
          {filtered.length} {filtered.length === 1 ? 'wydarzenie' : 'wydarzeń'}
          {genre !== 'Wszystkie' ? ` · ${genre}` : ''}
        </div>
      </section>

      {/* ─── EVENT LIST ─── */}
      {Object.keys(grouped).length === 0 ? (
        <section className="section">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--zr-muted)' }}>
            Brak wydarzeń w tej kategorii.
          </p>
        </section>
      ) : (
        Object.entries(grouped).map(([ym, events]) => (
          <section key={ym} className={s.monthSection}>
            <Reveal variant="fade" className={s.monthLabel + ' mono'}>{monthLabel(ym)}</Reveal>
            <RevealGroup variant="left" step={70} className={s.eventList} key={genre}>
              {events.map(event => (
                <EventRow key={event.id} event={event} />
              ))}
            </RevealGroup>
          </section>
        ))
      )}
    </>
  );
}

function EventRow({ event }) {
  const sold = event.status === 'wyprzedane';
  const statusColor = getStatusColor(event.status);

  return (
    <div className={s.row + (sold ? ' ' + s.rowSold : '')}>
      {/* Date */}
      <div className={s.dateCol}>
        <span className={s.dateDay + ' mono'}>{formatDate(event.date).split(' ')[0]}</span>
        <span className={s.dateNum + ' mono'}>{formatDate(event.date).split(' ')[1]}</span>
      </div>

      {/* Times */}
      <div className={s.timeCol + ' mono'}>
        <span className={s.timeLabel}>wejście</span>
        <span className={s.timeVal}>{event.doors}</span>
        <span className={s.timeLabel}>start</span>
        <span className={s.timeVal}>{event.start}</span>
      </div>

      {/* Thumbnail */}
      <Link href={`/wydarzenie/${event.slug}`} className={s.thumb + ' led-grid'} aria-hidden="true" tabIndex={-1}>
        {event.poster && <img src={event.poster} alt="" className={s.thumbImg} />}
      </Link>

      {/* Main info */}
      <div className={s.mainCol}>
        <h3 className={s.artist + ' display'}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.artistLink}>{event.artist}</Link>
        </h3>
        <div className={s.eventMeta}>
          <span className={s.genre + ' mono'}>{event.genre}</span>
          {event.support && <span className={s.support}>+ {event.support}</span>}
          <span className={s.venue}>{event.venue}</span>
          {event.ageMin && <span className={s.age + ' mono'}>{event.ageMin}+</span>}
        </div>
      </div>

      {/* Status + price + CTA */}
      <div className={s.ctaCol}>
        <div className={s.statusRow}>
          <span className={'status-dot status-dot-' + (
            event.status === 'dostepne' ? 'ok' :
            event.status === 'ostatnie' ? 'warn' :
            event.status === 'wyprzedane' ? 'sold' : 'pre'
          )} />
          <span className={'mono ' + s.statusText} style={{ color: statusColor }}>
            {getStatusLabel(event)}
          </span>
        </div>

        <span className={s.price + ' mono'}>
          {sold ? '—' : event.priceFrom ? `od ${event.priceFrom} zł` : '—'}
        </span>

        <TicketButton event={event} style={{ padding: '11px 22px', fontSize: 14 }} />
      </div>
    </div>
  );
}

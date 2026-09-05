'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import TicketButton from './TicketButton';
import { IconClock } from './EventIcons';
import { formatDate, countdownLabel, translateRoom } from '@/lib/events';
import s from './HeroCarousel.module.css';

/**
 * Karuzela plakatów: aktywny na środku, sąsiedzi wystają po bokach.
 *
 * Wystające sąsiadki są tu funkcją, nie ozdobą — mówią „jest tego więcej"
 * bez czytania czegokolwiek, więc strzałki dostają powód, żeby w nie kliknąć.
 */
export default function HeroCarousel({ events = [], t, locale = 'pl' }) {
  const [i, setI] = useState(0);
  const n = events.length;
  const timer = useRef(null);

  const go = useCallback(d => setI(p => (p + d + n) % n), [n]);

  // Automatyczny obrót zatrzymuje się, gdy ktoś dotknie karuzeli albo
  // gdy system prosi o ograniczony ruch.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (n < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => go(1), 7000);
    return () => clearInterval(timer.current);
  }, [n, paused, go]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (!n) return null;

  const ev = events[i];
  // horyzont 400 dni: każde wydarzenie w hero ma plakietkę, więc blok opisu
  // ma zawsze tę samą wysokość i tytuł nie skacze przy zmianie slajdu
  const countdown = countdownLabel(ev.daysUntil, locale, 400);

  return (
    <section
      className={s.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className={s.stage}>
        {n > 1 && (
          <button type="button" className={s.arrow + ' ' + s.arrowPrev}
                  onClick={() => go(-1)} aria-label={t.home.heroPrev}>
            <span aria-hidden="true">‹</span>
          </button>
        )}

        <div className={s.rail}>
          {events.map((e, idx) => {
            const offset = (idx - i + n) % n;
            const pos = offset === 0 ? 'active'
              : offset === 1 ? 'next'
              : offset === n - 1 ? 'prev' : 'hidden';
            return (
              <div key={e.id} className={s.slide + ' ' + s[pos]} aria-hidden={pos !== 'active'}>
                <Link href={`/wydarzenie/${e.slug}`} tabIndex={pos === 'active' ? 0 : -1} className={s.posterLink}>
                  {e.poster
                    ? <img src={e.poster} alt={e.artist} className={s.poster} />
                    : <span className={s.posterEmpty + ' mono'}>{t.home.posterAlt}</span>}
                </Link>
              </div>
            );
          })}
        </div>

        {n > 1 && (
          <button type="button" className={s.arrow + ' ' + s.arrowNext}
                  onClick={() => go(1)} aria-label={t.home.heroNext}>
            <span aria-hidden="true">›</span>
          </button>
        )}
      </div>

      {/* Opis pod plakatem — kolejność jak w bilecie: co, kiedy, gdzie, kup */}
      <div className={s.info} aria-live="polite">
        <div className={s.infoText} key={ev.id}>
          {countdown && <span className={s.badge}>{countdown}</span>}

          <h1 className={'display ' + s.title}>
            <Link href={`/wydarzenie/${ev.slug}`} className={s.titleLink}>{ev.artist}</Link>
          </h1>

          {ev.support && <p className={s.support}>+ {ev.support}</p>}

          <p className={s.when}>
            <IconClock className={s.whenIcon} />
            <span>
              <strong>{formatDate(ev.date, locale)}{ev.start ? ` · ${ev.start}` : ''}</strong>
              <span className={s.whenMuted}> · {translateRoom(ev.venue, locale)}</span>
            </span>
          </p>
        </div>

        <div className={s.actions}>
          <TicketButton
            event={ev}
            t={t.ticket}
            label={ev.priceFrom ? `${t.ticket.buy} · ${t.ticket.from} ${ev.priceFrom} ${t.ticket.currency}` : t.ticket.buy}
            style={{ padding: '15px 30px', fontSize: 15 }}
          />
          <Link href={`/wydarzenie/${ev.slug}`} className={s.secondary}>
            {t.common.details}
          </Link>
        </div>

        {n > 1 && (
          <div className={s.dots} role="tablist">
            {events.map((e, idx) => (
              <button
                key={e.id}
                type="button"
                role="tab"
                aria-selected={idx === i}
                aria-label={`${t.home.heroGoTo}: ${e.artist}`}
                className={s.dot + (idx === i ? ' ' + s.dotOn : '')}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

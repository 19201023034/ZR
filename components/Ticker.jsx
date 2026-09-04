'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/events';
import s from './Ticker.module.css';

/**
 * Infinite marquee of upcoming dates.
 * Track is duplicated twice and translated -50% → seamless loop.
 * Pauses on hover; frozen under prefers-reduced-motion (see CSS).
 */
export default function Ticker({ events = [], locale = 'pl', label = 'Wkrótce na rewirowej scenie' }) {
  if (!events.length) return null;

  const items = events.slice(0, 8);

  const Item = ({ event, k }) => (
    <Link href={`/wydarzenie/${event.slug}`} className={s.item} key={k}>
      <span className={'mono ' + s.itemDate}>{formatDate(event.date, locale)}</span>
      <span className={'display ' + s.itemArtist}>{event.artist}</span>
      <span className={s.sep} aria-hidden="true">◆</span>
    </Link>
  );

  return (
    <div className={s.ticker}>
      <div className={s.label}>
        <span className="status-dot status-dot-ok" />
        <span className={'mono ' + s.labelText}>{label}</span>
      </div>

      <div className={s.viewport}>
        <div className={s.track}>
          {items.map((e, i) => <Item event={e} k={`a${i}`} key={`a${i}`} />)}
          {/* duplicate for the seamless wrap — hidden from AT */}
          <span className={s.dupe} aria-hidden="true">
            {items.map((e, i) => <Item event={e} k={`b${i}`} key={`b${i}`} />)}
          </span>
        </div>
      </div>
    </div>
  );
}

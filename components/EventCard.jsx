import Link from 'next/link';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import s from './EventCard.module.css';

export default function EventCard({ event, featured = false }) {
  const sold = event.status === 'wyprzedane';
  const statusColor = getStatusColor(event.status);
  const statusLabel = getStatusLabel(event);

  return (
    <article
      className={s.card + (featured ? ' ' + s.featured : '') + (sold ? ' ' + s.sold : '')}
      data-spotlight={sold ? undefined : ''}
    >
      {/* Poster */}
      <div className={s.poster + ' led-grid'} style={{ height: featured ? 250 : 150 }}>
        {event.poster && <img src={event.poster} alt={event.artist} className={s.posterImg} />}
        {sold && <div className={s.soldOverlay} />}
      </div>

      {/* Body */}
      <div className={s.body}>
        <div className={s.topRow}>
          <span className={s.date}>{formatDate(event.date)} · {event.doors} / {event.start}</span>
          <span className={s.status} style={{ color: statusColor }}>
            <span className={'status-dot status-dot-' + (
              event.status === 'dostepne' ? 'ok' :
              event.status === 'ostatnie' ? 'warn' :
              event.status === 'wyprzedane' ? 'sold' : 'pre'
            )} />
            {statusLabel}
          </span>
        </div>

        <h3 className={s.artist} style={{
          fontSize: featured ? 46 : 27,
          color: sold ? 'var(--zr-muted)' : featured ? 'var(--zr-gold)' : 'var(--zr-text)',
        }}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.artistLink}>{event.artist}</Link>
        </h3>

        <div className={s.meta}>
          <span>{event.genre}</span>
          {event.support && <span>+ {event.support}</span>}
          <span>{event.venue}</span>
        </div>
      </div>

      {/* Ticket footer */}
      <div className={'ticket-footer ' + s.footer}>
        <span className={s.price} style={{ color: sold ? 'var(--zr-faint)' : 'var(--zr-text)' }}>
          {sold ? '—' : `od ${event.priceFrom} zł`}
        </span>
        <TicketButton event={event} style={{ padding: '10px 18px', fontSize: 13 }} />
      </div>
    </article>
  );
}

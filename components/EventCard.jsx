import Link from 'next/link';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import s from './EventCard.module.css';

export default function EventCard({ event }) {
  const sold = event.status === 'wyprzedane';
  const statusColor = getStatusColor(event.status);
  const statusLabel = getStatusLabel(event);

  return (
    <article
      className={s.card + (sold ? ' ' + s.sold : '')}
      data-spotlight={sold ? undefined : ''}
    >
      {/* Poster — uniform 16:9 across every card */}
      <div className={s.poster + ' led-grid'}>
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

        <h3 className={s.artist} style={{ color: sold ? 'var(--zr-muted)' : 'var(--zr-text)' }}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.artistLink}>{event.artist}</Link>
        </h3>

        <div className={s.meta}>
          <span>{event.genre}</span>
          {event.support && <span className={s.support}>+ {event.support}</span>}
          <span>{event.venue}</span>
        </div>
      </div>

      {/* Ticket footer — pinned to the bottom so every card lines up */}
      <div className={'ticket-footer ' + s.footer}>
        <span className={s.price} style={{ color: sold ? 'var(--zr-faint)' : 'var(--zr-text)' }}>
          {sold ? '—' : event.priceFrom ? `od ${event.priceFrom} zł` : 'wstęp wkrótce'}
        </span>
        <TicketButton event={event} style={{ padding: '10px 18px', fontSize: 13 }} />
      </div>
    </article>
  );
}

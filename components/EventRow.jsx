import Link from 'next/link';
import TicketButton from './TicketButton';
import { IconClock } from './EventIcons';
import { getStatusColor, getStatusLabel, formatDate, countdownLabel, translateGenre, translateRoom } from '@/lib/events';
import s from './EventRow.module.css';

/**
 * Wiersz wydarzenia: plakat · treść · akcje.
 *
 * Cała informacja (termin, sala, odliczanie) leży w jednej elastycznej linii
 * pod nazwą — dzięki temu wypełnia dostępną szerokość i nigdy nie nachodzi
 * na sąsiednią kolumnę, co psuło sztywny układ tabelaryczny.
 */
export default function EventRow({ event, t, locale = 'pl', showGenre = false }) {
  const sold = event.status === 'wyprzedane';
  const countdown = sold ? null : countdownLabel(event.daysUntil, locale, 400);

  return (
    <article className={s.row + (sold ? ' ' + s.sold : '')}>
      <Link href={`/wydarzenie/${event.slug}`} className={s.thumb + ' led-grid'} tabIndex={-1} aria-hidden="true">
        {event.poster && <img src={event.poster} alt="" className={s.thumbImg} />}
      </Link>

      <div className={s.main}>
        <h3 className={s.artist}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.artistLink}>{event.artist}</Link>
        </h3>
        {event.support && <p className={s.support}>+ {event.support}</p>}

        <div className={s.meta}>
          <span className={s.date + ' mono'}>{formatDate(event.date, locale)}</span>
          {event.start && (
            <span className={s.time + ' mono'}><IconClock className={s.timeIcon} />{event.start}</span>
          )}
          <span className={s.dot} aria-hidden="true">·</span>
          <span className={s.venue}>{translateRoom(event.venue, locale)}</span>
          {showGenre && <span className={s.genre + ' mono'}>{translateGenre(event.genre, locale)}</span>}
          {event.ageMin && <span className={s.age + ' mono'}>{event.ageMin}+</span>}
          {countdown && <span className={s.countdown + ' mono'}>{countdown}</span>}
        </div>
      </div>

      <div className={s.side}>
        <span className={s.status + ' mono'} style={{ color: getStatusColor(event.status) }}>
          {getStatusLabel(event, locale)}
        </span>
        <div className={s.actions}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.details}>{t.common.details}</Link>
          <TicketButton event={event} t={t.ticket} style={{ flex: 1, justifyContent: 'center', padding: '12px 14px', fontSize: 14 }} />
        </div>
      </div>
    </article>
  );
}

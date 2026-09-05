import Link from 'next/link';
import TicketButton from './TicketButton';
import { IconClock } from './EventIcons';
import { getStatusColor, getStatusLabel, formatDate, countdownLabel, translateGenre, translateRoom } from '@/lib/events';
import s from './EventRow.module.css';

/**
 * Wiersz wydarzenia w układzie tabelarycznym — informacja rozłożona na całą
 * szerokość (nazwa · termin · sala · odliczanie · zakup), żeby nie zostawała
 * pusta przestrzeń między treścią a akcjami.
 */
export default function EventRow({ event, t, locale = 'pl', showGenre = false }) {
  const sold = event.status === 'wyprzedane';
  const countdown = sold ? null : countdownLabel(event.daysUntil, locale, 400);
  const [dayName, dayDate] = formatDate(event.date, locale).split(' ');

  return (
    <article className={s.row + (sold ? ' ' + s.sold : '')}>
      <Link href={`/wydarzenie/${event.slug}`} className={s.thumb + ' led-grid'} tabIndex={-1} aria-hidden="true">
        {event.poster && <img src={event.poster} alt="" className={s.thumbImg} />}
      </Link>

      {/* Kto */}
      <div className={s.main}>
        <h3 className={s.artist}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.artistLink}>{event.artist}</Link>
        </h3>
        {event.support && <p className={s.support}>+ {event.support}</p>}
        {showGenre && <span className={s.genre + ' mono'}>{translateGenre(event.genre, locale)}</span>}
      </div>

      {/* Kiedy */}
      <div className={s.when}>
        <span className={s.date + ' mono'}>
          <span className={s.dayName}>{dayName}</span> {dayDate}
        </span>
        {event.start && (
          <span className={s.time + ' mono'}>
            <IconClock className={s.timeIcon} />{event.start}
          </span>
        )}
      </div>

      {/* Gdzie */}
      <div className={s.where}>
        <span className={s.venue}>{translateRoom(event.venue, locale)}</span>
        {event.ageMin && <span className={s.age + ' mono'}>{event.ageMin}+</span>}
      </div>

      {/* Ile zostało */}
      <div className={s.countdownCol}>
        {countdown && <span className={s.countdown}>{countdown}</span>}
      </div>

      {/* Zakup */}
      <div className={s.side}>
        <span className={s.status + ' mono'} style={{ color: getStatusColor(event.status) }}>
          {getStatusLabel(event, locale)}
        </span>
        <div className={s.actions}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.details}>{t.common.details}</Link>
          <TicketButton event={event} t={t.ticket} style={{ padding: '12px 22px', fontSize: 14 }} />
        </div>
      </div>
    </article>
  );
}

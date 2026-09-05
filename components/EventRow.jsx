import Link from 'next/link';
import TicketButton from './TicketButton';
import { IconClock } from './EventIcons';
import { getStatusColor, getStatusLabel, formatDate, countdownLabel, translateGenre, translateRoom } from '@/lib/events';
import s from './EventRow.module.css';

/**
 * Pojedynczy wiersz wydarzenia — jedno źródło dla strony głównej, repertuaru
 * i biletów. Trzy listy tego samego muszą wyglądać tak samo; wspólny komponent
 * to gwarantuje lepiej niż trzy kopie układu, które i tak się rozjechały.
 */
export default function EventRow({ event, t, locale = 'pl', showGenre = false }) {
  const sold = event.status === 'wyprzedane';
  const countdown = sold ? null : countdownLabel(event.daysUntil, locale);

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
        <p className={s.meta}>
          <IconClock className={s.metaIcon} />
          <span>
            <strong>{formatDate(event.date, locale)}{event.start ? ` · ${event.start}` : ''}</strong>
            <span className={s.metaMuted}>
              {' · '}{translateRoom(event.venue, locale)}
              {showGenre ? ` · ${translateGenre(event.genre, locale)}` : ''}
              {event.ageMin ? ` · ${event.ageMin}+` : ''}
            </span>
          </span>
          {countdown && <span className={s.countdown}>{countdown}</span>}
        </p>
      </div>

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

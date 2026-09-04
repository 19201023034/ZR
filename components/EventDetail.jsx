import Link from 'next/link';
import { IconPin, IconClock, IconCalendar, PRACTICAL_ICONS } from './EventIcons';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate, translateGenre, translateRoom, countdownLabel, VENUE_ADDRESS } from '@/lib/events';
import s from './EventDetail.module.css';

/**
 * Plik .ics składany w locie — kalendarz gościa dostaje gotowy wpis.
 *
 * Czas podajemy jako lokalny z TZID zamiast doklejać przesunięcie do DTSTART:
 * forma „20261212T200000+0100" nie jest poprawna w iCalendar i część klientów
 * po cichu ją odrzuca. Zamiast DTEND dajemy DURATION, bo końca koncertu
 * i tak nie znamy.
 */
function icsHref(event) {
  const day = (event.date || '').replace(/-/g, '');
  const time = (event.start || '20:00').replace(':', '') + '00';
  const esc = v => String(v).replace(/([,;\\])/g, '\\$1');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zaklete Rewiry//PL',
    'BEGIN:VEVENT',
    `UID:${event.slug}@zakleterewiry.pl`,
    `DTSTART;TZID=Europe/Warsaw:${day}T${time}`,
    'DURATION:PT3H',
    `SUMMARY:${esc(event.artist)}`,
    `LOCATION:${esc(`Zaklęte Rewiry, ${VENUE_ADDRESS.street}, ${VENUE_ADDRESS.city}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
}

export default function EventDetail({ event, others = [], t, locale = 'pl' }) {
  const sold = event.status === 'wyprzedane';
  const countdown = sold ? null : countdownLabel(event.daysUntil, locale, 60);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className={'section ' + s.hero}>
        <span className="glow-below" aria-hidden="true" />

        <div className={s.heroLeft}>
          <nav className={s.crumbs + ' mono enter-fade d1'} aria-label={t.nav.breadcrumb}>
            <Link href="/repertuar" className={s.crumb}>{t.event.crumb}</Link>
            <span aria-hidden="true"> / </span>
            <span>{formatDate(event.date, locale)}</span>
          </nav>

          <div className={s.badgeRow + ' enter-fade d1'}>
            {countdown && <span className={s.countdownBadge}>{countdown}</span>}
            <span className={s.statusRow}>
              <span className={'status-dot status-dot-' + (
                event.status === 'dostepne' ? 'ok'
                  : event.status === 'ostatnie' ? 'warn'
                  : event.status === 'wyprzedane' ? 'sold' : 'pre'
              )} />
              <span className={'mono ' + s.statusText} style={{ color: getStatusColor(event.status) }}>
                {getStatusLabel(event, locale)}
              </span>
            </span>
          </div>

          <h1 className={'display ' + s.title + ' enter-mask d2'}>{event.artist}</h1>

          {event.support && (
            <p className={s.support + ' enter d3'}>+ {event.support}</p>
          )}

          {/* Miejsce i czas jako dwie czytelne linie, nie siatka etykiet */}
          <div className={s.keyFacts + ' enter d4'}>
            <p className={s.keyLine}>
              <IconPin className={s.keyIcon} />
              <span>{translateRoom(event.venue, locale)} · {VENUE_ADDRESS.street}, {VENUE_ADDRESS.city}</span>
            </p>
            <p className={s.keyLine}>
              <IconClock className={s.keyIcon} />
              <span>
                <strong className={s.keyStrong}>{formatDate(event.date, locale)}{event.start ? ` · ${event.start}` : ''}</strong>
                {event.doors && <span className={s.keyMuted}> · {t.event.doorsShort} {event.doors}</span>}
              </span>
            </p>
            <a href={icsHref(event)} download={`${event.slug}.ics`} className={s.calLink}>
              <IconCalendar className={s.keyIcon} />
              {t.event.addToCalendar}
            </a>
          </div>

          <div className={s.tags + ' enter d4'}>
            <span className={s.tag + ' mono'}>{translateGenre(event.genre, locale)}</span>
            {event.ageMin && <span className={s.tag + ' mono'}>{event.ageMin}+</span>}
          </div>

          <div className={s.ctaRow + ' enter d5'}>
            <TicketButton
              event={event}
              t={t.ticket}
              magnetic="0.2"
              label={event.priceFrom ? `${t.ticket.buy} · ${t.ticket.from} ${event.priceFrom} ${t.ticket.currency}` : t.ticket.buy}
              style={{ padding: '18px 32px', fontSize: 17 }}
            />
            {!sold && event.ticketUrl && (
              <span className={s.ctaNote + ' mono'}>{t.event.sales}</span>
            )}
          </div>
        </div>

        <div className={s.poster + ' led-grid enter-fade d3'} data-parallax="0.1">
          {event.poster
            ? <img src={event.poster} alt={`${t.event.posterAlt}: ${event.artist}`} className={s.posterImg} />
            : <span className={s.posterEmpty + ' mono'}>{t.event.posterAlt} 3:4</span>}
        </div>
      </section>

      {/* ─── DESCRIPTION + PRACTICAL ─── */}
      <section className={'section ' + s.body}>
        <div className={s.bodyGrid}>
          <div className={s.bodyLeft}>
            <span className="section-label">{t.event.about}</span>
            {event.description
              ? <p className={s.desc}>{event.description}</p>
              : <p className={s.desc + ' ' + s.descEmpty}>{t.event.soon}</p>}
          </div>

          <div className={s.bodyRight}>
            <span className="section-label">{t.event.before}</span>
            <dl className={s.practical}>
              {t.event.practical.map(([term, desc], i) => {
                const Icon = PRACTICAL_ICONS[i];
                return (
                  <div key={term} className={s.practicalRow}>
                    <span className={s.practicalIcon} aria-hidden="true">
                      {Icon && <Icon className={s.practicalGlyph} />}
                    </span>
                    <dt className={s.practicalTerm}>{term}</dt>
                    <dd className={s.practicalDesc}>{desc}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── OTHER EVENTS ─── */}
      {others.length > 0 && (
        <section className={'section ' + s.others}>
          <div className={s.othersHead}>
            <h2 className={'display ' + s.othersTitle}>{t.event.others}</h2>
            <Link href="/repertuar" className={s.othersLink + ' mono'}>{t.event.allLink}</Link>
          </div>
          <div className={s.othersGrid}>
            {others.map(o => (
              <Link key={o.id} href={`/wydarzenie/${o.slug}`} className={s.otherCard} data-spotlight="">
                <span className={s.otherDate + ' mono'}>{formatDate(o.date, locale)}</span>
                <span className={'display ' + s.otherArtist}>{o.artist}</span>
                <span className={s.otherMeta + ' mono'}>{translateGenre(o.genre, locale)} · {translateRoom(o.venue, locale)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

import Link from 'next/link';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate, translateGenre, translateRoom } from '@/lib/events';
import s from './EventDetail.module.css';

export default function EventDetail({ event, others = [], t, locale = 'pl' }) {
  const sold = event.status === 'wyprzedane';

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

          <div className={s.statusRow + ' enter-fade d1'}>
            <span className={'status-dot status-dot-' + (
              event.status === 'dostepne' ? 'ok'
                : event.status === 'ostatnie' ? 'warn'
                : event.status === 'wyprzedane' ? 'sold' : 'pre'
            )} />
            <span className={'mono ' + s.statusText} style={{ color: getStatusColor(event.status) }}>
              {getStatusLabel(event, locale)}
            </span>
          </div>

          <h1 className={'display ' + s.title + ' enter-mask d2'}>{event.artist}</h1>

          {event.support && (
            <p className={s.support + ' enter d3'}>+ {event.support}</p>
          )}

          <div className={s.facts + ' enter d4'}>
            {[
              [t.common.date, formatDate(event.date, locale)],
              [t.common.doors, event.doors || '—'],
              [t.common.start, event.start || '—'],
              [t.common.hall, translateRoom(event.venue, locale)],
              [t.common.genre, translateGenre(event.genre, locale)],
              ...(event.ageMin ? [[t.common.age, `${event.ageMin}+`]] : []),
            ].map(([label, value]) => (
              <div key={label} className={s.fact}>
                <span className={s.factLabel + ' mono'}>{label}</span>
                <span className={s.factValue + ' mono'}>{value}</span>
              </div>
            ))}
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
              {t.event.practical.map(([term, desc]) => (
                <div key={term} className={s.practicalRow}>
                  <dt className={s.practicalTerm + ' mono'}>{term}</dt>
                  <dd className={s.practicalDesc}>{desc}</dd>
                </div>
              ))}
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

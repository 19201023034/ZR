import Link from 'next/link';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import s from './EventDetail.module.css';

const PRACTICAL = [
  ['Dojazd', 'Tramwaj 3, 5 oraz autobus 114, 243 — przystanek Krakowska. Wejście główne od ul. Krakowskiej.'],
  ['Parking', 'Własny parking na 80 miejsc od ul. bocznej, bezpłatny dla gości wydarzenia.'],
  ['Szatnia', 'Obowiązkowa, wliczona w cenę biletu.'],
  ['Dostępność', 'Wejście bez progów, winda i miejsca dla wózków. Asystę zgłoś wcześniej mailem.'],
];

export default function EventDetail({ event, others = [] }) {
  const sold = event.status === 'wyprzedane';

  return (
    <>
      {/* ─── HERO ─── */}
      <section className={'section ' + s.hero}>
        <span className="glow-below" aria-hidden="true" />

        <div className={s.heroLeft}>
          <nav className={s.crumbs + ' mono enter-fade d1'} aria-label="Ścieżka nawigacji">
            <Link href="/repertuar" className={s.crumb}>Repertuar</Link>
            <span aria-hidden="true"> / </span>
            <span>{formatDate(event.date)}</span>
          </nav>

          <div className={s.statusRow + ' enter-fade d1'}>
            <span className={'status-dot status-dot-' + (
              event.status === 'dostepne' ? 'ok'
                : event.status === 'ostatnie' ? 'warn'
                : event.status === 'wyprzedane' ? 'sold' : 'pre'
            )} />
            <span className={'mono ' + s.statusText} style={{ color: getStatusColor(event.status) }}>
              {getStatusLabel(event)}
            </span>
          </div>

          <h1 className={'display ' + s.title + ' enter-mask d2'}>{event.artist}</h1>

          {event.support && (
            <p className={s.support + ' enter d3'}>+ {event.support}</p>
          )}

          <div className={s.facts + ' enter d4'}>
            {[
              ['DATA', formatDate(event.date)],
              ['WEJŚCIE', event.doors || '—'],
              ['START', event.start || '—'],
              ['SALA', event.venue],
              ['GATUNEK', event.genre],
              ...(event.ageMin ? [['WIEK', `${event.ageMin}+`]] : []),
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
              magnetic="0.2"
              label={event.priceFrom ? `Kup bilet · od ${event.priceFrom} zł` : 'Kup bilet'}
              style={{ padding: '18px 32px', fontSize: 17 }}
            />
            {!sold && event.ticketUrl && (
              <span className={s.ctaNote + ' mono'}>Sprzedaż: Stage24</span>
            )}
          </div>
        </div>

        <div className={s.poster + ' led-grid enter-fade d3'} data-parallax="0.1">
          {event.poster
            ? <img src={event.poster} alt={`Plakat: ${event.artist}`} className={s.posterImg} />
            : <span className={s.posterEmpty + ' mono'}>PLAKAT 3:4</span>}
        </div>
      </section>

      {/* ─── DESCRIPTION + PRACTICAL ─── */}
      <section className={'section ' + s.body}>
        <div className={s.bodyGrid}>
          <div className={s.bodyLeft}>
            <span className="section-label">O wydarzeniu</span>
            {event.description
              ? <p className={s.desc}>{event.description}</p>
              : <p className={s.desc + ' ' + s.descEmpty}>Szczegóły wkrótce.</p>}
          </div>

          <div className={s.bodyRight}>
            <span className="section-label">Zanim przyjdziesz</span>
            <dl className={s.practical}>
              {PRACTICAL.map(([term, desc]) => (
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
            <h2 className={'display ' + s.othersTitle}>Inne terminy</h2>
            <Link href="/repertuar" className={s.othersLink + ' mono'}>Cały repertuar →</Link>
          </div>
          <div className={s.othersGrid}>
            {others.map(o => (
              <Link key={o.id} href={`/wydarzenie/${o.slug}`} className={s.otherCard} data-spotlight="">
                <span className={s.otherDate + ' mono'}>{formatDate(o.date)}</span>
                <span className={'display ' + s.otherArtist}>{o.artist}</span>
                <span className={s.otherMeta + ' mono'}>{o.genre} · {o.venue}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

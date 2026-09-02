import Link from 'next/link';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import s from './BiletyBody.module.css';

export default function BiletyBody({ events = [] }) {
  const onSale = events.filter(e => e.ticketUrl && e.status !== 'wyprzedane');
  const soon = events.filter(e => !e.ticketUrl && e.status !== 'wyprzedane');
  const sold = events.filter(e => e.status === 'wyprzedane');

  return (
    <>
      <section className={'section ' + s.intro}>
        <span className="section-label enter-fade d1">Bilety</span>
        <h1 className={'display ' + s.heading + ' enter-mask d2'}>Kup bilet</h1>
        <p className={s.sub + ' enter d3'}>
          Sprzedaż prowadzi <strong>Stage24</strong> — nasz operator biletowy. Klikając
          „Kup bilet" przechodzisz na stronę wydarzenia, gdzie wybierzesz pulę i miejsca.
          Za organizację wydarzenia odpowiadamy my.
        </p>
      </section>

      {onSale.length > 0 && (
        <Section title="W sprzedaży" count={onSale.length}>
          {onSale.map(e => <Row key={e.id} event={e} />)}
        </Section>
      )}

      {soon.length > 0 && (
        <Section title="Sprzedaż wkrótce" count={soon.length} muted>
          {soon.map(e => <Row key={e.id} event={e} />)}
        </Section>
      )}

      {sold.length > 0 && (
        <Section title="Wyprzedane" count={sold.length} muted>
          {sold.map(e => <Row key={e.id} event={e} />)}
        </Section>
      )}

      {events.length === 0 && (
        <section className="section">
          <p className={s.empty + ' mono'}>Brak wydarzeń w sprzedaży.</p>
        </section>
      )}

      <section className={'section ' + s.help}>
        <div className={s.helpGrid}>
          <div>
            <h2 className={'display ' + s.helpHeading}>Problem z biletem?</h2>
            <p className={s.helpText}>
              Zwroty, faktury i reklamacje zakupu obsługuje Stage24 jako sprzedawca.
              W sprawach dotyczących samego wydarzenia — godzin, dojazdu, wieku,
              szatni — napisz do nas.
            </p>
          </div>
          <div className={s.helpActions}>
            <Link href="/kontakt" className="btn btn-outline-gold">Napisz do nas</Link>
            <Link href="/repertuar" className="btn btn-outline">Cały repertuar</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, count, muted, children }) {
  return (
    <section className={s.group}>
      <div className={s.groupHead}>
        <h2 className={'display ' + s.groupTitle} style={muted ? { color: 'var(--zr-muted)' } : undefined}>
          {title}
        </h2>
        <span className={s.groupCount + ' mono'}>{count}</span>
      </div>
      <div className={s.rows}>{children}</div>
    </section>
  );
}

function Row({ event }) {
  return (
    <div className={s.row}>
      <div className={s.dateCol + ' mono'}>{formatDate(event.date)}</div>

      <div className={s.mainCol}>
        <h3 className={'display ' + s.artist}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.artistLink}>{event.artist}</Link>
        </h3>
        <span className={s.meta + ' mono'}>
          {event.genre} · {event.venue}
          {event.doors ? ` · wejście ${event.doors}` : ''}
          {event.ageMin ? ` · ${event.ageMin}+` : ''}
        </span>
      </div>

      <div className={s.statusCol}>
        <span className={'status-dot status-dot-' + (
          event.status === 'dostepne' ? 'ok'
            : event.status === 'ostatnie' ? 'warn'
            : event.status === 'wyprzedane' ? 'sold' : 'pre'
        )} />
        <span className={'mono ' + s.statusText} style={{ color: getStatusColor(event.status) }}>
          {getStatusLabel(event)}
        </span>
      </div>

      <div className={s.priceCol + ' mono'}>
        {event.priceFrom ? `od ${event.priceFrom} zł` : '—'}
      </div>

      <TicketButton event={event} style={{ padding: '11px 20px', fontSize: 14 }} />
    </div>
  );
}

import Link from 'next/link';
import TicketButton from './TicketButton';
import { getStatusColor, getStatusLabel, formatDate, translateGenre, translateRoom } from '@/lib/events';
import s from './BiletyBody.module.css';

export default function BiletyBody({ events = [], t, locale = 'pl' }) {
  const onSale = events.filter(e => e.ticketUrl && e.status !== 'wyprzedane');
  const soon = events.filter(e => !e.ticketUrl && e.status !== 'wyprzedane');
  const sold = events.filter(e => e.status === 'wyprzedane');

  return (
    <>
      <section className={'section ' + s.intro}>
        <span className="section-label enter-fade d1">{t.bilety.label}</span>
        <h1 className={'display ' + s.heading + ' enter-mask d2'}>{t.bilety.title}</h1>
        <p className={s.sub + ' enter d3'}>
          {t.bilety.intro1} <strong>Stage24</strong> {t.bilety.intro2}
        </p>
      </section>

      {onSale.length > 0 && (
        <Section title={t.bilety.onSale} count={onSale.length}>
          {onSale.map(e => <Row key={e.id} event={e} t={t} locale={locale} />)}
        </Section>
      )}

      {soon.length > 0 && (
        <Section title={t.bilety.soon} count={soon.length} muted>
          {soon.map(e => <Row key={e.id} event={e} t={t} locale={locale} />)}
        </Section>
      )}

      {sold.length > 0 && (
        <Section title={t.bilety.soldOut} count={sold.length} muted>
          {sold.map(e => <Row key={e.id} event={e} t={t} locale={locale} />)}
        </Section>
      )}

      {events.length === 0 && (
        <section className="section">
          <p className={s.empty + ' mono'}>{t.bilety.empty}</p>
        </section>
      )}

      <section className={'section ' + s.help}>
        <div className={s.helpGrid}>
          <div>
            <h2 className={'display ' + s.helpHeading}>{t.bilety.helpTitle}</h2>
            <p className={s.helpText}>{t.bilety.helpText}</p>
          </div>
          <div className={s.helpActions}>
            <Link href="/kontakt" className="btn btn-outline-gold">{t.common.writeUs}</Link>
            <Link href="/repertuar" className="btn btn-outline">{t.bilety.allRepertoire}</Link>
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

function Row({ event, t, locale }) {
  return (
    <div className={s.row}>
      <div className={s.dateCol + ' mono'}>{formatDate(event.date, locale)}</div>

      <div className={s.mainCol}>
        <h3 className={'display ' + s.artist}>
          <Link href={`/wydarzenie/${event.slug}`} className={s.artistLink}>{event.artist}</Link>
        </h3>
        <span className={s.meta + ' mono'}>
          {translateGenre(event.genre, locale)} · {translateRoom(event.venue, locale)}
          {event.doors ? ` · ${t.bilety.doors} ${event.doors}` : ''}
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
          {getStatusLabel(event, locale)}
        </span>
      </div>

      <div className={s.priceCol + ' mono'}>
        {event.priceFrom ? `${t.ticket.from} ${event.priceFrom} ${t.ticket.currency}` : '—'}
      </div>

      <div className={s.actions}>
        <Link href={`/wydarzenie/${event.slug}`} className={s.details}>{t.common.details}</Link>
        <TicketButton event={event} t={t.ticket} style={{ padding: '11px 20px', fontSize: 14 }} />
      </div>
    </div>
  );
}

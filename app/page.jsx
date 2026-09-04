import Image from 'next/image';
import Link from 'next/link';
import EventsGrid from '@/components/EventsGrid';
import TicketButton from '@/components/TicketButton';
import NewsletterForm from '@/components/NewsletterForm';
import Ticker from '@/components/Ticker';
import Counter from '@/components/Counter';
import Reveal, { RevealGroup } from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { ARTISTS_ARCHIVE, ROOMS, VENUE_ADDRESS, isTodayEvent, getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import { getEvents, getUpcoming, getHeroEvent } from '@/lib/store';
import { SITE_ORIGIN } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';
import s from './page.module.css';

/* schema.org MusicVenue — feeds Google's local/knowledge panel.
   NOTE: telephone + geo below are the site-wide placeholders; the client
   should confirm the real number and exact coordinates. */
const VENUE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MusicVenue',
  name: 'Centrum Kulturalno-Rozrywkowe Zaklęte Rewiry',
  alternateName: 'Zaklęte Rewiry',
  url: SITE_ORIGIN,
  description:
    'Klub koncertowy i wynajem trzech sal na gale, konferencje i imprezy firmowe przy ul. Krakowskiej 100 we Wrocławiu.',
  telephone: '+48713001000',
  maximumAttendeeCapacity: 1000,
  address: {
    '@type': 'PostalAddress',
    streetAddress: VENUE_ADDRESS.street,
    postalCode: VENUE_ADDRESS.postalCode,
    addressLocality: VENUE_ADDRESS.city,
    addressCountry: VENUE_ADDRESS.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: 51.0876, longitude: 17.0553 },
};

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === 'en'
      ? 'Zaklęte Rewiry — concert venue and rooms for hire, Wrocław'
      : 'Zaklęte Rewiry — Klub koncertowy i wynajem sal, Wrocław',
  };
}

// events are edited from /panel at runtime, so never prerender this
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [all, upcoming, hero, locale] = await Promise.all([
    getEvents(),
    getUpcoming(),
    getHeroEvent(),
    getLocale(),
  ]);
  const t = getDict(locale);
  const todayEvent = all.find(isTodayEvent);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(VENUE_JSONLD) }}
      />

      {/* ─── TODAY BAR ─── */}
      {todayEvent && (
        <div className={s.todayBar}>
          <div>
            <span className={s.todayLabel}>{t.home.todayLabel}</span>
            <span className={s.todayMeta}>{todayEvent.artist} · {todayEvent.doors} {t.home.doorsShort} · {todayEvent.start} {t.home.startShort}</span>
          </div>
          <div className={s.todayRight}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: getStatusColor(todayEvent.status) }}>
              {getStatusLabel(todayEvent, locale)}{todayEvent.priceFrom ? ` · ${t.ticket.from} ${todayEvent.priceFrom} ${t.ticket.currency}` : ''}
            </span>
            <TicketButton
              event={todayEvent}
              t={t.ticket}
              style={{ background: 'var(--zr-bg)', color: 'var(--zr-gold)', padding: '12px 22px', fontSize: 14 }}
            />
          </div>
        </div>
      )}

      {/* ─── TICKER ─── */}
      <Ticker events={upcoming} locale={locale} label={t.home.upcoming} />

      {/* ─── HERO ─── */}
      {hero && (
        <section className={'section ' + s.hero}>
          <span className="glow-below" aria-hidden="true" />

          <div className={s.heroLeft}>
            <div className={s.heroBadge + ' enter-fade d1'}>
              <span className={'status-dot status-dot-ok'} />
              <span className="mono" style={{ fontSize: 12, color: 'var(--zr-ok)', letterSpacing: '0.1em' }}>
                {hero.featured ? t.home.featured : t.home.nextConcert} · {formatDate(hero.date, locale)}
              </span>
            </div>

            <SplitText
              as="h1"
              text={hero.artist}
              immediate
              delay={180}
              step={38}
              className={s.heroArtist + ' display'}
            />

            <p className={s.heroSub + ' enter d3'}>{hero.genre}{hero.support ? ` + ${hero.support}` : ''}</p>

            <div className={s.heroData + ' enter d4'}>
              {[
                { label: t.common.hall.toUpperCase(), value: hero.venue },
                { label: t.common.doors.toUpperCase(), value: hero.doors },
                { label: t.common.start.toUpperCase(), value: hero.start },
                { label: t.common.tickets.toUpperCase(), value: hero.priceFrom ? `${t.ticket.from} ${hero.priceFrom} ${t.ticket.currency}` : getStatusLabel(hero, locale), color: getStatusColor(hero.status) },
              ].map(({ label, value, color }) => (
                <div key={label} className={s.heroDataItem}>
                  <span className={s.heroDataLabel + ' mono'}>{label}</span>
                  <span className={s.heroDataValue + ' mono'} style={color ? { color } : undefined}>{value}</span>
                </div>
              ))}
            </div>

            <div className={s.heroCtas + ' enter d5'}>
              <TicketButton
                event={hero}
                t={t.ticket}
                magnetic="0.22"
                label={hero.priceFrom ? `${t.ticket.buy} · ${t.ticket.from} ${hero.priceFrom} ${t.ticket.currency}` : t.ticket.buy}
                style={{ padding: '18px 34px', fontSize: 18 }}
              />
              <Link href="/repertuar" className="btn btn-outline">
                {t.home.allRepertoire}
              </Link>
            </div>
          </div>

          <div
            className={s.heroPoster + ' led-grid enter-fade d3'}
            data-tilt="7"
          >
            {(hero.posterPortrait || hero.poster) ? (
              <img src={hero.posterPortrait || hero.poster} alt={hero.artist} className={s.heroPosterImg} />
            ) : (
              <>
                <div className={s.heroPosterBadge}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--zr-gold)', border: '1px solid rgba(252,204,0,0.5)', padding: '4px 8px', borderRadius: 3 }}>
                    {t.home.posterAlt}
                  </span>
                </div>
                <div className={s.heroPosterOverlay}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--zr-gold-dim)', letterSpacing: '0.14em' }}>
                    {t.home.posterCity}
                  </span>
                  <span className="display" style={{ fontSize: 22, color: 'var(--zr-text)' }}>{hero.artist}</span>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ─── EVENTS GRID ─── */}
      <EventsGrid events={upcoming} t={t} locale={locale} />

      {/* ─── O KLUBIE + ATMOSFERA ─── */}
      <section className={'section ' + s.about}>
        <div className={s.aboutGrid}>
          <Reveal variant="left" className={s.aboutText}>
            <span className="section-label">{t.home.aboutLabel}</span>
            <h2 className={s.aboutHeading + ' display'}>{t.home.aboutHeading}</h2>
            <p className={s.aboutLead}>{t.home.aboutLead}</p>
            <Link href="/klub" className="btn btn-outline">{t.home.aboutCta}</Link>
          </Reveal>

          <RevealGroup variant="up" step={90} className={s.atmoGrid}>
            {['/assets/venue/s1.webp', '/assets/venue/s3.webp', '/assets/venue/s5.webp'].map((photo, i) => {
              const [label, hint] = t.home.atmo[i];
              return (
              <div key={label} className={s.atmoTile + (i === 0 ? ' ' + s.atmoTileWide : '')}>
                <img src={photo} alt={`${label} — Zaklęte Rewiry`} className={s.atmoImg} />
                <span className={s.atmoLabel + ' mono'}>{label}</span>
                <span className={s.atmoHint + ' mono'}>{hint}</span>
              </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section className={'section ' + s.numbers}>
        <span className="glow-below glow-below-dim" aria-hidden="true" />
        <Reveal as="p" variant="up" className={s.numbersTagline + ' display'}>
          {t.home.numbersTagline}
        </Reveal>
        <RevealGroup variant="up" step={110} className={s.numbersStats}>
          {t.home.stats.map(([value, label], i) => (
            <div key={label} className={s.stat}>
              <Counter
                value={value}
                className={s.statValue + ' mono'}
                style={{ color: i === 0 ? 'var(--zr-gold)' : 'var(--zr-text)' }}
              />
              <span className={s.statLabel + ' mono'}>{label}</span>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── RENTAL BLOCK ─── */}
      <section className={'section ' + s.rental} style={{ background: 'var(--zr-surface-alt)' }}>
        <Reveal variant="left" className={s.rentalLeft}>
          <span className="section-label">{t.home.rentalLabel}</span>
          <h2 className={s.rentalHeading + ' display'}>{t.home.rentalHeading}</h2>
          <div className="section-separator" />
          <p className={s.rentalText}>{t.home.rentalText}</p>
          <div className={s.rentalCtas}>
            <Link href="/wynajem" className="btn btn-rental">
              {t.common.askDate}
            </Link>
            <Link href="/wynajem/oferta" className="btn btn-outline-gold">
              {t.home.rentalPdf}
            </Link>
          </div>
        </Reveal>

        <RevealGroup variant="right" step={100} className={s.rentalRooms}>
          {Object.entries(ROOMS).map(([name, room], i) => (
            <div key={name} className={s.rentalRoom + (i === 0 ? ' ' + s.rentalRoomFeatured : '')} data-spotlight="">
                <h3 className={s.rentalRoomName + ' display'}>{name}</h3>
              <div className="mono" style={{ fontSize: 12, lineHeight: 1.9, color: i === 0 ? 'var(--zr-gold-dim)' : 'var(--zr-muted)' }}>
                {room.area} m² · {t.home.upTo} {room.capacities.koncert} {t.common.people}<br />
                {t.ticket.from} {room.priceFrom.toLocaleString(locale === 'en' ? 'en-GB' : 'pl-PL')} {t.home.perDay}
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── DOWÓD SPOŁECZNY B2B ─── */}
      <section className={'section ' + s.proof} style={{ background: 'var(--zr-surface-alt)' }}>
        <div className={s.proofHead}>
          <span className="section-label">{t.home.proofLabel}</span>
          <span className={s.proofNote + ' mono'}>{t.home.proofNote}</span>
        </div>
        <RevealGroup variant="up" step={70} className={s.logoRow}>
          {['LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO'].map((l, i) => (
            <div key={i} className={s.logoSlot + ' mono'}>{l}</div>
          ))}
        </RevealGroup>
        <Reveal variant="up" className={s.caseRow}>
          <div className={s.caseText}>
            <h3 className={s.caseHeading + ' display'}>{t.home.caseHeading}</h3>
            <p className={s.caseLead}>{t.home.caseLead}</p>
          </div>
          <div className={s.caseStats}>
            {t.home.caseStats.map(([v, l]) => (
              <div key={l} className={s.caseStat}>
                <span className={'display ' + s.caseStatVal}>{v}</span>
                <span className={s.caseStatLabel + ' mono'}>{l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── ARCHIVE ─── */}
      <section className={'section ' + s.archive}>
        <Reveal className={s.archiveHeader}>
          <span className="section-label">{t.home.archiveLabel}</span>
          <Link href="/archiwum" className={s.archiveLink + ' mono'}>{t.home.archiveLink}</Link>
        </Reveal>
        <RevealGroup variant="up" step={40} className={s.artists}>
          {ARTISTS_ARCHIVE.map(name => (
            <span key={name} className={s.artistName + ' display'}>{name}</span>
          ))}
        </RevealGroup>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className={'section ' + s.newsletter}>
        <Reveal variant="mask" className={s.newsletterInfo}>
          <h2 className={s.newsletterTitle + ' display'}>{t.home.newsletterTitle}</h2>
          <p className={s.newsletterSub}>{t.home.newsletterSub}</p>
        </Reveal>
        <NewsletterForm t={t.newsletter} />
      </section>
    </>
  );
}

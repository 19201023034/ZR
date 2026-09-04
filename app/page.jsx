import Image from 'next/image';
import Link from 'next/link';
import EventsGrid from '@/components/EventsGrid';
import TicketButton from '@/components/TicketButton';
import HeroCarousel from '@/components/HeroCarousel';
import Counter from '@/components/Counter';
import Reveal, { RevealGroup } from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { ARTISTS_ARCHIVE, ROOMS, VENUE_ADDRESS, isTodayEvent, getStatusColor, getStatusLabel, formatDate, translateGenre, translateRoom } from '@/lib/events';
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

  // Karuzela: wyróżnione wydarzenie idzie na początek, reszta w kolejności dat.
  // Pięć sztuk — tyle kropek da się jeszcze objąć wzrokiem.
  const heroSet = [
    ...(hero ? [hero] : []),
    ...upcoming.filter(e => e.id !== hero?.id),
  ].slice(0, 5);

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


      {/* ─── HERO — karuzela plakatów ─── */}
      <HeroCarousel events={heroSet} t={t} locale={locale} />

      {/* ─── EVENTS GRID ─── */}
      <EventsGrid events={upcoming} t={t} locale={locale} />

      {/* ─── SALE ─── */}
      <section className={'section ' + s.rooms}>
        <Reveal variant="mask" className={s.blockHead}>
          <span className="section-label">{t.home.rentalLabel}</span>
          <h2 className={'display ' + s.blockHeading}>{t.home.roomsHeading}</h2>
        </Reveal>
        <RevealGroup variant="up" step={90} className={s.roomGrid}>
          {Object.keys(ROOMS).map((name, i) => (
            <article key={name} className={s.roomCard}>
              <div className={s.roomPhoto + ' led-grid'}>
                {ROOMS[name].photos?.[0] && (
                  <img src={ROOMS[name].photos[0]} alt={translateRoom(name, locale)} className={s.roomImg} />
                )}
              </div>
              <div className={s.roomBody}>
                <h3 className={'display ' + s.roomName}>{translateRoom(name, locale)}</h3>
                <p className={s.roomMeta}>
                  {ROOMS[name].area} m² · {t.home.upTo} {ROOMS[name].capacities.koncert} {t.common.people}
                  <span className={s.roomPrice}>
                    {t.ticket.from} {ROOMS[name].priceFrom.toLocaleString(locale === 'en' ? 'en-GB' : 'pl-PL')} {t.home.perDay}
                  </span>
                </p>
                <Link href="/wynajem" className={s.blockBtn}>{t.home.roomsCta}</Link>
              </div>
            </article>
          ))}
        </RevealGroup>
      </section>

      {/* ─── TRZY KARTY ─── */}
      <section className={'section ' + s.cards}>
        <RevealGroup variant="up" step={90} className={s.cardGrid}>
          {t.home.cards.map(card => (
            <article key={card.href} className={s.card}>
              <div className={s.cardPhoto + ' led-grid'}>
                <img src={card.photo} alt="" className={s.cardImg} />
              </div>
              <div className={s.cardBody}>
                <h3 className={'display ' + s.cardTitle}>{card.title}</h3>
                <p className={s.cardText}>{card.text}</p>
                <Link href={card.href} className={s.blockBtn}>{card.cta}</Link>
              </div>
            </article>
          ))}
        </RevealGroup>
      </section>

      {/* ─── W CZYM MOŻEMY POMÓC ─── */}
      <section className={'section ' + s.help}>
        <Reveal variant="mask">
          <h2 className={'display ' + s.blockHeading}>{t.home.helpHeading}</h2>
        </Reveal>
        <RevealGroup variant="up" step={40} className={s.helpGrid}>
          {t.home.help.map(([label, href]) => (
            <Link key={href + label} href={href} className={s.helpChip}>
              <span className={s.helpDot} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </RevealGroup>
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

    </>
  );
}

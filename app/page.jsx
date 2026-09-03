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

export const metadata = {
  title: 'Zaklęte Rewiry — Klub koncertowy i wynajem sal, Wrocław',
};

// events are edited from /panel at runtime, so never prerender this
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [all, upcoming, hero] = await Promise.all([
    getEvents(),
    getUpcoming(),
    getHeroEvent(),
  ]);
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
            <span className={s.todayLabel}>Dziś w Rewirach</span>
            <span className={s.todayMeta}>{todayEvent.artist} · {todayEvent.doors} wejście · {todayEvent.start} start</span>
          </div>
          <div className={s.todayRight}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: getStatusColor(todayEvent.status) }}>
              {getStatusLabel(todayEvent)}{todayEvent.priceFrom ? ` · od ${todayEvent.priceFrom} zł` : ''}
            </span>
            <TicketButton
              event={todayEvent}
              style={{ background: '#0C0A08', color: 'var(--zr-gold)', padding: '12px 22px', fontSize: 14 }}
            />
          </div>
        </div>
      )}

      {/* ─── TICKER ─── */}
      <Ticker events={upcoming} />

      {/* ─── HERO ─── */}
      {hero && (
        <section className={'section ' + s.hero}>
          <span className="glow-below" aria-hidden="true" />

          <div className={s.heroLeft}>
            <div className={s.heroBadge + ' enter-fade d1'}>
              <span className={'status-dot status-dot-ok'} />
              <span className="mono" style={{ fontSize: 12, color: 'var(--zr-ok)', letterSpacing: '0.1em' }}>
                {hero.featured ? 'POLECAMY' : 'NAJBLIŻSZY KONCERT'} · {formatDate(hero.date)}
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
                { label: 'SALA', value: hero.venue },
                { label: 'WEJŚCIE', value: hero.doors },
                { label: 'START', value: hero.start },
                { label: 'BILETY', value: hero.priceFrom ? `od ${hero.priceFrom} zł` : getStatusLabel(hero), color: getStatusColor(hero.status) },
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
                magnetic="0.22"
                label={hero.priceFrom ? `Kup bilet · od ${hero.priceFrom} zł` : 'Kup bilet'}
                style={{ padding: '18px 34px', fontSize: 18 }}
              />
              <Link href="/repertuar" className="btn btn-outline">
                Cały repertuar
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
                    PLAKAT
                  </span>
                </div>
                <div className={s.heroPosterOverlay}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--zr-gold-dim)', letterSpacing: '0.14em' }}>
                    WROCŁAW · KRAKOWSKA 100
                  </span>
                  <span className="display" style={{ fontSize: 22, color: 'var(--zr-text)' }}>{hero.artist}</span>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ─── EVENTS GRID ─── */}
      <EventsGrid events={upcoming} />

      {/* ─── O KLUBIE + ATMOSFERA ─── */}
      <section className={'section ' + s.about}>
        <div className={s.aboutGrid}>
          <Reveal variant="left" className={s.aboutText}>
            <span className="section-label">O miejscu</span>
            <h2 className={s.aboutHeading + ' display'}>Wielofunkcyjna scena na mapie Wrocławia od ponad dekady</h2>
            <p className={s.aboutLead}>
              Koncerty, gale, imprezy firmowe i wydarzenia specjalne — trzy sale, profesjonalne
              zaplecze techniczne i własna gastronomia przy ul. Krakowskiej 100. Miejsce spotkań
              ludzi, kultur i idei.
            </p>
            <Link href="/klub" className="btn btn-outline">Poznaj klub</Link>
          </Reveal>

          <RevealGroup variant="up" step={90} className={s.atmoGrid}>
            {[
              ['/assets/venue/s1.webp', 'Sala Duża', 'scena i rig świetlny'],
              ['/assets/venue/s3.webp', 'Koncerty', 'pełne światło i dźwięk'],
              ['/assets/venue/s2.webp', 'Energia', 'show na żywo'],
              ['/assets/venue/s5.webp', 'Bankiety i gale', 'układ przy stołach'],
              ['/assets/venue/s4.webp', 'Imprezy firmowe', 'parkiet i scena'],
            ].map(([photo, label, hint], i) => (
              <div key={label} className={s.atmoTile + (i === 0 ? ' ' + s.atmoTileWide : '')}>
                <img src={photo} alt={`${label} — Zaklęte Rewiry`} className={s.atmoImg} />
                <span className={s.atmoLabel + ' mono'}>{label}</span>
                <span className={s.atmoHint + ' mono'}>{hint}</span>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section className={'section ' + s.numbers}>
        <span className="glow-below glow-below-dim" aria-hidden="true" />
        <Reveal as="p" variant="up" className={s.numbersTagline + ' display'}>
          Klub koncertowy i trzy sale przy Krakowskiej 100
        </Reveal>
        <RevealGroup variant="up" step={110} className={s.numbersStats}>
          {[
            { value: '85+', label: 'KONCERTÓW ROCZNIE' },
            { value: '3',   label: 'SALE DO WYNAJĘCIA' },
            { value: '1000', label: 'MIEJSC W SALI DUŻEJ' },
            { value: '550', label: 'M² SALA DUŻA' },
          ].map((stat, i) => (
            <div key={stat.label} className={s.stat}>
              <Counter
                value={stat.value}
                className={s.statValue + ' mono'}
                style={{ color: i === 0 ? 'var(--zr-gold)' : 'var(--zr-text)' }}
              />
              <span className={s.statLabel + ' mono'}>{stat.label}</span>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── RENTAL BLOCK ─── */}
      <section className={'section ' + s.rental} style={{ background: 'var(--zr-surface-alt)' }}>
        <Reveal variant="left" className={s.rentalLeft}>
          <span className="section-label">Wynajem sal · dla firm i agencji</span>
          <h2 className={s.rentalHeading + ' display'}>Gale, konferencje i imprezy firmowe</h2>
          <div className="section-separator" />
          <p className={s.rentalText}>
            Trzy sale od 90 do 550 m² z pełnym zapleczem technicznym. Nagłośnienie d&b, oświetlenie sceniczne,
            projekcja. Obsługa cateringowa, bar, koordynator obiektu.
          </p>
          <div className={s.rentalCtas}>
            <Link href="/wynajem" className="btn btn-rental">
              Zapytaj o termin
            </Link>
            <Link href="/wynajem/oferta" className="btn btn-outline-gold">
              Pobierz ofertę PDF →
            </Link>
          </div>
        </Reveal>

        <RevealGroup variant="right" step={100} className={s.rentalRooms}>
          {Object.entries(ROOMS).map(([name, room], i) => (
            <div key={name} className={s.rentalRoom + (i === 0 ? ' ' + s.rentalRoomFeatured : '')} data-spotlight="">
                <h3 className={s.rentalRoomName + ' display'}>{name}</h3>
              <div className="mono" style={{ fontSize: 12, lineHeight: 1.9, color: i === 0 ? 'var(--zr-gold-dim)' : 'var(--zr-muted)' }}>
                {room.area} m² · do {room.capacities.koncert} os.<br />
                od {room.priceFrom.toLocaleString('pl-PL')} zł / doba
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── DOWÓD SPOŁECZNY B2B ─── */}
      <section className={'section ' + s.proof} style={{ background: 'var(--zr-surface-alt)' }}>
        <div className={s.proofHead}>
          <span className="section-label">Zaufali nam</span>
          <span className={s.proofNote + ' mono'}>Logotypy klientów w przygotowaniu</span>
        </div>
        <RevealGroup variant="up" step={70} className={s.logoRow}>
          {['LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO'].map((l, i) => (
            <div key={i} className={s.logoSlot + ' mono'}>{l}</div>
          ))}
        </RevealGroup>
        <Reveal variant="up" className={s.caseRow}>
          <div className={s.caseText}>
            <h3 className={s.caseHeading + ' display'}>Zrealizowaliśmy setki wydarzeń</h3>
            <p className={s.caseLead}>
              Od kameralnych spotkań firmowych po gale na tysiąc osób. Miejsce na realizację
              z liczbami — zdjęcia i referencje do uzupełnienia.
            </p>
          </div>
          <div className={s.caseStats}>
            {[['500+', 'wydarzeń firmowych'], ['1000', 'gości na największych galach'], ['24 h', 'odpowiedź na zapytanie']].map(([v, l]) => (
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
          <span className="section-label">Grali u nas</span>
          <Link href="/archiwum" className={s.archiveLink + ' mono'}>Archiwum · 87 koncertów →</Link>
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
          <h2 className={s.newsletterTitle + ' display'}>Terminarz na maila</h2>
          <p className={s.newsletterSub}>Raz w miesiącu: lista koncertów i przedsprzedaże. Bez pop-upów.</p>
        </Reveal>
        <NewsletterForm />
      </section>
    </>
  );
}

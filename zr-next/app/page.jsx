import Image from 'next/image';
import Link from 'next/link';
import EventsGrid from '@/components/EventsGrid';
import TicketButton from '@/components/TicketButton';
import Ticker from '@/components/Ticker';
import Counter from '@/components/Counter';
import Reveal, { RevealGroup } from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { ARTISTS_ARCHIVE, ROOMS, isTodayEvent, getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import { getEvents, getUpcoming, getHeroEvent } from '@/lib/store';
import s from './page.module.css';

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
      {/* ─── TODAY BAR ─── */}
      {todayEvent && (
        <div className={s.todayBar}>
          <div>
            <span className={s.todayLabel}>Dziś w Rewirach</span>
            <span className={s.todayMeta}>{todayEvent.artist} · {todayEvent.doors} wejście · {todayEvent.start} start</span>
          </div>
          <div className={s.todayRight}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: getStatusColor(todayEvent.status) }}>
              {getStatusLabel(todayEvent)} · od {todayEvent.priceFrom} zł
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
                { label: 'BILETY', value: `od ${hero.priceFrom} zł`, color: getStatusColor(hero.status) },
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
            data-parallax="0.14"
            data-spotlight=""
          >
            {hero.poster && <img src={hero.poster} alt={hero.artist} className={s.heroPosterImg} />}
            <div className={s.heroPosterBadge}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--zr-gold)', border: '1px solid rgba(252,204,0,0.5)', padding: '4px 8px', borderRadius: 3 }}>
                PLAKAT 3:4
              </span>
            </div>
            <div className={s.heroPosterOverlay}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--zr-gold-dim)', letterSpacing: '0.14em' }}>
                TRASA 2026 · WROCŁAW
              </span>
              <span className="display" style={{ fontSize: 22, color: 'var(--zr-text)' }}>{hero.artist}</span>
            </div>
          </div>
        </section>
      )}

      {/* ─── EVENTS GRID ─── */}
      <EventsGrid events={upcoming} />

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
        <form className={s.newsletterForm} action="/api/newsletter" method="POST">
          <input
            type="email"
            name="email"
            placeholder="twoj@email.pl"
            required
            className={s.newsletterInput}
          />
          <button type="submit" className="btn btn-outline-gold">Zapisuję się</button>
        </form>
        <label className={s.newsletterConsent}>
          <input type="checkbox" required className={s.newsletterCheck} />
          <span>
            Zgadzam się na otrzymywanie newslettera. Mogę się wypisać w każdej chwili.{' '}
            <Link href="/polityka-prywatnosci" className={s.newsletterLink}>Polityka prywatności.</Link>
          </span>
        </label>
      </section>
    </>
  );
}

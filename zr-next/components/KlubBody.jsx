'use client';

import Link from 'next/link';
import Reveal, { RevealGroup } from './Reveal';
import Counter from './Counter';
import s from './KlubBody.module.css';

const STATS = [
  { value: '10+', label: 'lat na mapie Wrocławia' },
  { value: '1000', label: 'gości na największych eventach' },
  { value: '3', label: 'niezależne sale' },
  { value: '100+', label: 'wydarzeń rocznie' },
];

const WHAT_WE_DO = [
  { icon: '♪', title: 'Koncerty', desc: 'Od kameralnych recitali po duże show — polska i zagraniczna scena muzyczna.' },
  { icon: '◈', title: 'Eventy firmowe', desc: 'Premiery, spotkania branżowe, bankiety, konferencje z pełnym zapleczem tech.' },
  { icon: '◉', title: 'Projekty kulturalne', desc: 'Spektakle, wystawy, przeglądy, festiwale i wydarzenia interdyscyplinarne.' },
  { icon: '✦', title: 'Imprezy okolicznościowe', desc: 'Urodziny, wesela, jubileusze — każdy projekt traktujemy indywidualnie.' },
];

const ROOMS_QUICK = [
  { name: 'Sala Duża', area: '650 m²', cap: 'do 800 os.', desc: 'Główna sala koncertowa z profesjonalnym nagłośnieniem i oświetleniem scenicznym.' },
  { name: 'Sala Klubowa', area: '280 m²', cap: 'do 300 os.', desc: 'Kameralna przestrzeń na spotkania, koncerty akustyczne i eventy zamknięte.' },
  { name: 'Sala Kameralna', area: '120 m²', cap: 'do 80 os.', desc: 'Intymna sala konferencyjna i warsztatowa z ekranem projekcyjnym.' },
];

const TIMELINE = [
  { year: '2013', label: 'Otwarcie', desc: 'Centrum Kulturalno-Rozrywkowe Zaklęte Rewiry otwiera drzwi przy ul. Krakowskiej 100.' },
  { year: '2016', label: 'Rozbudowa', desc: 'Rozbudowa zaplecza technicznego i gastronomicznego. Nowa Sala Kameralna.' },
  { year: '2019', label: 'Dekada eventów', desc: 'Tysiące wydarzeń i dziesiątki tysięcy gości. Zaklęte Rewiry stają się punktem kultury Wrocławia.' },
  { year: '2023', label: 'Nowy rozdział', desc: 'Modernizacja nagłośnienia i systemu oświetlenia scenicznego w Sali Dużej.' },
];

export default function KlubBody() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className={'section ' + s.hero}>
        <div className={s.heroLabel + ' mono section-label enter-fade d1'}>Centrum Kulturalno-Rozrywkowe</div>
        <h1 className={'display ' + s.heroTitle + ' enter-mask d2'}>
          Zaklęte<br />Rewiry
        </h1>
        <p className={s.heroSub + ' enter d4'}>
          Wielofunkcyjna przestrzeń kulturalno-rozrywkowa obecna na mapie Wrocławia od ponad dekady.
          Tworzymy miejsce spotkań ludzi, kultur i idei — otwarte na różnorodne formy artystyczne
          oraz wydarzenia na żywo.
        </p>
        <div className={s.heroCtas + ' enter d5'}>
          <Link href="/repertuar" className="btn btn-gold">Zobacz repertuar</Link>
          <Link href="/wynajem" className="btn btn-outline">Wynajmij przestrzeń</Link>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <RevealGroup as="section" variant="up" step={110} className={s.statsBar}>
        {STATS.map(st => (
          <div key={st.value} className={s.statItem}>
            <Counter value={st.value} className={'display ' + s.statValue} />
            <span className={'mono ' + s.statLabel}>{st.label}</span>
          </div>
        ))}
      </RevealGroup>

      {/* ─── ABOUT ─── */}
      <section className={'section ' + s.about}>
        <div className={s.aboutGrid}>
          <Reveal variant="left" className={s.aboutLeft}>
            <span className="section-label">O nas</span>
            <h2 className={'display ' + s.aboutHeading}>Przestrzeń otwartości i profesjonalizmu</h2>
          </Reveal>
          <RevealGroup variant="up" step={130} className={s.aboutRight}>
            <p className={s.aboutPara}>
              Zaklęte Rewiry to miejsce z wieloletnim doświadczeniem w realizacji wydarzeń o różnej
              skali i charakterze. Od lat współpracujemy zarówno z klientami biznesowymi,
              instytucjami kultury, organizatorami wydarzeń, jak i osobami prywatnymi — oferując
              elastyczne podejście oraz kompleksowe wsparcie na każdym etapie.
            </p>
            <p className={s.aboutPara}>
              Dysponujemy nowoczesną infrastrukturą, profesjonalnym zapleczem technicznym oraz
              własną obsługą gastronomiczną. Nasze sale mogą funkcjonować niezależnie lub
              w połączeniu — w zależności od potrzeb danego wydarzenia.
            </p>
            <p className={s.aboutPara}>
              Dogodna lokalizacja we Wrocławiu (ul. Krakowska 100) oraz doświadczony zespół
              sprawiają, że jesteśmy w stanie realizować zarówno kameralne spotkania, jak
              i duże eventy dla 1000 uczestników.
            </p>
          </RevealGroup>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className={'section ' + s.whatSection}>
        <Reveal variant="mask">
          <span className="section-label">Czym się zajmujemy</span>
          <h2 className={'display ' + s.sectionHeading}>W Zaklętych Rewirach</h2>
        </Reveal>
        <RevealGroup variant="up" step={100} className={s.whatGrid}>
          {WHAT_WE_DO.map(item => (
            <div key={item.title} className={s.whatCard}>
              <span className={s.whatIcon}>{item.icon}</span>
              <h3 className={'display ' + s.whatTitle}>{item.title}</h3>
              <p className={s.whatDesc}>{item.desc}</p>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── ROOMS QUICK ─── */}
      <section className={'section ' + s.roomsSection}>
        <Reveal className={s.roomsHeader}>
          <div>
            <span className="section-label">Nasze sale</span>
            <h2 className={'display ' + s.sectionHeading}>Trzy przestrzenie, jeden adres</h2>
          </div>
          <Link href="/wynajem" className="btn btn-outline-gold">
            Szczegóły wynajmu →
          </Link>
        </Reveal>
        <RevealGroup variant="up" step={110} className={s.roomsGrid}>
          {ROOMS_QUICK.map(room => (
            <div key={room.name} className={s.roomCard}>
              <div className={'led-grid ' + s.roomLed} />
              <div className={s.roomInfo}>
                <h3 className={'display ' + s.roomName}>{room.name}</h3>
                <div className={s.roomMeta + ' mono'}>
                  <span>{room.area}</span>
                  <span className={s.roomMetaDot}>·</span>
                  <span>{room.cap}</span>
                </div>
                <p className={s.roomDesc}>{room.desc}</p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className={'section ' + s.timelineSection}>
        <Reveal variant="mask">
          <span className="section-label">Historia</span>
          <h2 className={'display ' + s.sectionHeading}>Ponad dekada na scenie</h2>
        </Reveal>
        <div className={s.timeline}>
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} variant="left" delay={i * 90} className={s.timelineItem}>
              <div className={s.timelineLeft}>
                <span className={'display ' + s.timelineYear}>{item.year}</span>
                <span className={'mono ' + s.timelineLabel}>{item.label}</span>
              </div>
              <div className={s.timelineLine}>
                <div className={s.timelineDot} />
                {i < TIMELINE.length - 1 && <div className={s.timelineConnector} />}
              </div>
              <div className={s.timelineRight}>
                <p className={s.timelineDesc}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={s.ctaSection}>
        <div className="section">
          <Reveal variant="scale" className={s.ctaInner}>
            <div>
              <h2 className={'display ' + s.ctaHeading}>Zaplanuj wydarzenie z nami</h2>
              <p className={s.ctaSub}>
                Każdy projekt traktujemy indywidualnie. Skontaktuj się z nami — dobierzemy
                odpowiednią przestrzeń i zaproponujemy kompleksową obsługę.
              </p>
            </div>
            <div className={s.ctaActions}>
              <Link href="/kontakt" className="btn btn-gold">Napisz do nas</Link>
              <Link href="/wynajem" className="btn btn-outline">Oferta wynajmu</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

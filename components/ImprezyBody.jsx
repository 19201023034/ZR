import Link from 'next/link';
import Reveal, { RevealGroup } from './Reveal';
import s from './ImprezyBody.module.css';

const OCCASIONS = [
  ['Urodziny i jubileusze', 'Okrągłe rocznice, osiemnastki, huczne urodziny z oprawą sceniczną.'],
  ['Wesela i przyjęcia', 'Nietuzinkowa alternatywa dla sali weselnej — parkiet, scena i klimat klubu.'],
  ['Spotkania rodzinne', 'Komunie, chrzciny, spotkania pokoleniowe w kameralnej lub dużej sali.'],
  ['Studniówki i bale', 'Przestrzeń na kilkaset osób z profesjonalnym nagłośnieniem i światłem.'],
  ['Sylwester i andrzejki', 'Imprezy tematyczne z pełną oprawą techniczną i barem.'],
  ['Wieczory tematyczne', 'Retro show, potańcówki, bankiety z programem artystycznym.'],
];

const INCLUDED = [
  'Sala dopasowana do liczby gości — od kameralnej po 1000 osób',
  'Profesjonalne nagłośnienie i oświetlenie sceniczne',
  'Własna obsługa gastronomiczna i bar',
  'Parkiet, scena i zaplecze techniczne',
  'Koordynator obiektu i obsługa na czas wydarzenia',
  'Szatnia, ochrona i sprzątanie w cenie',
];

export default function ImprezyBody() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className={'section ' + s.hero}>
        <span className="glow-below" aria-hidden="true" />
        <div className={s.heroText}>
          <span className="section-label enter-fade d1">Wynajem · imprezy prywatne</span>
          <h1 className={'display ' + s.heading + ' enter-mask d2'}>Imprezy okolicznościowe we Wrocławiu</h1>
          <p className={s.lead + ' enter d3'}>
            Zaklęte Rewiry to nieoczywiste miejsce na wyjątkowe okazje — urodziny, jubileusze,
            wesela, studniówki czy sylwestra. Klimat klubu koncertowego zamiast typowej sali,
            trzy przestrzenie od kameralnej po tysiąc osób, własna kuchnia i pełne zaplecze
            techniczne przy ul. Krakowskiej 100.
          </p>
          <div className={s.heroCtas + ' enter d4'}>
            <Link href="/kontakt" className="btn btn-gold">Zapytaj o termin</Link>
            <Link href="/wynajem" className="btn btn-outline">Zobacz sale</Link>
          </div>
        </div>
      </section>

      {/* ─── OCCASIONS ─── */}
      <section className={'section ' + s.occasions}>
        <Reveal variant="mask">
          <span className="section-label">Na jaką okazję</span>
          <h2 className={'display ' + s.sectionHeading}>Każdy pretekst do świętowania</h2>
        </Reveal>
        <RevealGroup variant="up" step={80} className={s.occGrid}>
          {OCCASIONS.map(([title, desc]) => (
            <div key={title} className={s.occCard}>
              <h3 className={'display ' + s.occTitle}>{title}</h3>
              <p className={s.occDesc}>{desc}</p>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── PHOTO + INCLUDED ─── */}
      <section className={'section ' + s.details}>
        <div className={s.detailsGrid}>
          <Reveal variant="left" className={s.photoWrap}>
            <img src="/assets/venue/s5.webp" alt="Sala bankietowa Zaklęte Rewiry — układ przy stołach" className={s.photo} />
          </Reveal>
          <div className={s.included}>
            <span className="section-label">W cenie wynajmu</span>
            <h2 className={'display ' + s.sectionHeading}>Wszystko w jednym miejscu</h2>
            <ul className={s.list}>
              {INCLUDED.map(i => <li key={i} className={s.listItem}>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={s.ctaSection}>
        <div className="section">
          <div className={s.ctaInner}>
            <div>
              <h2 className={'display ' + s.ctaHeading}>Zaplanujmy Twoją imprezę</h2>
              <p className={s.ctaSub}>
                Napisz, jaka to okazja i na ile osób — dobierzemy salę, zaproponujemy menu
                i przygotujemy wycenę. Odpowiadamy w 24 godziny.
              </p>
            </div>
            <div className={s.ctaActions}>
              <Link href="/kontakt" className="btn btn-gold">Napisz do nas</Link>
              <Link href="/wynajem/oferta" className="btn btn-outline">Oferta wynajmu</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

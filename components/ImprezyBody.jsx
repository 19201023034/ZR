import Link from 'next/link';
import Reveal, { RevealGroup } from './Reveal';
import ImprezyAccordion from './ImprezyAccordion';
import s from './ImprezyBody.module.css';

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
            Szukasz sali na imprezę okolicznościową we Wrocławiu? Zaklęte Rewiry to klub
            koncertowy przy ul. Krakowskiej 100, który wynajmujemy również na wydarzenia
            prywatne — urodziny, jubileusze, wesela, studniówki, komunie, andrzejki i sylwestra.
            Zamiast typowej sali bankietowej dostajesz prawdziwą scenę, klubowe światło
            i atmosferę koncertu.
          </p>
          <p className={s.lead + ' enter d3'}>
            Do dyspozycji trzy sale od 90 do 550 m² — od kameralnych spotkań po imprezy na
            1000 osób — własna kuchnia i bar, profesjonalne nagłośnienie oraz koordynator,
            który poprowadzi wydarzenie od początku do końca. Dogodny dojazd i parking
            w centrum Wrocławia.
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
        <Reveal variant="up">
          <ImprezyAccordion />
        </Reveal>
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

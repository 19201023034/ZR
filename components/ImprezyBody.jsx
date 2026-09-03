import Link from 'next/link';
import Reveal, { RevealGroup } from './Reveal';
import ImprezyAccordion from './ImprezyAccordion';
import s from './ImprezyBody.module.css';

const INCLUDED = [
  'Sala dopasowana do liczby gości — od kameralnej po 1000 osób',
  'Profesjonalne nagłośnienie i oświetlenie sceniczne',
  'Własna obsługa gastronomiczna i bar',
  'Parkiet, scena i zaplecze techniczne',
  'Koordynator obiektu na czas wydarzenia',
  'Szatnia, ochrona i sprzątanie w cenie',
];

export default function ImprezyBody() {
  return (
    <>
      {/* ─── HERO typograficzny (własny charakter, nie kalka głównej) ─── */}
      <section className={'section ' + s.hero}>
        <div className={s.heroInner}>
          <div className={s.heroHead}>
            <span className={'section-label ' + s.kicker + ' enter-fade d1'}>Wynajem · imprezy prywatne</span>
            <h1 className={'display ' + s.heading + ' enter-mask d2'}>
              Imprezy<br /><em className={s.em}>okolicznościowe</em><br />we Wrocławiu
            </h1>
          </div>
          <div className={s.heroBody + ' enter d3'}>
            <p className={s.lead}>
              Sala na imprezę okolicznościową w klimacie klubu koncertowego — urodziny,
              jubileusze, wesela, studniówki, komunie i sylwester przy ul. Krakowskiej 100.
              Zamiast typowej sali bankietowej: prawdziwa scena, klubowe światło i atmosfera koncertu.
            </p>
            <p className={s.sub}>
              Trzy sale od 90 do 550 m² — od kameralnych spotkań po imprezy na 1000 osób —
              własna kuchnia i bar, profesjonalne nagłośnienie oraz koordynator prowadzący
              wydarzenie od początku do końca. Dogodny dojazd i parking w centrum Wrocławia.
            </p>
            <div className={s.heroCtas}>
              <Link href="/kontakt" className="btn btn-gold">Zapytaj o termin</Link>
              <Link href="/wynajem" className="btn btn-outline">Zobacz sale</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OKAZJE: accordion + zmienne zdjęcie ─── */}
      <section className={'section ' + s.occasions}>
        <Reveal variant="mask">
          <span className="section-label">Na jaką okazję</span>
          <h2 className={'display ' + s.sectionHeading}>Każdy pretekst do świętowania</h2>
        </Reveal>
        <Reveal variant="up">
          <ImprezyAccordion />
        </Reveal>
      </section>

      {/* ─── W CENIE — checklista + zdjęcie ─── */}
      <section className={'section ' + s.details}>
        <div className={s.detailsGrid}>
          <div className={s.included}>
            <span className="section-label">W cenie wynajmu</span>
            <h2 className={'display ' + s.sectionHeading}>Wszystko w jednym miejscu</h2>
            <RevealGroup variant="up" step={70} className={s.list}>
              {INCLUDED.map(i => (
                <li key={i} className={s.listItem}>
                  <span className={s.check} aria-hidden="true">✓</span>
                  {i}
                </li>
              ))}
            </RevealGroup>
          </div>
          <Reveal variant="right" className={s.photoWrap}>
            <img src="/assets/venue/s4.webp" alt="Sala bankietowa Zaklęte Rewiry — układ przy stołach" className={s.photo} />
          </Reveal>
        </div>
      </section>

      {/* ─── CTA — obramowana karta ─── */}
      <section className="section">
        <Reveal variant="scale" className={s.cta}>
          <div>
            <h2 className={'display ' + s.ctaHeading}>Zaplanujmy Twoją imprezę</h2>
            <p className={s.ctaSub}>
              Napisz, jaka to okazja i na ile osób — dobierzemy salę, zaproponujemy menu
              i przygotujemy wycenę. Odpowiadamy w 24 godziny.
            </p>
          </div>
          <div className={s.ctaActions}>
            <Link href="/kontakt" className="btn btn-gold">Napisz do nas</Link>
            <Link href="/wynajem/oferta" className="btn btn-outline-gold">Oferta PDF →</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

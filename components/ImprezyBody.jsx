import Link from 'next/link';
import Reveal, { RevealGroup } from './Reveal';
import ImprezyAccordion from './ImprezyAccordion';
import s from './ImprezyBody.module.css';

export default function ImprezyBody({ t, locale = 'pl' }) {
  const ti = t.imprezy;

  return (
    <>
      {/* ─── HERO typograficzny (własny charakter, nie kalka głównej) ─── */}
      <section className={'section ' + s.hero}>
        <div className={s.heroInner}>
          <div className={s.heroHead}>
            <span className={'section-label ' + s.kicker + ' enter-fade d1'}>{ti.kicker}</span>
            <h1 className={'display ' + s.heading + ' enter-mask d2'}>
              {ti.h1a}<br /><em className={s.em}>{ti.h1b}</em><br />{ti.h1c}
            </h1>
          </div>
          <div className={s.heroBody + ' enter d3'}>
            <p className={s.lead}>{ti.lead}</p>
            <p className={s.sub}>{ti.sub}</p>
            <div className={s.heroCtas}>
              <Link href="/kontakt" className="btn btn-gold">{t.common.askDate}</Link>
              <Link href="/wynajem" className="btn btn-outline">{ti.seeRooms}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OKAZJE: accordion + zmienne zdjęcie ─── */}
      <section className={'section ' + s.occasions}>
        <Reveal variant="mask">
          <span className="section-label">{ti.occasionLabel}</span>
          <h2 className={'display ' + s.sectionHeading}>{ti.occasionHeading}</h2>
        </Reveal>
        <Reveal variant="up">
          <ImprezyAccordion t={t} />
        </Reveal>
      </section>

      {/* ─── W CENIE — checklista + zdjęcie ─── */}
      <section className={'section ' + s.details}>
        <div className={s.detailsGrid}>
          <div className={s.included}>
            <span className="section-label">{ti.includedLabel}</span>
            <h2 className={'display ' + s.sectionHeading}>{ti.includedHeading}</h2>
            <RevealGroup variant="up" step={70} className={s.list}>
              {ti.included.map(i => (
                <li key={i} className={s.listItem}>
                  <span className={s.check} aria-hidden="true">✓</span>
                  {i}
                </li>
              ))}
            </RevealGroup>
          </div>
          <Reveal variant="right" className={s.photoWrap}>
            <img src="/assets/venue/s4.webp" alt={ti.photoAlt} className={s.photo} />
          </Reveal>
        </div>
      </section>

      {/* ─── CTA — obramowana karta ─── */}
      <section className="section">
        <Reveal variant="scale" className={s.cta}>
          <div>
            <h2 className={'display ' + s.ctaHeading}>{ti.ctaHeading}</h2>
            <p className={s.ctaSub}>{ti.ctaSub}</p>
          </div>
          <div className={s.ctaActions}>
            <Link href="/kontakt" className="btn btn-gold">{t.common.writeUs}</Link>
            <Link href="/wynajem/oferta" className="btn btn-outline-gold">{ti.ctaOffer}</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

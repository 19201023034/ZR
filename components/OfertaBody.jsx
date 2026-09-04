'use client';

import Link from 'next/link';
import { ROOMS, localizeRoom, translateRoom } from '@/lib/events';
import s from './OfertaBody.module.css';

const LAYOUT_KEYS = ['koncert', 'teatralny', 'bankiet', 'koktajl', 'konferencja'];

export default function OfertaBody({ t, locale = 'pl' }) {
  const to = t.oferta;
  const nf = locale === 'en' ? 'en-GB' : 'pl-PL';
  const rooms = Object.keys(ROOMS).map(name => [name, localizeRoom(name, locale)]);

  return (
    <>
      <section className={'section ' + s.head}>
        <div className={s.headRow}>
          <div>
            <span className="section-label">{to.label}</span>
            <h1 className={'display ' + s.title}>{to.title1}<br />{to.title2}</h1>
            <p className={s.lead}>{to.lead}</p>
          </div>
          <div className={s.headActions}>
            <button type="button" className="btn btn-gold" onClick={() => window.print()}>
              {to.print}
            </button>
            <Link href="/kontakt" className="btn btn-outline">{t.common.askDate}</Link>
          </div>
        </div>
      </section>

      <section className={'section ' + s.rooms}>
        <h2 className={'display ' + s.sectionHeading}>{to.roomsHeading}</h2>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.thName}>{to.thRoom}</th>
                <th>{to.thArea}</th>
                {t.wynajem.layouts.map(label => <th key={label}>{label}</th>)}
                <th className={s.thPrice}>{to.thPrice}</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(([name, room]) => (
                <tr key={name}>
                  <td className={s.tdName + ' display'}>{translateRoom(name, locale)}</td>
                  <td className="mono">{room.area} m²</td>
                  {LAYOUT_KEYS.map(key => (
                    <td key={key} className="mono">{room.capacities[key]}</td>
                  ))}
                  <td className={s.tdPrice + ' mono'}>{room.priceFrom.toLocaleString(nf)} {t.ticket.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.note}>{to.note}</p>
      </section>

      <section className={'section ' + s.specs}>
        <h2 className={'display ' + s.sectionHeading}>{to.specsHeading}</h2>
        <div className={s.specGrid}>
          {rooms.map(([name, room]) => (
            <div key={name} className={s.specCard}>
              <h3 className={'display ' + s.specName}>{translateRoom(name, locale)}</h3>
              <span className={s.specDims + ' mono'}>
                {room.dimensions} · {to.specHeight} {room.height}
              </span>
              <dl className={s.specList}>
                {room.tech.map(([label, value]) => (
                  <div key={label} className={s.specRow}>
                    <dt className={s.specLabel + ' mono'}>{label}</dt>
                    <dd className={s.specValue + ' mono'}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className={'section ' + s.included}>
        <div className={s.inclGrid}>
          <div>
            <h2 className={'display ' + s.sectionHeading}>{to.includedHeading}</h2>
            <ul className={s.list}>
              {to.included.map(i => <li key={i} className={s.listItem}>{i}</li>)}
            </ul>
          </div>
          <div>
            <h2 className={'display ' + s.sectionHeading}>{to.extraHeading}</h2>
            <dl className={s.extras}>
              {to.extra.map(([term, desc]) => (
                <div key={term} className={s.extraRow}>
                  <dt className={s.extraTerm}>{term}</dt>
                  <dd className={s.extraDesc}>{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className={'section ' + s.contact}>
        <div className={s.contactInner}>
          <div>
            <h2 className={'display ' + s.contactHeading}>{to.contactHeading}</h2>
            <p className={s.contactText}>
              CKR Zaklęte Rewiry · ul. Krakowska 100, 50-427 Wrocław · tel. 71 300 10 00
            </p>
          </div>
          <Link href="/kontakt" className="btn btn-rental">{to.send}</Link>
        </div>
      </section>
    </>
  );
}

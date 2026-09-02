'use client';

import Link from 'next/link';
import { ROOMS } from '@/lib/events';
import s from './OfertaBody.module.css';

const LAYOUTS = [
  ['koncert', 'Koncert stojący'],
  ['teatralny', 'Teatralny'],
  ['bankiet', 'Bankiet'],
  ['koktajl', 'Koktajl'],
  ['konferencja', 'Konferencja'],
];

const INCLUDED = [
  'Wynajem sali na dobę zegarową wraz z montażem i demontażem',
  'Koordynator obiektu na czas trwania wydarzenia',
  'Podstawowe nagłośnienie i oświetlenie sceniczne',
  'Szatnia z obsługą',
  'Sprzątanie po wydarzeniu',
  'Ochrona i służby porządkowe wg wymogów imprezy',
];

const EXTRA = [
  ['Catering i obsługa barowa', 'własna kuchnia, menu ustalane indywidualnie'],
  ['Rozszerzona technika', 'dodatkowe moving heady, LED, realizator FOH'],
  ['Projekcja i streaming', 'ekran LED, kamery, transmisja online'],
  ['Branding przestrzeni', 'ekspozycja logotypów, oznakowanie, scenografia'],
];

export default function OfertaBody() {
  const rooms = Object.entries(ROOMS);

  return (
    <>
      <section className={'section ' + s.head}>
        <div className={s.headRow}>
          <div>
            <span className="section-label">Oferta wynajmu · B2B</span>
            <h1 className={'display ' + s.title}>Gale, konferencje<br />i imprezy firmowe</h1>
            <p className={s.lead}>
              Trzy sale od 90 do 550 m² przy ul. Krakowskiej 100 we Wrocławiu.
              Pełne zaplecze techniczne, własna gastronomia, koordynator obiektu.
              Odpowiedź na zapytanie w 24 godziny.
            </p>
          </div>
          <div className={s.headActions}>
            <button type="button" className="btn btn-gold" onClick={() => window.print()}>
              Drukuj / zapisz PDF
            </button>
            <Link href="/kontakt" className="btn btn-outline">Zapytaj o termin</Link>
          </div>
        </div>
      </section>

      <section className={'section ' + s.rooms}>
        <h2 className={'display ' + s.sectionHeading}>Sale i pojemności</h2>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.thName}>Sala</th>
                <th>Pow.</th>
                {LAYOUTS.map(([, label]) => <th key={label}>{label}</th>)}
                <th className={s.thPrice}>Od / doba</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(([name, room]) => (
                <tr key={name}>
                  <td className={s.tdName + ' display'}>{name}</td>
                  <td className="mono">{room.area} m²</td>
                  {LAYOUTS.map(([key]) => (
                    <td key={key} className="mono">{room.capacities[key]}</td>
                  ))}
                  <td className={s.tdPrice + ' mono'}>{room.priceFrom.toLocaleString('pl-PL')} zł</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.note}>
          Ceny netto, nie zawierają VAT. Stawka zależy od terminu, długości najmu
          i zakresu obsługi — powyższe kwoty to punkt wyjścia do wyceny.
        </p>
      </section>

      <section className={'section ' + s.specs}>
        <h2 className={'display ' + s.sectionHeading}>Specyfikacja techniczna</h2>
        <div className={s.specGrid}>
          {rooms.map(([name, room]) => (
            <div key={name} className={s.specCard}>
              <h3 className={'display ' + s.specName}>{name}</h3>
              <span className={s.specDims + ' mono'}>
                {room.dimensions} · wys. {room.height}
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
            <h2 className={'display ' + s.sectionHeading}>W cenie</h2>
            <ul className={s.list}>
              {INCLUDED.map(i => <li key={i} className={s.listItem}>{i}</li>)}
            </ul>
          </div>
          <div>
            <h2 className={'display ' + s.sectionHeading}>Dodatkowo</h2>
            <dl className={s.extras}>
              {EXTRA.map(([term, desc]) => (
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
            <h2 className={'display ' + s.contactHeading}>Porozmawiajmy o Twoim wydarzeniu</h2>
            <p className={s.contactText}>
              CKR Zaklęte Rewiry · ul. Krakowska 100, 50-427 Wrocław · tel. 71 300 10 00
            </p>
          </div>
          <Link href="/kontakt" className="btn btn-rental">Wyślij zapytanie</Link>
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import s from './Footer.module.css';

const cols = [
  {
    heading: 'DOJAZD',
    items: [
      'Tram 3, 5 — przystanek Krakowska',
      'Bus 114, 243 — przystanek Krakowska',
      'Parking 80 miejsc (ul. boczna)',
      'Stojaki rowerowe przy wejściu',
    ],
  },
  {
    heading: 'KONTAKT',
    items: [
      'bilety@zakletyrewiry.pl',
      'booking@zakletyrewiry.pl',
      'wynajem@zakletyrewiry.pl',
      'ksiegowosc@zakletyrewiry.pl',
    ],
  },
  {
    heading: 'SERWIS',
    items: [
      { label: 'Wynajem sal', href: '/wynajem' },
      { label: 'Imprezy okolicznościowe', href: '/imprezy-okolicznosciowe' },
      { label: 'Regulamin klubu', href: '/regulamin' },
      { label: 'Zwroty biletów', href: '/zwroty' },
      { label: 'Dostępność obiektu', href: '/dostepnosc' },
      { label: 'Praca i wolontariat', href: '/praca' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.grid}>
        <div className={s.brand}>
          <Image src="/assets/zr-sygnet-gold.png" alt="Zaklęte Rewiry" width={28} height={32} />
          <address className={s.address}>
            CKR Zaklęte Rewiry<br />
            ul. Krakowska 100<br />
            50-001 Wrocław
          </address>
        </div>

        {cols.map((col) => (
          <div key={col.heading} className={s.col}>
            <div className={s.colHeading}>{col.heading}</div>
            {col.items.map((item, i) =>
              typeof item === 'string' ? (
                <span key={i} className={s.colItem}>{item}</span>
              ) : (
                <Link key={i} href={item.href} className={s.colLink}>{item.label}</Link>
              )
            )}
          </div>
        ))}
      </div>

      <div className={s.bottom}>
        <span className={s.copy}>© {new Date().getFullYear()} CKR Zaklęte Rewiry. Wszelkie prawa zastrzeżone.</span>
        <div className={s.langSwitch}>
          <button className={s.langActive}>PL</button>
          <button className={s.langInactive}>EN</button>
        </div>
      </div>
    </footer>
  );
}

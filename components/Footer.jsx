import Image from 'next/image';
import Link from 'next/link';
import LangSwitch from './LangSwitch';
import s from './Footer.module.css';

const MAILS = [
  'bilety@zakletyrewiry.pl',
  'booking@zakletyrewiry.pl',
  'wynajem@zakletyrewiry.pl',
  'ksiegowosc@zakletyrewiry.pl',
];

const SERVICE = [
  { key: 'wynajem', href: '/wynajem' },
  { key: 'imprezy', href: '/imprezy-okolicznosciowe' },
  { key: 'regulamin', href: '/regulamin' },
  { key: 'zwroty', href: '/zwroty' },
  { key: 'dostepnosc', href: '/dostepnosc' },
  { key: 'praca', href: '/praca' },
];

export default function Footer({ locale = 'pl', t }) {
  const cols = [
    { heading: t.directions, items: t.dir },
    { heading: t.contact, items: MAILS },
    { heading: t.service, items: SERVICE.map(l => ({ href: l.href, label: t.links[l.key] })) },
  ];

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
        <span className={s.copy}>© {new Date().getFullYear()} CKR Zaklęte Rewiry. {t.rights}</span>
        <LangSwitch locale={locale} />
      </div>
    </footer>
  );
}

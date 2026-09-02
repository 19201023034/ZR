'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Compact the bar once the user leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLeft = [
    { href: '/repertuar', label: 'Repertuar' },
    { href: '/bilety', label: 'Bilety' },
    { href: '/klub', label: 'Klub' },
  ];

  return (
    <header className={s.header + (scrolled ? ' ' + s.scrolled : '')}>
      <nav className={s.navLeft}>
        {navLeft.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={s.navLink + (pathname === href ? ' ' + s.active : '')}
          >
            {label}
          </Link>
        ))}
      </nav>

      <Link href="/" className={s.logo} aria-label="Zaklęte Rewiry — strona główna">
        <span className={s.wordmark + ' display'} aria-hidden="true">Zaklęte</span>
        <Image src="/assets/zr-sygnet-gold.png" alt="" width={40} height={45} />
        <span className={s.wordmark + ' display'} aria-hidden="true">Rewiry</span>
      </Link>

      <nav className={s.navRight}>
        <Link
          href="/wynajem"
          className={s.navLink + (pathname.startsWith('/wynajem') ? ' ' + s.active : '')}
        >
          Wynajem sal
        </Link>

        <Link
          href="/kontakt"
          className={s.navLink + (pathname === '/kontakt' ? ' ' + s.active : '')}
        >
          Kontakt
        </Link>

        <div className={s.langSwitch}>
          <button className={s.langActive}>PL</button>
          <button className={s.langInactive}>EN</button>
        </div>

        <Link href="/bilety" className="btn btn-gold" style={{ padding: '10px 20px', fontSize: 13 }}>
          Kup bilet
        </Link>
      </nav>
    </header>
  );
}

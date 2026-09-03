'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import s from './Header.module.css';

const NAV = [
  { href: '/repertuar', label: 'Repertuar' },
  { href: '/bilety', label: 'Bilety' },
  { href: '/klub', label: 'Klub' },
  { href: '/wynajem', label: 'Wynajem sal' },
  { href: '/imprezy-okolicznosciowe', label: 'Imprezy' },
  { href: '/kontakt', label: 'Kontakt' },
];

function isActive(pathname, href) {
  return href === '/wynajem' ? pathname.startsWith('/wynajem') : pathname === href;
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Compact the bar once the user leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation — a tap that changes the route should also dismiss it.
  useEffect(() => { setOpen(false); }, [pathname]);

  // While the drawer is open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className={s.header + (scrolled ? ' ' + s.scrolled : '')}>
      {/* hamburger — mobile only */}
      <button
        type="button"
        className={s.burger + (open ? ' ' + s.burgerOpen : '')}
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>

      <nav className={s.navLeft}>
        {NAV.slice(0, 3).map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={s.navLink + (isActive(pathname, href) ? ' ' + s.active : '')}
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
        <span className={s.navRightLinks}>
          {NAV.slice(3).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={s.navLink + (isActive(pathname, href) ? ' ' + s.active : '')}
            >
              {label}
            </Link>
          ))}
        </span>

        <ThemeToggle />

        <div className={s.langSwitch}>
          <button className={s.langActive}>PL</button>
          <button className={s.langInactive}>EN</button>
        </div>

        <Link href="/bilety" className={'btn btn-gold ' + s.cta} style={{ padding: '10px 20px', fontSize: 13 }}>
          Kup bilet
        </Link>
      </nav>
      </header>

      {/* ─── Mobile drawer — kept OUTSIDE <header>, whose backdrop-filter would
           otherwise trap these fixed elements inside the 64px bar ─── */}
      <div
        className={s.backdrop + (open ? ' ' + s.backdropOpen : '')}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        id="mobile-nav"
        className={s.drawer + (open ? ' ' + s.drawerOpen : '')}
        aria-label="Menu główne"
      >
        <div className={s.drawerLinks}>
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={s.drawerLink + ' display' + (isActive(pathname, href) ? ' ' + s.drawerActive : '')}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className={s.drawerFoot}>
          <Link href="/bilety" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
            Kup bilet
          </Link>
          <div className={s.drawerBottom}>
            <div className={s.drawerLang}>
              <button className={s.langActive}>PL</button>
              <button className={s.langInactive}>EN</button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

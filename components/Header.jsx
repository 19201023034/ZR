'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Wordmark from './Wordmark';
import { IconCalendar } from './EventIcons';
import ThemeToggle from './ThemeToggle';
import LangSwitch from './LangSwitch';
import s from './Header.module.css';

function buildNav(t) {
  return [
    { href: '/repertuar', label: t.repertuar },
    { href: '/bilety', label: t.bilety },
    { href: '/klub', label: t.klub },
    { href: '/wynajem', label: t.wynajem },
    { href: '/imprezy-okolicznosciowe', label: t.imprezy },
    { href: '/kontakt', label: t.kontakt },
  ];
}

function isActive(pathname, href) {
  return href === '/wynajem' ? pathname.startsWith('/wynajem') : pathname === href;
}

export default function Header({ locale = 'pl', t }) {
  const NAV = buildNav(t);
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
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>

      {/* Znak przy lewej krawędzi, nie na środku — cała nawigacja czyta się
          wtedy jednym ruchem oka od lewej do prawej. */}
      <Link href="/" className={s.logo} aria-label={t.home}>
        <Wordmark className={s.logoImg} />
      </Link>

      <nav className={s.nav}>
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={s.navLink + (isActive(pathname, href) ? ' ' + s.active : '')}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className={s.tools}>
        <ThemeToggle />
        <div className={s.langSwitch}><LangSwitch locale={locale} /></div>
      </div>

      {/* Blok biletowy dociśnięty do krawędzi paska — jak przycisk kalendarza
          u MSG: pełna wysokość, własne tło, nie da się go przeoczyć. */}
      <Link href="/bilety" className={s.cta}>
        <IconCalendar className={s.ctaIcon} />
        <span>{t.buy}</span>
      </Link>
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
        aria-label={t.mainMenu}
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
            {t.buy}
          </Link>
          <div className={s.drawerBottom}>
            <LangSwitch locale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

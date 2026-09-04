'use client';

import { useState, useEffect } from 'react';
import s from './CookieBanner.module.css';

export default function CookieBanner({ t }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('zr-cookies')) setVisible(true);
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem('zr-cookies', 'accepted'); } catch {}
    setVisible(false);
  }

  function reject() {
    try { localStorage.setItem('zr-cookies', 'rejected'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={s.banner} role="dialog" aria-label="Cookies">
      <div className={s.content}>
        <p className={s.title}>{t.title}</p>
        <p className={s.text}>
          {t.text}{' '}
          <a href="/polityka-prywatnosci" className={s.link}>{t.settings}</a>
        </p>
      </div>
      <div className={s.actions}>
        <button className="btn btn-outline" onClick={reject} style={{ minWidth: 160, padding: '14px 28px', fontSize: 14, fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'none', letterSpacing: '0.01em' }}>
          {t.decline}
        </button>
        <button className="btn btn-outline-gold" onClick={accept} style={{ minWidth: 160, padding: '14px 28px', fontSize: 14 }}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}

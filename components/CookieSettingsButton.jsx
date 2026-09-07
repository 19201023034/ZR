'use client';

import s from './Footer.module.css';

/**
 * Otwiera ponownie baner cookies (CookieBanner nasłuchuje zdarzenia
 * `zr:cookies-open`). Dzięki temu zmiana/wycofanie zgody jest tak łatwe jak jej
 * udzielenie — wymóg RODO.
 */
export default function CookieSettingsButton({ label }) {
  return (
    <button
      type="button"
      className={s.cookieBtn}
      onClick={() => window.dispatchEvent(new Event('zr:cookies-open'))}
    >
      {label}
    </button>
  );
}

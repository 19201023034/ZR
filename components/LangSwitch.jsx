'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import s from './LangSwitch.module.css';

const YEAR = 60 * 60 * 24 * 365;

export default function LangSwitch({ locale = 'pl' }) {
  const [current, setCurrent] = useState(locale);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function pick(next) {
    if (next === current || pending) return;
    setCurrent(next);
    document.cookie = `zr-lang=${next}; path=/; max-age=${YEAR}; samesite=lax`;
    // pages read the cookie on the server, so re-fetch this route's markup
    startTransition(() => router.refresh());
  }

  return (
    <div className={s.wrap} role="group" aria-label="Język / Language">
      {['pl', 'en'].map(code => (
        <button
          key={code}
          type="button"
          onClick={() => pick(code)}
          className={current === code ? s.active : s.inactive}
          aria-pressed={current === code}
          lang={code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

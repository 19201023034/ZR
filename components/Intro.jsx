'use client';

import { useEffect, useState } from 'react';
import Wordmark from './Wordmark';
import s from './Intro.module.css';

/**
 * Krótkie intro w duchu klubu — jak gaśnięcie świateł przed koncertem: znak
 * na czerni, złota linia rozjeżdża się, potem kurtyna gaśnie i odsłania stronę.
 *
 * Pokazywane RAZ na sesję (sessionStorage), więc nie irytuje przy przechodzeniu
 * między podstronami; całkowicie pomijane przy prefers-reduced-motion.
 */
export default function Intro() {
  const [phase, setPhase] = useState('idle'); // idle → playing → leaving → done

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('zr-intro') === '1'; } catch {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduce) { setPhase('done'); return; }

    try { sessionStorage.setItem('zr-intro', '1'); } catch {}
    setPhase('playing');
    document.body.style.overflow = 'hidden';

    const leave = setTimeout(() => setPhase('leaving'), 1250);
    const done = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, 1850);

    return () => { clearTimeout(leave); clearTimeout(done); document.body.style.overflow = ''; };
  }, []);

  if (phase === 'idle' || phase === 'done') return null;

  return (
    <div className={s.overlay + (phase === 'leaving' ? ' ' + s.leaving : '')} aria-hidden="true">
      <div className={s.inner}>
        <Wordmark className={s.mark} />
        <span className={s.line} />
      </div>
      <span className={s.glow} />
    </div>
  );
}

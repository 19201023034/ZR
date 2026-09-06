'use client';

import s from './ArtistMarquee.module.css';

/**
 * Pasek z nazwami zespołów, które u nas grały — przewija się w pętli, jak
 * markiza z nazwiskami nad wejściem. Lista jest zduplikowana, więc pętla jest
 * ciągła; pauzuje pod kursorem i stoi przy prefers-reduced-motion.
 */
export default function ArtistMarquee({ artists = [] }) {
  if (!artists.length) return null;
  // dwa przebiegi tej samej listy dają bezszwową pętlę przy translateX(-50%)
  const run = [...artists, ...artists];

  return (
    <div className={s.marquee}>
      <div className={s.track}>
        {run.map((name, i) => (
          <span key={i} className={s.item}>
            <span className={'display ' + s.name}>{name}</span>
            <span className={s.sep} aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

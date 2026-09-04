'use client';

import { useState } from 'react';
import s from './ImprezyAccordion.module.css';

// Copy lives in the dictionary; the photos are language-independent, so they
// stay here and are paired by position.
const PHOTOS = [
  '/assets/venue/s2.webp', '/assets/venue/s5.webp', '/assets/venue/s4.webp',
  '/assets/venue/s3.webp', '/assets/venue/s1.webp', '/assets/venue/s5.webp',
];

export default function ImprezyAccordion({ t }) {
  const [open, setOpen] = useState(0);
  const OCCASIONS = t.okazje.map((o, i) => ({ ...o, photo: PHOTOS[i] }));

  return (
    <div className={s.wrap}>
      {/* lista rozwijana */}
      <div className={s.list}>
        {OCCASIONS.map((o, i) => {
          const isOpen = open === i;
          return (
            <div key={o.title} className={s.item + (isOpen ? ' ' + s.itemOpen : '')}>
              <button
                className={s.head}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className={s.num + ' mono'}>{String(i + 1).padStart(2, '0')}</span>
                <span className={'display ' + s.title}>{o.title}</span>
                <span className={s.icon} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className={s.panel}>
                  <p className={s.teaser}>{o.teaser}</p>
                  <p className={s.body}>{o.body}</p>
                  {/* zdjęcie w rozwinięciu — widoczne na wąskich ekranach */}
                  <img src={o.photo} alt={o.title} className={s.panelPhoto} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* duże zdjęcie po prawej — zmienia się z wyborem (desktop) */}
      <div className={s.media} aria-hidden="true">
        {OCCASIONS.map((o, i) => (
          <img
            key={o.title}
            src={o.photo}
            alt=""
            className={s.mediaImg + (open === i ? ' ' + s.mediaOn : '')}
          />
        ))}
        <div className={s.mediaFrame} />
      </div>
    </div>
  );
}

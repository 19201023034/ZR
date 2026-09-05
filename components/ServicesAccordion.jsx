'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './ImprezyAccordion.module.css';
import x from './ServicesAccordion.module.css';

/**
 * Sekcja usług na stronie głównej w formie akordeonu ze zmiennym zdjęciem —
 * ten sam wzorzec co lista okazji na /imprezy-okolicznosciowe, żeby obie
 * sekcje czytały się jak jeden serwis. Różnica: każda usługa ma przycisk
 * prowadzący na swoją stronę.
 */
export default function ServicesAccordion({ cards = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={s.wrap}>
      <div className={s.list}>
        {cards.map((c, i) => {
          const isOpen = open === i;
          return (
            <div key={c.href} className={s.item + (isOpen ? ' ' + s.itemOpen : '')}>
              <button
                className={s.head}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className={s.num + ' mono'}>{String(i + 1).padStart(2, '0')}</span>
                <span className={'display ' + s.title}>{c.title}</span>
                <span className={s.icon} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className={s.panel}>
                  <p className={s.body}>{c.text}</p>
                  <img src={c.photo} alt={c.title} className={s.panelPhoto} />
                  <Link href={c.href} className={x.cta}>{c.cta} →</Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={s.media} aria-hidden="true">
        {cards.map((c, i) => (
          <img
            key={c.href}
            src={c.photo}
            alt=""
            className={s.mediaImg + (open === i ? ' ' + s.mediaOn : '')}
          />
        ))}
        <div className={s.mediaFrame} />
      </div>
    </div>
  );
}

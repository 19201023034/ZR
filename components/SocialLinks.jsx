import { SOCIALS } from '@/lib/site';
import s from './SocialLinks.module.css';

/**
 * Rząd „Bądźmy w kontakcie" — glify marek rysowane, nie ładowane.
 * Jedna lista (SOCIALS) zasila hero i inne miejsca; label podaje słownik.
 */
const GLYPHS = {
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.6 8.2h2.1V5.3h-2.4c-2 0-3.4 1.3-3.4 3.5v1.7H8.6v2.9h2.3V21h3v-7.6h2.3l.4-2.9h-2.7V9.1c0-.6.3-.9 1-.9Z" fill="currentColor" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.3 3h2.9c.2 1.9 1.3 3.4 3.3 3.7v2.9c-1.3.1-2.5-.3-3.5-.9v5.9c0 3.3-2.5 5.5-5.5 5.5A5.3 5.3 0 0 1 6 14.9c0-3 2.4-5.2 5.6-5v3a2.3 2.3 0 0 0-2.7 2.3 2.3 2.3 0 0 0 4.6.1V3Z" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.6" y="5.6" width="18.8" height="12.8" rx="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.4 9.4v5.2l4.5-2.6-4.5-2.6Z" fill="currentColor" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7l8 5.6L20 7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function SocialLinks({ label, tone = 'default' }) {
  return (
    <div className={s.wrap + (tone === 'gold' ? ' ' + s.gold : '')}>
      {label && <span className={s.label}>{label}</span>}
      <ul className={s.row}>
        {SOCIALS.map((it) => (
          <li key={it.key}>
            <a
              href={it.href}
              className={s.link}
              aria-label={it.label}
              target={it.key === 'mail' ? undefined : '_blank'}
              rel={it.key === 'mail' ? undefined : 'noopener noreferrer'}
            >
              {GLYPHS[it.key]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ikony dla strony wydarzenia — rysowane, nie ładowane, bo to sześć ścieżek. */
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function IconPin(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M8 14.5s5-4.6 5-8a5 5 0 0 0-10 0c0 3.4 5 8 5 8Z" {...base} />
      <circle cx="8" cy="6.4" r="1.9" {...base} />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="6.4" {...base} />
      <path d="M8 4.2V8l2.6 1.7" {...base} />
    </svg>
  );
}

export function IconCalendar(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <rect x="2.2" y="3.4" width="11.6" height="10.4" rx="1.4" {...base} />
      <path d="M2.2 6.6h11.6M5.6 2v2.6M10.4 2v2.6" {...base} />
    </svg>
  );
}

/** Ikony przy „Zanim przyjdziesz" — kolejność zgodna z listą w słowniku. */
export const PRACTICAL_ICONS = [
  // dojazd
  props => (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <rect x="3.4" y="2.4" width="9.2" height="9.4" rx="1.6" {...base} />
      <path d="M3.4 8.4h9.2M5.6 14l1.2-2.2M10.4 14l-1.2-2.2" {...base} />
      <circle cx="5.9" cy="9.9" r=".55" fill="currentColor" stroke="none" />
      <circle cx="10.1" cy="9.9" r=".55" fill="currentColor" stroke="none" />
    </svg>
  ),
  // parking
  props => (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <rect x="2.4" y="2.4" width="11.2" height="11.2" rx="2" {...base} />
      <path d="M6.4 11.4V4.9h2.2a2 2 0 0 1 0 4H6.4" {...base} />
    </svg>
  ),
  // szatnia
  props => (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M8 5.2a1.5 1.5 0 1 1 1.5-1.5" {...base} />
      <path d="M8 5.2v1.4L2.6 10.6c-.7.5-.35 1.6.5 1.6h9.8c.85 0 1.2-1.1.5-1.6L8 6.6" {...base} />
    </svg>
  ),
  // dostępność
  props => (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="3.1" r="1.3" {...base} />
      <path d="M5.6 5.9h4.8M8 5.9v4.3h3.2M5.2 7.6a3.6 3.6 0 1 0 4.7 5.2" {...base} />
    </svg>
  ),
];

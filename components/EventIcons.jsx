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

/**
 * Ikony do siatki „W czym możemy pomóc?" — kolejność zgodna z t.home.help:
 * FAQ, dojazd, dostępność, wynajem, imprezy, zwroty, regulamin, praca.
 */
export const HELP_ICONS = [
  // FAQ — dymek z pytajnikiem
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v7a1.5 1.5 0 0 1-1.5 1.5H8l-3.2 2.6V14H4.5A1.5 1.5 0 0 1 3 12.5Z" {...base} />
      <path d="M8.2 8a1.9 1.9 0 1 1 2.4 1.8c-.5.2-.7.5-.7 1v.4" {...base} />
      <circle cx="10" cy="13.4" r=".6" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Dojazd i parking — pin
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M10 17.5s5.5-5 5.5-9a5.5 5.5 0 0 0-11 0c0 4 5.5 9 5.5 9Z" {...base} />
      <path d="M8.4 11V6.4h2.1a1.7 1.7 0 0 1 0 3.4H8.4" {...base} />
    </svg>
  ),
  // Dostępność — wózek
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <circle cx="9.4" cy="4" r="1.5" {...base} />
      <path d="M7 7h5.4M9.4 7v5h4l1.4 3.4M6.6 9a4.3 4.3 0 1 0 5.6 6.2" {...base} />
    </svg>
  ),
  // Wynajem sal — budynek ze sceną
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M3 16.5h14M4.5 16.5V7l5.5-3.5L15.5 7v9.5" {...base} />
      <path d="M8 16.5v-4h4v4" {...base} />
    </svg>
  ),
  // Imprezy okolicznościowe — kieliszki na toast
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M4.5 4.2l3.6.9M11.9 5.1l3.6-.9" {...base} />
      <path d="M6.3 4.6l1.8 4.1c.5 1.2-.2 2.6-1.5 2.9-1.3.3-2.6-.5-2.7-1.8L3.5 5.3ZM13.7 4.6l-1.8 4.1c-.5 1.2.2 2.6 1.5 2.9 1.3.3 2.6-.5 2.7-1.8l.4-4.5Z" {...base} />
      <path d="M5.4 12.1l.6 4M14.6 12.1l-.6 4M4.6 16.4h4M11.4 16.4h4" {...base} />
    </svg>
  ),
  // Zwroty biletów — bilet ze strzałką w tył
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h11A1.5 1.5 0 0 1 17 7.5v1a1.5 1.5 0 0 0 0 3v1a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 12.5v-1a1.5 1.5 0 0 0 0-3Z" {...base} />
      <path d="M11 8.6L9.2 10l1.8 1.4M9.2 10h1.9" {...base} />
    </svg>
  ),
  // Regulamin — dokument
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M5.5 3h6l3 3v11H5.5Z" {...base} />
      <path d="M11.5 3v3h3M7.6 9.5h4.8M7.6 12h4.8M7.6 14.5h3" {...base} />
    </svg>
  ),
  // Praca — walizka
  props => (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <rect x="3.2" y="6.6" width="13.6" height="9.4" rx="1.4" {...base} />
      <path d="M7.4 6.6V5.2A1.4 1.4 0 0 1 8.8 3.8h2.4a1.4 1.4 0 0 1 1.4 1.4v1.4M3.2 10.5h13.6" {...base} />
    </svg>
  ),
];

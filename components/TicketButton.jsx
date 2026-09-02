import s from './TicketButton.module.css';

/**
 * The single place that decides what "Kup bilet" does.
 *
 * Ticketing is handled entirely by Stage24 — we never take payment here, we
 * hand the visitor off. So the button is an outbound link when the event has
 * a Stage24 URL, and an honest disabled state when it doesn't yet.
 */
export default function TicketButton({
  event,
  className = 'btn btn-gold',
  style,
  label,
  magnetic,
}) {
  const sold = event.status === 'wyprzedane';

  if (sold) {
    return (
      <button type="button" disabled className={s.unavailable} style={style} title="Brak biletów">
        Wyprzedane
      </button>
    );
  }

  if (!event.ticketUrl) {
    return (
      <button
        type="button"
        disabled
        className={s.unavailable}
        style={style}
        title="Sprzedaż jeszcze nie ruszyła"
      >
        Bilety wkrótce
      </button>
    );
  }

  return (
    <a
      href={event.ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      data-magnetic={magnetic}
    >
      {label ?? 'Kup bilet'}
      <span className={s.ext} aria-hidden="true">↗</span>
      <span className={s.srOnly}>(otwiera Stage24 w nowej karcie)</span>
    </a>
  );
}

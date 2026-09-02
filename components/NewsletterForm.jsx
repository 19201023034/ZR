'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState({ status: 'idle', message: null });

  const busy = state.status === 'sending';
  const done = state.status === 'ok';

  async function submit(e) {
    e.preventDefault();
    if (busy || done) return;

    setState({ status: 'sending', message: null });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setState({ status: 'error', message: json.error ?? 'Nie udało się zapisać. Spróbuj ponownie.' });
        return;
      }

      setState({
        status: 'ok',
        message: 'Sprawdź skrzynkę — wysłaliśmy link potwierdzający zapis.',
      });
      setEmail('');
      setConsent(false);
    } catch {
      setState({ status: 'error', message: 'Brak połączenia. Spróbuj za chwilę.' });
    }
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <div className={s.row}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="twoj@email.pl"
          required
          disabled={busy || done}
          aria-label="Adres e-mail"
          className={s.input}
        />
        <button
          type="submit"
          className="btn btn-outline-gold"
          disabled={busy || done || !email || !consent}
        >
          {busy ? 'Zapisuję…' : done ? 'Zapisano' : 'Zapisuję się'}
        </button>
      </div>

      <label className={s.consent}>
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          className={s.check}
        />
        <span>
          Zgadzam się na otrzymywanie newslettera. Mogę się wypisać w każdej chwili.{' '}
          <Link href="/polityka-prywatnosci" className={s.link}>Polityka prywatności.</Link>
        </span>
      </label>

      {state.message && (
        <p
          role="status"
          aria-live="polite"
          className={s.message + ' ' + (state.status === 'ok' ? s.ok : s.error)}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

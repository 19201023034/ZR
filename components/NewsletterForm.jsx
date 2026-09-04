'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './NewsletterForm.module.css';

export default function NewsletterForm({ t }) {
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
        setState({ status: 'error', message: json.error ?? t.errGeneric });
        return;
      }

      setState({ status: 'ok', message: t.ok });
      setEmail('');
      setConsent(false);
    } catch {
      setState({ status: 'error', message: t.errOffline });
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
          placeholder={t.placeholder}
          required
          disabled={busy || done}
          aria-label={t.emailLabel}
          className={s.input}
        />
        <button
          type="submit"
          className="btn btn-outline-gold"
          disabled={busy || done || !email || !consent}
        >
          {busy ? t.sending : done ? t.done : t.submit}
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
          {t.consent}{' '}
          <Link href="/polityka-prywatnosci" className={s.link}>{t.privacy}</Link>
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

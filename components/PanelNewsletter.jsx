'use client';

import { useMemo, useState } from 'react';
import { formatDate } from '@/lib/events';
import s from './PanelNewsletter.module.css';

export default function PanelNewsletter({ events = [] }) {
  const upcoming = useMemo(
    () => events.filter(e => e.date >= new Date().toISOString().slice(0, 10)),
    [events]
  );

  const [subject, setSubject] = useState('Terminarz Zaklętych Rewirów');
  const [intro, setIntro] = useState(
    'Cześć! Oto co dzieje się u nas w najbliższym czasie. Do zobaczenia na Krakowskiej 100.'
  );
  const [picked, setPicked] = useState(() => upcoming.slice(0, 5).map(e => e.id));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const chosen = upcoming.filter(e => picked.includes(e.id));
  const toggle = id => setPicked(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]));

  async function send() {
    if (busy) return;
    if (!subject.trim()) { setMsg({ type: 'err', text: 'Podaj temat wiadomości.' }); return; }

    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/newsletter/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          intro,
          events: chosen.map(e => ({
            artist: e.artist, date: e.date, venue: e.venue,
            genre: e.genre, priceFrom: e.priceFrom, ticketUrl: e.ticketUrl, slug: e.slug,
          })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg({ type: 'err', text: json.error ?? 'Wysyłka się nie powiodła.' }); return; }
      setMsg({ type: 'ok', text: json.message ?? 'Newsletter wysłany.' });
    } catch {
      setMsg({ type: 'err', text: 'Brak połączenia z serwerem.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={s.grid}>
      {/* ─── Composer ─── */}
      <div className={s.compose}>
        <span className="section-label">Nowa wysyłka</span>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Temat</label>
          <input className={s.input} value={subject} onChange={e => setSubject(e.target.value)} />
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Wstęp</label>
          <textarea className={s.textarea} rows={3} value={intro} onChange={e => setIntro(e.target.value)} />
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Wydarzenia w wysyłce ({chosen.length})</label>
          {upcoming.length === 0 ? (
            <p className={s.empty + ' mono'}>Brak nadchodzących wydarzeń do dołączenia.</p>
          ) : (
            <div className={s.pickList}>
              {upcoming.map(e => (
                <label key={e.id} className={s.pick + (picked.includes(e.id) ? ' ' + s.pickOn : '')}>
                  <input type="checkbox" checked={picked.includes(e.id)} onChange={() => toggle(e.id)} />
                  <span className={s.pickDate + ' mono'}>{formatDate(e.date)}</span>
                  <span className={s.pickArtist}>{e.artist}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className={s.actions}>
          <button className="btn btn-gold" onClick={send} disabled={busy}>
            {busy ? 'Wysyłam…' : 'Wyślij do subskrybentów'}
          </button>
          {msg && (
            <span className={'mono ' + s.msg + ' ' + (msg.type === 'ok' ? s.ok : s.err)}>{msg.text}</span>
          )}
        </div>

        <p className={s.note + ' mono'}>
          Wysyłkę realizuje MailerLite. Bez skonfigurowanego klucza API panel działa
          w trybie podglądu — treść widać, ale nic nie wychodzi.
        </p>
      </div>

      {/* ─── Live preview ─── */}
      <div className={s.previewCol}>
        <span className="section-label">Podgląd</span>
        <div className={s.mail}>
          <img src="/opengraph-image" alt="Zaklęte Rewiry" className={s.mailBanner} />
          <div className={s.mailHead}>
            <span className={s.mailSubject}>{subject || '—'}</span>
          </div>
          <div className={s.mailBody}>
            {intro && <p className={s.mailIntro}>{intro}</p>}
            {chosen.map(e => (
              <div key={e.id} className={s.mailEvent}>
                <span className={s.mailDate + ' mono'}>{formatDate(e.date)}</span>
                <span className={'display ' + s.mailArtist}>{e.artist}</span>
                <span className={s.mailMeta + ' mono'}>
                  {e.genre} · {e.venue}{e.priceFrom ? ` · od ${e.priceFrom} zł` : ''}
                </span>
                <span className={s.mailCta + ' mono'}>{e.ticketUrl ? 'Kup bilet →' : 'Szczegóły →'}</span>
              </div>
            ))}
            {chosen.length === 0 && <p className={s.mailEmpty + ' mono'}>Zaznacz wydarzenia po lewej.</p>}
          </div>
          <div className={s.mailFoot + ' mono'}>
            Zaklęte Rewiry · ul. Krakowska 100, Wrocław · wypisz się w każdej chwili
          </div>
        </div>
      </div>
    </div>
  );
}

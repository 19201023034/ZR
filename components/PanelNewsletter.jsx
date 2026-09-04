'use client';

import { useMemo, useState } from 'react';
import { formatDate, translateGenre, translateRoom } from '@/lib/events';
import { getDict } from '@/lib/i18n';
import s from './PanelNewsletter.module.css';

export default function PanelNewsletter({ events = [], locale = 'pl' }) {
  // The panel chrome follows the site language; the campaign itself has its own
  // language, so staff can write an English mailing from a Polish panel.
  const tp = getDict(locale).panel;
  const [lang, setLang] = useState(locale);
  const tm = getDict(lang);
  const upcoming = useMemo(
    () => events.filter(e => e.date >= new Date().toISOString().slice(0, 10)),
    [events]
  );

  const [subject, setSubject] = useState(tp.defaultSubject);
  const [intro, setIntro] = useState(tp.defaultIntro);
  const [picked, setPicked] = useState(() => upcoming.slice(0, 5).map(e => e.id));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const chosen = upcoming.filter(e => picked.includes(e.id));
  const toggle = id => setPicked(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]));

  async function send() {
    if (busy) return;
    if (!subject.trim()) { setMsg({ type: 'err', text: tp.noSubject }); return; }

    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/newsletter/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          intro,
          locale: lang,
          events: chosen.map(e => ({
            artist: e.artist, date: e.date, venue: e.venue,
            genre: e.genre, priceFrom: e.priceFrom, ticketUrl: e.ticketUrl, slug: e.slug,
          })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg({ type: 'err', text: json.error ?? tp.failed }); return; }
      setMsg({ type: 'ok', text: json.message ?? tp.sent });
    } catch {
      setMsg({ type: 'err', text: tp.offline });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={s.grid}>
      {/* ─── Composer ─── */}
      <div className={s.compose}>
        <span className="section-label">{tp.newLetter}</span>

        <div className={s.field}>
          <label className={s.label + ' mono'}>{tp.lang}</label>
          <div className={s.langPick}>
            {['pl', 'en'].map(l => (
              <button
                key={l}
                type="button"
                className={s.langBtn + (lang === l ? ' ' + s.langBtnOn : '')}
                onClick={() => {
                  // swap the boilerplate too, but only while it is untouched
                  const d = getDict(l).panel;
                  const prev = getDict(lang).panel;
                  setSubject(cur => (cur === prev.defaultSubject ? d.defaultSubject : cur));
                  setIntro(cur => (cur === prev.defaultIntro ? d.defaultIntro : cur));
                  setLang(l);
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>{tp.subject}</label>
          <input className={s.input} value={subject} onChange={e => setSubject(e.target.value)} />
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>{tp.intro}</label>
          <textarea className={s.textarea} rows={3} value={intro} onChange={e => setIntro(e.target.value)} />
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>{tp.picked} ({chosen.length})</label>
          {upcoming.length === 0 ? (
            <p className={s.empty + ' mono'}>{tp.noUpcoming}</p>
          ) : (
            <div className={s.pickList}>
              {upcoming.map(e => (
                <label key={e.id} className={s.pick + (picked.includes(e.id) ? ' ' + s.pickOn : '')}>
                  <input type="checkbox" checked={picked.includes(e.id)} onChange={() => toggle(e.id)} />
                  <span className={s.pickDate + ' mono'}>{formatDate(e.date, locale)}</span>
                  <span className={s.pickArtist}>{e.artist}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className={s.actions}>
          <button className="btn btn-gold" onClick={send} disabled={busy}>
            {busy ? tp.sending : tp.send}
          </button>
          {msg && (
            <span className={'mono ' + s.msg + ' ' + (msg.type === 'ok' ? s.ok : s.err)}>{msg.text}</span>
          )}
        </div>

        <p className={s.note + ' mono'}>{tp.note}</p>
      </div>

      {/* ─── Live preview ─── */}
      <div className={s.previewCol}>
        <span className="section-label">{tp.preview} · {lang.toUpperCase()}</span>
        <div className={s.mail}>
          <img src="/opengraph-image" alt="Zaklęte Rewiry" className={s.mailBanner} />
          <div className={s.mailHead}>
            <span className={s.mailSubject}>{subject || '—'}</span>
          </div>
          <div className={s.mailBody}>
            {intro && <p className={s.mailIntro}>{intro}</p>}
            {chosen.map(e => (
              <div key={e.id} className={s.mailEvent}>
                <span className={s.mailDate + ' mono'}>{formatDate(e.date, lang)}</span>
                <span className={'display ' + s.mailArtist}>{e.artist}</span>
                <span className={s.mailMeta + ' mono'}>
                  {translateGenre(e.genre, lang)} · {translateRoom(e.venue, lang)}
                  {e.priceFrom ? ` · ${tm.ticket.from} ${e.priceFrom} ${tm.ticket.currency}` : ''}
                </span>
                <span className={s.mailCta + ' mono'}>{(e.ticketUrl ? tm.mail.buy : tm.mail.details)} →</span>
              </div>
            ))}
            {chosen.length === 0 && <p className={s.mailEmpty + ' mono'}>{tp.pickHint}</p>}
          </div>
          <div className={s.mailFoot + ' mono'}>
            Zaklęte Rewiry · ul. Krakowska 100, Wrocław
          </div>
        </div>
      </div>
    </div>
  );
}

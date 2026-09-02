'use client';

import { useEffect, useState } from 'react';
import { GENRES, getStatusColor, formatDate } from '@/lib/events';
import s from './PanelEvents.module.css';

const VENUES = ['Sala Duża', 'Sala Klubowa', 'Sala Kameralna'];

const STATUSES = [
  { key: 'dostepne', label: 'Dostępne' },
  { key: 'ostatnie', label: 'Ostatnie sztuki' },
  { key: 'wyprzedane', label: 'Wyprzedane' },
  { key: 'przedsprzedaz', label: 'Przedsprzedaż' },
];

const EMPTY = {
  artist: '', support: '', genre: 'Rock', date: '', doors: '19:00', start: '20:00',
  venue: 'Sala Duża', priceFrom: '', priceDay: '', pool: '', ageMin: '', ticketUrl: '',
  status: 'dostepne', description: '',
};

export default function PanelEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function load() {
    try {
      const res = await fetch('/api/events', { cache: 'no-store' });
      const json = await res.json();
      setEvents(json.events ?? []);
    } catch {
      setMsg({ type: 'err', text: 'Nie udało się wczytać wydarzeń.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const missing = ['artist', 'date', 'venue'].filter(k => !form[k]);
  const canSave = missing.length === 0 && !busy;

  async function save(e) {
    e.preventDefault();
    if (!canSave) return;

    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(editingId ? `/api/events/${editingId}` : '/api/events', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok) {
        setMsg({ type: 'err', text: json.error ?? 'Zapis się nie powiódł.' });
        return;
      }

      setMsg({
        type: 'ok',
        text: editingId ? 'Zmiany zapisane.' : `„${json.event.artist}" dodany do repertuaru.`,
      });
      setForm(EMPTY);
      setEditingId(null);
      await load();
    } catch {
      setMsg({ type: 'err', text: 'Brak połączenia z serwerem.' });
    } finally {
      setBusy(false);
    }
  }

  async function patch(id, body) {
    await fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await load();
  }

  async function remove(id, artist) {
    if (!confirm(`Usunąć „${artist}" z repertuaru? Tej operacji nie można cofnąć.`)) return;
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (editingId === id) { setEditingId(null); setForm(EMPTY); }
    await load();
  }

  function edit(ev) {
    setEditingId(ev.id);
    setForm({
      artist: ev.artist ?? '', support: ev.support ?? '', genre: ev.genre ?? 'Rock',
      date: ev.date ?? '', doors: ev.doors ?? '', start: ev.start ?? '',
      venue: ev.venue ?? 'Sala Duża',
      priceFrom: ev.priceFrom ?? '', priceDay: ev.priceDay ?? '',
      pool: ev.pool ?? '', ageMin: ev.ageMin ?? '',
      status: ev.status ?? 'dostepne', description: ev.description ?? '',
      ticketUrl: ev.ticketUrl ?? '',
    });
    setMsg(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={s.wrap}>
      {/* ─── FORM ─── */}
      <form className={s.form} onSubmit={save}>
        <div className={s.formHead}>
          <div>
            <span className="section-label">{editingId ? 'Edycja wydarzenia' : 'Nowe wydarzenie'}</span>
            <h2 className={'display ' + s.formTitle}>
              {editingId ? 'Zmień dane' : 'Dodaj do repertuaru'}
            </h2>
          </div>
          {editingId && (
            <button
              type="button"
              className={s.ghostBtn}
              onClick={() => { setEditingId(null); setForm(EMPTY); setMsg(null); }}
            >
              Anuluj edycję
            </button>
          )}
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Artysta / nazwa *</label>
          <input
            className={s.artistInput}
            value={form.artist}
            onChange={e => set('artist', e.target.value)}
            placeholder="np. Behemoth"
          />
        </div>

        <div className={s.row2}>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Support</label>
            <input className={s.input} value={form.support}
                   onChange={e => set('support', e.target.value)} placeholder="opcjonalnie" />
          </div>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Gatunek</label>
            <div className={s.pills}>
              {GENRES.map(g => (
                <button key={g} type="button"
                  className={s.pill + (form.genre === g ? ' ' + s.pillActive : '')}
                  onClick={() => set('genre', g)}>{g}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={s.row3}>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Data *</label>
            <input type="date" className={s.input} value={form.date}
                   onChange={e => set('date', e.target.value)} />
          </div>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Wejście</label>
            <input type="time" className={s.input} value={form.doors}
                   onChange={e => set('doors', e.target.value)} />
          </div>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Start</label>
            <input type="time" className={s.input} value={form.start}
                   onChange={e => set('start', e.target.value)} />
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Sala *</label>
          <div className={s.pills}>
            {VENUES.map(v => (
              <button key={v} type="button"
                className={s.pill + (form.venue === v ? ' ' + s.pillActive : '')}
                onClick={() => set('venue', v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className={s.row4}>
          {[
            ['priceFrom', 'Cena od (zł)'],
            ['priceDay', 'W dniu (zł)'],
            ['pool', 'Pula biletów'],
            ['ageMin', 'Wiek min.'],
          ].map(([k, label]) => (
            <div key={k} className={s.field}>
              <label className={s.label + ' mono'}>{label}</label>
              <input type="number" min="0" className={s.input} value={form[k]}
                     onChange={e => set(k, e.target.value)} placeholder="—" />
            </div>
          ))}
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Status biletów</label>
          <div className={s.pills}>
            {STATUSES.map(st => (
              <button key={st.key} type="button"
                className={s.pill + (form.status === st.key ? ' ' + s.pillActive : '')}
                style={form.status === st.key
                  ? { borderColor: getStatusColor(st.key), color: getStatusColor(st.key) }
                  : undefined}
                onClick={() => set('status', st.key)}>{st.label}</button>
            ))}
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Link do biletów (Stage24)</label>
          <input
            type="url"
            className={s.input}
            value={form.ticketUrl}
            onChange={e => set('ticketUrl', e.target.value)}
            placeholder="https://stage24.pl/wydarzenia/..."
          />
          <span className={s.fieldHint + ' mono'}>
            Bez linku przycisk pokazuje „Bilety wkrótce" zamiast prowadzić donikąd.
          </span>
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Opis</label>
          <textarea className={s.textarea} rows={3} value={form.description}
                    onChange={e => set('description', e.target.value)}
                    placeholder="Krótki opis wydarzenia na stronę biletu." />
        </div>

        <div className={s.formFoot}>
          <button type="submit" className="btn btn-gold" disabled={!canSave}>
            {busy ? 'Zapisuję…' : editingId ? 'Zapisz zmiany' : 'Opublikuj wydarzenie'}
          </button>
          {missing.length > 0 && (
            <span className={s.hint + ' mono'}>
              Wymagane: {missing.map(m => ({ artist: 'artysta', date: 'data', venue: 'sala' }[m])).join(', ')}
            </span>
          )}
          {msg && (
            <span className={'mono ' + s.msg + ' ' + (msg.type === 'ok' ? s.msgOk : s.msgErr)}>
              {msg.text}
            </span>
          )}
        </div>
      </form>

      {/* ─── LIST ─── */}
      <section className={s.list}>
        <div className={s.listHead}>
          <div>
            <span className="section-label">Repertuar</span>
            <h2 className={'display ' + s.formTitle}>W bazie · {events.length}</h2>
          </div>
          <p className={s.listNote}>
            Gwiazdka ustawia wydarzenie jako główne na stronie startowej. Bez wyboru
            strona pokazuje najbliższy termin.
          </p>
        </div>

        {loading ? (
          <p className={s.empty + ' mono'}>Wczytuję…</p>
        ) : events.length === 0 ? (
          <p className={s.empty + ' mono'}>Brak wydarzeń. Dodaj pierwsze powyżej.</p>
        ) : (
          <div className={s.rows}>
            {events.map(ev => (
              <div key={ev.id} className={s.row + (ev.featured ? ' ' + s.rowFeatured : '')}>
                <button
                  type="button"
                  className={s.star + (ev.featured ? ' ' + s.starOn : '')}
                  title={ev.featured ? 'Zdejmij z głównej' : 'Pokaż na głównej'}
                  aria-pressed={ev.featured}
                  onClick={() => patch(ev.id, { featured: !ev.featured })}
                >★</button>

                <div className={s.rowDate + ' mono'}>{ev.date ? formatDate(ev.date) : '—'}</div>

                <div className={s.rowMain}>
                  <span className={'display ' + s.rowArtist}>{ev.artist}</span>
                  <span className={s.rowMeta + ' mono'}>
                    {ev.genre} · {ev.venue}
                    {ev.priceFrom ? ` · od ${ev.priceFrom} zł` : ''}
                    {ev.ticketUrl
                      ? <a href={ev.ticketUrl} target="_blank" rel="noopener noreferrer"
                           className={s.rowTicketOk}> · bilety ↗</a>
                      : <span className={s.rowTicketMissing}> · brak linku do biletów</span>}
                  </span>
                </div>

                <select
                  className={s.rowStatus + ' mono'}
                  value={ev.status}
                  style={{ color: getStatusColor(ev.status), borderColor: getStatusColor(ev.status) }}
                  onChange={e => patch(ev.id, { status: e.target.value })}
                >
                  {STATUSES.map(st => <option key={st.key} value={st.key}>{st.label}</option>)}
                </select>

                <div className={s.rowActions}>
                  <button type="button" className={s.ghostBtn} onClick={() => edit(ev)}>Edytuj</button>
                  <button type="button" className={s.delBtn}
                          onClick={() => remove(ev.id, ev.artist)}>Usuń</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

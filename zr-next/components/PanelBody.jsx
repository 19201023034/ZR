'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GENRES, getStatusColor, getStatusLabel, formatDate } from '@/lib/events';
import s from './PanelBody.module.css';

const ROOMS = ['Sala Duża', 'Sala Klubowa', 'Sala Kameralna'];
const STATUSES = ['dostepne', 'przedsprzedaz', 'ostatnie', 'wyprzedane'];
const STATUS_LABELS = { dostepne: 'DOSTĘPNE', przedsprzedaz: 'PRZEDSPRZEDAŻ', ostatnie: 'OSTATNIE', wyprzedane: 'WYPRZEDANE' };

// Mock occupied dates per room for collision detection
const OCCUPIED = {
  'Sala Duża':     ['2026-11-14', '2026-11-22'],
  'Sala Klubowa':  ['2026-12-05', '2026-12-12'],
  'Sala Kameralna':['2026-12-19'],
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const days = getDaysInMonth(year, month);
  const offset = (firstDay + 6) % 7; // Mon start
  return { offset, days };
}

export default function PanelBody() {
  const today = new Date();
  const [form, setForm] = useState({
    artist: '',
    support: '',
    genre: '',
    date: '',
    doors: '19:00',
    start: '20:00',
    room: 'Sala Duża',
    priceFrom: '',
    priceDay: '',
    pool: '',
    status: 'dostepne',
    description: '',
    ageMin: 16,
  });
  const [saved, setSaved] = useState(false);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  const collision = form.date && OCCUPIED[form.room]?.includes(form.date);
  const otherCollisions = form.date
    ? Object.entries(OCCUPIED)
        .filter(([r]) => r !== form.room)
        .some(([, dates]) => dates.includes(form.date))
    : false;

  // Checklist
  const checks = {
    'Nazwa artysty': !!form.artist.trim(),
    'Data i godzina': !!(form.date && form.doors && form.start),
    'Sala bez kolizji': !!(form.room && !collision),
    'Cena od': !!form.priceFrom,
  };
  const allOk = Object.values(checks).every(Boolean);

  // Calendar
  const { offset, days } = buildCalendar(calYear, calMonth);
  const DAY_NAMES = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

  function dayState(day) {
    const iso = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (iso === form.date) return 'selected';
    if (OCCUPIED[form.room]?.includes(iso)) return 'collision';
    if (otherCollisions && Object.values(OCCUPIED).some(d => d.includes(iso) && !OCCUPIED[form.room]?.includes(iso))) return 'other';
    return 'free';
  }

  function pickDay(day) {
    const iso = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    set('date', iso);
  }

  const occupiedCount = Object.values(OCCUPIED).flat().filter((v, i, a) => a.indexOf(v) === i).length;

  return (
    <div className={s.layout}>
      {/* ─── TOP BAR ─── */}
      <div className={s.topBar}>
        <div className={s.breadcrumb + ' mono'}>
          <Link href="/panel" className={s.breadLink}>PANEL</Link>
          <span className={s.breadSep}>/</span>
          <span>WYDARZENIA</span>
          <span className={s.breadSep}>/</span>
          <span style={{ color: 'var(--zr-text)' }}>NOWE</span>
        </div>
        <div className={s.topActions}>
          <span className={s.draftBadge + ' mono'}>{saved ? '● ZAPISANO SZKIC' : '○ SZKIC'}</span>
          <button className="btn btn-outline" style={{ padding: '10px 20px', fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}
            onClick={() => setSaved(true)}>
            Zapisz szkic
          </button>
          <button
            className="btn btn-gold"
            style={{ padding: '10px 20px', fontSize: 13 }}
            disabled={!allOk}
          >
            Publikuj
          </button>
        </div>
      </div>

      <div className={s.cols}>
        {/* ─── FORM ─── */}
        <div className={s.formCol}>

          {/* 1 · ARTYSTA */}
          <section className={s.formSection}>
            <span className={s.sectionLabel + ' mono'}>1 · ARTYSTA I GATUNEK</span>
            <div className={s.field}>
              <label className={s.label + ' mono'}>NAZWA ARTYSTY</label>
              <input
                type="text"
                className={s.artistInput}
                placeholder="NAZWA ARTYSTY"
                value={form.artist}
                onChange={e => set('artist', e.target.value)}
              />
              <span className={s.hint + ' mono'}>Ta nazwa wyjdzie największym krojem na karcie i na stronie.</span>
            </div>
            <div className={s.fieldRow}>
              <div className={s.field}>
                <label className={s.label + ' mono'}>SUPPORT (opcjonalny)</label>
                <input type="text" className={s.input} value={form.support} onChange={e => set('support', e.target.value)} />
              </div>
            </div>
            <div className={s.field}>
              <label className={s.label + ' mono'}>GATUNEK</label>
              <div className={s.genrePicker}>
                {GENRES.map(g => (
                  <button
                    key={g}
                    type="button"
                    className={s.genreBtn + (form.genre === g ? ' ' + s.genreBtnActive : '')}
                    onClick={() => set('genre', g)}
                  >{g}</button>
                ))}
              </div>
            </div>
          </section>

          {/* 2 · TERMIN */}
          <section className={s.formSection}>
            <span className={s.sectionLabel + ' mono'}>2 · TERMIN I SALA</span>
            <div className={s.fieldRow}>
              <div className={s.field}>
                <label className={s.label + ' mono'}>DATA</label>
                <input type="date" className={s.input} value={form.date} onChange={e => set('date', e.target.value)} />
              </div>
              <div className={s.field}>
                <label className={s.label + ' mono'}>WEJŚCIE</label>
                <input type="time" className={s.input} value={form.doors} onChange={e => set('doors', e.target.value)} />
              </div>
              <div className={s.field}>
                <label className={s.label + ' mono'}>START</label>
                <input type="time" className={s.input} value={form.start} onChange={e => set('start', e.target.value)} />
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label + ' mono'}>SALA</label>
              <div className={s.roomPicker}>
                {ROOMS.map(r => (
                  <button
                    key={r}
                    type="button"
                    className={s.roomBtn + (form.room === r ? ' ' + s.roomBtnActive : '')}
                    onClick={() => set('room', r)}
                  >
                    <span className={s.roomBtnName}>{r}</span>
                  </button>
                ))}
              </div>
            </div>

            {form.date && (
              <div className={collision ? s.collisionWarn : s.collisionOk + ' mono'}>
                {collision
                  ? `⚠ KOLIZJA: ${form.room.toUpperCase()} JEST ZAJĘTA ${form.date}`
                  : `✓ TERMIN WOLNY — ${form.room.toUpperCase()} DOSTĘPNA`}
              </div>
            )}

            {/* Mini calendar */}
            <div className={s.calendar}>
              <div className={s.calHeader}>
                <button className={s.calNav} onClick={() => {
                  if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
                  else setCalMonth(m => m - 1);
                }}>‹</button>
                <span className={s.calTitle + ' mono'}>
                  {new Date(calYear, calMonth).toLocaleString('pl-PL', { month: 'long', year: 'numeric' }).toUpperCase()}
                </span>
                <button className={s.calNav} onClick={() => {
                  if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
                  else setCalMonth(m => m + 1);
                }}>›</button>
              </div>
              <div className={s.calGrid}>
                {DAY_NAMES.map(d => <span key={d} className={s.calDayName + ' mono'}>{d}</span>)}
                {Array.from({ length: offset }).map((_, i) => <span key={'e' + i} />)}
                {Array.from({ length: days }).map((_, i) => {
                  const day = i + 1;
                  const state = dayState(day);
                  return (
                    <button
                      key={day}
                      className={s.calDay + ' mono ' + (s['calDay_' + state] || '')}
                      onClick={() => pickDay(day)}
                    >{day}</button>
                  );
                })}
              </div>
              <div className={s.calLegend}>
                {[
                  { cls: s.calDay_selected, label: 'Wybrany' },
                  { cls: s.calDay_collision, label: 'Kolizja' },
                  { cls: s.calDay_other, label: 'Inna sala' },
                  { cls: s.calDay_free, label: 'Wolny' },
                ].map(({ cls, label }) => (
                  <div key={label} className={s.calLegendItem}>
                    <div className={s.calLegendDot + ' ' + cls} />
                    <span className="mono" style={{ fontSize: 10, color: 'var(--zr-muted)' }}>{label}</span>
                  </div>
                ))}
                <span className={'mono ' + s.calSummary}>
                  {occupiedCount} / 30 dni zajętych
                </span>
              </div>
            </div>
          </section>

          {/* 3 · BILETY */}
          <section className={s.formSection}>
            <span className={s.sectionLabel + ' mono'}>3 · BILETY</span>
            <div className={s.fieldRow}>
              <div className={s.field}>
                <label className={s.label + ' mono'}>CENA OD (zł)</label>
                <input type="number" className={s.input} value={form.priceFrom} onChange={e => set('priceFrom', e.target.value)} min={0} />
              </div>
              <div className={s.field}>
                <label className={s.label + ' mono'}>CENA W DNIU</label>
                <input type="number" className={s.input} value={form.priceDay} onChange={e => set('priceDay', e.target.value)} min={0} />
              </div>
              <div className={s.field}>
                <label className={s.label + ' mono'}>PULA BILETÓW</label>
                <input type="number" className={s.input} value={form.pool} onChange={e => set('pool', e.target.value)} min={1} />
              </div>
            </div>
            <div className={s.field}>
              <label className={s.label + ' mono'}>STATUS SPRZEDAŻY</label>
              <div className={s.statusPicker}>
                {STATUSES.map(st => (
                  <button
                    key={st}
                    type="button"
                    className={s.statusBtn + (form.status === st ? ' ' + s.statusBtnActive : '')}
                    style={form.status === st ? { borderColor: getStatusColor(st), color: getStatusColor(st) } : {}}
                    onClick={() => set('status', st)}
                  >
                    <span className={'status-dot status-dot-' + (st === 'dostepne' ? 'ok' : st === 'ostatnie' ? 'warn' : st === 'wyprzedane' ? 'sold' : 'pre')} />
                    {STATUS_LABELS[st]}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 4 · PLAKAT */}
          <section className={s.formSection}>
            <span className={s.sectionLabel + ' mono'}>4 · PLAKAT I OPIS</span>
            <div className={s.posterRow}>
              <div className={s.dropZone}>
                <span className={s.dropLabel + ' mono'}>UPUŚĆ PLAKAT</span>
                <span className={s.dropSub + ' mono'}>JPG / PNG · MIN 1600 × 900</span>
              </div>
              <div className={s.field} style={{ flex: 1 }}>
                <label className={s.label + ' mono'}>OPIS WYDARZENIA</label>
                <textarea
                  rows={5}
                  className={s.input}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* ─── PREVIEW ─── */}
        <div className={s.previewCol}>
          <span className={s.sectionLabel + ' mono'} style={{ marginBottom: 16, display: 'block' }}>PODGLĄD NA ŻYWO</span>

          {/* Live card */}
          <div className={'ticket-card ' + s.previewCard}>
            <div className={s.previewPoster + ' led-grid'} />
            <div className={s.previewBody}>
              <div className={s.previewTopRow}>
                <span className="mono" style={{ fontSize: 12, color: 'var(--zr-muted)' }}>
                  {form.date ? formatDate(form.date) : 'DD.MM.RRRR'} · {form.doors} / {form.start}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: getStatusColor(form.status) }}>
                  <span className={'status-dot status-dot-' + (form.status === 'dostepne' ? 'ok' : form.status === 'ostatnie' ? 'warn' : form.status === 'wyprzedane' ? 'sold' : 'pre')} />
                  {STATUS_LABELS[form.status]}
                </span>
              </div>
              <div className={'display ' + s.previewArtist}>
                {form.artist || 'NAZWA ARTYSTY'}
              </div>
              <div className={s.previewMeta}>
                {form.genre && <span>{form.genre}</span>}
                {form.support && <span>+ {form.support}</span>}
                <span>{form.room}</span>
              </div>
            </div>
            <div className={'ticket-footer ' + s.previewFooter}>
              <span className="mono" style={{ fontSize: 15 }}>
                {form.priceFrom ? `od ${form.priceFrom} zł` : '— zł'}
              </span>
              <span className="btn btn-gold" style={{ padding: '10px 18px', fontSize: 13, opacity: form.status === 'wyprzedane' ? 0.4 : 1 }}>
                Kup bilet
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className={s.checklist}>
            <span className={s.sectionLabel + ' mono'} style={{ marginBottom: 12, display: 'block' }}>CHECKLISTA PUBLIKACJI</span>
            {Object.entries(checks).map(([label, ok]) => (
              <div key={label} className={s.checkItem}>
                <span className={s.checkIcon + ' mono'} style={{ color: ok ? 'var(--zr-ok)' : 'var(--zr-faint)' }}>
                  {ok ? '✓' : '○'}
                </span>
                <span className={'mono ' + s.checkLabel} style={{ color: ok ? 'var(--zr-body)' : 'var(--zr-faint)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Gdzie się pojawi */}
          <div className={s.whereBox}>
            <span className={s.sectionLabel + ' mono'} style={{ marginBottom: 12, display: 'block' }}>GDZIE SIĘ POJAWI</span>
            {['Strona główna (kafel)', 'Kalendarz', 'Strona wydarzenia', 'Newsletter miesięczny', 'Kanał RSS'].map(p => (
              <div key={p} className={'mono ' + s.whereItem}>→ {p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

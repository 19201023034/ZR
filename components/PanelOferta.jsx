'use client';

import { useState } from 'react';
import { ROOMS } from '@/lib/events';
import { PACKAGES, FINE_PRINT, OCCASIONS } from '@/lib/offer';
import s from './PanelOferta.module.css';

const ROOM_NAMES = Object.keys(ROOMS);
const today = () => new Date().toISOString().slice(0, 10);

export default function PanelOferta() {
  const [f, setF] = useState({
    client: '', contact: '', occasion: OCCASIONS[0], date: '',
    room: ROOM_NAMES[0], pkg: 'II', guests: '', customPrice: '', notes: '',
  });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const room = ROOMS[f.room];
  const pkg = PACKAGES.find(p => p.id === f.pkg);
  const price = f.customPrice !== '' ? Number(f.customPrice) : room.priceFrom;
  const offerNo = `ZR/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}`;

  return (
    <div className={s.grid}>
      {/* ─── Builder ─── */}
      <div className={s.form}>
        <span className="section-label">Nowa wycena</span>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Klient / firma</label>
          <input className={s.input} value={f.client} onChange={e => set('client', e.target.value)} placeholder="np. Acme Sp. z o.o." />
        </div>
        <div className={s.field}>
          <label className={s.label + ' mono'}>Osoba kontaktowa / e-mail</label>
          <input className={s.input} value={f.contact} onChange={e => set('contact', e.target.value)} placeholder="jan.kowalski@acme.pl" />
        </div>

        <div className={s.row2}>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Typ wydarzenia</label>
            <select className={s.input} value={f.occasion} onChange={e => set('occasion', e.target.value)}>
              {OCCASIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Data</label>
            <input type="date" className={s.input} value={f.date} min={today()} onChange={e => set('date', e.target.value)} />
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Sala</label>
          <div className={s.pills}>
            {ROOM_NAMES.map(r => (
              <button key={r} type="button" className={s.pill + (f.room === r ? ' ' + s.pillOn : '')} onClick={() => set('room', r)}>{r}</button>
            ))}
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Pakiet obsługi</label>
          <div className={s.pills}>
            {PACKAGES.map(p => (
              <button key={p.id} type="button" className={s.pill + (f.pkg === p.id ? ' ' + s.pillOn : '')} onClick={() => set('pkg', p.id)}>{p.name}</button>
            ))}
          </div>
        </div>

        <div className={s.row2}>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Liczba gości</label>
            <input type="number" min="0" className={s.input} value={f.guests} onChange={e => set('guests', e.target.value)} placeholder={`do ${room.capacities.koncert}`} />
          </div>
          <div className={s.field}>
            <label className={s.label + ' mono'}>Cena netto / doba (zł)</label>
            <input type="number" min="0" className={s.input} value={f.customPrice} onChange={e => set('customPrice', e.target.value)} placeholder={String(room.priceFrom)} />
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label + ' mono'}>Uwagi</label>
          <textarea className={s.textarea} rows={3} value={f.notes} onChange={e => set('notes', e.target.value)} placeholder="Dodatkowe ustalenia, indywidualne warunki…" />
        </div>

        <div className={s.actions}>
          <button className="btn btn-gold" onClick={() => window.print()}>Drukuj / zapisz PDF</button>
          <span className={s.hint + ' mono'}>Druk zawiera tylko dokument oferty.</span>
        </div>
      </div>

      {/* ─── Offer sheet (this is what prints) ─── */}
      <div className={s.sheetWrap}>
        <div className={s.sheet} id="oferta-druk">
          <div className={s.sheetHead}>
            <div>
              <div className={'display ' + s.sheetBrand}>Zaklęte Rewiry</div>
              <div className={s.sheetSub + ' mono'}>Oferta wynajmu · {offerNo}</div>
            </div>
            <div className={s.sheetAddr + ' mono'}>
              ul. Krakowska 100<br />50-427 Wrocław<br />tel. 71 300 10 00
            </div>
          </div>

          <div className={s.sheetMeta}>
            {[
              ['Dla', f.client || '—'],
              ['Kontakt', f.contact || '—'],
              ['Wydarzenie', f.occasion],
              ['Termin', f.date || '—'],
            ].map(([k, v]) => (
              <div key={k} className={s.metaRow}>
                <span className={s.metaK + ' mono'}>{k}</span>
                <span className={s.metaV}>{v}</span>
              </div>
            ))}
          </div>

          <div className={s.sheetRoom}>
            <div className={'display ' + s.roomName}>{f.room}</div>
            <div className={s.roomSpec + ' mono'}>
              {room.area} m² · {room.dimensions} · do {f.guests || room.capacities.koncert} os.
            </div>
            <div className={s.pkgBox}>
              <span className={s.pkgName + ' mono'}>{pkg.name}{pkg.tag ? ` · ${pkg.tag}` : ''}</span>
              <span className={s.pkgDesc}>{pkg.desc}</span>
            </div>
            <div className={s.priceRow}>
              <span className={s.priceLabel + ' mono'}>Cena netto / doba</span>
              <span className={'display ' + s.priceVal}>{price.toLocaleString('pl-PL')} zł</span>
            </div>
          </div>

          {f.notes && (
            <div className={s.notes}>
              <span className={s.notesLabel + ' mono'}>Uwagi</span>
              <p className={s.notesText}>{f.notes}</p>
            </div>
          )}

          <p className={s.fine}>{FINE_PRINT}</p>
          <div className={s.sheetFoot + ' mono'}>Oferta ważna 14 dni od daty wystawienia · zakleterewiry.pl</div>
        </div>
      </div>
    </div>
  );
}

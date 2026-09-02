'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROOMS } from '@/lib/events';
import Reveal, { RevealGroup } from './Reveal';
import s from './WynajemBody.module.css';

const ROOM_NAMES = Object.keys(ROOMS);

const LAYOUTS = ['Koncert stojący', 'Teatralny', 'Bankiet', 'Koktajl', 'Konferencja'];
const LAYOUT_KEYS = ['koncert', 'teatralny', 'bankiet', 'koktajl', 'konferencja'];

const PACKAGES = [
  {
    name: 'Sama sala',
    num: 'I',
    items: ['Przestrzeń', 'Szatnia', 'Ochrona', 'Sprzątanie', 'Koordynator obiektu'],
  },
  {
    name: 'Sala z techniką',
    num: 'II',
    featured: true,
    tag: 'najczęściej wybierany',
    items: ['Pakiet I', 'Nagłośnienie', 'Oświetlenie sceniczne', 'Projekcja', '2 techników'],
  },
  {
    name: 'Pełna obsługa',
    num: 'III',
    items: ['Pakiet II', 'Catering', 'Bar', 'Obsługa kelnerska', 'Rejestracja wideo'],
  },
];

export default function WynajemBody() {
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState(0);
  const [form, setForm] = useState({ sala: ROOM_NAMES[0], data: '', goscie: '', firma: '', email: '', rodo: false });

  const room = ROOMS[ROOM_NAMES[active]];
  const plan = room.plan;
  const roomName = ROOM_NAMES[active];

  function handleTab(i) {
    setActive(i);
    setForm(f => ({ ...f, sala: ROOM_NAMES[i] }));
  }

  return (
    <>
      {/* ─── INTRO ─── */}
      <section className={'section ' + s.intro}>
        <span className="section-label enter-fade d1">Wynajem sal · dla firm i agencji</span>
        <h1 className={'display ' + s.heading + ' enter-mask d2'}>Gale, konferencje<br />i imprezy firmowe</h1>
        <p className={s.sub + ' enter d4'}>Trzy sale od 90 do 550 m² przy ul. Krakowskiej 100 we Wrocławiu. Pełne zaplecze techniczne, catering, koordynator. Odpowiedź w 24 h.</p>
      </section>

      {/* ─── TABS ─── */}
      <RevealGroup variant="up" step={70} className={s.tabs}>
        {ROOM_NAMES.map((name, i) => (
          <button key={name} className={s.tab + (active === i ? ' ' + s.tabActive : '')} onClick={() => handleTab(i)}>
            <span className={s.tabName}>{name}</span>
            <span className={s.tabMeta + ' mono'}>{ROOMS[name].area} m² · do {ROOMS[name].capacities.koncert} os.</span>
          </button>
        ))}
      </RevealGroup>

      {/* ─── ROOM DETAIL ─── */}
      <section className={'section ' + s.roomSection}>
        <Reveal variant="fade" className={s.roomGrid}>
          {/* Left: info */}
          <div className={s.roomInfo}>
            <span className="section-label">{room.area} m² · {room.dimensions} · H {room.height}</span>
            <h2 className={'display ' + s.roomName}>{roomName}</h2>
            <div className="section-separator" />

            {/* Stats */}
            <div className={s.stats}>
              {[
                { label: 'POWIERZCHNIA', value: room.area + ' m²' },
                { label: 'SCENA', value: room.stage },
                { label: 'CENA OD', value: room.priceFrom.toLocaleString('pl-PL') + ' zł / doba' },
              ].map(({ label, value }) => (
                <div key={label} className={s.stat}>
                  <span className={s.statLabel + ' mono'}>{label}</span>
                  <span className={s.statValue + ' mono'}>{value}</span>
                </div>
              ))}
            </div>

            {/* Layout selector */}
            <div className={s.layoutSection}>
              <span className="section-label" style={{ marginBottom: 10, display: 'block' }}>UKŁAD SALI</span>
              <div className={s.layoutFilters}>
                {LAYOUTS.map((l, i) => (
                  <button key={l} className={s.layoutBtn + (layout === i ? ' ' + s.layoutBtnActive : '')} onClick={() => setLayout(i)}>
                    {l}
                  </button>
                ))}
              </div>
              <div className={s.capacityDisplay}>
                <span className={s.capacityNum + ' mono'}>{room.capacities[LAYOUT_KEYS[layout]]}</span>
                <span className={s.capacityLabel + ' mono'}>osób · układ {LAYOUTS[layout].toLowerCase()}</span>
              </div>
            </div>

            {/* What this hall is for — the full tech spec sits beside the plan */}
            <p className={s.roomBody}>{room.body}</p>
          </div>

          {/* Right: technical floor plan (geometry from the design handoff) */}
          <div className={s.floorPlan}>
            <div className={s.planCanvas}>
              <div className={s.planGrid} aria-hidden="true" />

              <span className={s.planScale + ' mono'}>{plan.scale}</span>

              {/* Stage — position and depth differ per hall */}
              <div
                className={s.planStage}
                style={{ left: plan.stage.left, right: plan.stage.right, height: plan.stage.height }}
              >
                <span className={s.planStageTitle + ' display'}>{plan.stage.label}</span>
                <span className={s.planStageSub + ' mono'}>{plan.stage.dims}</span>
              </div>

              {/* Audience zone — capacity follows the selected layout */}
              <div className={s.planZone}>
                <span className={s.planZoneLabel + ' mono'}>{plan.zone[0]}</span>
                <span className={s.planZoneCap + ' mono'}>
                  {LAYOUTS[layout]} · {room.capacities[LAYOUT_KEYS[layout]]} OS.
                </span>
              </div>

              {/* Back of house */}
              {plan.rooms.map(([label, pos]) => (
                <div key={label} className={s.planRoom} style={pos}>
                  <span className={s.planRoomLabel + ' mono'}>{label}</span>
                </div>
              ))}

              <div className={s.planEntry}>
                <span className="mono">WEJŚCIE</span>
              </div>
              <div className={s.planExit} style={{ left: '25%' }}>
                <span className="mono">EWAKUACJA</span>
              </div>
              <div className={s.planExit} style={{ right: '7%' }}>
                <span className="mono">EWAKUACJA</span>
              </div>

              <span className={s.planCompass + ' mono'}>N ↑</span>
            </div>

            <div className={s.planLegend}>
              {[
                { bg: 'rgba(252,204,0,0.14)', border: 'var(--zr-gold-dim)', label: 'SCENA' },
                { bg: 'var(--zr-raised)', border: 'var(--zr-line)', label: 'ZAPLECZE' },
                { bg: 'var(--zr-ok)', border: 'var(--zr-ok)', label: 'WEJŚCIA' },
                { bg: 'var(--zr-sold)', border: 'var(--zr-sold)', label: 'EWAKUACJA' },
              ].map(({ bg, border, label }) => (
                <span key={label} className={s.legendItem + ' mono'}>
                  <span className={s.legendSwatch} style={{ background: bg, borderColor: border }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Full technical spec */}
            <div className={s.techBlock}>
              <span className={s.techBlockLabel + ' mono'}>TECHNIKA I PRZYŁĄCZA</span>
              {room.tech.map(([name, value]) => (
                <div key={name} className={s.techRow}>
                  <span className={s.techLabel + ' mono'}>{name}</span>
                  <span className={s.techValue + ' mono'}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className={'section ' + s.compareSection}>
        <h2 className={'display ' + s.sectionHeading}>Porównanie sal</h2>
        <Reveal variant="up" className={s.compareTable}>
          <div className={s.compareHeader}>
            <span />
            {LAYOUTS.map(l => <span key={l} className={s.compareCol + ' mono'}>{l}</span>)}
          </div>
          {ROOM_NAMES.map((name, i) => (
            <div key={name} className={s.compareRow + (active === i ? ' ' + s.compareRowActive : '')} onClick={() => handleTab(i)}>
              <div className={s.compareRoomName}>
                <span className={'display ' + s.compareRoomTitle} style={{ color: active === i ? 'var(--zr-gold)' : 'var(--zr-text)' }}>{name}</span>
                <span className={'mono ' + s.comparePrice} style={{ color: active === i ? 'var(--zr-gold)' : 'var(--zr-muted)' }}>
                  od {ROOMS[name].priceFrom.toLocaleString('pl-PL')} zł
                </span>
              </div>
              {LAYOUT_KEYS.map(k => (
                <span key={k} className={'mono ' + s.compareCell}>{ROOMS[name].capacities[k]}</span>
              ))}
            </div>
          ))}
        </Reveal>
      </section>

      {/* ─── PACKAGES + FORM ─── */}
      <section className={'section ' + s.packagesSection}>
        <div className={s.packagesGrid}>
          <div>
            <h2 className={'display ' + s.sectionHeading}>Pakiety obsługi</h2>
            <RevealGroup variant="up" step={100} className={s.packages}>
              {PACKAGES.map(pkg => (
                <div key={pkg.num} className={s.package + (pkg.featured ? ' ' + s.packageFeatured : '')}>
                  {pkg.tag && <span className={s.packageTag + ' mono'}>{pkg.tag}</span>}
                  <span className={'display ' + s.packageNum}>{pkg.num}</span>
                  <h3 className={'display ' + s.packageName} style={{ color: pkg.featured ? 'var(--zr-gold)' : 'var(--zr-text)' }}>
                    {pkg.name}
                  </h3>
                  <ul className={s.packageItems}>
                    {pkg.items.map(item => (
                      <li key={item} className={s.packageItem + ' mono'}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </RevealGroup>
            <p className={s.conditions + ' mono'}>
              Ceny netto (VAT 23%). Doba techniczna 8:00–2:00. Zadatek 30%, rozliczenie 14 dni po wydarzeniu.
            </p>
          </div>

          {/* Form */}
          <Reveal variant="scale" className={s.formCard}>
            <div className={s.formHeader}>
              <span className="section-label">Zapytanie o termin</span>
              <h3 className={'display ' + s.formTitle}>Wyślij zapytanie</h3>
            </div>

            <form className={s.form} onSubmit={e => e.preventDefault()}>
              <div className={s.field}>
                <label className={s.label + ' mono'}>SALA</label>
                <div className={s.salaPicker}>
                  {ROOM_NAMES.map((name, i) => (
                    <button
                      key={name}
                      type="button"
                      className={s.salaBtn + (active === i ? ' ' + s.salaBtnActive : '')}
                      onClick={() => handleTab(i)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label className={s.label + ' mono'}>DATA WYDARZENIA</label>
                  <input type="date" className={s.input} value={form.data} onChange={e => setForm(f => ({ ...f, data: e.target.value }))} />
                </div>
                <div className={s.field}>
                  <label className={s.label + ' mono'}>LICZBA GOŚCI</label>
                  <input
                    type="number"
                    className={s.input}
                    placeholder={`max ${room.capacities.koncert}`}
                    value={form.goscie}
                    onChange={e => setForm(f => ({ ...f, goscie: e.target.value }))}
                  />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label + ' mono'}>NAZWA FIRMY</label>
                <input type="text" className={s.input} value={form.firma} onChange={e => setForm(f => ({ ...f, firma: e.target.value }))} />
              </div>

              <div className={s.field}>
                <label className={s.label + ' mono'}>E-MAIL</label>
                <input type="email" className={s.input} required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              <label className={s.rodo}>
                <input type="checkbox" className={s.rodoCheck} checked={form.rodo} onChange={e => setForm(f => ({ ...f, rodo: e.target.checked }))} />
                <span className={s.rodoText}>Wyrażam zgodę na przetwarzanie danych osobowych w celu udzielenia odpowiedzi na zapytanie.</span>
              </label>

              <button type="submit" className="btn btn-rental" style={{ width: '100%', justifyContent: 'center' }} disabled={!form.rodo}>
                Wyślij zapytanie
              </button>

              <p className={s.sla + ' mono'}>ODPOWIEDŹ W 24 H · PN–PT 9:00–17:00</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

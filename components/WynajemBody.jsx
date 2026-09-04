'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROOMS, localizeRoom, translateRoom } from '@/lib/events';
import Reveal, { RevealGroup } from './Reveal';
import s from './WynajemBody.module.css';

const ROOM_NAMES = Object.keys(ROOMS);

const LAYOUT_KEYS = ['koncert', 'teatralny', 'bankiet', 'koktajl', 'konferencja'];
const PACKAGE_NUMS = ['I', 'II', 'III'];

export default function WynajemBody({ t, locale = 'pl' }) {
  const tw = t.wynajem;
  const LAYOUTS = tw.layouts;
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState(0);
  const [form, setForm] = useState({ sala: ROOM_NAMES[0], data: '', goscie: '', firma: '', email: '', rodo: false });

  const room = localizeRoom(ROOM_NAMES[active], locale);
  const plan = room.plan;
  const galleryPhotos = room.photos ?? [];
  const gallerySlots = Math.max(4, galleryPhotos.length);
  const roomName = translateRoom(ROOM_NAMES[active], locale);

  function handleTab(i) {
    setActive(i);
    setForm(f => ({ ...f, sala: ROOM_NAMES[i] }));
  }

  return (
    <>
      {/* ─── INTRO ─── */}
      <section className={'section ' + s.intro}>
        <span className="section-label enter-fade d1">{tw.label}</span>
        <h1 className={'display ' + s.heading + ' enter-mask d2'}>{tw.heading1}<br />{tw.heading2}</h1>
        <p className={s.sub + ' enter d4'}>{tw.sub}</p>
      </section>

      {/* ─── TABS ─── */}
      <RevealGroup variant="up" step={70} className={s.tabs}>
        {ROOM_NAMES.map((name, i) => (
          <button key={name} className={s.tab + (active === i ? ' ' + s.tabActive : '')} onClick={() => handleTab(i)}>
            <span className={s.tabName}>{translateRoom(name, locale)}</span>
            <span className={s.tabMeta + ' mono'}>{ROOMS[name].area} m² · {tw.upTo} {ROOMS[name].capacities.koncert} {tw.people}</span>
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
                { label: tw.stats.area, value: room.area + ' m²' },
                { label: tw.stats.stage, value: room.stage },
                { label: tw.stats.priceFrom, value: room.priceFrom.toLocaleString(locale === 'en' ? 'en-GB' : 'pl-PL') + ' ' + tw.perDay },
              ].map(({ label, value }) => (
                <div key={label} className={s.stat}>
                  <span className={s.statLabel + ' mono'}>{label}</span>
                  <span className={s.statValue + ' mono'}>{value}</span>
                </div>
              ))}
            </div>

            {/* Layout selector */}
            <div className={s.layoutSection}>
              <span className="section-label" style={{ marginBottom: 10, display: 'block' }}>{tw.layoutLabel}</span>
              <div className={s.layoutFilters}>
                {LAYOUTS.map((l, i) => (
                  <button key={l} className={s.layoutBtn + (layout === i ? ' ' + s.layoutBtnActive : '')} onClick={() => setLayout(i)}>
                    {l}
                  </button>
                ))}
              </div>
              <div className={s.capacityDisplay}>
                <span className={s.capacityNum + ' mono'}>{room.capacities[LAYOUT_KEYS[layout]]}</span>
                <span className={s.capacityLabel + ' mono'}>{tw.capacityLabel} {LAYOUTS[layout].toLowerCase()}</span>
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
                  {LAYOUTS[layout]} · {room.capacities[LAYOUT_KEYS[layout]]} {tw.people.toUpperCase()}
                </span>
              </div>

              {/* Back of house */}
              {plan.rooms.map(([label, pos]) => (
                <div key={label} className={s.planRoom} style={pos}>
                  <span className={s.planRoomLabel + ' mono'}>{label}</span>
                </div>
              ))}

              <div className={s.planEntry}>
                <span className="mono">{tw.planEntry}</span>
              </div>
              <div className={s.planExit} style={{ left: '25%' }}>
                <span className="mono">{tw.planExit}</span>
              </div>
              <div className={s.planExit} style={{ right: '7%' }}>
                <span className="mono">{tw.planExit}</span>
              </div>

              <span className={s.planCompass + ' mono'}>N ↑</span>
            </div>

            <div className={s.planLegend}>
              {[
                { bg: 'rgba(252,204,0,0.14)', border: 'var(--zr-gold-dim)', label: tw.legend[0] },
                { bg: 'var(--zr-raised)', border: 'var(--zr-line)', label: tw.legend[1] },
                { bg: 'var(--zr-ok)', border: 'var(--zr-ok)', label: tw.legend[2] },
                { bg: 'var(--zr-sold)', border: 'var(--zr-sold)', label: tw.legend[3] },
              ].map(({ bg, border, label }) => (
                <span key={label} className={s.legendItem + ' mono'}>
                  <span className={s.legendSwatch} style={{ background: bg, borderColor: border }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Full technical spec */}
            <div className={s.techBlock}>
              <span className={s.techBlockLabel + ' mono'}>{tw.techLabel}</span>
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

      {/* ─── ROOM GALLERY ─── */}
      <section className={'section ' + s.gallerySection}>
        <div className={s.galleryHead}>
          <div>
            <span className="section-label">{tw.gallery}</span>
            <h2 className={'display ' + s.galleryTitle}>{roomName} {tw.galleryTitle}</h2>
          </div>
          {galleryPhotos.length < gallerySlots && (
            <span className={s.galleryNote + ' mono'}>
              {galleryPhotos.length ? tw.galleryMore : tw.gallerySoon}
            </span>
          )}
        </div>
        <div className={s.galleryGrid}>
          {Array.from({ length: gallerySlots }).map((_, i) => (
            <div key={i} className={'led-grid ' + s.galleryTile + (i === 0 ? ' ' + s.galleryTileWide : '')}>
              {galleryPhotos[i]
                ? <img src={galleryPhotos[i]} alt={`${roomName} — ${tw.photo.toLowerCase()} ${i + 1}`} className={s.galleryImg} />
                : <span className={s.galleryPlaceholder + ' mono'}>{tw.photo} {i + 1}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className={'section ' + s.compareSection}>
        <h2 className={'display ' + s.sectionHeading}>{tw.compare}</h2>
        <Reveal variant="up" className={s.compareTable}>
          <div className={s.compareHeader}>
            <span />
            {LAYOUTS.map(l => <span key={l} className={s.compareCol + ' mono'}>{l}</span>)}
          </div>
          {ROOM_NAMES.map((name, i) => (
            <div key={name} className={s.compareRow + (active === i ? ' ' + s.compareRowActive : '')} onClick={() => handleTab(i)}>
              <div className={s.compareRoomName}>
                <span className={'display ' + s.compareRoomTitle} style={{ color: active === i ? 'var(--zr-gold)' : 'var(--zr-text)' }}>{translateRoom(name, locale)}</span>
                <span className={'mono ' + s.comparePrice} style={{ color: active === i ? 'var(--zr-gold)' : 'var(--zr-muted)' }}>
                  {t.ticket.from} {ROOMS[name].priceFrom.toLocaleString(locale === 'en' ? 'en-GB' : 'pl-PL')} {t.ticket.currency}
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
            <h2 className={'display ' + s.sectionHeading}>{tw.packages}</h2>
            <RevealGroup variant="up" step={100} className={s.packages}>
              {tw.pkg.map((pkg, pi) => (
                <div key={PACKAGE_NUMS[pi]} className={s.package + (pkg.tag ? ' ' + s.packageFeatured : '')}>
                  {pkg.tag && <span className={s.packageTag + ' mono'}>{pkg.tag}</span>}
                  <span className={'display ' + s.packageNum}>{PACKAGE_NUMS[pi]}</span>
                  <h3 className={'display ' + s.packageName} style={{ color: pkg.tag ? 'var(--zr-gold)' : 'var(--zr-text)' }}>
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
            <p className={s.conditions + ' mono'}>{tw.conditions}</p>
          </div>

          {/* Form */}
          <Reveal variant="scale" className={s.formCard}>
            <div className={s.formHeader}>
              <span className="section-label">{tw.formLabel}</span>
              <h3 className={'display ' + s.formTitle}>{tw.formTitle}</h3>
            </div>

            <form className={s.form} onSubmit={e => e.preventDefault()}>
              <div className={s.field}>
                <label className={s.label + ' mono'}>{tw.fSala}</label>
                <div className={s.salaPicker}>
                  {ROOM_NAMES.map((name, i) => (
                    <button
                      key={name}
                      type="button"
                      className={s.salaBtn + (active === i ? ' ' + s.salaBtnActive : '')}
                      onClick={() => handleTab(i)}
                    >
                      {translateRoom(name, locale)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label className={s.label + ' mono'}>{tw.fData}</label>
                  <input type="date" className={s.input} value={form.data} onChange={e => setForm(f => ({ ...f, data: e.target.value }))} />
                </div>
                <div className={s.field}>
                  <label className={s.label + ' mono'}>{tw.fGoscie}</label>
                  <input
                    type="number"
                    className={s.input}
                    placeholder={`${tw.max} ${room.capacities.koncert}`}
                    value={form.goscie}
                    onChange={e => setForm(f => ({ ...f, goscie: e.target.value }))}
                  />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label + ' mono'}>{tw.fFirma}</label>
                <input type="text" className={s.input} value={form.firma} onChange={e => setForm(f => ({ ...f, firma: e.target.value }))} />
              </div>

              <div className={s.field}>
                <label className={s.label + ' mono'}>{tw.fEmail}</label>
                <input type="email" className={s.input} required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              <label className={s.rodo}>
                <input type="checkbox" className={s.rodoCheck} checked={form.rodo} onChange={e => setForm(f => ({ ...f, rodo: e.target.checked }))} />
                <span className={s.rodoText}>{tw.rodo}</span>
              </label>

              <button type="submit" className="btn btn-rental" style={{ width: '100%', justifyContent: 'center' }} disabled={!form.rodo}>
                {tw.submit}
              </button>

              <p className={s.sla + ' mono'}>{tw.sla}</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

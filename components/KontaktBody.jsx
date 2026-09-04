'use client';

import { useState } from 'react';
import Reveal, { RevealGroup } from './Reveal';
import s from './KontaktBody.module.css';

// Addresses and styling stay here; every string comes from the dictionary and is
// paired to a department by position.
const EMAILS = [
  'bilety@zakletyrewiry.pl',
  'booking@zakletyrewiry.pl',
  'wynajem@zakletyrewiry.pl',
  'prasa@zakletyrewiry.pl',
];
const DIR_STYLES = [
  { color: 'var(--zr-gold)', bg: 'rgba(252,204,0,0.15)' },
  { color: 'var(--zr-muted)', bg: 'transparent' },
  { color: 'var(--zr-muted)', bg: 'transparent' },
  { color: 'var(--zr-muted)', bg: 'transparent' },
  { color: 'var(--zr-muted)', bg: 'transparent' },
];
// index 2 is venue hire — the only topic that asks for a date and headcount
const HIRE_TOPIC = 2;

export default function KontaktBody({ t }) {
  const tk = t.kontakt;
  const [topic, setTopic] = useState(0);
  const [form, setForm] = useState({ email: '', message: '', rodo: false });

  return (
    <>
      {/* ─── HERO ─── */}
      <section className={'section ' + s.hero}>
        <div className={s.heroLeft + ' enter d1'}>
          <span className="section-label">{tk.label}</span>
          <h1 className={'display ' + s.heading}>{tk.h1a}<br />{tk.h1b}</h1>
          <p className={s.sub}>{tk.sub}</p>
        </div>
        <div className={s.heroRight + ' enter d3'}>
          <span className="section-label">{tk.switchboard}</span>
          <a href="tel:+48713001000" className={s.phone + ' display'}>71 300 10 00</a>
          <span className="mono" style={{ fontSize: 11.5, color: 'var(--zr-muted)', lineHeight: 1.9 }}>
            {tk.hours.map((h, i) => <span key={h}>{h}{i < tk.hours.length - 1 && <br />}</span>)}
          </span>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <Reveal variant="fade" className={s.mapSection}>
        <div className={s.mapWrap}>
          <iframe
            title={tk.mapTitle}
            src="https://www.google.com/maps?q=ul.+Krakowska+100+Wrocław&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={s.mapIframe}
          />
          <div className={s.mapOverlay} />
          <div className={s.mapCard}>
            <div className={s.mapCardAddr + ' mono'}>
              CKR ZAKLĘTE REWIRY<br />
              ul. Krakowska 100<br />
              50-001 Wrocław
            </div>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Krakowska+100+Wrocław"
            target="_blank"
            rel="noreferrer"
            className={'btn btn-gold ' + s.mapBtn}
          >
            {tk.route}
          </a>
        </div>

        <div className={s.directions}>
          <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>{tk.directionsLabel}</span>
          {tk.directions.map(([badge, desc], i) => {
            const { color, bg } = DIR_STYLES[i];
            return (
            <div key={badge} className={s.dirRow}>
              <span className={s.dirBadge + ' mono'} style={{ color, background: bg, border: `1px solid ${color === 'var(--zr-gold)' ? 'rgba(252,204,0,0.4)' : 'var(--zr-line)'}` }}>
                {badge}
              </span>
              <span className={s.dirDesc}>{desc}</span>
            </div>
            );
          })}
        </div>
      </Reveal>

      {/* ─── DEPARTMENTS ─── */}
      <section className={'section ' + s.depts}>
        <h2 className={'display ' + s.sectionHeading}>{tk.deptHeading}</h2>
        <RevealGroup variant="up" step={90} className={s.deptGrid}>
          {tk.depts.map((dept, i) => (
            <div key={dept.name} className={s.deptCard + (i === 0 ? ' ' + s.deptFeatured : '')}>
              <span className={'section-label ' + (i === 0 ? s.deptTagFeatured : '')}>{dept.name}</span>
              <p className={s.deptDesc}>{dept.desc}</p>
              <a href={`mailto:${EMAILS[i]}`} className={s.deptEmail + ' mono'}>{EMAILS[i]}</a>
              <span className={s.deptSla + ' mono'} style={{ color: i === 0 ? 'var(--zr-ok)' : 'var(--zr-muted)' }}>
                {dept.sla}
              </span>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── FORM ─── */}
      <section className={'section ' + s.formSection} style={{ background: 'var(--zr-surface-alt)' }}>
        <div className={s.formGrid}>
          <div className={s.formLeft}>
            <h2 className={'display ' + s.sectionHeading}>{tk.formHeading}</h2>
            <div className={s.invoiceData}>
              <span className="section-label" style={{ marginBottom: 10, display: 'block' }}>{tk.invoiceLabel}</span>
              <p className={'mono ' + s.invoiceText}>
                CKR Zaklęte Rewiry sp. z o.o.<br />
                ul. Krakowska 100, 50-001 Wrocław<br />
                NIP: 000-000-00-00 · REGON: 000000000
              </p>
            </div>
          </div>

          <Reveal variant="scale" className={s.formCard}>
            <div className={s.topicPicker}>
              {tk.topics.map((label, i) => (
                <button
                  key={label}
                  className={s.topicBtn + (topic === i ? ' ' + s.topicBtnActive : '')}
                  onClick={() => setTopic(i)}
                >
                  {label}
                </button>
              ))}
            </div>

            <form className={s.form} onSubmit={e => e.preventDefault()}>
              <div className={s.field}>
                <label className={s.label + ' mono'}>{tk.fEmail}</label>
                <input type="email" required className={s.input} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              {topic === HIRE_TOPIC && (
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <label className={s.label + ' mono'}>{tk.fDate}</label>
                    <input type="date" className={s.input} />
                  </div>
                  <div className={s.field}>
                    <label className={s.label + ' mono'}>{tk.fGuests}</label>
                    <input type="number" className={s.input} placeholder={tk.guestsPlaceholder} />
                  </div>
                </div>
              )}

              <div className={s.field}>
                <label className={s.label + ' mono'}>{tk.fMessage}</label>
                <textarea
                  rows={5}
                  className={s.input}
                  placeholder={tk.placeholders[topic]}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <label className={s.rodo}>
                <input type="checkbox" className={s.rodoCheck} checked={form.rodo} onChange={e => setForm(f => ({ ...f, rodo: e.target.checked }))} />
                <span className={s.rodoText}>{tk.rodo}</span>
              </label>

              <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} disabled={!form.rodo}>
                {tk.submit}
              </button>

              <div className={s.formFooter + ' mono'}>
                <span>→ {EMAILS[topic]}</span>
                <span style={{ color: 'var(--zr-ok)' }}>{tk.depts[topic].sla}</span>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

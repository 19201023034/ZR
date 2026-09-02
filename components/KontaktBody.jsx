'use client';

import { useState } from 'react';
import Reveal, { RevealGroup } from './Reveal';
import s from './KontaktBody.module.css';

const TOPICS = ['Bilety', 'Booking', 'Wynajem sali', 'Prasa'];

const DEPARTMENTS = [
  {
    name: 'BILETY',
    desc: 'Zamówienia, faktury,\nzwroty, przepisanie wejściówki',
    email: 'bilety@zakletyrewiry.pl',
    sla: 'Tego samego dnia',
    slaOk: true,
    featured: true,
  },
  {
    name: 'BOOKING',
    desc: 'Propozycje koncertów,\nriderzy, terminy dla agencji',
    email: 'booking@zakletyrewiry.pl',
    sla: 'Do 5 dni roboczych',
    slaOk: false,
  },
  {
    name: 'WYNAJEM',
    desc: 'Gale, konferencje,\nwycena, dostępność',
    email: 'wynajem@zakletyrewiry.pl',
    sla: 'W 24 godziny',
    slaOk: false,
  },
  {
    name: 'PRASA',
    desc: 'Akredytacje, zdjęcia,\nmateriały, patronaty',
    email: 'prasa@zakletyrewiry.pl',
    sla: 'Do 3 dni przed wydarzeniem',
    slaOk: false,
  },
];

const TOPICEMAILS = {
  Bilety: 'bilety@zakletyrewiry.pl',
  Booking: 'booking@zakletyrewiry.pl',
  'Wynajem sali': 'wynajem@zakletyrewiry.pl',
  Prasa: 'prasa@zakletyrewiry.pl',
};

const TOPICSLA = {
  Bilety: 'Tego samego dnia',
  Booking: 'Do 5 dni roboczych',
  'Wynajem sali': 'W 24 godziny',
  Prasa: 'Do 3 dni przed wydarzeniem',
};

const TOPICPLACEHOLDER = {
  Bilety: 'Numer zamówienia, problem z biletem…',
  Booking: 'Nazwa artysty, proponowany termin, link do EPK…',
  'Wynajem sali': 'Rodzaj wydarzenia, liczba gości, preferowany termin…',
  Prasa: 'Nazwa medium, rodzaj akredytacji, wydarzenie…',
};

export default function KontaktBody() {
  const [topic, setTopic] = useState('Bilety');
  const [form, setForm] = useState({ email: '', message: '', rodo: false });

  return (
    <>
      {/* ─── HERO ─── */}
      <section className={'section ' + s.hero}>
        <div className={s.heroLeft + ' enter d1'}>
          <span className="section-label">Centrum Kultury Rockowej</span>
          <h1 className={'display ' + s.heading}>Krakowska 100,<br />Wrocław</h1>
          <p className={s.sub}>
            Wejście główne od ul. Krakowskiej. Parking własny od ul. bocznej.
            Obiekt dostępny dla osób z niepełnosprawnościami.
          </p>
        </div>
        <div className={s.heroRight + ' enter d3'}>
          <span className="section-label">CENTRALA</span>
          <a href="tel:+48713001000" className={s.phone + ' display'}>71 300 10 00</a>
          <span className="mono" style={{ fontSize: 11.5, color: 'var(--zr-muted)', lineHeight: 1.9 }}>
            Biuro PN–PT 9:00–17:00<br />
            Kasy PN–SOB 14:00–22:00<br />
            Bar PN–SOB 16:00–2:00
          </span>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <Reveal variant="fade" className={s.mapSection}>
        <div className={s.mapWrap}>
          <iframe
            title="Mapa Zaklęte Rewiry"
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
            Wyznacz trasę
          </a>
        </div>

        <div className={s.directions}>
          <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>JAK DOTRZEĆ</span>
          {[
            { badge: 'TRAM', color: 'var(--zr-gold)', bg: 'rgba(252,204,0,0.15)', desc: 'Linie 3, 5 — przystanek Krakowska' },
            { badge: 'BUS', color: 'var(--zr-muted)', bg: 'transparent', desc: 'Linie 114, 243 — przystanek Krakowska' },
            { badge: 'AUTO', color: 'var(--zr-muted)', bg: 'transparent', desc: 'Parking 80 miejsc (ul. boczna, bezpłatny)' },
            { badge: 'ROWER', color: 'var(--zr-muted)', bg: 'transparent', desc: 'Stojaki rowerowe przy wejściu' },
            { badge: 'A11Y', color: 'var(--zr-muted)', bg: 'transparent', desc: 'Wejście bez progów, winda, miejsca dla wózków, asysta na zgłoszenie' },
          ].map(({ badge, color, bg, desc }) => (
            <div key={badge} className={s.dirRow}>
              <span className={s.dirBadge + ' mono'} style={{ color, background: bg, border: `1px solid ${color === 'var(--zr-gold)' ? 'rgba(252,204,0,0.4)' : 'var(--zr-line)'}` }}>
                {badge}
              </span>
              <span className={s.dirDesc}>{desc}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ─── DEPARTMENTS ─── */}
      <section className={'section ' + s.depts}>
        <h2 className={'display ' + s.sectionHeading}>Napisz do nas</h2>
        <RevealGroup variant="up" step={90} className={s.deptGrid}>
          {DEPARTMENTS.map(dept => (
            <div key={dept.name} className={s.deptCard + (dept.featured ? ' ' + s.deptFeatured : '')}>
              <span className={'section-label ' + (dept.featured ? s.deptTagFeatured : '')}>{dept.name}</span>
              <p className={s.deptDesc}>{dept.desc}</p>
              <a href={`mailto:${dept.email}`} className={s.deptEmail + ' mono'}>{dept.email}</a>
              <span className={s.deptSla + ' mono'} style={{ color: dept.slaOk ? 'var(--zr-ok)' : 'var(--zr-muted)' }}>
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
            <h2 className={'display ' + s.sectionHeading}>Wyślij wiadomość</h2>
            <div className={s.invoiceData}>
              <span className="section-label" style={{ marginBottom: 10, display: 'block' }}>DANE DO FAKTUR</span>
              <p className={'mono ' + s.invoiceText}>
                CKR Zaklęte Rewiry sp. z o.o.<br />
                ul. Krakowska 100, 50-001 Wrocław<br />
                NIP: 000-000-00-00 · REGON: 000000000
              </p>
            </div>
          </div>

          <Reveal variant="scale" className={s.formCard}>
            <div className={s.topicPicker}>
              {TOPICS.map(t => (
                <button
                  key={t}
                  className={s.topicBtn + (topic === t ? ' ' + s.topicBtnActive : '')}
                  onClick={() => setTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <form className={s.form} onSubmit={e => e.preventDefault()}>
              <div className={s.field}>
                <label className={s.label + ' mono'}>E-MAIL</label>
                <input type="email" required className={s.input} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              {(topic === 'Wynajem sali') && (
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <label className={s.label + ' mono'}>DATA</label>
                    <input type="date" className={s.input} />
                  </div>
                  <div className={s.field}>
                    <label className={s.label + ' mono'}>LICZBA GOŚCI</label>
                    <input type="number" className={s.input} placeholder="np. 200" />
                  </div>
                </div>
              )}

              <div className={s.field}>
                <label className={s.label + ' mono'}>WIADOMOŚĆ</label>
                <textarea
                  rows={5}
                  className={s.input}
                  placeholder={TOPICPLACEHOLDER[topic]}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <label className={s.rodo}>
                <input type="checkbox" className={s.rodoCheck} checked={form.rodo} onChange={e => setForm(f => ({ ...f, rodo: e.target.checked }))} />
                <span className={s.rodoText}>Zgadzam się na przetwarzanie danych osobowych w celu udzielenia odpowiedzi.</span>
              </label>

              <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} disabled={!form.rodo}>
                Wyślij wiadomość
              </button>

              <div className={s.formFooter + ' mono'}>
                <span>→ {TOPICEMAILS[topic]}</span>
                <span style={{ color: 'var(--zr-ok)' }}>{TOPICSLA[topic]}</span>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

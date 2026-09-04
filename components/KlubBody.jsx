'use client';

import Link from 'next/link';
import Reveal, { RevealGroup } from './Reveal';
import Counter from './Counter';
import { ROOMS, translateRoom } from '@/lib/events';
import s from './KlubBody.module.css';

// Icons and years carry no language; the copy comes from the dictionary and the
// hall figures are read from ROOMS so this page can't drift from /wynajem.
const STAT_VALUES = ['10+', '1000', '3', '100+'];
const WHAT_ICONS = ['♪', '◈', '◉', '✦'];
const YEARS = ['2013', '2016', '2019', '2023'];

export default function KlubBody({ t, locale = 'pl' }) {
  const tk = t.klub;
  const ROOM_NAMES = Object.keys(ROOMS);
  return (
    <>
      {/* ─── HERO ─── */}
      <section className={'section ' + s.hero}>
        <div className={s.heroLabel + ' mono section-label enter-fade d1'}>{tk.label}</div>
        <h1 className={'display ' + s.heroTitle + ' enter-mask d2'}>
          {tk.h1a}<br />{tk.h1b}
        </h1>
        <p className={s.heroSub + ' enter d4'}>{tk.sub}</p>
        <div className={s.heroCtas + ' enter d5'}>
          <Link href="/repertuar" className="btn btn-gold">{tk.ctaProgramme}</Link>
          <Link href="/wynajem" className="btn btn-outline">{tk.ctaHire}</Link>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <RevealGroup as="section" variant="up" step={110} className={s.statsBar}>
        {STAT_VALUES.map((value, i) => (
          <div key={value} className={s.statItem}>
            <Counter value={value} className={'display ' + s.statValue} />
            <span className={'mono ' + s.statLabel}>{tk.stats[i]}</span>
          </div>
        ))}
      </RevealGroup>

      {/* ─── ABOUT ─── */}
      <section className={'section ' + s.about}>
        <div className={s.aboutGrid}>
          <Reveal variant="left" className={s.aboutLeft}>
            <span className="section-label">{tk.aboutLabel}</span>
            <h2 className={'display ' + s.aboutHeading}>{tk.aboutHeading}</h2>
          </Reveal>
          <RevealGroup variant="up" step={130} className={s.aboutRight}>
            {tk.about.map(p => <p key={p.slice(0, 24)} className={s.aboutPara}>{p}</p>)}
          </RevealGroup>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className={'section ' + s.whatSection}>
        <Reveal variant="mask">
          <span className="section-label">{tk.whatLabel}</span>
          <h2 className={'display ' + s.sectionHeading}>{tk.whatHeading}</h2>
        </Reveal>
        <RevealGroup variant="up" step={100} className={s.whatGrid}>
          {tk.what.map((item, i) => (
            <div key={item.title} className={s.whatCard}>
              <span className={s.whatIcon}>{WHAT_ICONS[i]}</span>
              <h3 className={'display ' + s.whatTitle}>{item.title}</h3>
              <p className={s.whatDesc}>{item.desc}</p>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── ROOMS QUICK ─── */}
      <section className={'section ' + s.roomsSection}>
        <Reveal className={s.roomsHeader}>
          <div>
            <span className="section-label">{tk.roomsLabel}</span>
            <h2 className={'display ' + s.sectionHeading}>{tk.roomsHeading}</h2>
          </div>
          <Link href="/wynajem" className="btn btn-outline-gold">
            {tk.roomsLink}
          </Link>
        </Reveal>
        <RevealGroup variant="up" step={110} className={s.roomsGrid}>
          {ROOM_NAMES.map((name, i) => (
            <div key={name} className={s.roomCard}>
              <div className={'led-grid ' + s.roomLed} />
              <div className={s.roomInfo}>
                <h3 className={'display ' + s.roomName}>{translateRoom(name, locale)}</h3>
                <div className={s.roomMeta + ' mono'}>
                  <span>{ROOMS[name].area} m²</span>
                  <span className={s.roomMetaDot}>·</span>
                  <span>{tk.upTo} {ROOMS[name].capacities.koncert} {tk.people}</span>
                </div>
                <p className={s.roomDesc}>{tk.roomDesc[i]}</p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className={'section ' + s.timelineSection}>
        <Reveal variant="mask">
          <span className="section-label">{tk.historyLabel}</span>
          <h2 className={'display ' + s.sectionHeading}>{tk.historyHeading}</h2>
        </Reveal>
        <div className={s.timeline}>
          {tk.timeline.map((item, i) => (
            <Reveal key={YEARS[i]} variant="left" delay={i * 90} className={s.timelineItem}>
              <div className={s.timelineLeft}>
                <span className={'display ' + s.timelineYear}>{YEARS[i]}</span>
                <span className={'mono ' + s.timelineLabel}>{item.label}</span>
              </div>
              <div className={s.timelineLine}>
                <div className={s.timelineDot} />
                {i < tk.timeline.length - 1 && <div className={s.timelineConnector} />}
              </div>
              <div className={s.timelineRight}>
                <p className={s.timelineDesc}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={s.ctaSection}>
        <div className="section">
          <Reveal variant="scale" className={s.ctaInner}>
            <div>
              <h2 className={'display ' + s.ctaHeading}>{tk.ctaHeading}</h2>
              <p className={s.ctaSub}>{tk.ctaSub}</p>
            </div>
            <div className={s.ctaActions}>
              <Link href="/kontakt" className="btn btn-gold">{t.common.writeUs}</Link>
              <Link href="/wynajem" className="btn btn-outline">{tk.ctaOffer}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

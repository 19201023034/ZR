'use client';

import { useState } from 'react';
import PanelEvents from './PanelEvents';
import PanelNewsletter from './PanelNewsletter';
import PanelOferta from './PanelOferta';
import s from './PanelShell.module.css';

const TAB_IDS = ['wydarzenia', 'newsletter', 'oferta'];

export default function PanelShell({ events = [], t, locale = 'pl' }) {
  const [tab, setTab] = useState('wydarzenia');
  const TABS = TAB_IDS.map((id, i) => ({ id, ...t.tabs[i] }));

  return (
    <div className={s.wrap}>
      <div className={s.bar}>
        <div className={s.brand}>
          <span className="section-label">{t.brand}</span>
          <h1 className={'display ' + s.title}>{t.heading}</h1>
        </div>
        <nav className={s.tabs} aria-label={t.sections}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={s.tab + (tab === t.id ? ' ' + s.tabActive : '')}
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
            >
              <span className={s.tabLabel}>{t.label}</span>
              <span className={s.tabHint + ' mono'}>{t.hint}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={s.body}>
        {tab === 'wydarzenia' && <PanelEvents />}
        {tab === 'newsletter' && <PanelNewsletter events={events} locale={locale} />}
        {tab === 'oferta' && <PanelOferta />}
      </div>
    </div>
  );
}

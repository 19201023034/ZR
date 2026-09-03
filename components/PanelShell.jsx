'use client';

import { useState } from 'react';
import PanelEvents from './PanelEvents';
import PanelNewsletter from './PanelNewsletter';
import PanelOferta from './PanelOferta';
import s from './PanelShell.module.css';

const TABS = [
  { id: 'wydarzenia', label: 'Wydarzenia', hint: 'Dodawaj i publikuj koncerty' },
  { id: 'newsletter', label: 'Newsletter', hint: 'Zapowiedzi na maila' },
  { id: 'oferta', label: 'Oferta', hint: 'Wyceny wynajmu dla firm' },
];

export default function PanelShell({ events = [] }) {
  const [tab, setTab] = useState('wydarzenia');

  return (
    <div className={s.wrap}>
      <div className={s.bar}>
        <div className={s.brand}>
          <span className="section-label">Panel · Zaklęte Rewiry</span>
          <h1 className={'display ' + s.title}>Zarządzanie</h1>
        </div>
        <nav className={s.tabs} aria-label="Sekcje panelu">
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
        {tab === 'newsletter' && <PanelNewsletter events={events} />}
        {tab === 'oferta' && <PanelOferta />}
      </div>
    </div>
  );
}

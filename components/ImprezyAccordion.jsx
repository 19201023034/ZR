'use client';

import { useState } from 'react';
import s from './ImprezyAccordion.module.css';

const OCCASIONS = [
  {
    title: 'Urodziny i jubileusze',
    teaser: 'Okrągłe rocznice, osiemnastki i huczne urodziny z oprawą sceniczną.',
    body: 'Przyjęcie urodzinowe lub jubileuszowe we Wrocławiu, które zapamiętają goście — od kameralnych spotkań po imprezy na kilkaset osób. Do dyspozycji scena, klubowe oświetlenie, nagłośnienie pod zespół lub DJ-a oraz własny bar i kuchnia. Pomożemy z dekoracją, tortem i programem artystycznym.',
  },
  {
    title: 'Wesela i przyjęcia',
    teaser: 'Nietuzinkowa alternatywa dla sali weselnej — parkiet, scena i klimat klubu.',
    body: 'Szukasz sali weselnej we Wrocławiu z charakterem? Zaklęte Rewiry to przestrzeń dla par, które chcą wesela w klimacie koncertu. Duży parkiet, profesjonalny dźwięk dla zespołu lub DJ-a, catering i miejsce nawet na 1000 gości. Możliwa organizacja poprawin kolejnego dnia.',
  },
  {
    title: 'Spotkania rodzinne',
    teaser: 'Komunie, chrzciny i spotkania pokoleniowe w kameralnej lub dużej sali.',
    body: 'Przyjęcia komunijne, chrzciny, rocznice ślubu i spotkania rodzinne w elastycznych salach od 90 do 550 m². Menu dopasujemy do gości w każdym wieku, a osobne wejścia pozwalają prowadzić spotkanie niezależnie od reszty obiektu.',
  },
  {
    title: 'Studniówki i bale',
    teaser: 'Przestrzeń na kilkaset osób z profesjonalnym nagłośnieniem i światłem.',
    body: 'Sala na studniówkę lub bal maturalny we Wrocławiu z prawdziwą sceną, oświetleniem i parkietem. Pomieścimy kilka klas naraz, zapewnimy obsługę techniczną, ochronę i catering — Wy zajmujecie się tylko zabawą.',
  },
  {
    title: 'Sylwester i andrzejki',
    teaser: 'Imprezy tematyczne z pełną oprawą techniczną i barem.',
    body: 'Sylwester, andrzejki i bale karnawałowe w klubowych klimatach — DJ, światło sceniczne i bar. Organizujemy zarówno wydarzenia zamknięte dla firm i grup, jak i otwarte imprezy biletowane.',
  },
  {
    title: 'Wieczory tematyczne',
    teaser: 'Retro show, potańcówki i bankiety z programem artystycznym.',
    body: 'Potańcówki, wieczory retro, bankiety z programem artystycznym i pokazami. Elastyczny układ sali — od rzędów teatralnych po stoły bankietowe — pozwala zrealizować dowolny scenariusz wieczoru.',
  },
];

export default function ImprezyAccordion() {
  const [open, setOpen] = useState(0); // first one open by default

  return (
    <div className={s.list}>
      {OCCASIONS.map((o, i) => {
        const isOpen = open === i;
        return (
          <div key={o.title} className={s.item + (isOpen ? ' ' + s.itemOpen : '')}>
            <button
              className={s.head}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className={'display ' + s.title}>{o.title}</span>
              <span className={s.icon} aria-hidden="true" />
            </button>
            {isOpen && (
              <div className={s.panel}>
                <p className={s.teaser}>{o.teaser}</p>
                <p className={s.body}>{o.body}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

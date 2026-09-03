// Rental offer content — lifted verbatim from the design handoff
// (design/Oferta wynajmu.dc.html). Single source for the public offer page
// and the panel's offer builder, so they can never drift apart.

export const PACKAGES = [
  {
    id: 'I',
    name: 'Pakiet I',
    tag: null,
    desc: 'Przestrzeń, szatnia, ochrona, sprzątanie, koordynator obiektu. Technika własna klienta.',
  },
  {
    id: 'II',
    name: 'Pakiet II',
    tag: 'Najczęściej wybierany',
    desc: 'Pakiet I oraz nagłośnienie, oświetlenie, projekcja i dwóch techników na czas wydarzenia.',
  },
  {
    id: 'III',
    name: 'Pakiet III',
    tag: null,
    desc: 'Pakiet II oraz catering i bar, obsługa kelnerska, scenografia, rejestracja wideo.',
  },
];

export const FINE_PRINT =
  'Ceny netto, nie zawierają 23% VAT. Doba techniczna liczona od 8:00 do 2:00 dnia ' +
  'następnego. Rezerwacja terminu po wpłacie 30% zadatku, rozliczenie końcowe 14 dni ' +
  'po wydarzeniu. Montaż i próby w dniu poprzedzającym wyceniamy jako 40% stawki ' +
  'dobowej. Obiekt posiada aktualne zezwolenia i ubezpieczenie OC organizatora.';

// Occasions the operator picks from when building an offer.
export const OCCASIONS = [
  'Gala', 'Konferencja', 'Impreza firmowa', 'Premiera / pokaz',
  'Bankiet', 'Koncert', 'Szkolenie', 'Impreza okolicznościowa',
];

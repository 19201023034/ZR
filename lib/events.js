// Mock events data — replace with CMS/DB calls
export const EVENTS = [
  {
    id: '1',
    artist: 'Riverside',
    support: 'Votum',
    genre: 'Rock',
    date: '2026-11-14',
    doors: '19:00',
    start: '20:00',
    venue: 'Sala Duża',
    capacity: 1000,
    priceFrom: 89,
    priceDay: 109,
    pool: 850,
    sold: 620,
    status: 'dostepne', // dostepne | ostatnie | wyprzedane | przedsprzedaz
    poster: null,
    description: 'Jeden z najważniejszych polskich zespołów progresywnych powraca do Wrocławia.',
    ageMin: 16,
  },
  {
    id: '2',
    artist: 'Taco Hemingway',
    support: null,
    genre: 'Rap',
    date: '2026-11-22',
    doors: '18:30',
    start: '19:30',
    venue: 'Sala Duża',
    capacity: 1000,
    priceFrom: 129,
    priceDay: 149,
    pool: 1000,
    sold: 1000,
    status: 'wyprzedane',
    poster: null,
    description: null,
    ageMin: 16,
  },
  {
    id: '3',
    artist: 'Dezerter',
    support: 'Homomilitia',
    genre: 'Rock',
    date: '2026-12-05',
    doors: '19:00',
    start: '20:00',
    venue: 'Sala Klubowa',
    capacity: 400,
    priceFrom: 59,
    priceDay: 69,
    pool: 400,
    sold: 390,
    status: 'ostatnie',
    poster: null,
    description: null,
    ageMin: 18,
  },
  {
    id: '4',
    artist: 'FOQL',
    support: null,
    genre: 'Elektronika',
    date: '2026-12-12',
    doors: '22:00',
    start: '23:00',
    venue: 'Sala Klubowa',
    capacity: 400,
    priceFrom: 49,
    priceDay: 59,
    pool: 400,
    sold: 80,
    status: 'dostepne',
    poster: null,
    description: null,
    ageMin: 18,
  },
  {
    id: '5',
    artist: 'Zbigniew Zamachowski',
    support: null,
    genre: 'Stand-up',
    date: '2026-12-19',
    doors: '19:30',
    start: '20:30',
    venue: 'Sala Kameralna',
    capacity: 150,
    priceFrom: 79,
    priceDay: 89,
    pool: 150,
    sold: 20,
    status: 'dostepne',
    poster: null,
    description: null,
    ageMin: 16,
  },
];

export const ARTISTS_ARCHIVE = [
  'Behemoth', 'Korn', 'Massive Attack', 'Hey', 'Myslovitz',
  'Muse', 'The Cure', 'Placebo', 'Skunk Anansie', 'Fisz Emade',
  'Tede', 'Organek', 'Łona i Webber', 'Hurt',
];

// Realny program klubu wychodzi poza samą muzykę — bywa wrestling, teatr,
// techno i imprezy. Filtry na stronie pokazują tylko te pozycje, które
// faktycznie mają wydarzenia, więc lista może być szeroka bez zaśmiecania UI.
// English overlay for the halls. Only the prose and the plan labels differ —
// geometry, capacities and prices are shared, so they live once in ROOMS.
const ROOM_COPY_EN = {
  'Sala Duża': {
    dimensions: '30.5 × 18.0 m', height: '7.4 m',
    tag: 'MAIN HALL · LARGEST',
    headline: 'Galas, concerts and large conferences',
    body: 'The largest space in the building, with a full-size stage and truck access straight onto stage level. It works for industry galas, conferences with projection, and concerts for a thousand people.',
    tech: [
      ['SOUND', 'd&b V-SERIES · 24 kW'],
      ['LIGHTING', '48 × LED · 8 × MOVING'],
      ['PROJECTION', 'LED 6 × 3 m · 12,000 ANSI'],
      ['POWER', '2 × 63 A · DMX · DANTE'],
      ['LOADING', 'DOOR 3.2 × 2.8 m · TRUCK'],
    ],
    plan: {
      scale: 'PLAN 1:200 · TOP VIEW',
      stageLabel: 'Stage',
      stageDims: '10.0 × 5.0 m · H 1.1 m',
      zone: ['MAIN FLOOR', 'STANDING · 720 PPL'],
      rooms: ['BAR 12 m', 'CLOAKROOM\n900 SPACES', 'DRESSING 1–3', 'TOILETS', 'TECH\nSTORE', 'LOADING\n3.2 × 2.8 m'],
    },
  },
  'Sala Klubowa': {
    dimensions: '21.0 × 10.0 m', height: '5.2 m',
    tag: 'CLUB ROOM · MEDIUM',
    headline: 'Company parties and product launches',
    body: 'A club-style room with its own bar and a low stage. Most often booked for company evenings, launches, showcases and club gigs for up to four hundred people.',
    tech: [
      ['SOUND', 'd&b Y-SERIES · 12 kW'],
      ['LIGHTING', '24 × LED · 4 × MOVING'],
      ['PROJECTION', 'SCREEN 4 × 2.5 m'],
      ['POWER', '1 × 63 A · DMX · LAN'],
      ['LOADING', 'SERVICE DOOR 2.4 m'],
    ],
    plan: {
      scale: 'PLAN 1:150 · TOP VIEW',
      stageLabel: 'Stage',
      stageDims: '24 m² · H 0.6 m',
      zone: ['DANCE FLOOR', 'STANDING · 280 PPL'],
      rooms: ['BAR 7 m', 'CLOAKROOM\n400 SPACES', 'DRESSING 1–2', 'TOILETS', 'BACK OF HOUSE', 'SERVICE\nENTRANCE'],
    },
  },
  'Sala Kameralna': {
    dimensions: '12.0 × 7.5 m', height: '3.8 m', stage: 'riser 12 m²',
    tag: 'STUDIO ROOM · SMALLEST',
    headline: 'Training, board meetings and stand-up',
    body: 'The most intimate of the three spaces. Training, workshops, board meetings, stand-up and recordings. A separate entrance from the courtyard lets the event run independently of the rest of the building.',
    tech: [
      ['SOUND', 'd&b E-SERIES · 4 kW'],
      ['LIGHTING', '12 × LED · FOLLOW SPOT'],
      ['PROJECTION', 'SCREEN 3 × 2 m · 6,000 ANSI'],
      ['POWER', '1 × 32 A · LAN · DMX'],
      ['ACCESS', 'SEPARATE COURTYARD ENTRANCE'],
    ],
    plan: {
      scale: 'PLAN 1:100 · TOP VIEW',
      stageLabel: 'Riser',
      stageDims: '12 m² · H 0.4 m',
      zone: ['GUEST AREA', 'CLASSROOM · 80 PPL'],
      rooms: ['BUFFET', 'CLOAKROOM', 'SPEAKER ROOM', 'TOILETS', 'STORE', 'COURTYARD\nENTRANCE'],
    },
  },
};

/**
 * A hall with its prose and plan labels in the requested language.
 * Geometry stays untouched — only the strings are swapped.
 */
export function localizeRoom(name, locale = 'pl') {
  const room = ROOMS[name];
  if (locale !== 'en' || !ROOM_COPY_EN[name]) return room;
  const en = ROOM_COPY_EN[name];
  return {
    ...room,
    ...(en.dimensions ? { dimensions: en.dimensions } : {}),
    ...(en.height ? { height: en.height } : {}),
    ...(en.stage ? { stage: en.stage } : {}),
    tag: en.tag,
    headline: en.headline,
    body: en.body,
    tech: en.tech,
    plan: {
      ...room.plan,
      scale: en.plan.scale,
      stage: { ...room.plan.stage, label: en.plan.stageLabel, dims: en.plan.stageDims },
      zone: en.plan.zone,
      rooms: room.plan.rooms.map(([, pos], i) => [en.plan.rooms[i], pos]),
    },
  };
}

export const GENRES = [
  'Rock', 'Metal', 'Punk', 'Rap', 'Elektronika', 'Techno',
  'Klasyka', 'Stand-up', 'Teatr', 'Sport', 'Impreza', 'Inne',
];

// English labels for the taxonomy shown in the UI. The Polish string stays the
// canonical key everywhere (store, filters, JSON), so only the display is swapped.
const GENRE_EN = {
  'Elektronika': 'Electronic', 'Klasyka': 'Classical', 'Teatr': 'Theatre',
  'Impreza': 'Party', 'Inne': 'Other',
};
const ROOM_EN = {
  'Sala Duża': 'Main Hall', 'Sala Klubowa': 'Club Room', 'Sala Kameralna': 'Studio Room',
};

/**
 * Ile dni dzieli nas od wydarzenia — liczone w strefie Warszawy, żeby „dziś"
 * znaczyło dziś w klubie, a nie u kogoś, kto ogląda stronę z Londynu.
 *
 * Liczone WYŁĄCZNIE po stronie serwera (store dokłada wynik do wydarzenia).
 * Gdyby liczył to komponent kliencki, serwer i przeglądarka mogłyby wypaść
 * po dwóch stronach północy i React zgłosiłby rozjazd hydratacji.
 */
export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const warsawToday = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
  const MS_PER_DAY = 86_400_000;
  const diff = Date.parse(`${dateStr}T00:00:00Z`) - Date.parse(`${warsawToday}T00:00:00Z`);
  return Math.round(diff / MS_PER_DAY);
}

/** Etykieta odliczania, albo null gdy termin jest zbyt odległy, by mówić coś sensownego. */
export function countdownLabel(days, locale = 'pl', horizon = 30) {
  if (days == null || days < 0 || days > horizon) return null;
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  if (locale === 'en') {
    if (days === 0) return 'today';
    if (days === 1) return 'tomorrow';
    if (days < 14) return `in ${days} days`;
    if (days < 60) return `in ${weeks} weeks`;
    return `in ${months} months`;
  }
  if (days === 0) return 'dziś';
  if (days === 1) return 'jutro';
  if (days < 14) return `za ${days} dni`;
  if (days < 60) return `za ${weeks} tyg.`;
  // pl: 1 miesiąc / 2-4 miesiące / 5+ miesięcy
  const m = months % 10, h = months % 100;
  const word = months === 1 ? 'miesiąc'
    : (m >= 2 && m <= 4 && !(h >= 12 && h <= 14)) ? 'miesiące' : 'miesięcy';
  return `za ${months} ${word}`;
}

export function translateGenre(g, locale = 'pl') {
  return locale === 'en' ? (GENRE_EN[g] || g) : g;
}

export function translateRoom(r, locale = 'pl') {
  return locale === 'en' ? (ROOM_EN[r] || r) : r;
}

export const ROOMS = {
  'Sala Duża': {
    photos: ['/assets/venue/s1.webp', '/assets/venue/s3.webp', '/assets/venue/s2.webp'],
    area: 550,
    dimensions: '30,5 × 18,0 m',
    height: '7,4 m',
    stage: '50 m²',
    capacities: { koncert: 1000, teatralny: 520, bankiet: 380, koktajl: 700, konferencja: 450 },
    priceFrom: 9800,
    sound: 'd&b V-Series, 24 kW',
    light: '48 × LED, 8 × moving',
    projection: 'LED 6 × 3 m, 12 000 ANSI',

    tag: 'SALA DUŻA · NAJWIĘKSZA',
    headline: 'Gale, koncerty i duże konferencje',
    body: 'Największa przestrzeń obiektu z pełnowymiarową sceną i dojazdem dla TIR-a bezpośrednio na jej poziom. Sprawdza się przy galach branżowych, konferencjach z projekcją i koncertach na tysiąc osób.',
    guests: '300–1000',
    tech: [
      ['NAGŁOŚNIENIE', 'd&b V-SERIES · 24 kW'],
      ['OŚWIETLENIE', '48 × LED · 8 × MOVING'],
      ['PROJEKCJA', 'LED 6 × 3 m · 12 000 ANSI'],
      ['PRZYŁĄCZA', '2 × 63 A · DMX · DANTE'],
      ['LOADING', 'BRAMA 3,2 × 2,8 m · TIR'],
    ],
    // technical floor plan — percentages/px map onto the 420px plan canvas
    plan: {
      scale: 'RZUT 1:200 · WIDOK Z GÓRY',
      stage: { label: 'Scena', dims: '10,0 × 5,0 m · H 1,1 m', left: '24%', right: '24%', height: 88 },
      zone: ['PŁYTA WIDOWNI', 'STOJĄCA · 720 OS.'],
      rooms: [
        ['BAR 12 m',            { left: 14, top: 14,  width: '17%', height: 62 }],
        ['SZATNIA\n900 MIEJSC', { left: 14, top: 88,  width: '17%', height: 58 }],
        ['GARDEROBY 1–3',       { left: 14, top: 160, width: '17%', height: 92 }],
        ['TOALETY',             { right: 14, top: 14,  width: '17%', height: 62 }],
        ['MAGAZYN\nTECHNIKI',   { right: 14, top: 88,  width: '17%', height: 58 }],
        ['LOADING\n3,2 × 2,8 m', { right: 14, top: 160, width: '17%', height: 92 }],
      ],
    },
  },
  'Sala Klubowa': {
    photos: ['/assets/venue/s4.webp', '/assets/venue/s5.webp'],
    area: 210,
    dimensions: '21,0 × 10,0 m',
    height: '5,2 m',
    stage: '24 m²',
    capacities: { koncert: 400, teatralny: 220, bankiet: 160, koktajl: 280, konferencja: 180 },
    priceFrom: 5400,
    sound: 'd&b Y-Series, 12 kW',
    light: '24 × LED, 4 × moving',
    projection: 'ekran 4 × 2,5 m',

    tag: 'SALA KLUBOWA · ŚREDNIA',
    headline: 'Imprezy firmowe i premiery produktów',
    body: 'Sala o klubowym charakterze z własnym barem i niską sceną. Najczęściej wybierana na wieczory firmowe, premiery, pokazy i koncerty klubowe do czterystu osób.',
    guests: '150–400',
    tech: [
      ['NAGŁOŚNIENIE', 'd&b Y-SERIES · 12 kW'],
      ['OŚWIETLENIE', '24 × LED · 4 × MOVING'],
      ['PROJEKCJA', 'EKRAN 4 × 2,5 m'],
      ['PRZYŁĄCZA', '1 × 63 A · DMX · LAN'],
      ['LOADING', 'WEJŚCIE TECHNICZNE 2,4 m'],
    ],
    plan: {
      scale: 'RZUT 1:150 · WIDOK Z GÓRY',
      stage: { label: 'Scena', dims: '24 m² · H 0,6 m', left: '30%', right: '30%', height: 74 },
      zone: ['PARKIET', 'STOJĄCA · 280 OS.'],
      rooms: [
        ['BAR 7 m',              { left: 14, top: 14,  width: '19%', height: 70 }],
        ['SZATNIA\n400 MIEJSC',  { left: 14, top: 96,  width: '19%', height: 64 }],
        ['GARDEROBY 1–2',        { left: 14, top: 172, width: '19%', height: 80 }],
        ['TOALETY',              { right: 14, top: 14,  width: '19%', height: 70 }],
        ['ZAPLECZE',             { right: 14, top: 96,  width: '19%', height: 64 }],
        ['WEJŚCIE\nTECHNICZNE',  { right: 14, top: 172, width: '19%', height: 80 }],
      ],
    },
  },
  'Sala Kameralna': {
    photos: [],
    area: 90,
    dimensions: '12,0 × 7,5 m',
    height: '3,8 m',
    stage: 'podest 12 m²',
    capacities: { koncert: 150, teatralny: 110, bankiet: 60, koktajl: 100, konferencja: 80 },
    priceFrom: 2600,
    sound: 'd&b E-Series, 4 kW',
    light: '12 × LED + reflektor',
    projection: 'ekran 3 × 2 m, 6 000 ANSI',

    tag: 'SALA KAMERALNA · NAJMNIEJSZA',
    headline: 'Szkolenia, spotkania zarządu i stand-up',
    body: 'Najbardziej intymna z trzech przestrzeni. Szkolenia, warsztaty, spotkania zarządu, stand-up i nagrania. Osobne wejście z podwórza pozwala prowadzić wydarzenie niezależnie od reszty obiektu.',
    guests: '40–150',
    tech: [
      ['NAGŁOŚNIENIE', 'd&b E-SERIES · 4 kW'],
      ['OŚWIETLENIE', '12 × LED · REFLEKTOR PROWADZĄCY'],
      ['PROJEKCJA', 'EKRAN 3 × 2 m · 6 000 ANSI'],
      ['PRZYŁĄCZA', '1 × 32 A · LAN · DMX'],
      ['DOSTĘP', 'OSOBNE WEJŚCIE Z PODWÓRZA'],
    ],
    plan: {
      scale: 'RZUT 1:100 · WIDOK Z GÓRY',
      stage: { label: 'Podest', dims: '12 m² · H 0,4 m', left: '34%', right: '34%', height: 64 },
      zone: ['STREFA GOŚCI', 'UKŁAD SZKOLNY · 80 OS.'],
      rooms: [
        ['BUFET',            { left: 14, top: 14,  width: '21%', height: 74 }],
        ['SZATNIA',          { left: 14, top: 100, width: '21%', height: 64 }],
        ['POK. PRELEGENTA',  { left: 14, top: 176, width: '21%', height: 76 }],
        ['TOALETY',          { right: 14, top: 14,  width: '21%', height: 74 }],
        ['MAGAZYNEK',        { right: 14, top: 100, width: '21%', height: 64 }],
        ['WEJŚCIE\nZ PODWÓRZA', { right: 14, top: 176, width: '21%', height: 76 }],
      ],
    },
  },
};

export function getStatusColor(status) {
  switch (status) {
    case 'dostepne':     return 'var(--zr-ok)';
    case 'ostatnie':     return 'var(--zr-warn)';
    case 'wyprzedane':   return 'var(--zr-sold-text)';
    case 'przedsprzedaz': return 'var(--zr-gold-dim)';
    default: return 'var(--zr-muted)';
  }
}

const STATUS_LABELS = {
  pl: { dostepne: 'DOSTĘPNE', ostatnie: 'OSTATNIE', wyprzedane: 'WYPRZEDANE', przedsprzedaz: 'PRZEDSPRZEDAŻ' },
  en: { dostepne: 'AVAILABLE', ostatnie: 'LAST', wyprzedane: 'SOLD OUT', przedsprzedaz: 'PRESALE' },
};

export function getStatusLabel(event, locale = 'pl') {
  const L = STATUS_LABELS[locale] ?? STATUS_LABELS.pl;
  switch (event.status) {
    case 'dostepne':      return L.dostepne;
    case 'ostatnie':      return `${L.ostatnie} ${event.pool - event.sold}`;
    case 'wyprzedane':    return L.wyprzedane;
    case 'przedsprzedaz': return L.przedsprzedaz;
    default: return '';
  }
}

const DAY_NAMES = {
  pl: ['NIE', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB'],
  en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
};

const MONTH_NAMES = {
  pl: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
};

export function formatDate(dateStr, locale = 'pl') {
  const d = new Date(dateStr);
  const days = DAY_NAMES[locale] ?? DAY_NAMES.pl;
  const dd = d.getDate().toString().padStart(2, '0');
  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
  return `${days[d.getDay()]} ${dd}.${mm}.${d.getFullYear()}`;
}

/** "Wrzesień 2026" / "September 2026" from a YYYY-MM key. */
export function formatMonth(ym, locale = 'pl') {
  const [y, m] = ym.split('-');
  const names = MONTH_NAMES[locale] ?? MONTH_NAMES.pl;
  return `${names[parseInt(m, 10) - 1]} ${y}`;
}

export function isTodayEvent(event) {
  const today = new Date().toISOString().split('T')[0];
  return event.date === today;
}

/* ─── Slugs & schema.org helpers ─────────────────────── */

const PL_MAP = { ą:'a', ć:'c', ę:'e', ł:'l', ń:'n', ó:'o', ś:'s', ź:'z', ż:'z' };

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, c => PL_MAP[c])
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

/** Stable, readable, collision-resistant: artist + date. */
export function eventSlug(event) {
  const base = slugify(event.artist) || 'wydarzenie';
  return `${base}-${event.date}`;
}

/**
 * Local Warsaw time as an ISO string with the correct offset, e.g.
 * "2026-11-14T20:00:00+01:00". schema.org/Google want the offset —
 * without it a summer concert can be read an hour off.
 *
 * (Event times are evenings, so the DST-transition hour is not a concern.)
 */
export function warsawIso(date, time = '00:00') {
  if (!date) return undefined;
  const hhmm = /^\d{2}:\d{2}$/.test(time) ? time : '00:00';
  const probe = new Date(`${date}T${hhmm}:00Z`);

  const label = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Warsaw',
    timeZoneName: 'longOffset',
  }).format(probe);

  const match = label.match(/GMT([+-]\d{2}:\d{2})/);
  return `${date}T${hhmm}:00${match ? match[1] : '+01:00'}`;
}

export const VENUE_ADDRESS = {
  street: 'ul. Krakowska 100',
  postalCode: '50-427',
  city: 'Wrocław',
  country: 'PL',
};

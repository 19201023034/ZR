/**
 * Translation dictionaries. Plain module (no server-only) so client
 * components can receive slices as props from their server parent.
 */
export const dict = {
  pl: {
    nav: {
      repertuar: 'Repertuar', bilety: 'Bilety', klub: 'Klub',
      wynajem: 'Wynajem sal', imprezy: 'Imprezy', kontakt: 'Kontakt',
      buy: 'Kup bilet', home: 'Zaklęte Rewiry — strona główna',
      openMenu: 'Otwórz menu', closeMenu: 'Zamknij menu', mainMenu: 'Menu główne', breadcrumb: 'Ścieżka nawigacji',
      themeLight: 'Tryb jasny', themeDark: 'Tryb ciemny',
    },
    ticket: {
      buy: 'Kup bilet', soldOut: 'Wyprzedane', soon: 'Bilety wkrótce',
      noTickets: 'Brak biletów', notYet: 'Sprzedaż jeszcze nie ruszyła',
      newTab: '(otwiera Stage24 w nowej karcie)',
      from: 'od', currency: 'zł', entrySoon: 'wstęp wkrótce',
    },
    common: {
      concertClub: 'Klub koncertowy', more: 'Zobacz więcej', all: 'Wszystkie',
      events: 'wydarzeń', event: 'wydarzenie',
      // [one, few, many] — see pluralEvents() below
      eventForms: ['wydarzenie', 'wydarzenia', 'wydarzeń'],
      noEvents: 'Brak wydarzeń w tej kategorii.',
      hall: 'Sala', doors: 'Wejście', start: 'Start', tickets: 'Bilety',
      date: 'Data', genre: 'Gatunek', age: 'Wiek', people: 'os.',
      writeUs: 'Napisz do nas', askDate: 'Zapytaj o termin',
    },
    home: {
      todayLabel: 'Dziś w Rewirach', doorsShort: 'wejście', startShort: 'start',
      featured: 'POLECAMY', nextConcert: 'NAJBLIŻSZY KONCERT',
      allRepertoire: 'Cały repertuar',
      posterAlt: 'PLAKAT', posterCity: 'WROCŁAW · KRAKOWSKA 100',
      upcoming: 'Nadchodzące wydarzenia',
      calendarLink: 'Cały kalendarz', dates: 'dat',
      calendarTile: 'KALENDARZ', calendarTileTitle: 'Cały repertuar',
      seeAll: 'ZOBACZ WSZYSTKIE →',
      aboutLabel: 'O miejscu',
      aboutHeading: 'Wielofunkcyjna scena na mapie Wrocławia od ponad dekady',
      aboutLead: 'Koncerty, gale, imprezy firmowe i wydarzenia specjalne — trzy sale, profesjonalne zaplecze techniczne i własna gastronomia przy ul. Krakowskiej 100. Miejsce spotkań ludzi, kultur i idei.',
      aboutCta: 'Poznaj klub',
      atmo: [
        ['Sala Duża', 'scena i rig świetlny'],
        ['Koncerty', 'pełne światło i dźwięk'],
        ['Bankiety i gale', 'układ przy stołach'],
      ],
      numbersTagline: 'Klub koncertowy i trzy sale przy Krakowskiej 100',
      stats: [
        ['85+', 'KONCERTÓW ROCZNIE'], ['3', 'SALE DO WYNAJĘCIA'],
        ['1000', 'MIEJSC W SALI DUŻEJ'], ['550', 'M² SALA DUŻA'],
      ],
      rentalLabel: 'Wynajem sal · dla firm i agencji',
      rentalHeading: 'Gale, konferencje i imprezy firmowe',
      rentalText: 'Trzy sale od 90 do 550 m² z pełnym zapleczem technicznym. Nagłośnienie d&b, oświetlenie sceniczne, projekcja. Obsługa cateringowa, bar, koordynator obiektu.',
      rentalPdf: 'Pobierz ofertę PDF →', perDay: 'zł / doba', upTo: 'do',
      proofLabel: 'Zaufali nam', proofNote: 'Logotypy klientów w przygotowaniu',
      caseHeading: 'Zrealizowaliśmy setki wydarzeń',
      caseLead: 'Od kameralnych spotkań firmowych po gale na tysiąc osób. Miejsce na realizację z liczbami — zdjęcia i referencje do uzupełnienia.',
      caseStats: [['500+', 'wydarzeń firmowych'], ['1000', 'gości na największych galach'], ['24 h', 'odpowiedź na zapytanie']],
      archiveLabel: 'Grali u nas', archiveLink: 'Archiwum · 87 koncertów →',
      newsletterTitle: 'Terminarz na maila',
      newsletterSub: 'Raz w miesiącu: lista koncertów i przedsprzedaże. Bez pop-upów.',
    },
    newsletter: {
      placeholder: 'twoj@email.pl', submit: 'Zapisuję się', sending: 'Zapisuję…',
      done: 'Zapisano', emailLabel: 'Adres e-mail',
      consent: 'Zgadzam się na otrzymywanie newslettera. Mogę się wypisać w każdej chwili.',
      privacy: 'Polityka prywatności.',
      ok: 'Sprawdź skrzynkę — wysłaliśmy link potwierdzający zapis.',
      errGeneric: 'Nie udało się zapisać. Spróbuj ponownie.',
      errOffline: 'Brak połączenia. Spróbuj za chwilę.',
    },
    repertuar: {
      label: 'Klub koncertowy', title: 'Repertuar',
      metaTitle: 'Repertuar', metaDesc: 'Nadchodzące koncerty i wydarzenia w Zaklętych Rewirach we Wrocławiu.',
      doors: 'wejście', start: 'start', waitlist: 'Lista rezerwowa',
    },
    bilety: {
      label: 'Bilety', title: 'Kup bilet',
      metaTitle: 'Bilety', metaDesc: 'Bilety na koncerty w Zaklętych Rewirach. Sprzedaż prowadzi Stage24.',
      intro1: 'Sprzedaż prowadzi', intro2: '— nasz operator biletowy. Klikając „Kup bilet” przechodzisz na stronę wydarzenia, gdzie wybierzesz pulę i miejsca. Za organizację wydarzenia odpowiadamy my.',
      onSale: 'W sprzedaży', soon: 'Sprzedaż wkrótce', soldOut: 'Wyprzedane',
      empty: 'Brak wydarzeń w sprzedaży.', doors: 'wejście',
      helpTitle: 'Problem z biletem?',
      helpText: 'Zwroty, faktury i reklamacje zakupu obsługuje Stage24 jako sprzedawca. W sprawach dotyczących samego wydarzenia — godzin, dojazdu, wieku, szatni — napisz do nas.',
      allRepertoire: 'Cały repertuar',
    },
    event: {
      crumb: 'Repertuar', sales: 'Sprzedaż: Stage24',
      about: 'O wydarzeniu', soon: 'Szczegóły wkrótce.',
      before: 'Zanim przyjdziesz', others: 'Inne terminy', allLink: 'Cały repertuar →',
      posterAlt: 'PLAKAT',
      practical: [
        ['Dojazd', 'Tramwaj 3, 5 oraz autobus 114, 243 — przystanek Krakowska. Wejście główne od ul. Krakowskiej.'],
        ['Parking', 'Własny parking na 80 miejsc od ul. bocznej, bezpłatny dla gości wydarzenia.'],
        ['Szatnia', 'Obowiązkowa, wliczona w cenę biletu.'],
        ['Dostępność', 'Wejście bez progów, winda i miejsca dla wózków. Asystę zgłoś wcześniej mailem.'],
      ],
    },
    footer: {
      directions: 'DOJAZD', contact: 'KONTAKT', service: 'SERWIS',
      dir: ['Tram 3, 5 — przystanek Krakowska', 'Bus 114, 243 — przystanek Krakowska', 'Parking 80 miejsc (ul. boczna)', 'Stojaki rowerowe przy wejściu'],
      rights: 'Wszelkie prawa zastrzeżone.',
      links: { wynajem: 'Wynajem sal', imprezy: 'Imprezy okolicznościowe', regulamin: 'Regulamin klubu', zwroty: 'Zwroty biletów', dostepnosc: 'Dostępność obiektu', praca: 'Praca i wolontariat' },
    },
  },

  en: {
    nav: {
      repertuar: "What's on", bilety: 'Tickets', klub: 'Venue',
      wynajem: 'Hire', imprezy: 'Parties', kontakt: 'Contact',
      buy: 'Buy ticket', home: 'Zaklęte Rewiry — home',
      openMenu: 'Open menu', closeMenu: 'Close menu', mainMenu: 'Main menu', breadcrumb: 'Breadcrumb',
      themeLight: 'Light mode', themeDark: 'Dark mode',
    },
    ticket: {
      buy: 'Buy ticket', soldOut: 'Sold out', soon: 'On sale soon',
      noTickets: 'No tickets left', notYet: 'Sales have not opened yet',
      newTab: '(opens Stage24 in a new tab)',
      from: 'from', currency: 'PLN', entrySoon: 'entry TBA',
    },
    common: {
      concertClub: 'Concert venue', more: 'See more', all: 'All',
      events: 'events', event: 'event',
      eventForms: ['event', 'events', 'events'],
      noEvents: 'No events in this category.',
      hall: 'Room', doors: 'Doors', start: 'Start', tickets: 'Tickets',
      date: 'Date', genre: 'Genre', age: 'Age', people: 'ppl',
      writeUs: 'Contact us', askDate: 'Check a date',
    },
    home: {
      todayLabel: 'Tonight at Rewiry', doorsShort: 'doors', startShort: 'start',
      featured: 'FEATURED', nextConcert: 'NEXT SHOW',
      allRepertoire: "Full programme",
      posterAlt: 'POSTER', posterCity: 'WROCŁAW · KRAKOWSKA 100',
      upcoming: 'Upcoming events',
      calendarLink: 'Full calendar', dates: 'dates',
      calendarTile: 'CALENDAR', calendarTileTitle: 'Full programme',
      seeAll: 'SEE ALL →',
      aboutLabel: 'The venue',
      aboutHeading: 'A multi-purpose stage on the map of Wrocław for over a decade',
      aboutLead: 'Concerts, galas, corporate events and one-off productions — three rooms, professional technical facilities and our own catering at Krakowska 100. A meeting place for people, cultures and ideas.',
      aboutCta: 'About the venue',
      atmo: [
        ['Main Hall', 'stage and lighting rig'],
        ['Concerts', 'full light and sound'],
        ['Banquets & galas', 'seated layout'],
      ],
      numbersTagline: 'A concert venue and three rooms at Krakowska 100',
      stats: [
        ['85+', 'SHOWS PER YEAR'], ['3', 'ROOMS FOR HIRE'],
        ['1000', 'CAPACITY, MAIN HALL'], ['550', 'M² MAIN HALL'],
      ],
      rentalLabel: 'Venue hire · for companies and agencies',
      rentalHeading: 'Galas, conferences and corporate events',
      rentalText: 'Three rooms from 90 to 550 m² with full technical facilities. d&b sound system, stage lighting, projection. Catering, bar and a venue coordinator.',
      rentalPdf: 'Download PDF offer →', perDay: 'PLN / day', upTo: 'up to',
      proofLabel: 'Trusted by', proofNote: 'Client logos coming soon',
      caseHeading: 'Hundreds of events delivered',
      caseLead: 'From intimate company meetings to galas for a thousand guests. Space for a case study — photos and references to follow.',
      caseStats: [['500+', 'corporate events'], ['1000', 'guests at our largest galas'], ['24 h', 'response to enquiries']],
      archiveLabel: 'Played here', archiveLink: 'Archive · 87 shows →',
      newsletterTitle: 'Programme by email',
      newsletterSub: 'Once a month: the gig list and presales. No pop-ups.',
    },
    newsletter: {
      placeholder: 'you@email.com', submit: 'Sign me up', sending: 'Signing up…',
      done: 'Signed up', emailLabel: 'Email address',
      consent: 'I agree to receive the newsletter. I can unsubscribe at any time.',
      privacy: 'Privacy policy.',
      ok: 'Check your inbox — we sent a confirmation link.',
      errGeneric: 'Sign-up failed. Please try again.',
      errOffline: 'No connection. Please try again shortly.',
    },
    repertuar: {
      label: 'Concert venue', title: "What's on",
      metaTitle: "What's on", metaDesc: 'Upcoming concerts and events at Zaklęte Rewiry in Wrocław.',
      doors: 'doors', start: 'start', waitlist: 'Waiting list',
    },
    bilety: {
      label: 'Tickets', title: 'Buy a ticket',
      metaTitle: 'Tickets', metaDesc: 'Tickets for concerts at Zaklęte Rewiry. Ticketing by Stage24.',
      intro1: 'Ticketing is handled by', intro2: '— our ticketing partner. Clicking “Buy ticket” takes you to the event page, where you pick your ticket type and seats. The event itself is run by us.',
      onSale: 'On sale', soon: 'On sale soon', soldOut: 'Sold out',
      empty: 'No events on sale.', doors: 'doors',
      helpTitle: 'Problem with a ticket?',
      helpText: 'Refunds, invoices and purchase complaints are handled by Stage24 as the seller. For anything about the event itself — times, getting here, age limits, cloakroom — write to us.',
      allRepertoire: "Full programme",
    },
    event: {
      crumb: "What's on", sales: 'Ticketing: Stage24',
      about: 'About the event', soon: 'Details coming soon.',
      before: 'Before you come', others: 'Other dates', allLink: 'Full programme →',
      posterAlt: 'POSTER',
      practical: [
        ['Getting here', 'Trams 3 and 5, buses 114 and 243 — Krakowska stop. Main entrance from ul. Krakowska.'],
        ['Parking', 'Our own car park with 80 spaces off the side street, free for event guests.'],
        ['Cloakroom', 'Compulsory, included in the ticket price.'],
        ['Accessibility', 'Step-free entrance, lift and wheelchair spaces. Please request assistance by email in advance.'],
      ],
    },
    footer: {
      directions: 'GETTING HERE', contact: 'CONTACT', service: 'INFO',
      dir: ['Trams 3, 5 — Krakowska stop', 'Buses 114, 243 — Krakowska stop', 'Car park, 80 spaces (side street)', 'Bike racks at the entrance'],
      rights: 'All rights reserved.',
      links: { wynajem: 'Venue hire', imprezy: 'Private parties', regulamin: 'Venue rules', zwroty: 'Ticket refunds', dostepnosc: 'Accessibility', praca: 'Work with us' },
    },
  },
};

export function getDict(locale) {
  return dict[locale] ?? dict.pl;
}

/** Picks the right plural form of "event" — Polish needs one/few/many. */
export function pluralEvents(n, t) {
  const [one, few, many] = t.common.eventForms;
  const d = n % 10, h = n % 100;
  if (n === 1) return one;
  if (d >= 2 && d <= 4 && !(h >= 12 && h <= 14)) return few;
  return many;
}

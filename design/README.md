# Handoff: Zaklęte Rewiry — strona klubu koncertowego i wynajmu sal

## Overview
CKR Zaklęte Rewiry (ul. Krakowska 100, Wrocław) to obiekt o dwóch funkcjach: klub koncertowy (rock, metal, rap, elektronika, stand-up) sprzedający bilety oraz trzy sale wynajmowane na wydarzenia komercyjne (gale, konferencje, imprezy firmowe).

Strona ma dwa zadania: sprzedać bilet na najbliższy koncert i nie zgubić po drodze klienta wynajmu. Te dwie grupy — fan i event manager — są rozdzielone wizualnie: klub to intensywny rejestr (mocne złoto #FCCC00, Anton, duże nazwy artystów), wynajem to rejestr spokojny (przygaszone złoto #C09C18, więcej światła, dane w mono).

Zakres tego pakietu:
- **Strona główna** (publiczna)
- **Wynajem sal** — jedna strona, trzy sale w zakładkach
- **Kontakt** — z mapą Google
- **Panel administracyjny** — dodawanie wydarzenia
- **Style guide** — tokeny, typografia, komponenty, statusy
- **Oferta wynajmu** — dokument PDF (A4, 2 strony)

## About the Design Files
Pliki `.dc.html` w tym pakiecie są **referencjami projektowymi stworzonymi w HTML** — prototypami pokazującymi docelowy wygląd i zachowanie, nie kodem produkcyjnym do skopiowania. Zadanie polega na **odtworzeniu tych projektów w środowisku docelowego codebase'u** (React, Vue, Next.js, WordPress, cokolwiek jest w projekcie), z użyciem jego wzorców, biblioteki komponentów i konwencji.

Jeśli środowiska jeszcze nie ma: strona jest w większości statyczna z jednym panelem administracyjnym, więc dobrze pasuje Next.js (App Router) + headless CMS na wydarzenia, albo WordPress z własnym typem wpisu `wydarzenie`. Wybór należy do developera.

Uwagi techniczne o plikach źródłowych:
- Wymagają `support.js` (runtime prototypów) i działają po otwarciu w przeglądarce.
- Cała stylizacja jest w atrybutach `style` — to wymóg narzędzia prototypowego, **nie** wzór do przenoszenia. W docelowym kodzie należy użyć CSS/Tailwind/CSS Modules zgodnie z konwencją projektu.
- Atrybuty `style-hover`, `style-focus` to skróty prototypu — odpowiadają zwykłym `:hover` / `:focus`.
- `{{ nazwa }}` w szablonie to wartości z klasy logiki — odpowiadają propsom/stanowi komponentu.
- `<sc-for list>` to pętla, `<sc-if value>` to warunek.

## Fidelity
**High-fidelity.** Kolory, typografia, odstępy, promienie i stany są docelowe. UI należy odtworzyć wiernie. Wyjątki, które są celowo zastępcze:
- Zdjęcia artystów i sal — placeholdery ze złotą siatką LED (`background-image` z dwóch `linear-gradient`, `background-size: 4px 4px`). Docelowo prawdziwe zdjęcia w tych samych kadrach.
- Dane wydarzeń, ceny, metraże, specyfikacja techniczna, NIP, telefony — treść zastępcza do podmiany na prawdziwą.
- Logo: sygnet ZR to **rastrowe wycinki z istniejącego logotypu** (`assets/zr-sygnet*.png`). Przed wdrożeniem znak trzeba obrysować wektorowo i wyeksportować jako SVG. Szczegóły w sekcji Assets.

---

## Design Tokens

### Kolory
| Token | Hex | Zastosowanie |
|---|---|---|
| `--zr-bg` | `#0C0A08` | tło bazowe, ciepła czerń (nie #000) |
| `--zr-surface` | `#151109` | karty, panele |
| `--zr-raised` | `#201A10` | pola formularzy, hover, kadry zdjęć |
| `--zr-surface-alt` | `#100D0A` | sekcje wyróżnione (blok wynajmu, panele boczne) |
| `--zr-gold` | `#FCCC00` | akcent z logo, CTA, nazwy artystów, stany aktywne |
| `--zr-gold-hi` | `#FFD824` | hover na złotych przyciskach |
| `--zr-gold-dim` | `#C09C18` | rejestr wynajmu, etykiety sekcji, drugorzędne złoto |
| `--zr-text` | `#F5F1E8` | nagłówki, tekst główny |
| `--zr-body` | `#D8D2C4` | tekst ciągły |
| `--zr-muted` | `#9A9484` | tekst pomocniczy, etykiety |
| `--zr-faint` | `#6E6858` | placeholdery, tekst wyłączony |
| `--zr-line` | `#2C2618` | obrys podstawowy, separatory |
| `--zr-line-hi` | `#453B24` | obrys wyróżniony, perforacja biletu |
| `--zr-ok` | `#6BBF59` | bilety dostępne, wejścia na rzucie, walidacja OK |
| `--zr-warn` | `#E0A020` | ostatnie bilety, kolizja terminu |
| `--zr-sold` | `#A03838` | wyprzedane, wyjścia ewakuacyjne |
| `--zr-sold-text` | `#C05555` | tekst „wyprzedane" (jaśniejszy warant dla kontrastu) |

**Zasada 90/10:** złoto zajmuje maksymalnie 10% powierzchni ekranu. Jeden dominujący złoty element na widok — przycisk biletu albo nazwa najbliższego artysty. Nigdy jako tło dużych bloków (wyjątek: pasek „Dziś w Rewirach" i ticker, które są celowo krzykliwe i wąskie).

### Typografia
| Krój | Waga | Zastosowanie |
|---|---|---|
| **Anton** | 400 (jedna waga) | nagłówki plakatowe, nazwy artystów, etykiety przycisków CTA. Zawsze `text-transform: uppercase`. |
| **Inter** | 400 / 500 / 600 / 700 | tekst ciągły, interfejs, etykiety formularzy |
| **JetBrains Mono** | 400 / 500 / 700 | daty, godziny, ceny, dane techniczne, etykiety sekcji, wszystkie liczby |

Blackletter (krój z logotypu) **wyłącznie** jako sygnatura marki — nigdy w tekście ani w UI. W prototypach reprezentuje go rastrowy sygnet ZR.

Skala:
| Rola | Krój / rozmiar | line-height | letter-spacing |
|---|---|---|---|
| Display / hero | Anton 104–118 px | 0.90 | 0.005em |
| Nazwa artysty (hero) | Anton 112 px, `#FCCC00` | 0.90 | 0.005em |
| Nazwa artysty (karta duża) | Anton 46 px, `#FCCC00` | 0.98 | — |
| Nazwa artysty (karta mała) | Anton 27 px, `#F5F1E8` | 1.0 | — |
| H2 sekcji | Anton 38–44 px | 1.0–1.04 | 0.02em |
| H3 / nagłówek karty | Anton 20–30 px | 1.04–1.06 | 0.02–0.03em |
| Etykieta sekcji (mono) | JetBrains Mono 10–11 px, `#C09C18` lub `#9A9484` | — | 0.14–0.22em, uppercase |
| Tekst ciągły | Inter 400, 16–17 px, `#D8D2C4` | 1.75–1.8 | — |
| Tekst pomocniczy | Inter 400, 13–14 px, `#9A9484` | 1.6–1.7 | — |
| Interfejs / etykiety | Inter 600–700, 13–15 px | — | 0.01em |
| Dane, daty, ceny | JetBrains Mono 11–20 px | 1.9 | 0.02–0.06em |
| Nawigacja | JetBrains Mono 12 px, uppercase | — | 0.12em |

Minimalny rozmiar tekstu: 10 px (tylko mono, etykiety techniczne). Tekst ciągły nigdy poniżej 13 px.

### Odstępy i geometria
- Siatka 8 px. Padding sekcji: `64px 80px` (desktop 1600 px), wewnątrz kart `18–32px`.
- Kontener treści: 1200–1440 px, strona projektowana na 1600 px.
- Promienie: **4 px** (przyciski, pola, chipy techniczne), **6 px** (karty, panele), **8 px** (duże bloki sekcji), **999 px** (tylko pill-buttony filtrów).
- Separator sekcji: `height: 2px; background: #FCCC00` (główny) lub `1px #C09C18` (drugorzędny) — to sygnaturowy element marki.
- Obrysy: `1px solid #2C2618` domyślnie, `#453B24` gdy element ma być wyróżniony.
- Ziarnistość tła: nakładka SVG `feTurbulence` (`baseFrequency 0.85`, `numOctaves 3`), `opacity: 0.4–0.45`, `mix-blend-mode: overlay`, `background-size: 140px`, `pointer-events: none`. Docelowo można podmienić na statyczny PNG z szumem.

### Statusy biletów
| Status | Kolor | Kropka | Kiedy |
|---|---|---|---|
DOSTĘPNE | `#6BBF59` | 8 px, `box-shadow: 0 0 0 3px rgba(107,191,89,0.18)` | pula otwarta, powyżej 20% miejsc |
OSTATNIE N | `#E0A020` | 8 px | poniżej 20% — **zawsze z liczbą** |
WYPRZEDANE | `#A03838` (tekst `#C05555`) | 8 px | brak miejsc; karta `opacity: 0.78`, zdjęcie `filter: grayscale(1)`, CTA zmienia się w wyłączony „Lista rezerwowa" |
PRZEDSPRZEDAŻ | `#C09C18` | 8 px | sprzedaż przed oficjalnym startem |

Statusy poniżej 20% puli powinny przeliczać się automatycznie po stronie backendu.

---

## Screens / Views

### 1. Strona główna — `Strona glowna.dc.html`

**Purpose:** sprzedać bilet na najbliższy koncert; dać osobną, wyraźną ścieżkę do wynajmu sal.

**Layout:** jedna kolumna sekcji na pełną szerokość, każda sekcja `padding: 64px 80px`, rozdzielone `border-bottom: 1px solid #2C2618`. Kolejność sekcji jest celowa i nie powinna się zmieniać.

#### 1.1 Nagłówek (sticky)
- Wysokość 96 px, `border-top: 2px solid #FCCC00`, `border-bottom: 1px solid #2C2618`, `padding: 0 80px`.
- `display: grid; grid-template-columns: 1fr auto 1fr; gap: 32px; align-items: center`.
- **Lewa kolumna:** Repertuar / Bilety / Klub — JetBrains Mono 12 px, uppercase, `letter-spacing: 0.12em`, `padding-bottom: 3px`. Aktywny: `#FCCC00` + `border-bottom: 1px solid #FCCC00`. Nieaktywny: `#F5F1E8` + `border-bottom: 1px solid transparent`.
- **Środek:** sygnet ZR, wysokość 56 px, `align-self: center` (ważne — bez tego obraz się rozciąga).
- **Prawa kolumna:** „Wynajem sal ▾" (rozwijane), Kontakt, przełącznik PL/EN, przycisk CTA.
- Podział lewo/prawo jest świadomy: po lewej funkcja klubowa, po prawej usługowa. Sygnet stoi na granicy.

**Rozwijane podmenu wynajmu** (klik, nie hover — dla dotyku):
- `position: absolute; top: 34px; right: 0; width: 330px; z-index: 20`.
- `background: #100D0A; border: 1px solid #453B24; border-top: 2px solid #C09C18; border-radius: 6px; padding: 16px 18px; box-shadow: 0 18px 40px rgba(0,0,0,0.55)`.
- Nagłówek: „WYNAJEM · 150–1000 OSÓB", mono 9.5 px, `#C09C18`, `letter-spacing: 0.18em`.
- Cztery wiersze `display: flex; justify-content: space-between`: nazwa sali (Inter 600, 14 px) + metraż i pojemność (mono 10.5 px, `#9A9484`) po lewej, cena od (mono 11 px, `#C09C18`) po prawej. Czwarty wiersz: „Zapytanie o termin / ODPOWIEDŹ W 24 H / →".
- Stopka podmenu: „Pobierz ofertę PDF →", oddzielona `border-top: 1px solid #2C2618`, `margin-top: 8px; padding-top: 12px`.

**Przełącznik PL/EN:** `display: flex` w kontenerze `border: 1px solid #453B24; border-radius: 4px; overflow: hidden`. Aktywny język: tło `#FCCC00`, tekst `#0C0A08`. Nieaktywny: tło przezroczyste, tekst `#9A9484`. Mono 12 px, `padding: 9px 14px`.

#### 1.2 Hero — konkretne wydarzenie (nie karuzela)
`display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 60px; align-items: center`.

Lewa kolumna, od góry:
1. Badge statusu: `display: inline-flex; gap: 10px; align-self: flex-start`, mono 12 px `#6BBF59`, `border: 1px solid rgba(107,191,89,0.4)`, `border-radius: 4px`, `padding: 9px 14px`. Kropka 8 px z `box-shadow: 0 0 0 4px rgba(107,191,89,0.16)`. Treść: „NAJBLIŻSZY KONCERT · CZW 14.11.2026".
2. Nazwa artysty: **Anton 112 px**, `line-height: 0.9`, `#FCCC00`, `text-wrap: balance`.
3. Gatunek i support: Inter 16 px, `#D8D2C4`.
4. Pasek danych: `display: grid; grid-template-columns: repeat(4, auto); gap: 34px; justify-content: start`, obramowany `border-top`/`border-bottom: 1px solid #2C2618`, `padding: 18px 0`. Cztery pary etykieta (mono 10 px `#9A9484`, `letter-spacing: 0.12em`) + wartość (mono 15 px): SALA / WEJŚCIE / START / BILETY. Wartość statusu w kolorze statusu.
5. Dwa przyciski: złoty „Kup bilet · od 89 zł" (`padding: 18px 34px`, Anton 18 px) i obrysowy „Cały repertuar" (`border: 1px solid #453B24`, hover `#F5F1E8`).

Prawa kolumna — plakat:
- `aspect-ratio: 3/4`, `background: #151109`, `border: 1px solid #453B24`, `border-radius: 6px`, `overflow: hidden`.
- Siatka LED jako tło (`5px 5px`, `rgba(252,204,0,0.10)`).
- Badge „PLAKAT 3:4" w lewym górnym narożniku: mono 10 px `#FCCC00`, `border: 1px solid rgba(252,204,0,0.5)`, tło `rgba(12,10,8,0.7)`.
- Na dole nakładka z tytułem: `background: rgba(12,10,8,0.82)`, `border: 1px solid #2C2618`, `border-radius: 4px`, `padding: 16px 18px`, w środku „TRASA 2026 · WROCŁAW" (mono 10 px) + nazwa artysty (Anton 22 px).

#### 1.3 Pasek „Dziś w Rewirach" (warunkowy)
Renderowany **tylko** gdy tego dnia jest wydarzenie. Wtedy jest najważniejszym elementem strony — ktoś sprawdza godzinę wejścia stojąc w tramwaju.
- `background: #FCCC00`, `padding: 18px 80px`, `display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px`.
- Lewa strona: „Dziś w Rewirach" (Anton 22 px, `#0C0A08`, `letter-spacing: 0.05em`) + dane wydarzenia (mono 13 px 700, `#0C0A08`).
- Prawa strona: status i cena (mono 13 px 700) + przycisk `background: #0C0A08; color: #FCCC00` (odwrócona polaryzacja), hover `#201A10`.

#### 1.4 Nadchodzące wydarzenia — bento grid + filtry
- Nagłówek sekcji: H2 „Nadchodzące wydarzenia" (Anton 44 px) + link „Cały kalendarz · 24 daty →" po prawej (Inter 600, 14 px, `#FCCC00`, `border-bottom: 1px solid rgba(252,204,0,0.4)`).
- **Filtry gatunków** (pill-buttony, `border-radius: 999px`, `padding: 11px 22px`): Wszystkie / Rock / Metal / Rap / Elektronika / Stand-up. Aktywny: `background: rgba(252,204,0,0.12)`, `color: #FCCC00`, `border: 1px solid #FCCC00`, Inter 700. Nieaktywny: przezroczysty, `#9A9484`, `border: 1px solid #2C2618`, Inter 500. Filtry są na stronie głównej, nie na osobnej podstronie.
- **Siatka:** `display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px`. Pierwsza karta `grid-column: span 2` (wyróżnione wydarzenie), pozostałe pojedyncze. Ostatni kafel to link do kalendarza, żeby siatka się domykała. Małe karty muszą mieć `align-self: start`, inaczej rozciągają się do wysokości karty podwójnej i w środku powstaje pusta przestrzeń.

**Karta wydarzenia — kształt biletu.** To sygnaturowy komponent strony.
- Wrapper: `background: #151109`, `border: 1px solid #2C2618`, `border-radius: 6px`, `overflow: hidden`, `display: flex; flex-direction: column`.
- Kadr zdjęcia: 250 px (karta podwójna) / 150 px (pojedyncza), `background: #201A10` + siatka LED `4px 4px`.
- Treść: `padding: 24px 26px 20px` / `18px 20px`, `gap: 12px` / `9px`.
  - Wiersz górny: data i godziny (mono 12–13 px) + status z kropką (mono 10–11 px w kolorze statusu).
  - Nazwa artysty: Anton 46 px `#FCCC00` (karta wyróżniona) / 27 px `#F5F1E8` (pozostałe).
  - Meta: gatunek, support, sala, pojemność (Inter 13–14 px `#9A9484`).
- **Stopka biletowa:** `margin-top: auto`, `border-top: 1px dashed #453B24` (perforacja). Dwa okrągłe wycięcia: `position: absolute; left/right: -10px; top: -10px; width/height: 20px; border-radius: 50%; background: #0C0A08; border: 1px solid #2C2618`. W środku `padding: 18px 26px` z ceną (mono 15–18 px) i przyciskiem.
- Karta wyprzedana: `opacity: 0.78`, zdjęcie `filter: grayscale(1)`, tekst `#9A9484`, perforacja `#2C2618`, CTA → wyłączony „Rezerwowa" (`cursor: not-allowed`, `border: 1px solid #2C2618`, `color: #6E6858`).

**Kafel kalendarza (ostatni):** `background: #100D0A`, `border: 1px dashed #453B24`, `align-self: start`, `min-height: 200px`. Etykieta „KALENDARZ" (mono 10 px `#C09C18`), nagłówek „Cały repertuar · 24 daty" (Anton 26 px), zakres miesięcy (Inter 13 px), „ZOBACZ WSZYSTKIE →" (mono 12 px `#FCCC00`).

#### 1.5 Pasek liczb
Zamiast frazesu o „wielofunkcyjnej przestrzeni" — konkret. `padding: 44px 80px`, `display: flex; justify-content: space-between; flex-wrap: wrap; gap: 44px`.
- Po lewej zdanie: „Klub koncertowy i trzy sale przy Krakowskiej 100" (Anton 30 px, `max-width: 520px`, `text-wrap: balance`).
- Po prawej cztery liczby (`gap: 52px`): 85+ / 3 / 1000 / 50 m². Wartość mono 26 px (pierwsza `#FCCC00`, reszta `#F5F1E8`), pod nią etykieta mono 10 px `#9A9484`, `letter-spacing: 0.14em`.

#### 1.6 Blok wynajmu — drugi rejestr marki
Osobne, wyraźne wejście dla klienta B2B. `background: #100D0A`, `padding: 64px 80px 72px`. `display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: center`.

Lewa kolumna: etykieta „Wynajem sal · dla firm i agencji" (mono 11 px `#C09C18`, `letter-spacing: 0.22em`), H2 „Gale, konferencje i imprezy firmowe" (Anton 52 px, `#F5F1E8` — **nie złoty**), separator `80px × 1px #C09C18`, akapit (Inter 16 px, `line-height: 1.8`), CTA `background: #C09C18` (hover `#FCCC00`, Inter 700 — nie Anton) + link „Pobierz ofertę PDF".

Prawa kolumna: trzy karty sal, `grid-template-columns: repeat(3, 1fr); gap: 16px`. Pierwsza (największa sala) ma `border: 1px solid #453B24` i cenę w `#C09C18`; pozostałe `#2C2618` i cenę w `#9A9484`. W każdej: nazwa (Anton 22 px) + metraż / pojemność / cena od (mono 12 px, `line-height: 1.9`).

Różnica rejestrów jest kluczowa: klub krzyczy złotem i Antonem, wynajem mówi spokojnie — Anton tylko w nagłówku, złoto przygaszone do `#C09C18`, jeden CTA, więcej światła.

#### 1.7 „Grali u nas" — dowód skali
`padding: 52px 80px`. Etykieta „Grali u nas" (mono 11 px, `letter-spacing: 0.2em`) + link „Archiwum · 87 koncertów →". Pod tym nazwiska jako `display: flex; flex-wrap: wrap; gap: 14px 40px; align-items: baseline`, każde Anton 38 px uppercase `#F5F1E8`. To kapitał, którego konkurencja nie ma — nie powinien leżeć schowany w płaskiej liście.

#### 1.8 Newsletter (pasek, nie pop-up)
`padding: 44px 80px`, `display: flex; flex-direction: column; gap: 16px`.
- Wiersz: opis po lewej (Anton 24 px „Terminarz na maila" + Inter 13 px „Raz w miesiącu: lista koncertów i przedsprzedaże. Bez pop-upów."), po prawej pole e-mail (`flex: 1`, `background: #201A10`, `border: 1px solid #2C2618`, focus `border-color: #FCCC00`) + przycisk obrysowy złoty (nie wypełniony — newsletter nie konkuruje z biletem).
- **Checkbox zgody — niezaznaczony domyślnie.** `accent-color: #FCCC00`, 17 px, `margin-top: 1px`. Tekst Inter 12 px `#9A9484`, `line-height: 1.6`, `max-width: 900px`, z linkiem do polityki prywatności (`color: #9A9484`, `border-bottom: 1px solid #453B24`).
- Fani wracają regularnie — wyskakujące okno przy każdej wizycie ich zniechęca.

#### 1.9 Stopka
`padding: 56px 80px 64px`. Górna część: `grid-template-columns: 1.1fr 1fr 1fr 1fr; gap: 40px`.
1. Sygnet złoty 34 px (`align-self: flex-start`) + adres (mono 11.5 px, `line-height: 2`).
2. DOJAZD: tram 3, 5 / bus 114, 243 / parking 80 miejsc / stojaki rowerowe.
3. KONTAKT — **rozdzielone adresy**: bilety@ / booking@ / wynajem@ / ksiegowosc@.
4. SERWIS: regulamin klubu, zwroty biletów, dostępność obiektu, praca i wolontariat.

Nagłówki kolumn: mono 10 px `#C09C18`, `letter-spacing: 0.18em`. Dolny pasek: `border-top: 1px solid #2C2618`, `padding-top: 22px`, copyright (mono 11 px `#6E6858`) + drugi przełącznik PL/EN.

#### 1.10 Baner cookies
`margin: 0 80px 64px`, `background: #151109`, `border: 1px solid #2C2618`, `border-left: 3px solid #FCCC00`, `border-radius: 6px`, `padding: 26px 30px`.
- Treść po lewej (`flex: 1; min-width: 440px`): „Cookies" (Anton 20 px), wyjaśnienie (Inter 13 px `#9A9484`, `max-width: 760px`), link do ustawień szczegółowych (`#C09C18`).
- **Dwa równorzędne przyciski**, oba `min-width: 160px`, `padding: 14px 28px`, Inter 700 14 px:
  - „Odrzucam" — przezroczysty, `color: #F5F1E8`, `border: 1px solid #453B24`, hover `border-color: #F5F1E8`.
  - „Akceptuję" — przezroczysty, `color: #FCCC00`, `border: 1px solid #FCCC00`, hover `background: rgba(252,204,0,0.12)`.
- **Wymóg:** żaden z przycisków nie może być wizualnie mocniejszy — ta sama szerokość, ten sam wariant obrysowy, ta sama waga. Nie wolno robić „Akceptuję" wypełnionym złotem.

**Czego na stronie głównej nie ma i nie powinno być:** karuzeli bez opisów, długiego tekstu o historii miejsca, galerii zdjęć bez kontekstu, mapy na pół ekranu. To wszystko należy do podstron.

---

### 2. Wynajem sal — `Sale.dc.html`

**Purpose:** klient B2B ma w jednym miejscu wszystkie trzy sale, przełączane zakładkami, i może wysłać zapytanie bez opuszczania strony.

**Layout:** nagłówek (jak na stronie głównej, aktywny „Wynajem sal" w `#C09C18`) → intro → zakładki sal → treść sali → tabela porównawcza → pakiety + formularz → stopka.

#### Zakładki sal
`padding: 0 80px`, `border-bottom: 1px solid #2C2618`, `display: flex`. Każda zakładka: `padding: 20px 30px 18px`, `border-bottom: 2px solid` (`#C09C18` aktywna / `transparent`), dwa wiersze — nazwa (Anton 22 px, aktywna `#FCCC00`) i metraż z pojemnością (mono 10 px, aktywna `#C09C18`).

Przełączenie zakładki zmienia **całą** treść poniżej: etykietę i wymiary, nagłówek, opis, trzy kafelki statystyk, tabelę pojemności w pięciu układach, rzut z góry, tabelę techniki, podświetlony wiersz w tabeli porównawczej i nazwę sali w formularzu.

#### Dane sal
| | Sala Duża | Sala Klubowa | Sala Kameralna |
|---|---|---|---|
| Powierzchnia | 550 m² | 210 m² | 90 m² |
| Wymiary | 30,5 × 18,0 m | 21,0 × 10,0 m | 12,0 × 7,5 m |
| Wysokość | 7,4 m | 5,2 m | 3,8 m |
| Scena | 50 m², 10,0 × 5,0 m, H 1,1 m | 24 m², H 0,6 m | podest 12 m², H 0,4 m |
| Koncert stojący | 1000 | 400 | 150 |
| Teatralny | 520 | 220 | 110 |
| Bankiet | 380 | 160 | 60 |
| Koktajl | 700 | 280 | 100 |
| Konferencja | 450 | 180 | 80 |
| Cena od / doba | 9 800 zł netto | 5 400 zł netto | 2 600 zł netto |
| Nagłośnienie | d&b V-Series, 24 kW | d&b Y-Series, 12 kW | d&b E-Series, 4 kW |
| Oświetlenie | 48 × LED, 8 × moving | 24 × LED, 4 × moving | 12 × LED + reflektor prowadzący |
| Projekcja | LED 6 × 3 m, 12 000 ANSI | ekran 4 × 2,5 m | ekran 3 × 2 m, 6 000 ANSI |
| Przyłącza | 2 × 63 A, DMX, Dante | 1 × 63 A, DMX, LAN | 1 × 32 A, LAN, DMX |
| Loading / dostęp | brama 3,2 × 2,8 m, dojazd TIR | wejście techniczne 2,4 m | osobne wejście z podwórza |

#### Rzut sali z góry — wzorzec schematu
Wysokość 420 px, `background: #100D0A`, `border: 1px solid #453B24`, `border-radius: 4px`, `overflow: hidden`, siatka `28px 28px` w `rgba(252,204,0,0.05)`.

Zasady rysowania, wspólne dla wszystkich sal:
- **Scena zawsze u dołu kadru**, wyśrodkowana: `bottom: 18px`, `background: rgba(252,204,0,0.13)`, `border: 1px solid #C09C18`, `border-radius: 4px`. W środku nazwa (Anton 16 px `#FCCC00`) i wymiary (mono 9.5 px `#C09C18`). Szerokość zależy od sali (`left/right: 24%` / `30%` / `34%`).
- **Strefa gości** na środku: `border: 1px dashed #2C2618`, nazwa strefy (mono 11.5 px) i pojemność (mono 10.5 px `#9A9484`). Treść zmienia się z wybranym układem.
- **Zaplecze** w dwóch kolumnach po bokach (lewa i prawa, szerokość 17–21%): `background: #201A10`, `border: 1px solid #2C2618`, `border-radius: 4px`, opisy mono 9 px, `white-space: pre-line` dla łamania linii.
- **Wejścia** — zielone `#6BBF59` z tekstem `#0C0A08`: główne u góry na środku (`width: 118px; height: 20px; border-radius: 0 0 4px 4px`).
- **Wyjścia ewakuacyjne** — czerwone `#A03838` z tekstem `#F5F1E8`, u dołu po bokach (`border-radius: 4px 4px 0 0`).
- Etykieta skali (mono 9.5 px `#C09C18`, `letter-spacing: 0.16em`) i kompas „N ↑" (mono 9 px `#57503C`) w wolnych miejscach — muszą nie kolidować z pomieszczeniami ani drzwiami.
- Legenda pod rzutem: kwadraty 12 px z etykietami — scena / zaplecze / wejścia / ewakuacja.

Złoto na rzucie jest zarezerwowane wyłącznie dla sceny i przyłączy technicznych.

#### Tabela porównawcza
`grid-template-columns: 1.2fr repeat(5, 1fr); gap: 16px`. Wiersz nagłówka: mono 9.5 px `#9A9484`, `letter-spacing: 0.14em`, `border-bottom: 1px solid #453B24`. Wiersze danych: `padding: 16px 0`, `border-bottom: 1px solid #2C2618`; wiersz aktywnej sali dostaje `background: rgba(252,204,0,0.04)`, nazwę w `#FCCC00` i cenę w `#FCCC00`.

#### Pakiety obsługi
Trzy karty. Pakiet II („najczęściej wybierany") ma `border: 1px solid #453B24` i nazwę w `#FCCC00`, pozostałe `#2C2618` i `#F5F1E8`.
- **I — Sama sala:** przestrzeń, szatnia, ochrona, sprzątanie, koordynator obiektu.
- **II — Sala z techniką:** pakiet I + nagłośnienie, światło, projekcja, dwóch techników.
- **III — Pełna obsługa:** pakiet II + catering, bar, obsługa kelnerska, rejestracja wideo.

Warunki pod pakietami: ceny netto (VAT 23%), doba techniczna 8:00–2:00, zadatek 30%, rozliczenie 14 dni po wydarzeniu, montaż w dniu poprzedzającym 40% stawki, wydarzenia komercyjne pn–czw w terminach dziennych.

#### Formularz zapytania
`width: 400px`, `background: #151109`, `border: 1px solid #453B24`, `border-top: 2px solid #C09C18`, `border-radius: 6px`, `padding: 28px 26px`, `height: fit-content`.
Pola: sala (wypełniona automatycznie z aktywnej zakładki, wartość w `#FCCC00`), data, liczba gości (zakres podpowiadany z pojemności sali), nazwa firmy, e-mail, checkbox RODO **niezaznaczony**, przycisk `#C09C18`, pod nim SLA „ODPOWIEDŹ W 24 H · PN–PT 9:00–17:00".

Wszystkie siatki pól muszą używać `grid-template-columns: minmax(0, 1fr) …`, a inputy `min-width: 0; width: 100%` — bez tego intrinsic width pola rozpycha kolumny poza panel.

---

### 3. Kontakt — `Kontakt.dc.html`

**Purpose:** dojechać, znaleźć właściwą osobę, wysłać wiadomość na właściwy temat.

#### Hero
`grid-template-columns: 1fr auto; gap: 56px; align-items: end`. Po lewej: etykieta, H1 „Krakowska 100, Wrocław" (Anton 72 px, `line-height: 0.96`), akapit. Po prawej, wyrównane do prawej: „CENTRALA" (mono 11 px), numer telefonu **Anton 34 px w `#FCCC00`**, godziny (mono 11.5 px).

#### Mapa
`grid-template-columns: 1fr 440px`, wysokość minimum 520 px.
- Lewa strona: `<iframe>` z Google Maps embed (`https://www.google.com/maps?q=…&output=embed`), `position: absolute; inset: 0`, `border: 0`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`.
- **Filtr dopasowujący mapę do palety:** `filter: invert(0.92) hue-rotate(180deg) saturate(0.5) brightness(0.95) contrast(0.95)`. To hack CSS — jeśli projekt ma budżet na Google Maps JavaScript API z kluczem, lepiej użyć własnego stylu mapy (ciemne tło `#0C0A08`, drogi `#201A10`, etykiety `#9A9484`, pin `#FCCC00`) i usunąć filtr.
- Nakładka `box-shadow: inset 0 0 0 1px #2C2618, inset 0 60px 90px -60px rgba(12,10,8,0.9)`, `pointer-events: none`.
- Karta adresu (lewy górny róg): `background: rgba(12,10,8,0.88)`, `border: 1px solid #453B24`, `border-left: 3px solid #FCCC00`, `pointer-events: none`.
- Przycisk „Wyznacz trasę" (prawy dolny róg): złoty, prowadzi do `google.com/maps/dir/?api=1&destination=…`, `target="_blank"`.
- Prawa strona — panel „JAK DOTRZEĆ": pięć wierszy z badge'ami (`border-radius: 3px`, `padding: 5px 8px`, mono 10 px, `flex: none`) i opisem (Inter 14 px). Badge TRAM jest złoty (wypełniony), pozostałe obrysowe. Na dole sekcja DOSTĘPNOŚĆ (wejście bez progów, winda, miejsca dla wózków, asysta na zgłoszenie).

#### Karty kontaktowe
`grid-template-columns: repeat(4, 1fr); gap: 18px`, `min-height: 250px`, `white-space: pre-line` (adresy i telefony są wieloliniowe).
| Dział | Zakres | SLA |
|---|---|---|
| BILETY | zamówienia, faktury, zwroty, przepisanie wejściówki | tego samego dnia (SLA w `#6BBF59`) |
| BOOKING | propozycje koncertów, riderzy, terminy dla agencji | do 5 dni |
| WYNAJEM | gale, konferencje, wycena, dostępność | w 24 h |
| PRASA | akredytacje, zdjęcia, materiały, patronaty | do 3 dni przed |

Karta biletowa jest wyróżniona: `border: 1px solid #453B24`, tag w `#FCCC00`, SLA w zieleni.

#### Formularz
`grid-template-columns: 1fr 460px; gap: 56px`, `background: #100D0A`.
- Lewa strona: nagłówek, dane do faktur (nazwa spółki, adres, NIP, REGON), godziny otwarcia (biuro / kasy / bar).
- Prawa strona: karta formularza `border-top: 2px solid #FCCC00`.
  - **Przełącznik tematu** (pill-buttony): Bilety / Booking / Wynajem sali / Prasa.
  - Wybór tematu zmienia trzy rzeczy: przy „Wynajem sali" pojawiają się dodatkowe pola DATA i LICZBA GOŚCI; placeholder pola wiadomości dostosowuje się do tematu; stopka pokazuje właściwy adres e-mail i SLA.
  - Checkbox RODO niezaznaczony, przycisk złoty „Wyślij wiadomość".

---

### 4. Panel administracyjny — `Panel - nowe wydarzenie.dc.html`

**Purpose:** osoba z klubu dodaje koncert w jednym ekranie i od razu widzi, jak wyjdzie na stronie.

**Layout:** `grid-template-columns: 1fr 380px` — formularz po lewej (`border-right: 1px solid #2C2618`), podgląd po prawej. Nad tym pasek panelu: breadcrumb „PANEL / WYDARZENIA / NOWE", stan szkicu, „Zapisz szkic" (obrysowy) i „Publikuj" (złoty).

#### Sekcje formularza
Każda z etykietą mono 10 px `#C09C18`, `letter-spacing: 0.18em`, rozdzielone `border-top: 1px solid #2C2618`, `padding-top: 24px`.

**1 · ARTYSTA I GATUNEK**
- Nazwa artysty — pole stylizowane docelowo: `background: #201A10`, `border: 1px solid #453B24`, **Anton 22 px uppercase w `#FCCC00`**, żeby autor od razu widział, jak nazwa zadziała na plakacie. Pod polem podpowiedź: „Ta nazwa wyjdzie największym krojem na karcie i na stronie wydarzenia."
- Support (opcjonalny), gatunek (pill-buttony, jeden wybór).

**2 · TERMIN I SALA**
- Data (wymagana), wejście (domyślnie godzina przed startem), start (wymagany) — mono 14 px.
- Sala: trzy karty do wyboru, aktywna `background: rgba(252,204,0,0.08)`, `border: 1px solid #FCCC00`, nazwa `#FCCC00`.
- **Komunikat kolizji** (mono 10.5 px): `⚠ KOLIZJA: SALA DUŻA JEST ZAJĘTA 14.11.2026…` w `#E0A020` albo `✓ TERMIN WOLNY — SALA DOSTĘPNA W TYM DNIU` w `#6BBF59`. Kolizja występuje, gdy wybrana sala ma już wydarzenie tego dnia — publikacja powinna być wtedy zablokowana.
- **Mini-kalendarz obłożenia** — kompaktowy, żeby nie dominował formularza. `background: #151109`, `border: 1px solid #2C2618`, `border-radius: 6px`, `padding: 16px 18px`, `display: flex; gap: 24px`.
  - Siatka: `grid-template-columns: repeat(7, 24px); gap: 4px`, kratki 24 × 24 px, `border-radius: 3px`, mono 9.5 px. Nagłówki dni mono 8 px `#6E6858`.
  - Kolory kratek: wybrany termin — `#FCCC00` z tekstem `#0C0A08`; wybrana sala zajęta (kolizja) — `rgba(224,160,32,0.22)` + `border: 1px solid #E0A020`; gra inna sala — `#201A10` + `border: 1px solid #453B24`; wolne — `#151109` + `border: 1px solid #2C2618`.
  - Kliknięcie kratki wpisuje datę do pola i przelicza komunikat kolizji.
  - Legenda po prawej (kwadraty 16 px) + podsumowanie „N Z 30 DNI ZAJĘTYCH / WOLNYCH TERMINÓW: M".

**3 · BILETY**
Cena od (wymagana), cena w dniu koncertu, pula biletów, wiek. Pod tym status sprzedaży jako cztery przyciski — aktywny dostaje obrys i tekst w kolorze swojego statusu. Statusy poniżej 20% puli powinny przeliczać się automatycznie.

**4 · PLAKAT I OPIS**
`grid-template-columns: 200px 1fr; gap: 16px`. Strefa upuszczania pliku: `border: 1px dashed #453B24`, wysokość 130 px, „UPUŚĆ PLAKAT" (`#C09C18`) + „JPG / PNG · MIN 1600 × 900". Obok textarea na opis, 5 wierszy.

#### Panel podglądu (prawa kolumna)
- **Karta wydarzenia na żywo** — dokładnie ten komponent, który trafia na stronę główną (perforacja, wycięcia, kolory statusów). Aktualizuje się przy każdym znaku: nazwa, data i godzina, gatunek i sala, cena, status.
- **Checklista publikacji:** nazwa artysty / data i godzina / sala bez kolizji / cena od / plakat 1600 × 900. Spełnione `✓` w `#6BBF59`, niespełnione `○` w `#6E6858`.
- **„Gdzie się pojawi":** strona główna (kafel), kalendarz, strona wydarzenia, newsletter miesięczny, kanał RSS.

---

### 5. Style guide — `Zaklete Rewiry - Style Guide.dc.html`
Referencja tokenów, skali typograficznej z polskimi diakrytykami, stanów przycisku biletu (spoczynek / hover / pressed / focus / loading / wyprzedane), filtrów, kart wydarzeń, drugiego rejestru wynajmu, newslettera, cookies i wzorcowego rzutu Sali Dużej z pełną specyfikacją przyłączy.

### 6. Oferta wynajmu — `Oferta wynajmu.dc.html`
Dwustronicowy dokument A4 (ciemny) do wysyłki klientom B2B. Strona 1: tabela sal, pojemności w układach, kontakt. Strona 2: pakiety, specyfikacja techniczna, zaplecze, warunki, osoba kontaktowa. Zbudowany na komponencie `doc-page.js`, drukuje się bez dodatkowego CSS.

Istnieje też wersja na białym tle do wydruku oszczędzającego toner (mapowanie: `#0C0A08→#FFFFFF`, `#F5F1E8→#14100C`, `#FCCC00→#B08D0C`, `#C09C18→#8A6E08`, `#2C2618→#E2DED4`).

Docelowo dobrze byłoby generować ten dokument po zalogowaniu w panelu — pracownik wypełnia formularz (sala, termin, pakiet, dane klienta) i pobiera gotowy PDF. To zadanie na późniejszy etap wdrożenia.

---

## Interactions & Behavior

| Element | Zachowanie |
|---|---|
| Przełącznik PL/EN | Przełącza język całego interfejsu. W prototypie tłumaczy nawigację i CTA; docelowo pełne i18n. Dwa przełączniki (nagłówek i stopka) trzymają wspólny stan. |
| Podmenu „Wynajem sal" | Otwierane kliknięciem (nie hover — kompatybilność z dotykiem). Zamykane kliknięciem poza obszarem i Escape. `z-index: 20`. |
| Filtry gatunków | Jeden wybór, natychmiastowe filtrowanie siatki bez przeładowania. Domyślnie „Wszystkie". |
| Karta wydarzenia | Cała karta klikalna → strona wydarzenia. Przycisk biletu → koszyk/system sprzedaży. Karta wyprzedana: przycisk wyłączony, prowadzi do listy rezerwowej. |
| Pasek „Dziś w Rewirach" | Renderowany warunkowo, tylko w dniu wydarzenia. |
| Zakładki sal | Przełączają całą treść strony bez przeładowania. Docelowo powinny zmieniać URL (`/wynajem/sala-duza`) dla linkowania i SEO. |
| Przełącznik układów sali | Zmienia strefę gości i pojemność na rzucie. |
| Temat formularza kontaktowego | Zmienia widoczne pola, placeholder i adres docelowy. |
| Mini-kalendarz w panelu | Klik dnia → wpisanie daty → przeliczenie kolizji. |
| Checklista publikacji | Przelicza się na bieżąco; „Publikuj" aktywne tylko gdy spełnione wymagane pozycje i brak kolizji. |
| Cookies | Oba przyciski zamykają baner i zapisują wybór (localStorage lub cookie). Link do ustawień otwiera widok szczegółowy (niezbędne / analityczne / marketingowe). |
| Newsletter | Walidacja e-maila; przycisk aktywny dopiero po zaznaczeniu zgody. |
| Hover przycisków | Złote: `#FCCC00 → #FFD824`. Obrysowe złote: tło `rgba(252,204,0,0.12)`. Obrysowe neutralne: `border-color → #F5F1E8`. Wynajem: `#C09C18 → #FCCC00`. |
| Focus | `outline: 2px solid #F5F1E8; outline-offset: 3px` na złotych przyciskach; pola `border-color: #FCCC00`. Wszystkie stany focus muszą być widoczne z klawiatury. |
| Pressed | Złoty przycisk: `background: #C09C18`, `transform: translateY(1px)`. |
| Animacje | Prototypy nie definiują przejść. Zalecenie: 150 ms `ease-out` na kolory i obrysy, 200 ms na rozwijanie podmenu. Bez ozdobnych animacji — estetyka jest surowa, klubowa. |

## State Management
- **Globalny:** język (PL/EN), zgoda cookies, otwarte/zamknięte podmenu.
- **Strona główna:** aktywny filtr gatunku, stan checkboxa newslettera, widoczność paska „Dziś" (z danych), widoczność banera cookies.
- **Wynajem:** aktywna sala (docelowo z URL), wybrany układ sali, stan formularza + zgoda RODO.
- **Kontakt:** wybrany temat, pola formularza, zgoda RODO.
- **Panel:** wszystkie pola wydarzenia, wybrany gatunek, sala, status, data (współdzielona z mini-kalendarzem), wyliczona kolizja, wyliczona checklista, stan szkicu (autosave).

**Dane potrzebne z backendu:**
- Lista wydarzeń: nazwa, support, gatunek, data, wejście, start, sala, cena od, cena w dniu, pula, sprzedane, status, plakat, opis, wiek.
- Zajętość sal per dzień (do kalendarza i wykrywania kolizji).
- Konfiguracja sal: metraże, pojemności w układach, specyfikacja techniczna, ceny.
- Archiwum artystów (sekcja „Grali u nas").

## Assets

**Sygnet ZR** — `assets/zr-sygnet.png` (85 × 96 px) plus warianty jednokolorowe: `-gold` (`#FCCC00`), `-black` (`#0C0A08`), `-white` (`#F5F1E8`).

Powstał przez wycięcie liter **Z** (z „Zaklęte") i **R** (z „Rewiry") z istniejącego logotypu `assets/logo-zaklete-rewiry.webp` i złożenie ich z odstępem −4 px, tak że cienie 3D się stykają. Zachowuje oryginalne kształty liter, kontur i cień, więc nie ma ryzyka rozjazdu z pełnym logotypem.

**To pliki rastrowe** — nadają się do makiet, nie do wdrożenia. Przed produkcją:
1. Obrysować Z i R wektorowo z pełnego logotypu.
2. Ujednolicić grubość konturu i przesunięcie cienia.
3. Wyeksportować SVG w czterech wersjach: podstawowa (złoto + kontur + cień), jednokolorowa złota, jednokolorowa czarna, biała.
4. Poniżej 40 px cień i kontur trzeba wyłączyć — wtedy wchodzi wersja płaska złota albo czerń na złotym kaflu (favicon).

Pole ochronne sygnetu: 1/3 wysokości litery Z z każdej strony.

**Fonty** — Google Fonts: Anton (400), Inter (400/500/600/700), JetBrains Mono (400/500/700). W produkcji zaleca się self-hosting (`font-display: swap`, subset latin + latin-ext dla polskich diakrytyków).

**Zdjęcia** — brak. Wszystkie kadry to placeholdery ze złotą siatką LED. Potrzebne: plakaty wydarzeń 16:9 i 3:4 (min. 1600 px szerokości), zdjęcia z koncertów 21:9, zdjęcia trzech sal w różnych układach (pusta, koncert, bankiet, konferencja), zdjęcia zaplecza.

**Ikony** — projekt nie używa zestawu ikon. Wszystkie „ikony" to typografia, kolorowe kropki i kwadraty legendy. Jeśli codebase ma bibliotekę ikon, używać jej oszczędnie — estetyka opiera się na typografii, nie na ikonografii.

**Mapa** — Google Maps embed bez klucza + filtr CSS. Alternatywa: Maps JavaScript API z własnym stylem albo Leaflet + MapTiler z ciemnym motywem.

## Files
| Plik | Zawartość |
|---|---|
| `Strona glowna.dc.html` | Strona główna, osiem sekcji |
| `Sale.dc.html` | Wynajem — trzy sale w zakładkach, rzuty, porównanie, formularz |
| `Kontakt.dc.html` | Kontakt — mapa, dojazd, karty działów, formularz tematyczny |
| `Panel - nowe wydarzenie.dc.html` | Panel administracyjny — dodawanie wydarzenia |
| `Zaklete Rewiry - Style Guide.dc.html` | Tokeny, typografia, komponenty, statusy, wzorcowy rzut |
| `Oferta wynajmu.dc.html` | Dokument A4 (2 strony) do wysyłki B2B |
| `support.js` | Runtime prototypów — potrzebny tylko do otwarcia plików w przeglądarce |
| `doc-page.js` | Komponent stronicowania dokumentu (używany przez ofertę) |
| `assets/` | Sygnet ZR (4 warianty) + oryginalny logotyp |

## Priorytety wdrożenia
1. Strona główna z sekcjami 1.1–1.4 (nagłówek, hero, pasek dziś, siatka wydarzeń z filtrami) — to realizuje główne zadanie sprzedażowe.
2. Blok wynajmu na głównej + strona wynajmu — druga, wyżej marżowa ścieżka.
3. Strona wydarzenia (projekt istnieje w wariantach, do wybrania układu), kalendarz, kontakt.
4. Panel administracyjny.
5. Generowanie oferty PDF po zalogowaniu.

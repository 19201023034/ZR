# Zaklęte Rewiry — strona klubu

CKR Zaklęte Rewiry, ul. Krakowska 100, Wrocław — klub koncertowy + wynajem trzech sal.

## Struktura

```
zr-next/                        aplikacja Next.js 15 (App Router, React 19, CSS Modules)
design_handoff_zaklete_rewiry/  źródłowy design handoff — tokeny, layouty, rzuty sal
```

## Uruchomienie

```bash
cd zr-next
npm install
npm run dev        # http://localhost:3126
```

## Strony

| Ścieżka | Opis |
|---|---|
| `/` | strona główna — hero, repertuar, wynajem, archiwum, newsletter |
| `/repertuar` | pełny kalendarz z filtrami gatunków |
| `/wydarzenie/[slug]` | strona wydarzenia z JSON-LD `MusicEvent` |
| `/bilety` | lista sprzedaży (w sprzedaży / wkrótce / wyprzedane) |
| `/wynajem` | trzy sale, rzuty techniczne, formularz |
| `/wynajem/oferta` | oferta B2B, przystosowana do druku/PDF |
| `/klub`, `/kontakt`, `/archiwum` | treści |
| `/panel` | panel dodawania wydarzeń |

## Bilety

Sprzedaż prowadzi **Stage24** — nie ma tu koszyka ani płatności. Każde wydarzenie
ma pole `ticketUrl`; o wyglądzie przycisku decyduje wyłącznie
`components/TicketButton.jsx`.

## ⚠️ Store wydarzeń a produkcja

`lib/store.js` zapisuje do `zr-next/data/events.json` przez `fs`. Działa to lokalnie
i na zwykłym VPS-ie, ale **nie zadziała na Vercel ani innym hostingu serverless** —
system plików jest tam tylko do odczytu i efemeryczny, więc panel nie zapisze zmian.

Przed wdrożeniem na Vercel trzeba przepiąć store na bazę (Supabase / Neon / Vercel KV).
Cała logika dostępu do danych jest w jednym pliku — `lib/store.js` — i tylko on
wymaga przepisania.

## Deploy na Vercel

Aplikacja **nie leży w katalogu głównym repo**, więc bez poniższego ustawienia
Vercel zbuduje pustkę i każda ścieżka zwróci `404: NOT_FOUND`.

1. Vercel → projekt → **Settings → Build and Deployment → Root Directory** → wpisz `zr-next` → Save.
2. **Settings → Environment Variables**:

   | Zmienna | Wartość na podglądzie | Wartość na produkcji |
   |---|---|---|
   | `NEXT_PUBLIC_NOINDEX` | `1` | *(nie ustawiaj)* |
   | `NEXT_PUBLIC_SITE_URL` | adres z Vercela | `https://zakleterewiry.pl` |
   | `MAILERLITE_API_KEY` | — | token z MailerLite |

3. **Deployments → Redeploy** (zmiana Root Directory nie przebudowuje automatycznie).

### Czego nie będzie działać na podglądzie

Panel `/panel` **nie zapisze zmian** — Vercel montuje system plików tylko do odczytu.
Wyświetli komunikat o trybie demo zamiast błędu. Cała publiczna część strony,
łącznie z wydarzeniami z `data/events.json`, działa normalnie, bo odczyt jest
bez przeszkód. Trwały zapis wymaga przepięcia `lib/store.js` na bazę danych.

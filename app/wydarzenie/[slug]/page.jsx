import { notFound } from 'next/navigation';

import EventDetail from '@/components/EventDetail';
import { getEventBySlug, getUpcoming } from '@/lib/store';
import { formatDate, warsawIso, VENUE_ADDRESS, translateRoom } from '@/lib/events';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';
import { SITE_ORIGIN as SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [event, locale] = await Promise.all([getEventBySlug(slug), getLocale()]);
  const en = locale === 'en';
  if (!event) return { title: en ? 'Event not found' : 'Nie znaleziono wydarzenia' };

  const when = formatDate(event.date, locale);
  const title = `${event.artist} — ${when}`;
  const description = event.description
    ? event.description.slice(0, 155)
    : en
      ? `${event.artist} live at Zaklęte Rewiry, ${when}, ${translateRoom(event.venue, 'en')}. `
        + `Wrocław, ul. Krakowska 100.`
      : `${event.artist} w Zaklętych Rewirach, ${when}, ${event.venue}. `
        + `Wrocław, ul. Krakowska 100.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/wydarzenie/${event.slug}` },
    openGraph: {
      title: `${title} | Zaklęte Rewiry`,
      description,
      type: 'article',
      url: `${SITE}/wydarzenie/${event.slug}`,
      // A real poster wins; otherwise leave `images` unset so Next's
      // file-based opengraph-image.js (the generated card) supplies it.
      // Setting images:undefined here would instead delete that default.
      ...(event.poster ? { images: [event.poster] } : {}),
    },
  };
}

/** schema.org Event — what puts the gig into Google's event results. */
function buildJsonLd(event) {
  const availability = {
    dostepne: 'https://schema.org/InStock',
    ostatnie: 'https://schema.org/LimitedAvailability',
    wyprzedane: 'https://schema.org/SoldOut',
    przedsprzedaz: 'https://schema.org/PreOrder',
  }[event.status] ?? 'https://schema.org/InStock';

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.artist,
    url: `${SITE}/wydarzenie/${event.slug}`,
    startDate: warsawIso(event.date, event.start),
    doorTime: event.doors ? warsawIso(event.date, event.doors) : undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: event.description || undefined,
    image: event.poster ? [event.poster] : undefined,
    performer: { '@type': 'PerformingGroup', name: event.artist },
    organizer: {
      '@type': 'Organization',
      name: 'CKR Zaklęte Rewiry',
      url: SITE,
    },
    location: {
      '@type': 'MusicVenue',
      name: `Zaklęte Rewiry — ${event.venue}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: VENUE_ADDRESS.street,
        postalCode: VENUE_ADDRESS.postalCode,
        addressLocality: VENUE_ADDRESS.city,
        addressCountry: VENUE_ADDRESS.country,
      },
    },
    // only claim an offer when there is a real place to buy
    offers: event.ticketUrl
      ? {
          '@type': 'Offer',
          url: event.ticketUrl,
          availability,
          priceCurrency: 'PLN',
          ...(event.priceFrom != null ? { price: String(event.priceFrom) } : {}),
        }
      : undefined,
    typicalAgeRange: event.ageMin ? `${event.ageMin}-` : undefined,
  };
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const [event, locale] = await Promise.all([getEventBySlug(slug), getLocale()]);
  if (!event) notFound();

  const upcoming = await getUpcoming();
  const others = upcoming.filter(e => e.id !== event.id).slice(0, 3);

  const jsonLd = buildJsonLd(event);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify drops the `undefined` keys above, so the payload
        // only ever contains fields we can actually vouch for
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventDetail event={event} others={others} t={getDict(locale)} locale={locale} />
    </>
  );
}

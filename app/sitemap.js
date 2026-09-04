import { getEvents } from '@/lib/store';
import { SITE_ORIGIN as SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const events = await getEvents();

  const staticPages = [
    ['', 1.0, 'daily'],
    ['/repertuar', 0.9, 'daily'],
    ['/bilety', 0.9, 'daily'],
    ['/wynajem', 0.8, 'monthly'],
    ['/imprezy-okolicznosciowe', 0.7, 'monthly'],
    ['/klub', 0.7, 'monthly'],
    ['/wynajem/oferta', 0.6, 'monthly'],
    ['/faq', 0.6, 'monthly'],
    ['/kontakt', 0.6, 'yearly'],
    ['/archiwum', 0.4, 'weekly'],
    ['/dostepnosc', 0.3, 'yearly'],
    ['/praca', 0.3, 'monthly'],
    ['/regulamin', 0.2, 'yearly'],
    ['/zwroty', 0.2, 'yearly'],
    ['/polityka-prywatnosci', 0.2, 'yearly'],
  ].map(([path, priority, changeFrequency]) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const eventPages = events.map(e => ({
    url: `${SITE}/wydarzenie/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...eventPages];
}

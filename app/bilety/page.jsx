import BiletyBody from '@/components/BiletyBody';
import { getUpcoming } from '@/lib/store';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return { title: t.bilety.metaTitle, description: t.bilety.metaDesc };
}

export const dynamic = 'force-dynamic';

export default async function BiletyPage() {
  const [events, locale] = await Promise.all([getUpcoming(), getLocale()]);
  return <BiletyBody events={events} t={getDict(locale)} locale={locale} />;
}

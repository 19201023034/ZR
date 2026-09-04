import RepertuarBody from '@/components/RepertuarBody';
import { getEvents } from '@/lib/store';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return { title: t.repertuar.metaTitle, description: t.repertuar.metaDesc };
}

export const dynamic = 'force-dynamic';

export default async function RepertuarPage() {
  const [events, locale] = await Promise.all([getEvents(), getLocale()]);
  return <RepertuarBody events={events} t={getDict(locale)} locale={locale} />;
}

import ArchiwumBody from '@/components/ArchiwumBody';
import { getPast } from '@/lib/store';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return { title: t.archiwum.metaTitle, description: t.archiwum.metaDesc };
}

export const dynamic = 'force-dynamic';

export default async function ArchiwumPage() {
  const [past, locale] = await Promise.all([getPast(), getLocale()]);
  return <ArchiwumBody past={past} t={getDict(locale)} locale={locale} />;
}

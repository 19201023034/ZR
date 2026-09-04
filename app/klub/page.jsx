import KlubBody from '@/components/KlubBody';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return { title: t.klub.metaTitle, description: t.klub.metaDesc };
}

export default async function KlubPage() {
  const locale = await getLocale();
  return <KlubBody t={getDict(locale)} locale={locale} />;
}

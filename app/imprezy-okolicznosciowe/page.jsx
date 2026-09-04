import ImprezyBody from '@/components/ImprezyBody';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return {
    title: t.imprezy.metaTitle,
    description: t.imprezy.metaDesc,
    alternates: { canonical: '/imprezy-okolicznosciowe' },
  };
}

export default async function Page() {
  const locale = await getLocale();
  return <ImprezyBody t={getDict(locale)} locale={locale} />;
}

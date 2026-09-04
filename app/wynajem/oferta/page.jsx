import OfertaBody from '@/components/OfertaBody';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return { title: t.oferta.metaTitle, description: t.oferta.metaDesc };
}

export default async function OfertaPage() {
  const locale = await getLocale();
  return <OfertaBody t={getDict(locale)} locale={locale} />;
}

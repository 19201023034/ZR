import WynajemBody from '@/components/WynajemBody';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return { title: t.wynajem.metaTitle, description: t.wynajem.metaDesc };
}

export default async function WynajemPage() {
  const locale = await getLocale();
  return <WynajemBody t={getDict(locale)} locale={locale} />;
}

import KontaktBody from '@/components/KontaktBody';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const t = getDict(await getLocale());
  return { title: t.kontakt.metaTitle, description: t.kontakt.metaDesc };
}

export default async function KontaktPage() {
  return <KontaktBody t={getDict(await getLocale())} />;
}

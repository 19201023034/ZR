import PanelShell from '@/components/PanelShell';
import { getEvents } from '@/lib/store';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export const metadata = { title: 'Panel' };
export const dynamic = 'force-dynamic';

export default async function PanelPage() {
  const [events, locale] = await Promise.all([getEvents(), getLocale()]);
  return <PanelShell events={events} t={getDict(locale).panel} locale={locale} />;
}

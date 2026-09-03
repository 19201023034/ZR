import PanelShell from '@/components/PanelShell';
import { getEvents } from '@/lib/store';

export const metadata = { title: 'Panel' };
export const dynamic = 'force-dynamic';

export default async function PanelPage() {
  const events = await getEvents();
  return <PanelShell events={events} />;
}

import RepertuarBody from '@/components/RepertuarBody';
import { getEvents } from '@/lib/store';

export const metadata = { title: 'Repertuar' };
export const dynamic = 'force-dynamic';

export default async function RepertuarPage() {
  const events = await getEvents();
  return <RepertuarBody events={events} />;
}

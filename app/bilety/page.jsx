import BiletyBody from '@/components/BiletyBody';
import { getUpcoming } from '@/lib/store';

export const metadata = {
  title: 'Bilety',
  description: 'Bilety na koncerty w Zaklętych Rewirach. Sprzedaż prowadzi Stage24.',
};
export const dynamic = 'force-dynamic';

export default async function BiletyPage() {
  const events = await getUpcoming();
  return <BiletyBody events={events} />;
}

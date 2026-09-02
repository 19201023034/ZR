import ArchiwumBody from '@/components/ArchiwumBody';
import { getPast } from '@/lib/store';

export const metadata = {
  title: 'Archiwum koncertów',
  description: 'Artyści i wydarzenia, które odbyły się w CKR Zaklęte Rewiry we Wrocławiu.',
};
export const dynamic = 'force-dynamic';

export default async function ArchiwumPage() {
  const past = await getPast();
  return <ArchiwumBody past={past} />;
}

import ImprezyBody from '@/components/ImprezyBody';

export const metadata = {
  title: 'Imprezy okolicznościowe Wrocław — sala na urodziny, jubileusz, wesele',
  description: 'Organizacja imprez okolicznościowych we Wrocławiu — urodziny, jubileusze, wesela, studniówki, sylwester. Sala na 1000 osób, catering, scena i pełne zaplecze techniczne w klubie Zaklęte Rewiry, ul. Krakowska 100.',
  alternates: { canonical: '/imprezy-okolicznosciowe' },
};

export default function Page() {
  return <ImprezyBody />;
}

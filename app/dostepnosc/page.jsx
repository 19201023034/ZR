import DocPage from '@/components/DocPage';
import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const en = (await getLocale()) === 'en';
  return {
    title: en ? 'Accessibility' : 'Dostępność',
    description: en
      ? 'Accessibility of the CKR Zaklęte Rewiry building for people with additional needs, and the digital accessibility of this site.'
      : 'Dostępność obiektu CKR Zaklęte Rewiry dla osób ze szczególnymi potrzebami oraz dostępność cyfrowa serwisu.',
  };
}

const TODO = ({ children }) => <span className="todo">{children}</span>;

export default async function Page() {
  const locale = await getLocale();
  const t = getDict(locale).docs;
  const en = locale === 'en';

  return (
    <DocPage
      t={t}
      label={t.info}
      title={en ? 'Accessibility' : 'Dostępność'}
      updated={en ? '2 September 2026' : '2 września 2026'}
      lead={en
        ? 'What we have in place for people with additional needs — and what we are still missing.'
        : 'Co przygotowaliśmy dla osób ze szczególnymi potrzebami — i czego jeszcze nam brakuje.'}
      notice={en
        ? 'The digital accessibility statement needs to be based on a real WCAG 2.1 audit. The description of the building below needs to be confirmed on site.'
        : `Deklarację dostępności cyfrowej należy oprzeć na faktycznym audycie WCAG 2.1.
           Poniższy opis architektoniczny wymaga potwierdzenia stanu na obiekcie.`}
    >
      {en ? (
        <>
          <h2>Getting around the building</h2>
          <ul>
            <li>Main entrance from ul. Krakowska — step-free, level with the pavement.</li>
            <li>A lift serving every floor open to the public.</li>
            <li>Dedicated wheelchair spaces in every room.</li>
            <li>An accessible toilet on level <TODO>[to be confirmed]</TODO>.</li>
            <li>Our own car park — <TODO>[number]</TODO> marked accessible spaces.</li>
            <li>Assistance dogs are welcome.</li>
          </ul>

          <h2>Assistance</h2>
          <p>
            If you need help getting in, finding your place or during the event itself,
            let us know in advance through the <Link href="/kontakt">contact form</Link>{' '}
            or by phone on 71 300 10 00. The earlier we know, the better we can prepare.
          </p>

          <h2>What we do not have yet</h2>
          <p>
            We do not have a permanent hearing loop or sign language interpreter.
            Where an event allows it we arrange interpretation on request — please tell
            us at least <TODO>[number]</TODO> days in advance.
          </p>

          <h2>Digital accessibility</h2>
          <p>
            We aim for this site to meet WCAG 2.1 at level AA. The site works from the
            keyboard, has a visible focus indicator, respects the reduced-motion setting
            in your system and maintains text contrast. A full digital accessibility
            audit is in preparation.
          </p>
          <p>Found a barrier? Write to us — we treat those reports as a priority.</p>
        </>
      ) : (
        <>
          <h2>Dostępność architektoniczna</h2>
          <ul>
            <li>Wejście główne od ul. Krakowskiej — bez progów, poziom z chodnikiem.</li>
            <li>Winda obsługująca wszystkie kondygnacje dostępne dla publiczności.</li>
            <li>Wydzielone miejsca dla osób poruszających się na wózkach na każdej sali.</li>
            <li>Toaleta przystosowana dla osób z niepełnosprawnościami na poziomie <TODO>[uzupełnić]</TODO>.</li>
            <li>Parking własny — <TODO>[liczba]</TODO> miejsc oznaczonych dla osób z niepełnosprawnościami.</li>
            <li>Do obiektu można wejść z psem asystującym.</li>
          </ul>

          <h2>Asysta</h2>
          <p>
            Jeśli potrzebujesz pomocy przy wejściu, dotarciu na miejsce lub w trakcie
            wydarzenia — zgłoś to z wyprzedzeniem przez <Link href="/kontakt">formularz kontaktowy</Link>{' '}
            lub telefonicznie pod numerem 71 300 10 00. Im wcześniej wiemy, tym lepiej
            możemy się przygotować.
          </p>

          <h2>Czego jeszcze nie mamy</h2>
          <p>
            Nie dysponujemy pętlą indukcyjną ani tłumaczem języka migowego na stałe.
            Przy wydarzeniach, przy których jest to możliwe, organizujemy tłumaczenie
            na zgłoszenie — daj znać z wyprzedzeniem co najmniej <TODO>[liczba]</TODO> dni.
          </p>

          <h2>Dostępność cyfrowa</h2>
          <p>
            Staramy się, aby ten serwis spełniał wymagania WCAG 2.1 na poziomie AA.
            Strona działa z klawiatury, ma widoczny fokus, respektuje ustawienie
            ograniczonego ruchu w systemie i zachowuje kontrast tekstu.
            Pełny audyt dostępności cyfrowej jest w przygotowaniu.
          </p>
          <p>
            Znalazłeś barierę? Napisz — traktujemy takie zgłoszenia priorytetowo.
          </p>
        </>
      )}
    </DocPage>
  );
}

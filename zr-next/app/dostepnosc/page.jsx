import DocPage from '@/components/DocPage';
import Link from 'next/link';

export const metadata = {
  title: 'Dostępność',
  description: 'Dostępność obiektu CKR Zaklęte Rewiry dla osób ze szczególnymi potrzebami oraz dostępność cyfrowa serwisu.',
};

const TODO = ({ children }) => <span className="todo">{children}</span>;

export default function Page() {
  return (
    <DocPage
      label="Informacje"
      title="Dostępność"
      updated="2 września 2026"
      lead="Co przygotowaliśmy dla osób ze szczególnymi potrzebami — i czego jeszcze nam brakuje."
      notice="Deklarację dostępności cyfrowej należy oprzeć na faktycznym audycie WCAG 2.1.
              Poniższy opis architektoniczny wymaga potwierdzenia stanu na obiekcie."
    >
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
    </DocPage>
  );
}

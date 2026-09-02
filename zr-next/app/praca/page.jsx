import DocPage from '@/components/DocPage';
import Link from 'next/link';

export const metadata = {
  title: 'Praca',
  description: 'Praca i współpraca w CKR Zaklęte Rewiry — obsługa wydarzeń, technika sceniczna, bar.',
};

export default function Page() {
  return (
    <DocPage
      label="Dołącz do nas"
      title="Praca"
      lead="Klub żyje wieczorami i weekendami. Szukamy ludzi, którzy to lubią."
    >
      <h2>Kogo szukamy na stałe</h2>
      <p>
        Nie prowadzimy zamkniętych rekrutacji — zgłoszenia zbieramy cały rok
        i wracamy do nich, gdy pojawia się potrzeba. Najczęściej szukamy osób do:
      </p>
      <ul>
        <li><strong>obsługi baru</strong> — praca wieczorami i w weekendy, doświadczenie mile widziane,</li>
        <li><strong>obsługi widowni i szatni</strong> — również dla studentów, elastyczne grafiki,</li>
        <li><strong>techniki scenicznej</strong> — dźwięk, światło, montaż; znajomość konsolet d&amp;b i DMX na plus,</li>
        <li><strong>ochrony i służb porządkowych</strong> — wymagane odpowiednie uprawnienia.</li>
      </ul>

      <h2>Współpraca przy wydarzeniach</h2>
      <p>
        Współpracujemy też z fotografami, realizatorami wideo i freelancerami od
        produkcji. Jeśli masz portfolio z wydarzeń live — pokaż je, chętnie zobaczymy.
      </p>

      <h2>Jak się zgłosić</h2>
      <p>
        Napisz przez <Link href="/kontakt">formularz kontaktowy</Link>, wybierając temat
        „Inne", albo wyślij CV bezpośrednio na adres podany w zakładce kontakt.
        W zgłoszeniu napisz, na jakim stanowisku Ci zależy i w jakich godzinach
        możesz pracować.
      </p>
      <p>
        Prosimy o dopisanie klauzuli o zgodzie na przetwarzanie danych w celu
        rekrutacji — zasady opisaliśmy w{' '}
        <Link href="/polityka-prywatnosci">polityce prywatności</Link>.
      </p>
    </DocPage>
  );
}

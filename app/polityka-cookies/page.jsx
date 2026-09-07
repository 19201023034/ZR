import DocPage from '@/components/DocPage';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export const metadata = {
  title: 'Polityka cookies',
  description: 'Jakie pliki cookies i pamięć przeglądarki wykorzystuje serwis zakleterewiry.pl oraz jak zarządzać zgodą.',
};

export default async function Page() {
  const t = getDict(await getLocale()).docs;
  return (
    <DocPage
      t={t}
      plOnly
      label={t.documents}
      title="Polityka cookies"
      updated="7 września 2026"
      lead="Z jakich plików cookies i pamięci przeglądarki korzysta serwis zakleterewiry.pl, w jakim celu i jak w każdej chwili zmienić swój wybór."
      notice="Dokument przygotowany na podstawie RODO i art. 173 Prawa telekomunikacyjnego. Nie jest poradą prawną — przed publikacją warto, by przejrzał go prawnik."
    >
      <h2>1. Administrator</h2>
      <p>
        Administratorem serwisu jest Ryszard Chorążyczewski Centrum
        Kulturalno-Rozrywkowe, ul. Krakowska 100, 50-427 Wrocław, NIP 8941180748.
        Kontakt w sprawie danych i cookies: <a href="mailto:kontakt@zakleterewiry.pl">kontakt@zakleterewiry.pl</a>,
        tel. 575 261 519.
      </p>

      <h2>2. Czym są pliki cookies</h2>
      <p>
        Cookies to małe pliki tekstowe zapisywane w Twojej przeglądarce podczas
        korzystania ze strony. Obok nich używamy też innych mechanizmów pamięci
        przeglądarki (localStorage) do zapamiętania Twoich preferencji. Nie służą
        one do Twojej identyfikacji i nie zawierają danych kontaktowych.
      </p>

      <h2>3. Z jakich cookies korzystamy</h2>
      <p>
        Obecnie serwis używa wyłącznie plików <strong>niezbędnych i funkcjonalnych</strong>
        (zapamiętanie preferencji). Nie stosujemy cookies analitycznych ani
        marketingowych i nie profilujemy użytkowników.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Cel</th>
              <th>Rodzaj</th>
              <th>Czas przechowywania</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>zr-lang</td>
              <td>Zapamiętanie wybranego języka serwisu (PL/EN)</td>
              <td>Niezbędny · cookie własne</td>
              <td>12 miesięcy</td>
            </tr>
            <tr>
              <td>zr-theme</td>
              <td>Zapamiętanie motywu jasnego lub ciemnego</td>
              <td>Funkcjonalny · localStorage</td>
              <td>Do wyczyszczenia przez użytkownika</td>
            </tr>
            <tr>
              <td>zr-cookies</td>
              <td>Zapis Twojej decyzji dotyczącej cookies</td>
              <td>Niezbędny · localStorage</td>
              <td>Do wyczyszczenia przez użytkownika</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Podstawa prawna</h2>
      <p>
        Pliki niezbędne i funkcjonalne stosujemy na podstawie art. 173 ust. 3 Prawa
        telekomunikacyjnego — są konieczne do świadczenia usługi, o którą prosisz, i
        nie wymagają zgody. Gdybyśmy w przyszłości wprowadzili cookies analityczne lub
        marketingowe, uruchomimy je wyłącznie po wyrażeniu przez Ciebie zgody
        (art. 6 ust. 1 lit. a RODO), o którą poprosimy w banerze — zanim jakikolwiek
        taki plik zostanie zapisany.
      </p>

      <h2>5. Jak zarządzać zgodą i cookies</h2>
      <ul>
        <li>
          decyzję podejmujesz w banerze cookies przy pierwszej wizycie
          („Akceptuję wszystkie" albo „Tylko niezbędne"),
        </li>
        <li>
          wybór możesz zmienić lub wycofać w każdej chwili linkiem
          „Ustawienia cookies" w stopce strony,
        </li>
        <li>
          cookies możesz też usunąć lub zablokować w ustawieniach swojej
          przeglądarki — ograniczenie plików niezbędnych może jednak utrudnić
          korzystanie z serwisu.
        </li>
      </ul>

      <h2>6. Cookies podmiotów trzecich</h2>
      <p>
        Serwis nie osadza narzędzi analitycznych ani reklamowych podmiotów trzecich.
        Sprzedaż biletów prowadzi zewnętrzny operator (Stage24) na własnej stronie —
        jego cookies i polityka prywatności obowiązują dopiero po przejściu do jego
        serwisu i pozostają poza naszą kontrolą.
      </p>

      <h2>7. Więcej informacji</h2>
      <p>
        Zasady przetwarzania danych osobowych opisuje nasza{' '}
        <a href="/polityka-prywatnosci">Polityka prywatności</a>. W sprawach cookies
        napisz na <a href="mailto:kontakt@zakleterewiry.pl">kontakt@zakleterewiry.pl</a>.
      </p>
    </DocPage>
  );
}

import DocPage from '@/components/DocPage';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export const metadata = {
  title: 'Obowiązek informacyjny',
  description: 'Informacja o przetwarzaniu danych osobowych Użytkowników serwisu zakleterewiry.pl (RODO).',
};

export default async function Page() {
  const t = getDict(await getLocale()).docs;
  return (
    <DocPage
      t={t}
      plOnly
      label={t.documents}
      title="Obowiązek informacyjny"
      updated="7 września 2026"
      lead="Kto i na jakiej podstawie przetwarza dane osobowe podane w serwisie oraz jakie masz z tego tytułu prawa."
    >
      <p>
        Administratorem danych osobowych Użytkownika udostępnionych za pośrednictwem
        Serwisu, czyli podmiotem decydującym o celach i sposobach ich przetwarzania,
        jest <strong>Ryszard Chorążyczewski Centrum Kulturalno-Rozrywkowe</strong>,
        Krakowska 100, 50-427 Wrocław, NIP 8941180748 (dalej jako Administrator).
      </p>
      <p>
        Podane przez Użytkownika dane osobowe są przetwarzane przez Administratora na
        podstawie zgody wyrażonej przez Użytkownika, w rozumieniu art. 6 ust. 1 lit. a)
        Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
        2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
        osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia
        dyrektywy 95/46/WE — zwanego dalej RODO.
      </p>
      <p>
        Podanie danych osobowych za pośrednictwem Serwisu jest dobrowolne. Użytkownik ma
        prawo do cofnięcia wyrażonej zgody w dowolnym momencie poprzez kontakt z
        Administratorem <a href="mailto:kontakt@zakleterewiry.pl">kontakt@zakleterewiry.pl</a>,
        bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie
        zgody przed jej cofnięciem.
      </p>
      <p>
        Użytkownikowi przysługuje prawo dostępu do swoich danych osobowych w każdym
        czasie, ich sprostowania, usunięcia lub ograniczenia przetwarzania oraz prawo do
        wniesienia sprzeciwu wobec przetwarzania, a także prawo do przenoszenia danych.
      </p>

      <h2>Cele przetwarzania danych</h2>
      <p>Administrator przetwarza dane osobowe Użytkownika Serwisu w następujących celach:</p>
      <ol>
        <li>Komunikacji z Użytkownikiem, w szczególności obsługi reklamacji dotyczących produktów lub usług Administratora;</li>
        <li>Przedstawiania Użytkownikowi ofert handlowych drogą elektroniczną;</li>
        <li>Przedstawiania Użytkownikowi ofert handlowych w kontakcie telefonicznym;</li>
        <li>Umożliwienia Użytkownikowi przesyłania komentarzy lub opinii dotyczących produktów lub usług Administratora.</li>
      </ol>

      <p>
        Administrator może przetwarzać dane osobowe Użytkownika pozyskane za
        pośrednictwem Serwisu również w następujących celach:
      </p>
      <ol>
        <li>
          w celu zawarcia i realizacji ewentualnej umowy pomiędzy Użytkownikiem a
          Administratorem oraz obsługi Użytkownika jako klienta Administratora zgodnie z
          art. 6 ust. 1 lit. b) RODO;
        </li>
        <li>
          w celu prowadzenia rozliczeń finansowych z Użytkownikiem będącym klientem
          Administratora tytułem realizacji ewentualnej umowy zawartej między stronami, a
          także ewentualnego dochodzenia roszczeń od Użytkownika będącego klientem w
          ramach prawnie uzasadnionego interesu Administratora zgodnie z art. 6 ust. 1
          lit. f) RODO oraz spełnienia obowiązków prawnych Administratora wobec organów
          podatkowych na podstawie odrębnych przepisów zgodnie z art. 6 ust. 1 lit. c)
          RODO;
        </li>
        <li>
          w celu realizacji działań marketingowych Administratora w ramach prawnie
          uzasadnionego interesu Administratora w rozumieniu art. 6 ust. 1 lit. f) RODO, a
          także zgodnie z oświadczeniami woli dotyczącymi komunikacji marketingowej
          złożonymi wobec Administratora. Zgody udzielone w zakresie komunikacji
          marketingowej (np. na przesyłanie informacji handlowych drogą elektroniczną lub
          kontakt telefoniczny w celach marketingu bezpośredniego) mogą być wycofane w
          dowolnym czasie, bez wpływu na zgodność z prawem przetwarzania, którego dokonano
          na podstawie zgody przed jej cofnięciem;
        </li>
        <li>
          w celu realizacji obowiązków prawnych Administratora wobec Użytkownika
          określonych w RODO, w rozumieniu art. 6 ust. 1 lit. c) RODO.
        </li>
      </ol>

      <p>
        Więcej informacji dotyczących powyższych celów przetwarzania danych osobowych
        Użytkownika znajduje się w <a href="/polityka-prywatnosci">Polityce prywatności</a>
        {' '}opublikowanej w Serwisie.
      </p>
      <p>Dane osobowe Użytkownika nie są przekazywane przez Administratora podmiotom trzecim.</p>
      <p>
        Administrator przechowuje dane osobowe przez taki okres, jaki jest konieczny do
        osiągnięcia określonych celów, tj.:
      </p>
      <ul>
        <li>przez okres prowadzenia działalności gospodarczej przez Administratora.</li>
      </ul>

      <p>
        W przypadku jakichkolwiek pytań lub problemów związanych z przetwarzaniem danych
        osobowych należy kontaktować się z Administratorem pod następującym adresem:
        Krakowska 100, 50-427 Wrocław, <a href="mailto:kontakt@zakleterewiry.pl">kontakt@zakleterewiry.pl</a>.
      </p>
      <p>Użytkownik ma prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</p>
    </DocPage>
  );
}

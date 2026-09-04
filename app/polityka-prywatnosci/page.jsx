import DocPage from '@/components/DocPage';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export const metadata = {
  title: 'Polityka prywatności',
  description: 'Zasady przetwarzania danych osobowych w CKR Zaklęte Rewiry.',
};

const TODO = ({ children }) => <span className="todo">{children}</span>;

export default async function Page() {
  const t = getDict(await getLocale()).docs;
  return (
    <DocPage
      t={t}
      plOnly
      label={t.documents}
      title="Polityka prywatności"
      updated="2 września 2026"
      lead="Jak przetwarzamy Twoje dane osobowe, na jakiej podstawie i jakie masz z tego tytułu prawa."
      notice="Ten dokument to rzetelny szkielet przygotowany na podstawie RODO, ale nie jest poradą prawną.
              Przed publikacją musi go sprawdzić prawnik, a pola oznaczone na żółto trzeba uzupełnić
              danymi rejestrowymi i faktycznymi dostawcami usług."
    >
      <h2>1. Administrator danych</h2>
      <p>
        Administratorem Twoich danych osobowych jest Centrum Kulturalno-Rozrywkowe
        Zaklęte Rewiry, ul. Krakowska 100, 50-427 Wrocław,
        NIP <TODO>[UZUPEŁNIĆ]</TODO>, REGON <TODO>[UZUPEŁNIĆ]</TODO>.
      </p>
      <p>
        Kontakt w sprawach danych osobowych: <TODO>[adres e-mail]</TODO>,
        telefon 71 300 10 00.
      </p>

      <h2>2. Jakie dane zbieramy i po co</h2>
      <h3>Formularz kontaktowy i zapytania o wynajem</h3>
      <p>
        Imię i nazwisko, adres e-mail, telefon, nazwa firmy oraz treść wiadomości.
        Przetwarzamy je, aby odpowiedzieć na zapytanie i przygotować ofertę —
        podstawą jest nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO),
        a przy umowie najmu jej wykonanie (art. 6 ust. 1 lit. b RODO).
      </p>

      <h3>Bilety</h3>
      <p>
        <strong>Nie sprzedajemy biletów bezpośrednio.</strong> Sprzedaż prowadzi
        Stage24, który jest odrębnym administratorem danych kupujących. Kupując
        bilet, przekazujesz swoje dane bezpośrednio jemu i to jego polityka
        prywatności reguluje ich przetwarzanie. My otrzymujemy od operatora wyłącznie
        dane niezbędne do obsługi wydarzenia.
      </p>

      <h3>Monitoring wizyjny</h3>
      <p>
        Obiekt jest objęty monitoringiem w celu zapewnienia bezpieczeństwa osób i
        mienia (art. 6 ust. 1 lit. f RODO). Nagrania przechowujemy przez
        <TODO>[liczba dni]</TODO> dni, po czym są automatycznie nadpisywane.
      </p>

      <h2>3. Jak długo przechowujemy dane</h2>
      <ul>
        <li>Korespondencja — do 12 miesięcy od ostatniego kontaktu.</li>
        <li>Dokumentacja umów i księgowa — 5 lat od końca roku podatkowego.</li>
        <li>Monitoring — <TODO>[liczba dni]</TODO> dni.</li>
      </ul>

      <h2>4. Komu przekazujemy dane</h2>
      <p>Odbiorcami danych mogą być:</p>
      <ul>
        <li>dostawca hostingu i poczty — <TODO>[nazwa dostawcy]</TODO>,</li>
        <li>biuro rachunkowe i kancelaria prawna,</li>
        <li>podmioty uprawnione na podstawie przepisów prawa.</li>
      </ul>
      <p>
        Nie przekazujemy danych poza Europejski Obszar Gospodarczy, chyba że robi to
        dostawca narzędzia — wówczas wyłącznie na podstawie standardowych klauzul
        umownych zatwierdzonych przez Komisję Europejską.
      </p>

      <h2>5. Twoje prawa</h2>
      <p>Masz prawo do:</p>
      <ul>
        <li>dostępu do swoich danych i otrzymania ich kopii,</li>
        <li>sprostowania danych nieprawidłowych,</li>
        <li>usunięcia danych („prawo do bycia zapomnianym"),</li>
        <li>ograniczenia przetwarzania,</li>
        <li>przenoszenia danych,</li>
        <li>sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie,</li>
        <li>wycofania zgody w dowolnym momencie.</li>
      </ul>
      <p>
        Przysługuje Ci również skarga do Prezesa Urzędu Ochrony Danych Osobowych,
        ul. Stawki 2, 00-193 Warszawa.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Używamy plików cookies niezbędnych do działania serwisu — bez nich strona nie
        zadziała poprawnie i nie wymagają zgody. Cookies analityczne i marketingowe
        stosujemy wyłącznie po wyrażeniu przez Ciebie zgody w banerze. Swój wybór
        możesz zmienić w każdej chwili, czyszcząc dane witryny w przeglądarce.
      </p>
      <p>
        Podanie danych jest dobrowolne, ale bez nich nie odpowiemy na zapytanie.
      </p>
    </DocPage>
  );
}

import DocPage from '@/components/DocPage';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';
import Link from 'next/link';

export const metadata = {
  title: 'Regulamin obiektu',
  description: 'Zasady uczestnictwa w wydarzeniach w CKR Zaklęte Rewiry, Wrocław.',
};

export default async function Page() {
  const t = getDict(await getLocale()).docs;
  return (
    <DocPage
      t={t}
      plOnly
      label={t.documents}
      title="Regulamin obiektu"
      updated="2 września 2026"
      lead="Zasady obowiązujące wszystkich uczestników wydarzeń w Zaklętych Rewirach. Wejście na teren obiektu oznacza ich akceptację."
      notice="Szkielet regulaminu do sprawdzenia przez prawnika — w szczególności zapisy o odpowiedzialności,
              monitoringu i przetwarzaniu wizerunku. Organizator konkretnego wydarzenia może dodatkowo
              wprowadzić własny regulamin."
    >
      <h2>1. Postanowienia ogólne</h2>
      <p>
        Regulamin dotyczy obiektu przy ul. Krakowskiej 100 we Wrocławiu, prowadzonego
        przez CKR Zaklęte Rewiry. Wejście na teren obiektu oznacza akceptację jego
        postanowień. Przy wydarzeniach organizowanych przez podmioty zewnętrzne
        obowiązuje dodatkowo regulamin danego organizatora.
      </p>

      <h2>2. Wstęp na wydarzenie</h2>
      <ul>
        <li>Wstęp wyłącznie z ważnym biletem lub zaproszeniem.</li>
        <li>Bilet uprawnia do jednorazowego wejścia — po wyjściu wymagane jest ponowne okazanie.</li>
        <li>Obowiązują limity wieku podane przy wydarzeniu; obsługa może poprosić o dokument tożsamości.</li>
        <li>Osoby poniżej 16 lat wchodzą pod opieką dorosłego opiekuna, o ile opis wydarzenia nie stanowi inaczej.</li>
        <li>Obsługa może odmówić wstępu osobom nietrzeźwym lub pod wpływem środków odurzających.</li>
      </ul>

      <h2>3. Czego nie wolno wnosić</h2>
      <ul>
        <li>broni, przedmiotów niebezpiecznych i ostrych,</li>
        <li>materiałów wybuchowych, pirotechnicznych i pożarowo niebezpiecznych,</li>
        <li>napojów alkoholowych, środków odurzających i substancji psychotropowych,</li>
        <li>własnego jedzenia i napojów,</li>
        <li>profesjonalnego sprzętu foto-wideo bez akredytacji.</li>
      </ul>
      <p>Obsługa ma prawo do kontroli bagażu przy wejściu. Odmowa kontroli oznacza brak wstępu.</p>

      <h2>4. Szatnia</h2>
      <p>
        Szatnia jest obowiązkowa i wliczona w cenę biletu. Za rzeczy wartościowe
        pozostawione w odzieży nie odpowiadamy. Rzeczy nieodebrane w dniu wydarzenia
        przechowujemy przez 14 dni.
      </p>

      <h2>5. Bezpieczeństwo</h2>
      <ul>
        <li>Uczestnicy zobowiązani są stosować się do poleceń obsługi i służb porządkowych.</li>
        <li>Zabronione jest zachowanie zagrażające bezpieczeństwu innych osób.</li>
        <li>Osoby naruszające regulamin mogą zostać usunięte bez zwrotu ceny biletu.</li>
        <li>Obiekt objęty jest monitoringiem wizyjnym.</li>
        <li>W razie ewakuacji należy bezzwłocznie kierować się do najbliższego wyjścia ewakuacyjnego.</li>
      </ul>

      <h2>6. Wizerunek</h2>
      <p>
        Wydarzenia mogą być fotografowane i rejestrowane. Uczestnictwo oznacza zgodę
        na nieodpłatne wykorzystanie wizerunku utrwalonego jako element zbiorowości
        w materiałach relacjonujących i promocyjnych, zgodnie z art. 81 ust. 2 pkt 2
        ustawy o prawie autorskim i prawach pokrewnych.
      </p>

      <h2>7. Bilety, zwroty i odwołania</h2>
      <p>
        Sprzedaż biletów prowadzi Stage24 i to on jest sprzedawcą w rozumieniu przepisów
        konsumenckich. Reklamacje zakupu, faktury i zwroty obsługuje operator —
        szczegóły znajdziesz na stronie <Link href="/zwroty">Zwroty i reklamacje</Link>.
      </p>

      <h2>8. Ochrona słuchu</h2>
      <p>
        Poziom dźwięku podczas koncertów może przekraczać 100 dB. Zalecamy stosowanie
        ochronników słuchu, szczególnie w przypadku dzieci. Uczestnictwo odbywa się na
        własną odpowiedzialność.
      </p>

      <h2>9. Kontakt</h2>
      <p>
        Pytania dotyczące regulaminu: <Link href="/kontakt">formularz kontaktowy</Link>{' '}
        lub telefon 71 300 10 00.
      </p>
    </DocPage>
  );
}

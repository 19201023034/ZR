import DocPage from '@/components/DocPage';
import Link from 'next/link';

export const metadata = {
  title: 'Zwroty i reklamacje',
  description: 'Zwroty biletów obsługuje Stage24 jako sprzedawca. Sprawy dotyczące wydarzenia — bezpośrednio z nami.',
};

export default function Page() {
  return (
    <DocPage
      label="Bilety"
      title="Zwroty i reklamacje"
      updated="2 września 2026"
      lead="Krótko: sprawy zakupu załatwia Stage24, sprawy samego wydarzenia — my."
    >
      <h2>Kto jest sprzedawcą</h2>
      <p>
        Bilety na wydarzenia w Zaklętych Rewirach sprzedaje <strong>Stage24</strong>.
        To on wystawia potwierdzenie zakupu i faktury, i to do niego kierujesz
        reklamacje dotyczące płatności, dostarczenia biletu czy jego zwrotu.
        My odpowiadamy za organizację i przebieg wydarzenia.
      </p>

      <h2>Odstąpienie od umowy</h2>
      <p>
        Bilety na wydarzenia kulturalne i rozrywkowe z oznaczonym terminem są wyłączone
        z ustawowego prawa odstąpienia w ciągu 14 dni — wynika to z art. 38 pkt 12
        ustawy o prawach konsumenta. Nie oznacza to jednak, że jesteś bez wyjścia:
        zasady zwrotów w innych sytuacjach określa regulamin operatora.
      </p>

      <h2>Odwołanie wydarzenia</h2>
      <p>
        Jeśli odwołamy wydarzenie, zwrot pełnej ceny biletu następuje automatycznie
        przez operatora, na to samo źródło płatności. Informację o odwołaniu
        publikujemy na stronie wydarzenia i wysyłamy mailem do osób, które kupiły bilet.
      </p>

      <h2>Zmiana terminu</h2>
      <p>
        Przy przeniesieniu wydarzenia bilety zachowują ważność na nowy termin.
        Jeśli nowy termin Ci nie odpowiada, możesz zwrócić bilet — okno zwrotu
        podajemy każdorazowo w komunikacie o zmianie.
      </p>

      <h2>Coś poszło nie tak na miejscu</h2>
      <p>
        Zgubiona rzecz, problem z obsługą, uwaga do warunków na sali — napisz do nas
        przez <Link href="/kontakt">formularz kontaktowy</Link>. Odpowiadamy w ciągu
        dwóch dni roboczych.
      </p>
    </DocPage>
  );
}

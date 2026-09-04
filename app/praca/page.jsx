import DocPage from '@/components/DocPage';
import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function generateMetadata() {
  const en = (await getLocale()) === 'en';
  return {
    title: en ? 'Work with us' : 'Praca',
    description: en
      ? 'Jobs and collaboration at CKR Zaklęte Rewiry — event staff, stage technology, bar.'
      : 'Praca i współpraca w CKR Zaklęte Rewiry — obsługa wydarzeń, technika sceniczna, bar.',
  };
}

export default async function Page() {
  const locale = await getLocale();
  const t = getDict(locale).docs;
  const en = locale === 'en';

  return (
    <DocPage
      t={t}
      label={t.join}
      title={en ? 'Work with us' : 'Praca'}
      lead={en
        ? 'The club lives in the evenings and at weekends. We are looking for people who like that.'
        : 'Klub żyje wieczorami i weekendami. Szukamy ludzi, którzy to lubią.'}
    >
      {en ? (
        <>
          <h2>Who we are usually looking for</h2>
          <p>
            We do not run closed recruitment rounds — we collect applications all year
            and come back to them when a need comes up. Most often we look for people for:
          </p>
          <ul>
            <li><strong>bar work</strong> — evenings and weekends, experience welcome,</li>
            <li><strong>front of house and cloakroom</strong> — students welcome, flexible rotas,</li>
            <li><strong>stage technology</strong> — sound, lighting, rigging; knowing d&amp;b consoles and DMX is a plus,</li>
            <li><strong>security and stewarding</strong> — the relevant licences are required.</li>
          </ul>

          <h2>Working with us on events</h2>
          <p>
            We also work with photographers, video crews and freelance production people.
            If you have a portfolio from live events, show it to us — we would like to see it.
          </p>

          <h2>How to apply</h2>
          <p>
            Write through the <Link href="/kontakt">contact form</Link>, or send your CV
            straight to the address on the contact page. Tell us which role you are after
            and what hours you can work.
          </p>
          <p>
            Please add a statement consenting to your data being processed for recruitment —
            the rules are set out in our{' '}
            <Link href="/polityka-prywatnosci">privacy policy</Link>.
          </p>
        </>
      ) : (
        <>
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
        </>
      )}
    </DocPage>
  );
}

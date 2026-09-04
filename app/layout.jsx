import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import MotionRoot from '@/components/MotionRoot';
import { SHOULD_INDEX } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

// belt and braces: a meta tag as well as robots.txt, so a preview link
// shared around can't be indexed even if someone hits a page directly
export async function generateMetadata() {
  const locale = await getLocale();
  const en = locale === 'en';
  return {
    ...(SHOULD_INDEX ? {} : { robots: { index: false, follow: false } }),
    title: {
      default: en
        ? 'Zaklęte Rewiry — concert venue and rooms for hire, Wrocław'
        : 'Zaklęte Rewiry — Klub koncertowy i wynajem sal, Wrocław',
      template: '%s | Zaklęte Rewiry',
    },
    description: en
      ? 'Concert venue at Krakowska 100 in Wrocław. Rock, metal, rap, electronic, stand-up. Three rooms for hire for galas, conferences and corporate events.'
      : 'Klub koncertowy przy ul. Krakowskiej 100 we Wrocławiu. Rock, metal, rap, elektronika, stand-up. Trzy sale do wynajęcia na gale, konferencje i imprezy firmowe.',
    openGraph: { siteName: 'Zaklęte Rewiry', locale: en ? 'en_GB' : 'pl_PL' },
  };
}

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <html lang={locale}>
      <head>
        {/* apply saved theme before paint — no flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('zr-theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}",
          }}
        />
      </head>
      <body>
        <MotionRoot />
        <Header locale={locale} t={t.nav} />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

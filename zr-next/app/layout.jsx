import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import MotionRoot from '@/components/MotionRoot';

// belt and braces: a meta tag as well as robots.txt, so a preview link
// shared around can't be indexed even if someone hits a page directly
const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === '1';

export const metadata = {
  ...(NOINDEX ? { robots: { index: false, follow: false } } : {}),
  title: {
    default: 'Zaklęte Rewiry — Klub koncertowy i wynajem sal, Wrocław',
    template: '%s | Zaklęte Rewiry',
  },
  description: 'Klub koncertowy przy ul. Krakowskiej 100 we Wrocławiu. Rock, metal, rap, elektronika, stand-up. Trzy sale do wynajęcia na gale, konferencje i imprezy firmowe.',
  openGraph: {
    siteName: 'Zaklęte Rewiry',
    locale: 'pl_PL',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <MotionRoot />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

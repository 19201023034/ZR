import FaqBody from '@/components/FaqBody';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';
import { SITE_ORIGIN as SITE } from '@/lib/site';

export async function generateMetadata() {
  const t = getDict(await getLocale()).faq;
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: '/faq' },
  };
}

/**
 * schema.org FAQPage — the markup that can put these answers straight into the
 * search result. Answers are stored as plain text precisely so this stays valid;
 * the "see also" links live outside the answer text.
 */
function buildJsonLd(t) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${SITE}/faq`,
    mainEntity: t.groups.flatMap(group =>
      group.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  };
}

export default async function FaqPage() {
  const t = getDict(await getLocale()).faq;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(t)) }}
      />
      <FaqBody t={t} />
    </>
  );
}

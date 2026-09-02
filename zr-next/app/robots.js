const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zakleterewiry.pl';

// Client-preview deployments must never compete with the real site in Google.
// Set NEXT_PUBLIC_NOINDEX=1 on any environment that is not production.
const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === '1';

export default function robots() {
  if (NOINDEX) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      // the admin panel has no auth yet — keep it out of the index regardless
      disallow: ['/panel', '/api/'],
    }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}

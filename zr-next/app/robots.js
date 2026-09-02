const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zakleterewiry.pl';

export default function robots() {
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

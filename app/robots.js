import { SITE_ORIGIN, SHOULD_INDEX } from '@/lib/site';

export default function robots() {
  // Anything that is not the client's own domain is a preview: keep it out
  // of the index entirely, and don't advertise a sitemap for it either.
  if (!SHOULD_INDEX) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      // the admin panel has no auth yet — keep it out of the index regardless
      disallow: ['/panel', '/api/'],
    }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}

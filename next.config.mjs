/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Vercel traces file dependencies per serverless function. The event store
  // is read via fs + process.cwd(), which tracing can miss — force data/ into
  // exactly the routes that read it, and the OG font into the image routes.
  outputFileTracingIncludes: {
    '/opengraph-image': ['./assets/fonts/**'],
    '/wydarzenie/[slug]/opengraph-image': ['./data/**', './assets/fonts/**'],
    '/wydarzenie/[slug]': ['./data/**'],
    '/bilety': ['./data/**'],
    '/repertuar': ['./data/**'],
    '/archiwum': ['./data/**'],
    '/sitemap.xml': ['./data/**'],
    '/api/events': ['./data/**'],
    '/api/events/[id]': ['./data/**'],
  },
};

export default nextConfig;

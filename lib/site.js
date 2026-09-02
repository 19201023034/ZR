/**
 * Where this deployment thinks it lives, and whether search engines
 * should be allowed anywhere near it.
 *
 * The rule is deliberately fail-closed: indexing is OFF unless we are
 * demonstrably serving the client's own domain. A preview handed to the
 * client must never compete in Google with the real site, and relying on
 * someone remembering to set a flag is exactly how that goes wrong.
 */

/** The only host whose content belongs in a search index. */
const PRODUCTION_HOST = 'zakleterewiry.pl';

function resolveOrigin() {
  // 1. Explicit wins — set NEXT_PUBLIC_SITE_URL to override everything.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  // 2. Vercel tells us the project's production domain for free.
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;

  // 3. Per-deployment URL (previews, branch deploys).
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  // 4. Local development.
  return 'http://localhost:3126';
}

export const SITE_ORIGIN = resolveOrigin();

/** True only on the real domain — everything else stays out of the index. */
export const SHOULD_INDEX =
  process.env.NEXT_PUBLIC_NOINDEX === '1'
    ? false
    : new URL(SITE_ORIGIN).hostname.endsWith(PRODUCTION_HOST);

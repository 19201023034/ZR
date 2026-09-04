import 'server-only';
import { cookies } from 'next/headers';

export const LOCALES = ['pl', 'en'];
export const DEFAULT_LOCALE = 'pl';
export const LOCALE_COOKIE = 'zr-lang';

/**
 * Active locale for the current request, read from the language cookie.
 * Reading cookies opts the route into dynamic rendering — intended, since
 * the same URL serves both languages.
 */
export async function getLocale() {
  try {
    const store = await cookies();
    const v = store.get(LOCALE_COOKIE)?.value;
    return LOCALES.includes(v) ? v : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

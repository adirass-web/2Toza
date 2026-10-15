/**
 * Cloudflare Pages Function — root language redirect
 * Route: /  (functions/index.js → handles GET /)
 *
 * Reads the Accept-Language request header, picks the best match
 * from the three supported locales, and issues a 302 redirect.
 * Falls back to Hebrew if nothing matches.
 */

const SUPPORTED = ['he', 'en', 'ru'];
const DEFAULT_LOCALE = 'he';

// TEMPORARY (vault-redesign): EN-only public site. The root always sends to /en/
// until HE/RU are translated to the new design. Restore detectLocale() routing then.
export async function onRequest(context) {
  const { request } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return context.next();
  }

  const destination = new URL('/en/', request.url);
  return Response.redirect(destination.toString(), 302);
}

/**
 * Parse the Accept-Language header and return the best supported locale.
 * Handles weighted values (q-factors) and region subtags (e.g. en-US → en).
 *
 * @param {string} header  Raw Accept-Language header value
 * @returns {string}       One of SUPPORTED locales
 */
function detectLocale(header) {
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(',')
    .map(entry => {
      const [tag, qPart] = entry.trim().split(/\s*;\s*q=/);
      const lang = tag.split('-')[0].toLowerCase(); // "en-US" → "en"
      const q = qPart !== undefined ? parseFloat(qPart) : 1.0;
      return { lang, q: isNaN(q) ? 0 : q };
    })
    .filter(({ q }) => q > 0)
    .sort((a, b) => b.q - a.q); // highest q first

  const match = ranked.find(({ lang }) => SUPPORTED.includes(lang));
  return match ? match.lang : DEFAULT_LOCALE;
}

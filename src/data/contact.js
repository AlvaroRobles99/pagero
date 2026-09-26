/**
 * Single source of truth for the WhatsApp contact channel.
 *
 * The same number has three legitimate representations, and mixing them up is
 * the one mistake that breaks the site's primary conversion path:
 *
 *   WHATSAPP_NUMBER   digits only  -> `wa.me` hrefs
 *   WHATSAPP_DISPLAY  spaced form  -> anything a human reads
 *   JSON-LD           `+` form     -> declared in index.html, not here
 *
 * A `+`, a space or a dash inside a `wa.me` href yields a dead link rather than
 * an error, so the format is locked by src/tests/whatsapp.test.jsx.
 *
 * Unconfirmed: Argentine mobile numbers are often written `+54 9 297 421 6017`,
 * where the 9 marks a mobile line. The `wa.me` convention is to drop the 9, which
 * is what WHATSAPP_NUMBER does. If the link does not open on a real phone, the
 * fix is a single character here.
 */

/** Digits only. Never add a `+`, spaces, dashes or parentheses to this. */
export const WHATSAPP_NUMBER = '542974216017'

/** Human-readable form for visible text. */
export const WHATSAPP_DISPLAY = '+54 297 421 6017'

/**
 * Builds a WhatsApp deep link, optionally prefilling the message.
 *
 * The `?text=` query is omitted entirely when no message is passed, because an
 * empty `?text=` opens a chat with a blank composer that the user has to clear.
 *
 * @param {string} [message] Prefill text for the chat composer.
 * @returns {string} A `https://wa.me/<digits>` URL.
 */
export function whatsappLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

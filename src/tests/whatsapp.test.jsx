/**
 * Format guard for the WhatsApp contact channel.
 *
 * The same phone number has three legitimate representations, and only one of
 * them works inside a `wa.me` URL. A `+`, a space or a dash in the href produces
 * a dead link, and on a site whose whole funnel is a WhatsApp message that is a
 * silent conversion killer: nothing errors, the button simply does nothing.
 *
 * These assertions therefore exist to fail loudly the moment someone edits the
 * number in a way that breaks the link. They are deliberately strict about
 * format and deliberately indifferent to the digits themselves, so changing the
 * number later does not require touching this file.
 *
 * Named whatsapp.test.jsx rather than contact.test.jsx: the test filesystem is
 * case-insensitive on Windows, so a file differing from Contact.test.jsx only by
 * case would silently resolve to it and overwrite that suite.
 */
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from '../data/contact'

describe('WHATSAPP_NUMBER', () => {
  it('is digits only: no plus, spaces, dashes or parentheses', () => {
    expect(WHATSAPP_NUMBER).toMatch(/^\d+$/)
  })

  it('carries the 54 country code', () => {
    expect(WHATSAPP_NUMBER.startsWith('54')).toBe(true)
  })

  it('contains no separator characters', () => {
    expect(WHATSAPP_NUMBER).not.toMatch(/[\s+()\-.]/)
  })
})

describe('WHATSAPP_DISPLAY', () => {
  it('is the international form, so it starts with a plus', () => {
    expect(WHATSAPP_DISPLAY.startsWith('+')).toBe(true)
  })

  it('shows the same digits as the link constant, with separators only', () => {
    expect(WHATSAPP_DISPLAY.replace(/[^\d]/g, '')).toBe(WHATSAPP_NUMBER)
  })
})

describe('whatsappLink()', () => {
  it('builds a digits-only wa.me URL when called with no message', () => {
    expect(whatsappLink()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('never emits a plus, space or dash in the href', () => {
    expect(whatsappLink()).toMatch(/^https:\/\/wa\.me\/\d+$/)
    expect(whatsappLink('Hola')).toMatch(/^https:\/\/wa\.me\/\d+\?text=\S+$/)
  })

  it('omits the text query entirely when no message is given', () => {
    const link = whatsappLink()
    expect(link).not.toContain('?text=')
    expect(new URL(link).searchParams.has('text')).toBe(false)
  })

  it('appends an encoded text query when a message is given', () => {
    expect(whatsappLink('Hola')).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola`)
  })

  it('encodes characters that would otherwise break the URL', () => {
    const link = whatsappLink('texto con ñ y &')
    expect(link).not.toContain(' ')
    expect(link).toContain('%C3%B1') // ñ
    expect(link).toContain('%26') // &
  })

  it('survives a URL round trip, so the message is not corrupted', () => {
    const message = 'Hola Rocío, me interesa saber más sobre Lectura de Tarot & Limpieza'
    const link = whatsappLink(message)
    expect(new URL(link).searchParams.get('text')).toBe(message)
    expect(decodeURIComponent(link.split('?text=')[1])).toBe(message)
  })
})

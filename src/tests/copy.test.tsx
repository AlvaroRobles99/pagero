import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import About from '../components/About/About'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'
import services from '../data/services'

/**
 * Brand rule: the site copy never uses the word "trabajo" or its derivatives.
 * Use synonyms instead (labor, proceso, acompañamiento, práctica, sesión,
 * objetivo).
 *
 * The only exception is src/data/reviews.ts: those are quotes from real clients,
 * published word for word, so they are not rewritten.
 */
const FORBIDDEN = /trabaj/i

const sections: ReadonlyArray<{ name: string; Section: () => ReactElement }> = [
  { name: 'Sobre mí', Section: About },
  { name: 'Servicios', Section: Services },
  { name: 'Contacto', Section: Contact },
  { name: 'Hero', Section: Hero },
  { name: 'Footer', Section: Footer },
]

describe('Copy de marca', () => {
  for (const { name, Section } of sections) {
    it(`${name} no usa la palabra «trabajo»`, () => {
      const { container } = render(<Section />)
      expect(container.textContent ?? '').not.toMatch(FORBIDDEN)
    })
  }

  it('los textos completos de los servicios no usan la palabra «trabajo»', () => {
    for (const service of services) {
      const copy = `${service.title} ${service.description} ${service.fullDescription}`
      expect(copy).not.toMatch(FORBIDDEN)
    }
  })
})
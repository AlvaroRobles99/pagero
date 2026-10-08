import { render, screen } from '@testing-library/react'
import Contact from '../components/Contact/Contact'
import { WHATSAPP_NUMBER } from '../data/contact'
import { SOCIAL_LINKS } from '../data/social'

describe('Contact', () => {
  it('renderiza el título', () => {
    render(<Contact />)
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('renderiza el texto de invitación', () => {
    render(<Contact />)
    expect(screen.getByText(/Tu proceso de sanación/)).toBeInTheDocument()
  })

  it('renderiza el botón de WhatsApp', () => {
    render(<Contact />)
    const btn = screen.getByText(/Escribir por WhatsApp/)
    expect(btn).toBeInTheDocument()
    expect(btn.closest('a')).toHaveAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('renderiza un href de wa.me solo con dígitos', () => {
    render(<Contact />)
    const href = screen.getByText(/Escribir por WhatsApp/).closest('a').getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+$/)
  })

  describe('bloque "Ver mi contenido"', () => {
    it('renderiza la etiqueta', () => {
      render(<Contact />)
      expect(screen.getByText('Ver mi contenido')).toBeInTheDocument()
    })

    it('renderiza exactamente 3 links sociales', () => {
      render(<Contact />)
      const bloque = screen.getByText('Ver mi contenido').closest('div')
      expect(bloque.querySelectorAll('a')).toHaveLength(3)
    })

    it('declara las tres redes en la fuente de verdad', () => {
      expect(SOCIAL_LINKS.map((s) => s.name)).toEqual(['Instagram', 'Facebook', 'TikTok'])
    })

    SOCIAL_LINKS.forEach((s) => {
      it(`${s.name}: href exacto, pestaña nueva y rel seguro`, () => {
        render(<Contact />)
        const link = screen.getByRole('link', { name: s.name })
        expect(link).toHaveAttribute('href', s.url)
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })
})

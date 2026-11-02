import { render, screen } from '@testing-library/react'
import Contact from '../components/Contact/Contact'
import { WHATSAPP_NUMBER } from '../data/contact'
import { SOCIAL_LINKS } from '../data/social'

describe('Contact', () => {
  it('renderiza la etiqueta "Contacto"', () => {
    render(<Contact />)
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('renderiza el texto de invitación', () => {
    render(<Contact />)
    expect(screen.getByText(/Escribime y contame/)).toBeInTheDocument()
  })

  it('renderiza el botón de WhatsApp', () => {
    render(<Contact />)
    const btn = screen.getByText(/Escribir por WhatsApp/)
    expect(btn).toBeInTheDocument()
    expect(btn.closest('a')).toHaveAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('renderiza un href de wa.me solo con dígitos', () => {
    render(<Contact />)
    const link = screen.getByText(/Escribir por WhatsApp/).closest('a')
    if (!link) throw new Error('The WhatsApp CTA is not wrapped in a link')
    const href = link.getAttribute('href')
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
      if (!bloque) throw new Error('The "Ver mi contenido" block is missing')
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

  describe('encabezado de la sección', () => {
    it('titula la sección con "Agenda tu turno"', () => {
      render(<Contact />)
      expect(
        screen.getByRole('heading', { level: 2, name: 'Agenda tu turno' }),
      ).toBeInTheDocument()
    })

    it('deja "Contacto" como etiqueta chica, no como encabezado', () => {
      render(<Contact />)
      expect(screen.getByText('Contacto').tagName).toBe('P')
      expect(screen.queryByRole('heading', { name: 'Contacto' })).not.toBeInTheDocument()
    })
  })

  describe('imagen de la agenda', () => {
    const image = () =>
      screen.getByRole('img', { name: /Agenda abierta con cuarzos de amatista/i })

    it('apunta al WebP optimizado, no al master sin pérdida', () => {
      render(<Contact />)
      expect(image()).toHaveAttribute('src', '/images/agenda-cuarzos.webp')
    })

    it('declara width y height para no mover el layout al cargar', () => {
      render(<Contact />)
      expect(image()).toHaveAttribute('width', '1128')
      expect(image()).toHaveAttribute('height', '785')
    })

    it('carga diferida porque vive debajo del pliegue', () => {
      render(<Contact />)
      expect(image()).toHaveAttribute('loading', 'lazy')
    })
  })
})

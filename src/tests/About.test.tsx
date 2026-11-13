import { render, screen } from '@testing-library/react'
import About from '../components/About/About'
import { ageOn, yearsOfPracticeOn } from '../data/about'
import { whatsappLink } from '../data/contact'
import { INSTAGRAM_URL } from '../data/social'

describe('About', () => {
  it('renderiza el título principal', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Un espacio para volver a vos'
    )
  })

  it('renderiza el nombre Rocío', () => {
    render(<About />)
    expect(screen.getByText(/Rocío/)).toBeInTheDocument()
  })

  it('renderiza la marca Sanarse', () => {
    render(<About />)
    expect(screen.getByText(/Sanarse/)).toBeInTheDocument()
  })

  it('explica cómo empieza el proceso', () => {
    const { container } = render(<About />)

    expect(container.textContent).toContain('nombre completo y fecha de nacimiento')
    expect(container.textContent).toContain(
      'El valor de la evaluación viene siempre incluido en todas las sesiones'
    )
    expect(container.textContent).toContain('presenciales o remotas')
  })

  it('renderiza el blockquote', () => {
    render(<About />)
    const blockquote = screen.getByText(
      'El camino de la sanación nunca es lineal y te pertenece, pero no tenés que recorrerlo en soledad.'
    )
    expect(blockquote.tagName).toBe('BLOCKQUOTE')
  })

  it('el CTA tiene el href correcto de WhatsApp', () => {
    render(<About />)
    const cta = screen.getByRole('link', { name: /Agendar una Sesión/i })
    expect(cta).toHaveAttribute('href', whatsappLink())
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('calcula la edad desde el 22 de enero de 2000', () => {
    expect(ageOn(new Date('2026-01-21T12:00:00'))).toBe(25)
    expect(ageOn(new Date('2026-01-22T12:00:00'))).toBe(26)
    expect(ageOn(new Date('2026-11-13T12:00:00'))).toBe(26)
  })

  it('cuenta los años de dedicación por año calendario', () => {
    expect(yearsOfPracticeOn(new Date('2026-11-13T12:00:00'))).toBe(4)
    expect(yearsOfPracticeOn(new Date('2027-01-01T12:00:00'))).toBe(5)
  })

  it('muestra la edad y los años de dedicación calculados, no escritos a mano', () => {
    const { container } = render(<About />)
    const now = new Date()

    expect(container.textContent).toContain(`tengo ${ageOn(now)} años`)
    expect(container.textContent).toContain(`hace ${yearsOfPracticeOn(now)} años`)
  })

  it('renderiza la bio de presentación', () => {
    const { container } = render(<About />)

    expect(container.textContent).toContain('En el 2018 conocí el Reiki')
    expect(container.textContent).toContain('Seguime para enterarte sobre este hermoso mundo')
  })

  it('enlaza «Seguime» al Instagram en una pestaña nueva', () => {
    render(<About />)
    const link = screen.getByRole('link', { name: /seguime en instagram/i })

    expect(link).toHaveAttribute('href', INSTAGRAM_URL)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })
})

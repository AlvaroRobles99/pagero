import { render, screen } from '@testing-library/react'
import About from '../components/About/About'
import { whatsappLink } from '../data/contact'

describe('About', () => {
  it('renderiza el título principal', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Un espacio para volver a vos'
    )
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
    expect(container.textContent).toContain('presenciales en San Rafael, Mendoza')
    expect(container.textContent).toContain('online vía WhatsApp')
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
})

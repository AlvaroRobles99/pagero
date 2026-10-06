import { render, screen } from '@testing-library/react'
import About from '../components/About/About'
import { whatsappLink } from '../data/contact'

describe('About', () => {
  it('renderiza el título principal', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Bienvenidos a tu espacio de evolución espiritual'
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

  it('renderiza los pilares de sanación', () => {
    render(<About />)
    expect(screen.getByText('Tarot Terapéutico')).toBeInTheDocument()
    expect(screen.getByText('Limpieza Energética')).toBeInTheDocument()
    expect(screen.getByText('Escucha sin Juicio')).toBeInTheDocument()
  })

  it('renderiza el blockquote', () => {
    render(<About />)
    const blockquote = screen.getByText(
      'El camino de la sanación te pertenece, pero no tienes que recorrerlo en soledad.'
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

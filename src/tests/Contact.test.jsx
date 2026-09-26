import { render, screen } from '@testing-library/react'
import Contact from '../components/Contact/Contact'

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
    expect(btn.closest('a')).toHaveAttribute('href', 'https://wa.me/521234567890')
  })
})

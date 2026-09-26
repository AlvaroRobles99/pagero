import { render, screen } from '@testing-library/react'
import Contact from '../components/Contact/Contact'
import { WHATSAPP_NUMBER } from '../data/contact'

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
})

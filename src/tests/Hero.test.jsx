import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero/Hero'
import { WHATSAPP_NUMBER } from '../data/contact'

describe('Hero', () => {
  it('renderiza el título principal', () => {
    render(<Hero />)
    expect(screen.getByText('Sanarse')).toBeInTheDocument()
  })

  it('renderiza el subtítulo', () => {
    render(<Hero />)
    expect(screen.getByText('Rocío — Terapeuta Holística')).toBeInTheDocument()
  })

  it('renderiza la tagline', () => {
    render(<Hero />)
    expect(screen.getByText('Amor, acompañamiento y confidencialidad')).toBeInTheDocument()
  })

  it('renderiza el botón de WhatsApp con el texto correcto', () => {
    render(<Hero />)
    const btn = screen.getByText('Agenda tu sesión')
    expect(btn).toBeInTheDocument()
    expect(btn.closest('a')).toHaveAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('renderiza un href de wa.me solo con dígitos', () => {
    render(<Hero />)
    const href = screen.getByText('Agenda tu sesión').closest('a').getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+$/)
  })
})

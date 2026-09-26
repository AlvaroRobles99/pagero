import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero/Hero'

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
    expect(btn.closest('a')).toHaveAttribute('href', 'https://wa.me/521234567890')
  })
})

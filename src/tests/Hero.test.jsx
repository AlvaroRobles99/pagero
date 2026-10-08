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

  it('renderiza el botón con enlace a servicios', () => {
    render(<Hero />)
    const btn = screen.getByText('Ver servicios')
    expect(btn).toBeInTheDocument()
    const link = btn.closest('a')
    expect(link).toHaveAttribute('href', '#services')
    expect(link).not.toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).not.toMatch(/wa\.me/)
  })

  it('renders the brand logo as a decorative image with empty alt', () => {
    // alt="" is deliberate: the logo is decorative, the h1 carries the name.
    const { container } = render(<Hero />)
    const logo = container.querySelector('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/logo.png')
    expect(logo).toHaveAttribute('alt', '')
  })

  it('places the logo before the h1 heading', () => {
    const { container } = render(<Hero />)
    const logo = container.querySelector('img')
    const heading = container.querySelector('h1')
    expect(logo).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    const FOLLOWS = Node.DOCUMENT_POSITION_FOLLOWING
    expect(logo.compareDocumentPosition(heading) & FOLLOWS).toBe(FOLLOWS)
  })

  it('renders the brand logo as a decorative image with empty alt', () => {
    // alt="" is deliberate: the logo is decorative, the h1 carries the name.
    const { container } = render(<Hero />)
    const logo = container.querySelector('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/logo.png')
    expect(logo).toHaveAttribute('alt', '')
  })

  it('places the logo before the h1 heading', () => {
    const { container } = render(<Hero />)
    const logo = container.querySelector('img')
    const heading = container.querySelector('h1')
    expect(logo).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    const FOLLOWS = Node.DOCUMENT_POSITION_FOLLOWING
    expect(logo.compareDocumentPosition(heading) & FOLLOWS).toBe(FOLLOWS)
  })
})

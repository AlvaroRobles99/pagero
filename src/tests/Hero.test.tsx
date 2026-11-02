import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero/Hero'

const PHOTOS = [
  '/images/rocio-playa.webp',
  '/images/rocio-oraculos.webp',
  '/images/meditacion-playa.webp',
]

const getPanels = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLImageElement>('[aria-hidden="true"] img'))

describe('Hero', () => {
  it('renderiza el título principal', () => {
    render(<Hero />)
    expect(screen.getByText('Sanarse')).toBeInTheDocument()
  })

  it('renderiza el subtítulo', () => {
    render(<Hero />)
    expect(screen.getByText('Rocío Durazno — Terapeuta holística')).toBeInTheDocument()
  })

  it('renderiza la tagline', () => {
    render(<Hero />)
    expect(screen.getByText('Tarot, limpieza energética y escucha sin juicio')).toBeInTheDocument()
  })

  it('renderiza el botón con enlace a servicios', () => {
    render(<Hero />)
    const btn = screen.getByText('Ver servicios')
    expect(btn).toBeInTheDocument()
    const link = btn.closest('a')
    expect(link).toHaveAttribute('href', '#services')
    expect(link).not.toHaveAttribute('target', '_blank')
    if (!link) throw new Error('The Hero CTA is not wrapped in a link')
    expect(link.getAttribute('href')).not.toMatch(/wa\.me/)
  })

  describe('marca', () => {
    it('no renderiza el logo: la marca vive ahora en Contacto', () => {
      // It floated over the photographs and competed with the face, so the hero
      // hands it to the section that asks for the appointment.
      const { container } = render(<Hero />)
      expect(container.querySelector('img[src="/images/logo.png"]')).not.toBeInTheDocument()
    })
  })

  describe('tríptico de fotos', () => {
    it('muestra las tres fotos en el orden de la historia', () => {
      const { container } = render(<Hero />)
      expect(getPanels(container).map((img) => img.getAttribute('src'))).toEqual(PHOTOS)
    })

    it('las trata como decorativas: el h1 ya nombra a la persona', () => {
      const { container } = render(<Hero />)
      for (const img of getPanels(container)) {
        expect(img).toHaveAttribute('alt', '')
      }
      const backdrop = container.querySelector('[aria-hidden="true"]')
      expect(backdrop).toBeInTheDocument()
    })

    it('declara dimensiones para que el panel no salte al cargar', () => {
      const { container } = render(<Hero />)
      const sizes = getPanels(container).map((img) => [
        img.getAttribute('width'),
        img.getAttribute('height'),
      ])
      expect(sizes).toEqual([
        ['960', '966'],
        ['960', '966'],
        ['960', '1280'],
      ])
    })

    it('prioriza la foto central y difiere las laterales', () => {
      const { container } = render(<Hero />)
      const [left, center, right] = getPanels(container)
      expect(center).toHaveAttribute('fetchpriority', 'high')
      expect(center).not.toHaveAttribute('loading', 'lazy')
      expect(left).toHaveAttribute('loading', 'lazy')
      expect(right).toHaveAttribute('loading', 'lazy')
      expect(left).toHaveAttribute('fetchpriority', 'low')
      expect(right).toHaveAttribute('fetchpriority', 'low')
    })
  })
})

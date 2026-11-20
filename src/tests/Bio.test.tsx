import { render, screen } from '@testing-library/react'
import Bio from '../components/Bio/Bio'
import { ageOn, yearsOfPracticeOn } from '../data/about'
import { INSTAGRAM_URL } from '../data/social'

describe('Bio', () => {
  it('renderiza el título de la card', () => {
    render(<Bio />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Mi historia')
  })

  it('renderiza el nombre Rocío', () => {
    render(<Bio />)
    expect(screen.getByText(/Me llamo Rocío/)).toBeInTheDocument()
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
    const { container } = render(<Bio />)
    const now = new Date()

    expect(container.textContent).toContain(`tengo ${ageOn(now)} años`)
    expect(container.textContent).toContain(`hace ${yearsOfPracticeOn(now)} años`)
  })

  it('renderiza la historia de presentación', () => {
    const { container } = render(<Bio />)

    expect(container.textContent).toContain('En el 2018 conocí el Reiki')
    expect(container.textContent).toContain('Seguime para enterarte sobre este hermoso mundo')
  })

  it('enlaza «Seguime» al Instagram en una pestaña nueva', () => {
    render(<Bio />)
    const link = screen.getByRole('link', { name: /seguime en instagram/i })

    expect(link).toHaveAttribute('href', INSTAGRAM_URL)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('muestra el retrato de Rocío con su texto alternativo', () => {
    render(<Bio />)
    const image = screen.getByAltText(/Rocío sentada frente al mantel de tarot/i)

    expect(image).toHaveAttribute('src', '/images/rocio-tarot.webp')
    expect(image).toHaveAttribute('width', '900')
    expect(image).toHaveAttribute('height', '900')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
  })
})

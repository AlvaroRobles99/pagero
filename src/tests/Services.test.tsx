import { render, screen } from '@testing-library/react'
import Services from '../components/Services/Services'

describe('Services', () => {
  it('renderiza el título', () => {
    render(<Services />)
    expect(screen.getByText('Servicios')).toBeInTheDocument()
  })

  it('antepone la línea de tarot, limpiezas y abre caminos como etiqueta chica', () => {
    render(<Services />)
    const eyebrow = screen.getByText('Tarot, limpiezas energéticas y abre caminos')
    expect(eyebrow.tagName).toBe('P')
    const heading = screen.getByRole('heading', { level: 2, name: 'Servicios' })
    const FOLLOWS = Node.DOCUMENT_POSITION_FOLLOWING
    expect(eyebrow.compareDocumentPosition(heading) & FOLLOWS).toBe(FOLLOWS)
  })

  it('renderiza las 8 cards de servicio', () => {
    render(<Services />)
    expect(screen.getByText('Tarot Angelical')).toBeInTheDocument()
    expect(screen.getByText('Registros Akáshicos')).toBeInTheDocument()
    expect(screen.getByText('Limpiezas Energéticas')).toBeInTheDocument()
    expect(screen.getByText('Velomancia Angelical')).toBeInTheDocument()
    expect(screen.getByText('Abre Caminos')).toBeInTheDocument()
    expect(screen.getByText('Armonización de Chakras')).toBeInTheDocument()
    expect(screen.getByText('Constelaciones Familiares')).toBeInTheDocument()
    expect(screen.getByText('Limpiezas Ambientales')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(8)
  })

  it('no renderiza precios', () => {
    render(<Services />)
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
  })
})

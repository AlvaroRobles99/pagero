import { render, screen } from '@testing-library/react'
import Services from '../components/Services/Services'

describe('Services', () => {
  it('renderiza el título', () => {
    render(<Services />)
    expect(screen.getByText('Servicios')).toBeInTheDocument()
  })

  it('renderiza las 7 cards de servicio', () => {
    render(<Services />)
    expect(screen.getByText('Tarot Angelical')).toBeInTheDocument()
    expect(screen.getByText('Registros Akáshicos')).toBeInTheDocument()
    expect(screen.getByText('Limpiezas Energéticas')).toBeInTheDocument()
    expect(screen.getByText('Velomancia Angelical')).toBeInTheDocument()
    expect(screen.getByText('Abre Caminos')).toBeInTheDocument()
    expect(screen.getByText('Armonización de Chakras')).toBeInTheDocument()
    expect(screen.getByText('Constelaciones Familiares')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(7)
  })

  it('no renderiza precios', () => {
    render(<Services />)
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
  })
})

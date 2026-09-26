import { render, screen } from '@testing-library/react'
import Services from '../components/Services/Services'

describe('Services', () => {
  it('renderiza el título', () => {
    render(<Services />)
    expect(screen.getByText('Servicios')).toBeInTheDocument()
  })

  it('renderiza las 3 cards de servicio', () => {
    render(<Services />)
    expect(screen.getByText('Lectura de Tarot')).toBeInTheDocument()
    expect(screen.getByText('Limpieza Energética')).toBeInTheDocument()
    expect(screen.getByText('Lectura + Limpieza')).toBeInTheDocument()
  })

  it('renderiza los precios', () => {
    render(<Services />)
    expect(screen.getByText('$500')).toBeInTheDocument()
    expect(screen.getByText('$700')).toBeInTheDocument()
    expect(screen.getByText('$1000')).toBeInTheDocument()
  })
})

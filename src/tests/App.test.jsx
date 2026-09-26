import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renderiza todas las secciones principales', () => {
    render(<App />)
    expect(screen.getAllByText(/Sanarse/).length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
    expect(screen.getByText('Servicios')).toBeInTheDocument()
    expect(screen.getByText('Reseñas')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })
})

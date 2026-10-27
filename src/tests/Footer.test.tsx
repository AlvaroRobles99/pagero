import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer/Footer'

describe('Footer', () => {
  it('renderiza el copyright con el año actual', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} Sanarse`))).toBeInTheDocument()
  })

  it('renderiza el texto de derechos reservados', () => {
    render(<Footer />)
    expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument()
  })
})

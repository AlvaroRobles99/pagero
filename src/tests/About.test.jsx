import { render, screen } from '@testing-library/react'
import About from '../components/About/About'

describe('About', () => {
  it('renderiza el título', () => {
    render(<About />)
    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
  })

  it('renderiza el nombre Rocío', () => {
    render(<About />)
    expect(screen.getByText(/Rocío/)).toBeInTheDocument()
  })

  it('renderiza la marca Sanarse', () => {
    render(<About />)
    expect(screen.getByText(/Sanarse/)).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renderiza todas las secciones principales', () => {
    render(<App />)
    expect(screen.getAllByText(/Sanarse/).length).toBeGreaterThanOrEqual(2)
    expect(
      screen.getByRole('heading', { level: 2, name: /Un espacio para volver a vos/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Servicios')).toBeInTheDocument()
    expect(screen.getByText('Testimonios')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('expone un único landmark main, con banner y contentinfo', () => {
    render(<App />)
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('ordena Testimonios antes de Servicios y la bio debajo de Servicios', () => {
    const { container } = render(<App />)
    const ids = Array.from(container.querySelectorAll('main section[id]')).map(
      (section) => section.id
    )

    expect(ids).toEqual(['about', 'reviews', 'services', 'sobre-mi', 'contact'])
  })
})

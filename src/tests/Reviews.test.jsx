import { render, screen, fireEvent } from '@testing-library/react'
import Reviews from '../components/Reviews/Reviews'

function getActiveSlide(container) {
  return container.querySelector('[aria-hidden="false"]')
}

describe('Reviews', () => {
  it('renderiza el título', () => {
    render(<Reviews />)
    expect(screen.getByText('Reseñas')).toBeInTheDocument()
  })

  it('muestra la primera reseña por defecto', () => {
    const { container } = render(<Reviews />)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(/Rocío me ayudó a ver mi camino/)
    expect(slide).toHaveTextContent(/María G\./)
  })

  it('navega a la siguiente reseña con el botón ▶', () => {
    const { container } = render(<Reviews />)
    const nextBtn = screen.getByLabelText('Reseña siguiente')
    fireEvent.click(nextBtn)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(/La limpieza energética fue increíble/)
    expect(slide).toHaveTextContent(/Laura M\./)
  })

  it('navega a la reseña anterior con el botón ◀', () => {
    const { container } = render(<Reviews />)
    const nextBtn = screen.getByLabelText('Reseña siguiente')
    const prevBtn = screen.getByLabelText('Reseña anterior')

    fireEvent.click(nextBtn)
    fireEvent.click(nextBtn)
    let slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(/Una experiencia transformadora/)

    fireEvent.click(prevBtn)
    slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(/La limpieza energética fue increíble/)
  })

  it('cambia de reseña al hacer clic en un dot', () => {
    const { container } = render(<Reviews />)
    const dots = screen.getAllByRole('tab')

    fireEvent.click(dots[2])
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(/Una experiencia transformadora/)
    expect(slide).toHaveTextContent(/Carla R\./)
  })

  it('renderiza el número correcto de dots', () => {
    render(<Reviews />)
    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(3)
  })
})

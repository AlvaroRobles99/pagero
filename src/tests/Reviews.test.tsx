import { render, screen, fireEvent, act } from '@testing-library/react'
import Reviews from '../components/Reviews/Reviews'
import reviews from '../data/reviews'

function getActiveSlide(container: HTMLElement) {
  return container.querySelector('[aria-hidden="false"]')
}

// noUncheckedIndexedAccess: reviews[i] es Review | undefined, el guard lo estrecha.
function reviewAt(index: number) {
  const review = reviews[index]
  if (!review) throw new Error(`Missing review at index ${index}`)
  return review
}

describe('Reviews', () => {
  it('renderiza el título', () => {
    render(<Reviews />)
    expect(screen.getByText('Reseñas')).toBeInTheDocument()
  })

  it('muestra la primera reseña por defecto', () => {
    const { container } = render(<Reviews />)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(0).text)
    expect(slide).toHaveTextContent(reviewAt(0).author)
  })

  it('navega a la siguiente reseña con el botón ▶', () => {
    const { container } = render(<Reviews />)
    const nextBtn = screen.getByLabelText('Reseña siguiente')
    fireEvent.click(nextBtn)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(1 % reviews.length).text)
    expect(slide).toHaveTextContent(reviewAt(1 % reviews.length).author)
  })

  it('navega a la reseña anterior con el botón ◀', () => {
    const { container } = render(<Reviews />)
    const nextBtn = screen.getByLabelText('Reseña siguiente')
    const prevBtn = screen.getByLabelText('Reseña anterior')

    fireEvent.click(nextBtn)
    fireEvent.click(nextBtn)
    let slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(2 % reviews.length).text)

    fireEvent.click(prevBtn)
    slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(1 % reviews.length).text)
  })

  it('cambia de reseña al hacer clic en un dot', () => {
    const { container } = render(<Reviews />)
    const dots = screen.getAllByRole('tab')

    const dot = dots[2 % reviews.length]
    if (!dot) throw new Error(`Missing dot at index ${2 % reviews.length}`)
    fireEvent.click(dot)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(2 % reviews.length).text)
    expect(slide).toHaveTextContent(reviewAt(2 % reviews.length).author)
  })

  it('renderiza un dot por cada reseña', () => {
    render(<Reviews />)
    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(reviews.length)
  })

  it('no duplica el auto-avance cuando se reanuda dos veces', () => {
    vi.useFakeTimers()

    try {
      const { container } = render(<Reviews />)
      const carousel = screen.getByRole('region', { name: 'Reseñas de clientas' })

      // El puntero sale del carrusel mientras un elemento interno pierde el foco:
      // los dos handlers de reanudación corren seguidos y antes dejaban dos
      // intervalos vivos, así que un solo tick avanzaba dos reseñas.
      fireEvent.focusIn(carousel)
      fireEvent.mouseOver(carousel, { relatedTarget: document.body })
      fireEvent.mouseOut(carousel, { relatedTarget: document.body })
      fireEvent.focusOut(carousel)

      act(() => {
        vi.advanceTimersByTime(6000)
      })

      expect(getActiveSlide(container)).toHaveTextContent(reviewAt(1 % reviews.length).text)
    } finally {
      vi.useRealTimers()
    }
  })
})

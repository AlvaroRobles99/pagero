import { render, screen, fireEvent, act } from '@testing-library/react'
import Reviews from '../components/Reviews/Reviews'
import reviews, { TESTIMONIALS_HIGHLIGHT } from '../data/reviews'

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
    expect(screen.getByText('Testimonios')).toBeInTheDocument()
  })

  it('marca cada testimonio con un corazón y ya no con estrellas', () => {
    const { container } = render(<Reviews />)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent('\u2665')
    expect(slide).not.toHaveTextContent('\u2605')
  })

  it('muestra la primera reseña por defecto', () => {
    const { container } = render(<Reviews />)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(0).text)
  })

  it('navega a la siguiente reseña con el botón ▶', () => {
    const { container } = render(<Reviews />)
    const nextBtn = screen.getByLabelText('Testimonio siguiente')
    fireEvent.click(nextBtn)
    const slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(1 % reviews.length).text)
  })

  it('navega a la reseña anterior con el botón ◀', () => {
    const { container } = render(<Reviews />)
    const nextBtn = screen.getByLabelText('Testimonio siguiente')
    const prevBtn = screen.getByLabelText('Testimonio anterior')

    fireEvent.click(nextBtn)
    fireEvent.click(nextBtn)
    let slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(2 % reviews.length).text)

    fireEvent.click(prevBtn)
    slide = getActiveSlide(container)
    expect(slide).toHaveTextContent(reviewAt(1 % reviews.length).text)
  })

  it('muestra el contador de posición y lo actualiza al avanzar', () => {
    render(<Reviews />)

    expect(screen.getByText(`1 / ${reviews.length}`)).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Testimonio siguiente'))

    expect(screen.getByText(`2 / ${reviews.length}`)).toBeInTheDocument()
  })

  it('enlaza a la historia destacada de Instagram en una pestaña nueva', () => {
    render(<Reviews />)

    const link = screen.getByRole('link', { name: /ver más testimonios en instagram/i })
    expect(link).toHaveAttribute('href', TESTIMONIALS_HIGHLIGHT)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('no duplica el auto-avance cuando se reanuda dos veces', () => {
    vi.useFakeTimers()

    try {
      const { container } = render(<Reviews />)
      const carousel = screen.getByRole('region', { name: 'Testimonios de clientas' })

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

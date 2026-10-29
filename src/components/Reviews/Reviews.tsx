import { useCallback, useEffect, useRef, useState } from 'react'
import reviews, { TESTIMONIALS_HIGHLIGHT } from '../../data/reviews'
import appStyles from '../../App.module.css'
import styles from './Reviews.module.css'

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % reviews.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    // Dos señales de reanudación seguidas (salir con el puntero y perder el foco)
    // no deben apilar intervalos: siempre se reemplaza el anterior.
    stopTimer()
    timerRef.current = setInterval(next, 6000)
  }, [next, stopTimer])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  return (
    <section className={`${appStyles.section} ${styles.reviews}`} id="reviews">
      <div className={appStyles.container}>
        <h2>Testimonios</h2>

        <div
          className={styles.carousel}
          ref={carouselRef}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          onFocus={stopTimer}
          onBlur={startTimer}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonios de clientas"
        >
          <button
            className={styles.arrow}
            onClick={prev}
            aria-label="Testimonio anterior"
            type="button"
          >
            ◀
          </button>

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div
                  key={review.id}
                  className={styles.slide}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonio ${i + 1} de ${reviews.length}`}
                  aria-hidden={i !== current}
                >
                  <div className={styles.card}>
                    <p>&ldquo;{review.text}&rdquo;</p>
                    <div className={styles.heart} aria-hidden="true">
                      {'\u2665'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={next}
            aria-label="Testimonio siguiente"
            type="button"
          >
            ▶
          </button>
        </div>

        {/* Las etiquetas de cada slide ya anuncian la posición: el número
            visible queda fuera del árbol de accesibilidad para no repetirla. */}
        <div className={styles.counter} aria-hidden="true">
          {`${current + 1} / ${reviews.length}`}
        </div>

        <a
          className={styles.moreLink}
          href={TESTIMONIALS_HIGHLIGHT}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver más testimonios en Instagram
        </a>
      </div>
    </section>
  )
}

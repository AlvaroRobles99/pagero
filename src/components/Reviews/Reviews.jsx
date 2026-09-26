import { useCallback, useEffect, useRef, useState } from 'react'
import reviews from '../../data/reviews'
import appStyles from '../../App.module.css'
import styles from './Reviews.module.css'

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const carouselRef = useRef(null)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % reviews.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length)
  }, [])

  const goTo = useCallback((index) => {
    setCurrent(index)
  }, [])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(next, 6000)
  }, [next])

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  return (
    <section className={`${appStyles.section} ${styles.reviews}`} id="reviews">
      <div className={appStyles.container}>
        <h2>Reseñas</h2>

        <div
          className={styles.carousel}
          ref={carouselRef}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          onFocus={stopTimer}
          onBlur={startTimer}
          role="region"
          aria-roledescription="carousel"
          aria-label="Reseñas de clientas"
        >
          <button
            className={styles.arrow}
            onClick={prev}
            aria-label="Reseña anterior"
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
                  aria-label={`Reseña ${i + 1} de ${reviews.length}`}
                  aria-hidden={i !== current}
                >
                  <div className={styles.card}>
                    <div className={styles.stars}>{'\u2605\u2605\u2605\u2605\u2605'}</div>
                    <p>&ldquo;{review.text}&rdquo;</p>
                    <span className={styles.author}>&mdash; {review.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={next}
            aria-label="Reseña siguiente"
            type="button"
          >
            ▶
          </button>
        </div>

        <div className={styles.dots} role="tablist" aria-label="Navegación de reseñas">
          {reviews.map((review, i) => (
            <button
              key={review.id}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir a reseña ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import styles from './Hero.module.css'
import shared from '../../shared.module.css'
import { HERO_PHOTOS } from '../../data/hero'

export default function Hero() {
  return (
    <header className={styles.hero}>
      {/* Decorative: the h1 and the subtitle already name the person and the
          practice, so the frames carry mood, not information. */}
      <div className={styles.backdrop} aria-hidden="true">
        {HERO_PHOTOS.map((photo) => (
          <figure key={photo.src} className={`${styles.panel} ${styles[photo.panel]}`}>
            <img
              src={photo.src}
              alt=""
              width={photo.width}
              height={photo.height}
              decoding="async"
              fetchPriority={photo.priority ? 'high' : 'low'}
              loading={photo.priority ? 'eager' : 'lazy'}
            />
          </figure>
        ))}
      </div>
      <div className={styles.overlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Sanarse{' '}
          <span className={styles.subtitle}>Terapeuta holística</span>
        </h1>
        <p className={styles.tagline}>
          Rocío Durazno — tarot, limpiezas energéticas y escucha sin juicio
        </p>
        <a href="#services" className={shared.btnPrimary}>
          Ver servicios
        </a>
      </div>
    </header>
  )
}

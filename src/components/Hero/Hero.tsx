import styles from './Hero.module.css'
import shared from '../../shared.module.css'

/*
 * The photographs the client supplied replace the illustrated banner. The
 * middle one is the cards in her hand: it is the gesture that names the
 * service, so it gets the widest column and is the only frame a phone loads.
 */
const PHOTOS = [
  {
    src: '/images/rocio-playa.webp',
    width: 960,
    height: 966,
    panel: 'panelLeft',
    priority: false,
  },
  {
    src: '/images/rocio-oraculos.webp',
    width: 960,
    height: 966,
    panel: 'panelCenter',
    priority: true,
  },
  {
    src: '/images/meditacion-playa.webp',
    width: 960,
    height: 1280,
    panel: 'panelRight',
    priority: false,
  },
] as const

export default function Hero() {
  return (
    <header className={styles.hero}>
      {/* Decorative: the h1 and the subtitle already name the person and the
          practice, so the frames carry mood, not information. */}
      <div className={styles.backdrop} aria-hidden="true">
        {PHOTOS.map((photo) => (
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
        <h1 className={styles.title}>Sanarse</h1>
        <p className={styles.subtitle}>Rocío Durazno — Terapeuta holística</p>
        <p className={styles.tagline}>Tarot, limpieza energética y escucha sin juicio</p>
        <a href="#services" className={shared.btnPrimary}>
          Ver servicios
        </a>
      </div>
    </header>
  )
}

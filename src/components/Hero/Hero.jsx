import styles from './Hero.module.css'
import shared from '../../shared.module.css'

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.heroContent}>
        <img src="/images/logo.png" alt="" className={styles.logo} />
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

import styles from './Hero.module.css'
import shared from '../../shared.module.css'
import { whatsappLink } from '../../data/contact'

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Sanarse</h1>
        <p className={styles.subtitle}>Rocío — Terapeuta Holística</p>
        <p className={styles.tagline}>Amor, acompañamiento y confidencialidad</p>
        <a
          href={whatsappLink()}
          className={shared.btnWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Agenda tu sesión
        </a>
      </div>
    </header>
  )
}

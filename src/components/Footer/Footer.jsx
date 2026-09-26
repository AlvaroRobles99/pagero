import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p>&copy; {year} Sanarse — Todos los derechos reservados.</p>
    </footer>
  )
}

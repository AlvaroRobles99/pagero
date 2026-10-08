import appStyles from '../../App.module.css'
import shared from '../../shared.module.css'
import styles from './Contact.module.css'
import { whatsappLink } from '../../data/contact'
import { SOCIAL_LINKS } from '../../data/social'

export default function Contact() {
  return (
    <section className={`${appStyles.section} ${styles.contact}`} id="contact">
      <div className={appStyles.container}>
        <h2>Contacto</h2>
        <p>Tu proceso de sanación empieza con un mensaje. Escribime por WhatsApp y conversamos sin compromiso.</p>
        <a
          href={whatsappLink()}
          className={shared.btnPrimary}
          target="_blank"
          rel="noopener noreferrer"
        >
          {'\u{1F4F1}'} Escribir por WhatsApp
        </a>
        <div className={styles.social}>
          <span className={styles.socialRule} aria-hidden="true" />
          <p className={styles.socialLabel}>Ver mi contenido</p>
          <div className={styles.socialLinks}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.id}
                href={s.url}
                className={styles.socialLink}
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

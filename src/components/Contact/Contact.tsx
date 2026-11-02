import appStyles from '../../App.module.css'
import shared from '../../shared.module.css'
import styles from './Contact.module.css'
import { whatsappLink } from '../../data/contact'
import { SOCIAL_LINKS } from '../../data/social'

export default function Contact() {
  return (
    <section className={`${appStyles.section} ${styles.contact}`} id="contact">
      <div className={appStyles.container}>
        <div className={styles.grid}>
          <div className={styles.lead}>
            <p className={styles.eyebrow}>Contacto</p>
            <h2>Agenda tu turno</h2>
            <p>Escribime y contame qué te está pasando. Te respondo yo, sin intermediarios, y vemos si alguna de las sesiones es lo que necesitás.</p>
            <a
              href={whatsappLink()}
              className={shared.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
          </div>
          <div className={styles.figure}>
            <figure className={styles.agenda}>
              <img
                src="/images/agenda-cuarzos.webp"
                alt="Agenda abierta con cuarzos de amatista y una lapicera"
                width={1128}
                height={785}
                loading="lazy"
                decoding="async"
                className={styles.image}
              />
            </figure>
            {/* The brand mark moved here from the hero: over the photographs it
                competed with the face, while next to the agenda it works as the
                seal of the person you are writing to. */}
            <img
              src="/images/logo.png"
              alt=""
              width={512}
              height={512}
              loading="lazy"
              decoding="async"
              className={styles.mark}
            />
          </div>
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
      </div>
    </section>
  )
}

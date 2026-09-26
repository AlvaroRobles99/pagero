import appStyles from '../../App.module.css'
import shared from '../../shared.module.css'
import styles from './Contact.module.css'
import { whatsappLink } from '../../data/contact'

export default function Contact() {
  return (
    <section className={`${appStyles.section} ${styles.contact}`} id="contact">
      <div className={appStyles.container}>
        <h2>Contacto</h2>
        <p>Tu proceso de sanación empieza con un mensaje. Escribime por WhatsApp y conversamos sin compromiso.</p>
        <a
          href={whatsappLink()}
          className={shared.btnWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {'\u{1F4F1}'} Escribir por WhatsApp
        </a>
      </div>
    </section>
  )
}

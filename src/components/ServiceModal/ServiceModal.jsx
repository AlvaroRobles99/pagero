import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { whatsappLink } from '../../data/contact'
import styles from './ServiceModal.module.css'

export default function ServiceModal({ service, onClose }) {
  const overlayRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
      >
        <button
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <span className={styles.icon}>{service.icon}</span>
        <h2 className={styles.title}>{service.title}</h2>

        {service.fullDescription.split('\n\n').map((p, i) => (
          <p key={i} className={styles.paragraph}>{p}</p>
        ))}

        <a
          href={whatsappLink(`Hola Rocío, me interesa saber más sobre ${service.title}`)}
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar vía WhatsApp ↗
        </a>
      </div>
    </div>,
    document.body,
  )
}

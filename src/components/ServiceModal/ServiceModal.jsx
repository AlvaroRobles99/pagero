import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Lotus from '../Lotus/Lotus'
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

        {service.includes && (
          <>
            <Lotus size={24} />
            <h3 className={styles.includesTitle}>Qué incluye</h3>
            <ul className={styles.includesList}>
              {service.includes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        <div className={styles.footer}>
          {service.duration && (
            <span className={styles.duration}>
              <strong>Duración:</strong> {service.duration}
            </span>
          )}
          <span className={styles.price}>{service.price}</span>
        </div>

        <a
          href={`https://wa.me/521234567890?text=${encodeURIComponent(`Hola Rocío, me interesa saber más sobre ${service.title}`)}`}
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

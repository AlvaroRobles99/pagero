import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { whatsappLink } from '../../data/contact'
import styles from './ServiceModal.module.css'

// Elements that can receive keyboard focus inside the dialog.
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function ServiceModal({ service, onClose }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const onCloseRef = useRef(onClose)

  // Keep the latest onClose without re-running the mount effect below.
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (e.key !== 'Tab') return

      const focusables = modalRef.current?.querySelectorAll(FOCUSABLE)
      if (!focusables || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      // Wrap focus so Tab never escapes the modal to the page behind it.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''

      // Return focus to whatever opened the modal, so keyboard users are not lost.
      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused !== document.body &&
        typeof previouslyFocused.focus === 'function'
      ) {
        previouslyFocused.focus()
      }
    }
  }, [])

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
        ref={modalRef}
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

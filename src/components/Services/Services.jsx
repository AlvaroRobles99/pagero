import { useEffect, useRef, useState } from 'react'
import services from '../../data/services'
import ServiceModal from '../ServiceModal/ServiceModal'
import appStyles from '../../App.module.css'
import styles from './Services.module.css'

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return visible
}

function ServiceCard({ service, index, onSelect }) {
  const ref = useRef(null)
  const visible = useOnScreen(ref)

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onClick={() => onSelect(service)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(service)}
      role="button"
      tabIndex={0}
    >
      <span className={styles.cardIcon}>{service.icon}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className={styles.cardHint}>Conoce más →</span>
    </div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)

  return (
    <section className={`${appStyles.section} ${styles.services}`} id="services">
      <div className={appStyles.container}>
        <h2>Servicios</h2>
        <div className={styles.cards}>
          {services.map((s, i) => (
            <ServiceCard service={s} index={i} key={s.id} onSelect={setSelected} />
          ))}
        </div>
      </div>
      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

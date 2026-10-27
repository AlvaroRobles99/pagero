import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import services from '../../data/services'
import type { Service } from '../../data/services'
import ServiceModal from '../ServiceModal/ServiceModal'
import appStyles from '../../App.module.css'
import styles from './Services.module.css'

function useOnScreen(ref: RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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

interface ServiceCardProps {
  service: Service
  index: number
  onSelect: (service: Service) => void
}

function ServiceCard({ service, index, onSelect }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
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
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className={styles.cardHint}>Ver cómo es →</span>
    </div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <section className={`${appStyles.section} ${styles.services}`} id="services">
      <div className={appStyles.container}>
        <h2>Servicios</h2>
        <p className={styles.lead}>
          Cada proceso es distinto. Abrí cada servicio para ver cómo funciona y si es lo que estás buscando.
        </p>
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

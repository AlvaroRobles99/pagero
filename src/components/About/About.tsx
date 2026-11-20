import appStyles from '../../App.module.css'
import styles from './About.module.css'
import sharedStyles from '../../shared.module.css'
import { whatsappLink } from '../../data/contact'
import Lotus from '../Lotus/Lotus'

export default function About() {
  return (
    <section className={`${appStyles.section} ${styles.about}`} id="about">
      <div className={appStyles.container}>
        <Lotus size={32} />
        <div className={styles.eyebrow}>Sanarse · Terapias holísticas</div>
        <h2>Un espacio para volver a vos</h2>

        <section className={styles.subsection} aria-labelledby="inicio-title">
          <h3 id="inicio-title" className={styles.subheading}>
            Cómo empieza el proceso
          </h3>
          <p className={styles.subintro}>
            Comienzo con la consulta: con tu nombre completo y fecha de nacimiento hago una evaluación energética para saber qué labor se debe realizar, qué tipo de terapia necesitás y cuántas sesiones.
          </p>
          <p className={styles.subintro}>
            El valor de la evaluación viene siempre incluido en todas las sesiones.
          </p>
          <p className={styles.subintro}>
            Las sesiones son online, vía WhatsApp, con un acompañamiento continuo en tu proceso de sanación.
          </p>
        </section>

        <section className={styles.subsection} aria-labelledby="proceso-title">
          <h3 id="proceso-title" className={styles.subheading}>
            Qué buscamos en el proceso
          </h3>
          <p className={styles.subintro}>
            Cada proceso es distinto, pero el objetivo es siempre el mismo:
          </p>
          <ol className={styles.orderedList}>
            <li>Reconocer los patrones que se repiten, para poder elegir distinto.</li>
            <li>Soltar las cargas que venís arrastrando y que ya no te sirven.</li>
            <li>Volver a sentirte en calma, con la cabeza más clara para decidir.</li>
          </ol>
        </section>

        <blockquote className={styles.quote}>
          El camino de la sanación nunca es lineal y te pertenece, pero no tenés que recorrerlo en soledad.
        </blockquote>

        <p className={styles.invitation}>¿Sentís que es tu momento?</p>
        <p className={styles.invitation}>
          Si querés empezar, escribime y coordinamos una sesión. No hace falta tener todo claro para dar el primer paso.
        </p>

        <div className={styles.ctaArea}>
          <p className={styles.ctaLine}>Escribime por WhatsApp y vemos qué necesitás.</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={sharedStyles.btnPrimary}
          >
            Agendar una sesión
          </a>
        </div>
      </div>
    </section>
  )
}
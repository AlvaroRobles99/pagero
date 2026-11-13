import appStyles from '../../App.module.css'
import styles from './About.module.css'
import sharedStyles from '../../shared.module.css'
import { whatsappLink } from '../../data/contact'
import { INSTAGRAM_URL } from '../../data/social'
import { ageOn, yearsOfPracticeOn } from '../../data/about'
import Lotus from '../Lotus/Lotus'

export default function About() {
  const now = new Date()
  const age = ageOn(now)
  const years = yearsOfPracticeOn(now)

  return (
    <section className={`${appStyles.section} ${styles.about}`} id="about">
      <div className={appStyles.container}>
        <Lotus size={32} />
        <div className={styles.eyebrow}>Sanarse · Terapias holísticas</div>
        <h2>Un espacio para volver a vos</h2>
        <p className={styles.intro}>
          Me llamo Rocío, tengo {age} años y empecé hace {years} años a dedicarme de tiempo completo a las terapias holísticas.
        </p>
        <p className={styles.intro}>
          Desde muy chica empecé a sentir una conexión con lo espiritual.
        </p>
        <p className={styles.intro}>
          En el 2018 conocí el Reiki gracias a una situación delicada de salud de un familiar y me di cuenta lo importante que es sanarnos internamente para no atraer problemas de salud.
        </p>
        <p className={styles.intro}>
          Mi mayor anhelo es poder llegar a cada uno y ayudarles a sanar con mis dones cada parte de ustedes que está lastimada.
        </p>
        <p className={styles.intro}>
          En las sesiones vas a encontrar presencia, respeto y confidencialidad. Mi labor no es decirte qué hacer: es ayudarte a escuchar lo que ya sabés.
        </p>
        <p className={styles.intro}>
          Por eso, los invito a que sean parte de esta comunidad.{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
            aria-label="Seguime en Instagram"
          >
            Seguime
          </a>{' '}
          para enterarte sobre este hermoso mundo.
        </p>

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
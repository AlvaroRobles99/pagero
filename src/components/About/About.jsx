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
        <p className={styles.intro}>
          Soy Rocío. Acompaño a personas que están en un momento de cambio y necesitan claridad, calma o, simplemente, un lugar donde hablar sin sentirse juzgadas.
        </p>
        <p className={styles.intro}>
          Trabajo con tarot, limpieza energética y otras herramientas que se adaptan a lo que cada persona trae. Creo en mirar lo que te pasa con honestidad, sin fórmulas mágicas ni respuestas cerradas.
        </p>
        <p className={styles.intro}>
          En las sesiones vas a encontrar presencia, respeto y confidencialidad. Mi trabajo no es decirte qué hacer: es ayudarte a escuchar lo que ya sabés.
        </p>

        <section className={styles.subsection} aria-labelledby="pilares-title">
          <h3 id="pilares-title" className={styles.subheading}>
            Con qué trabajo
          </h3>
          <p className={styles.subintro}>
            Cada sesión se arma según lo que necesites. Estas son las herramientas que más uso:
          </p>
          <ul className={styles.pillarsList}>
            <li className={styles.pillarItem}>
              <strong className={styles.pillarTerm}>Tarot Terapéutico</strong>
              {' — '}
              Preguntas concretas y una lectura que ordena. Sirve para ver tu situación desde afuera y decidir con más calma.
            </li>
            <li className={styles.pillarItem}>
              <strong className={styles.pillarTerm}>Limpieza Energética</strong>
              {' — '}
              Para cuando el cansancio no se explica y sentís que algo se estancó. Se trabaja para soltar y renovar.
            </li>
            <li className={styles.pillarItem}>
              <strong className={styles.pillarTerm}>Escucha sin Juicio</strong>
              {' — '}
              Un espacio para hablar de lo que no contás en otro lado, sin miedo a que te corrijan ni a que te juzguen.
            </li>
          </ul>
        </section>

        <section className={styles.subsection} aria-labelledby="trabajo-title">
          <h3 id="trabajo-title" className={styles.subheading}>
            Qué buscamos en el proceso
          </h3>
          <p className={styles.subintro}>
            Cada proceso es distinto, pero el trabajo apunta siempre a lo mismo:
          </p>
          <ol className={styles.orderedList}>
            <li>Reconocer los patrones que se repiten, para poder elegir distinto.</li>
            <li>Soltar las cargas que venís arrastrando y que ya no te sirven.</li>
            <li>Volver a sentirte en calma, con la cabeza más clara para decidir.</li>
          </ol>
        </section>

        <blockquote className={styles.quote}>
          El camino de la sanación te pertenece, pero no tenés que recorrerlo en soledad.
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

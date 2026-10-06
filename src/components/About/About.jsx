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
        <div className={styles.eyebrow}>Sanarse Terapias Holísticas</div>
        <h2>Bienvenidos a tu espacio de evolución espiritual</h2>
        <p className={styles.intro}>
          Hola, soy Rocío, tu terapeuta holística personal.
        </p>
        <p className={styles.intro}>
          Estoy aquí para acompañarte en el camino hacia tu despertar y la sanación espiritual que mereces. Creo firmemente que el bienestar real nace del equilibrio entre el cuerpo, la mente y el alma.
        </p>
        <p className={styles.intro}>
          En este espacio, no encontrarás fórmulas mágicas. Encontrarás presencia, respeto, confidencialidad y una guía honesta para que recuerdes tu propio poder de transformación.
        </p>

        <section className={styles.subsection} aria-labelledby="pilares-title">
          <h3 id="pilares-title" className={styles.subheading}>
            <span aria-hidden="true">🔮</span> Mis Pilares de Sanación
          </h3>
          <p className={styles.subintro}>
            Mis sesiones integran diferentes herramientas adaptadas a lo que tu alma necesita en este momento:
          </p>
          <ul className={styles.pillarsList}>
            <li className={styles.pillarItem}>
              <strong className={styles.pillarTerm}>Tarot Terapéutico</strong>
              {' — '}
              Una herramienta de autoconocimiento y claridad para sintonizar con tu momento presente, identificar bloqueos y habilitar nuevas perspectivas.
            </li>
            <li className={styles.pillarItem}>
              <strong className={styles.pillarTerm}>Limpieza Energética</strong>
              {' — '}
              Procesos orientados a transmutar densidades, liberar energías estancadas y restaurar la armonía en tu campo áurico.
            </li>
            <li className={styles.pillarItem}>
              <strong className={styles.pillarTerm}>Escucha sin Juicio</strong>
              {' — '}
              Un contenedor seguro, amoroso y empático donde puedes expresarte con total libertad, sabiendo que cada parte de tu historia es respetada.
            </li>
          </ul>
        </section>

        <section className={styles.subsection} aria-labelledby="trabajo-title">
          <h3 id="trabajo-title" className={styles.subheading}>
            <span aria-hidden="true">🌿</span> ¿Cómo es trabajar en tu bienestar?
          </h3>
          <p className={styles.subintro}>
            La terapia holística es un compromiso contigo mismo. A través de la combinación de la guía del tarot y la armonización energética, buscamos:
          </p>
          <ol className={styles.orderedList}>
            <li>Despertar la autoconciencia para reconocer patrones repetitivos.</li>
            <li>Liberar cargas emocionales y bloqueos que detienen tu evolución.</li>
            <li>Conectar con la paz mental y la claridad necesarias para tomar decisiones conscientes.</li>
          </ol>
        </section>

        <blockquote className={styles.quote}>
          El camino de la sanación te pertenece, pero no tienes que recorrerlo en soledad.
        </blockquote>

        <p className={styles.invitation}>¿Sientes el llamado a iniciar tu proceso?</p>
        <p className={styles.invitation}>
          Te invito a reservar una sesión individual para comenzar a cuidar de tu energía y dar el primer paso hacia tu transformación integral.
        </p>

        <div className={styles.ctaArea}>
          <p className={styles.ctaLine}>✨ Agendar una Sesión o Contactar por WhatsApp para comenzar hoy.</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={sharedStyles.btnWhatsapp}
          >
            Agendar una Sesión
          </a>
        </div>
      </div>
    </section>
  )
}

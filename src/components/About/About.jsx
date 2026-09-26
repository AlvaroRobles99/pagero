import appStyles from '../../App.module.css'
import styles from './About.module.css'
import Lotus from '../Lotus/Lotus'

export default function About() {
  return (
    <section className={`${appStyles.section} ${styles.about}`} id="about">
      <div className={appStyles.container}>
        <Lotus size={32} />
        <h2>Sobre mí</h2>
        <p className={styles.aboutText}>
          Sanarse nace de la certeza de que todxs necesitamos un espacio seguro para mirar adentro. Mi nombre es Rocío y acompaño procesos de sanación a través del tarot, la limpieza energética y la escucha sin juicio. Aquí no hay fórmulas mágicas: hay presencia, respeto y confidencialidad.
        </p>
      </div>
    </section>
  )
}

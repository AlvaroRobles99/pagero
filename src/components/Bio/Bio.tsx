import appStyles from '../../App.module.css'
import styles from './Bio.module.css'
import { INSTAGRAM_URL } from '../../data/social'
import { ageOn, yearsOfPracticeOn } from '../../data/about'

export default function Bio() {
  const now = new Date()
  const age = ageOn(now)
  const years = yearsOfPracticeOn(now)

  return (
    <section className={`${appStyles.section} ${styles.bio}`} id="sobre-mi">
      <div className={appStyles.container}>
        <article className={styles.card}>
          <figure className={styles.portrait}>
            <img
              src="/images/rocio-tarot.webp"
              alt="Rocío sentada frente al mantel de tarot, con las cartas en las manos y cuarzos sobre la mesa"
              width={900}
              height={900}
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </figure>
          <div className={styles.body}>
            <p className={styles.eyebrow}>Sobre mí</p>
            <h2>Mi historia</h2>
            <p className={styles.text}>
              Me llamo Rocío, tengo {age} años y empecé hace {years} años a dedicarme de tiempo completo a las terapias holísticas.
            </p>
            <p className={styles.text}>
              Desde muy chica empecé a sentir una conexión con lo espiritual.
            </p>
            <p className={styles.text}>
              En el 2018 conocí el Reiki gracias a una situación delicada de salud de un familiar y me di cuenta lo importante que es sanarnos internamente para no atraer problemas de salud.
            </p>
            <p className={styles.text}>
              Mi mayor anhelo es poder llegar a cada uno y ayudarles a sanar con mis dones cada parte de ustedes que está lastimada.
            </p>
            <p className={styles.text}>
              En las sesiones vas a encontrar presencia, respeto y confidencialidad. Mi labor no es decirte qué hacer: es ayudarte a escuchar lo que ya sabés.
            </p>
            <p className={styles.text}>
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
          </div>
        </article>
      </div>
    </section>
  )
}

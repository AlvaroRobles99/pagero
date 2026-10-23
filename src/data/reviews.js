/**
 * Reseñas que muestra el carrusel.
 *
 * ── Cómo reemplazarlas por las reales ─────────────────────────────────────
 * 1. Editá solo este archivo. El carrusel, los puntos y los tests leen de acá.
 * 2. Cada reseña es un objeto: `text` es la cita y `author` el nombre que
 *    aparece después del guion.
 * 3. `id` tiene que ser único y en minúsculas: es la clave de React, no se
 *    muestra en pantalla.
 * 4. Dos o tres líneas funcionan mejor que un párrafo largo: la card tiene
 *    alto fijo y las citas muy largas se cortan.
 * 5. Si agregás o quitás reseñas, los puntos del carrusel se ajustan solos.
 *
 * Los tres textos de abajo son de ejemplo, todavía no son palabras reales.
 */
const reviews = [
  {
    id: 'maria',
    text: 'Fui sin saber bien qué preguntar y salí con las ideas ordenadas. Rocío tiene una forma muy tranquila de decir las cosas.',
    author: 'María G.',
  },
  {
    id: 'laura',
    text: 'Llegué agotada y me fui liviana. No sé explicarlo del todo, pero algo se destrabó esa semana.',
    author: 'Laura M.',
  },
  {
    id: 'carla',
    text: 'Me escuchó sin apuro y sin juzgar. Es de esas conversaciones que te quedan dando vueltas para bien.',
    author: 'Carla R.',
  },
]

export default reviews

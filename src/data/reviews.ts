/**
 * Testimonios que muestra el carrusel de Reseñas.
 *
 * ── De dónde salen ────────────────────────────────────────────────────────
 * Son doce mensajes reales que Rocío recibió por WhatsApp, publicados con su
 * permiso y con una edición mínima: se corrigieron tipeos y puntuación, se
 * sacaron los emojis y los "jajaja" repetidos, y cada uno se recortó a sus
 * dos o tres líneas más fuertes. Se conserva el voseo y las palabras de cada
 * persona. No se muestran nombres: las capturas originales tampoco los tenían
 * y el sitio no inventa ninguno.
 *
 * ── Cómo agregar o quitar un testimonio ───────────────────────────────────
 * 1. Editá solo este archivo. El carrusel, el contador y los tests leen de acá.
 * 2. Cada testimonio es un objeto: `id` es la clave de React (único, en
 *    minúsculas, nunca se muestra) y `text` es la cita tal como se publica.
 * 3. El contador `N / total` se ajusta solo al largo del array.
 */

export interface Review {
  /** Unique lowercase key: React key, never rendered. */
  id: string
  /** The quote shown in the card, edited from the original WhatsApp message. */
  text: string
}

/** Historia destacada de Instagram con el resto de los testimonios. */
export const TESTIMONIALS_HIGHLIGHT =
  'https://www.instagram.com/stories/highlights/17984356390758039/'

const reviews: readonly Review[] = [
  {
    id: 'autoestima',
    text: 'Te re mil agradezco por escucharme, por bancarme y por cambiarme tanto en pocos días. Hasta mi autoestima subió: me siento hermosa. Hace mucho no me sentía así.',
  },
  {
    id: 'depresion',
    text: 'Yo no me olvido cómo me ayudaste. Después de vos todo empezó a mejorar y no volví a caer en depresión. Increíble cómo me liberé.',
  },
  {
    id: 'antes-despues',
    text: 'Es un antes y un después recibir tus sesiones. Eternamente agradecido por la ayuda y por mostrarme el camino. Era por acá. Gracias por tanto.',
  },
  {
    id: 'me-recebi',
    text: 'Me recibí. Mil gracias, Ro. Sé que vos ayudaste.',
  },
  {
    id: 'techo-casa',
    text: 'Ese abre caminos siguió haciendo efecto: cuando te conté del crédito compré todos los materiales y después surgió un crédito a tasa baja y pude techar. Estoy realmente feliz.',
  },
  {
    id: 'moto-trabajo',
    text: 'Estoy muy agradecida con tu abre caminos. Pudimos vender la moto que teníamos en venta hace meses y a él lo llamaron para una oferta laboral. Vamos avanzando.',
  },
  {
    id: 'top-healer',
    text: 'Desde que me hiciste Top Healer 4 cambió por completo mi energía. Todos los días tengo trabajo. Me siento una persona nueva, más abierta y recibiendo cosas hermosas.',
  },
  {
    id: 'sanar',
    text: 'Rocío sos la mejor. Me acuerdo que hace años me ayudaste a sanar y a partir de ahí cambiaron muchas cosas. Cuando esté un poquito mejor te voy a pedir otro abre caminos.',
  },
  {
    id: 'hogar',
    text: 'Desde que nos limpiaste a todos cambió la energía del hogar. Estamos de buen humor, relajados, tranquilos y nos llevamos mejor. También mejoramos económicamente.',
  },
  {
    id: 'proyectos',
    text: 'Gracias a vos, increíble cómo se me fueron dando todos los proyectos trabados.',
  },
  {
    id: 'energias',
    text: 'Gracias por mandarme tus buenas energías. Los trabajos que hacés me alivian bastante.',
  },
  {
    id: 'paz',
    text: 'Por suerte me siento mejor, más tranquila. Más allá del sueño, siento paz.',
  },
]

export default reviews

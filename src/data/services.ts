/**
 * Services shown in the cards and in the detail modal.
 *
 * `description` is the short line on the card, `fullDescription` is the modal
 * body (blank lines become separate paragraphs). There are no prices, no
 * duration and no "includes" list on purpose — those facts are not decided yet.
 */

export interface Service {
  /** Stable key: React key on the cards and the modal identity. */
  id: string
  title: string
  /** Short line shown on the card. */
  description: string
  /** Modal body text. A blank line separates paragraphs. */
  fullDescription: string
}

const services: readonly Service[] = [
  {
    id: 'tarot-angelical',
    title: 'Tarot Angelical',
    description: 'Preguntas concretas y una lectura que ordena. Vemos qué energías están jugando en tu situación.',
    fullDescription:
      'Trabajamos con preguntas concretas. A través de las cartas miramos qué energías están presentes, qué emociones se están moviendo y qué vínculos están en juego.\n\nNo es un pronóstico cerrado: es una forma de ver tu momento con más claridad para que puedas decidir con calma. Si hay algo que te tiene dando vueltas, traelo a la sesión.',
  },
  {
    id: 'registros-akashicos',
    title: 'Registros Akáshicos',
    description: 'Una mirada profunda a los patrones que se repiten en tu vida y a lo que hoy los sostiene.',
    fullDescription:
      'Un espacio de lectura y escucha. Miramos experiencias, aprendizajes y patrones que se repiten para entender de dónde vienen y cómo siguen influyendo en tu presente.\n\nNo se trata de buscar culpables ni de revivir el pasado. Se trata de reconocer lo que está pidiendo un cambio y de darte una mirada nueva sobre tu propio proceso.',
  },
  {
    id: 'limpiezas-energeticas',
    title: 'Limpiezas Energéticas',
    description: 'Para cuando el cansancio no se explica y sentís que algo se estancó.',
    fullDescription:
      'Una práctica para soltar lo que se fue acumulando: energías pesadas, cansancio que no tiene una razón clara, sensaciones de bloqueo.\n\nSe trabaja con la intención de renovar la energía y volver a sentirte en equilibrio. Muchas personas se van con una sensación de descanso y de orden. Suele ser un buen punto de partida antes de un proceso más largo.',
  },
  {
    id: 'velomancia',
    title: 'Velomancia Angelical',
    description: 'La vela como mapa: lo que aparece en ella habla de tu proceso.',
    fullDescription:
      'La vela se enciende y se observa mientras trabaja. Su llama, sus formas y su comportamiento se interpretan como un mapa simbólico del momento que estás atravesando.\n\nSirve para confirmar lo que ya intuías, para entender qué está pidiendo atención y para llevarte una orientación clara.',
  },
  {
    id: 'abre-caminos',
    title: 'Abre Caminos',
    description: 'Para esas situaciones que llevan tiempo trabadas y no terminan de destrabarse.',
    fullDescription:
      'Un trabajo energético pensado para mover lo que está estancado: decisiones que no salen, puertas que parecen cerradas, procesos que no arrancan.\n\nLa idea no es forzar nada, sino despejar el terreno para que lo que tenga que suceder encuentre su lugar. Se suele elegir en momentos de cambio o justo antes de empezarlos.',
  },
  {
    id: 'chakras',
    title: 'Armonización de Chakras',
    description: 'Recorremos los centros energéticos para devolverle el equilibrio al sistema.',
    fullDescription:
      'Se trabaja sobre los principales centros energéticos, uno por uno, mirando cuáles están más cargados y cuáles más apagados. El objetivo es volver a sentir el cuerpo y la energía en orden.\n\nEs una sesión tranquila, con silencio y respiración. Suele elegirse después de una etapa de exigencia o cuando sentís que perdiste tu centro.',
  },
  {
    id: 'constelaciones',
    title: 'Constelaciones Familiares',
    description: 'Otra forma de mirar lo que se repite en tu familia y de dónde viene.',
    fullDescription:
      'Miramos el sistema familiar como lo que es: una red de vínculos donde cada persona ocupa un lugar. Desde ahí se entienden muchas repeticiones y lealtades que no se ven a simple vista.\n\nLa sesión abre una perspectiva nueva sobre el patrón: qué lo sostiene, qué se heredó y qué se puede empezar a soltar.',
  },
]

export default services

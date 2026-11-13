/**
 * Services shown in the cards and in the detail modal.
 *
 * `description` is the short line on the card, `fullDescription` is the modal
 * body (blank lines become separate paragraphs). There are no prices, no
 * duration and no "includes" list on purpose — those facts are not decided yet.
 *
 * The copy sticks to what the brand actually says about each service: no
 * promises, no technique details nobody confirmed.
 *
 * Copy rule: never use the word "trabajo" or its derivatives in this file.
 * Use synonyms (labor, proceso, práctica, objetivo); `src/tests/copy.test.tsx`
 * guards it.
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
    description: 'A través de las cartas conectamos con tus ángeles.',
    fullDescription:
      'A través de las cartas conectamos con tus ángeles. La lectura ayuda a encontrar respuestas a tus preguntas, para tener más claridad o tomar decisiones.',
  },
  {
    id: 'registros-akashicos',
    title: 'Registros Akáshicos',
    description: 'La puerta a tu autoconocimiento.',
    fullDescription:
      'Los registros akáshicos son la puerta a tu autoconocimiento: podemos ver toda la información de tu alma.',
  },
  {
    id: 'limpiezas-energeticas',
    title: 'Limpiezas Energéticas',
    description: 'Para liberar la pesadez y la mala energía.',
    fullDescription:
      'La limpieza energética ayuda a liberar la pesadez y la mala energía, y trae paz mental y bienestar.',
  },
  {
    id: 'velomancia',
    title: 'Velomancia Angelical',
    description: 'Una labor con los ángeles, según tu situación.',
    fullDescription:
      'Es una labor con los ángeles. Dependiendo de tu situación hay varios encendidos: amor propio, corte de escasez, corte de enfermedad, corte de lazos tóxicos y corte transgeneracional de escasez.',
  },
  {
    id: 'abre-caminos',
    title: 'Abre Caminos',
    description: 'Para liberar el bloqueo que te frena.',
    fullDescription:
      'Ayuda a liberar el bloqueo que tenés para avanzar: un proyecto, un puesto laboral, la venta de una casa y muchas cosas más.',
  },
  {
    id: 'chakras',
    title: 'Armonización de Chakras',
    description: 'Los chakras son vórtices donde fluye tu energía.',
    fullDescription:
      'Los chakras son vórtices energéticos donde fluye nuestra energía. Por diferentes situaciones pueden desarmonizarse o bloquearse, y eso nos trae problemas o hasta enfermedades.',
  },
  {
    id: 'constelaciones',
    title: 'Constelaciones Familiares',
    description: 'Poner un orden en el árbol genealógico y sanarlo.',
    fullDescription:
      'Constelar es poner un orden en el árbol genealógico y sanarlo.',
  },
  {
    id: 'limpiezas-ambientales',
    title: 'Limpiezas Ambientales',
    description: 'Para armonizar y limpiar tus espacios.',
    fullDescription:
      'Nuestros hogares, emprendimientos y autos necesitan armonizarse, limpiarse y sacar todo lo que no pertenece.',
  },
]

export default services
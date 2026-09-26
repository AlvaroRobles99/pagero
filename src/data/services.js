const services = [
  {
    id: 'tarot',
    icon: '\u{1F52E}',
    title: 'Lectura de Tarot',
    description: 'Interpretación profunda del tarot para guiarte en el amor, trabajo, y decisiones importantes.',
    fullDescription:
      'Cada lectura es un espacio sagrado donde conectamos con tu energía a través del tarot. Las cartas revelan los patrones, bloqueos y oportunidades que te rodean, ofreciéndote claridad y dirección en los momentos de incertidumbre.\n\n' +
      'Con más de 8 años de experiencia, utilizo el tarot como un puente entre tu conciencia y tu intuición. No se trata de predecir un futuro fijo, sino de empoderarte para tomar decisiones alineadas con tu verdadero ser.',
    includes: [
      'Interpretación de 10 cartas en tirada personalizada',
      'Enfoque en tu área de consulta (amor, trabajo, espiritualidad)',
      'Consejos prácticos y pequeños rituales sugeridos',
      'Grabación de la sesión (opcional)',
    ],
    duration: '45 minutos',
    price: '$500',
  },
  {
    id: 'limpieza',
    icon: '\u{1F33F}',
    title: 'Limpieza Energética',
    description: 'Armonización de tu campo energético para liberar bloqueos y renovar tu vitalidad.',
    fullDescription:
      'Con el paso del tiempo acumulamos energías que no nos pertenecen: tensiones del día a día, cargas emocionales de otros, o simplemente el desgaste natural de nuestro campo energético. La limpieza energética restaura el flujo natural de tu energía.\n\n' +
      'Trabajo con elementos naturales como el humo de palo santo, velas, cuencos y cristales para armonizar cada chakra y sellar tu campo energético. Es un proceso profundamente reparador que se siente como un suspiro profundo después de mucho tiempo conteniendo la respiración.',
    includes: [
      'Diagnóstico energético inicial',
      'Limpieza profunda de chakras con cuencos y cristales',
      'Sahumeo con palo santo o salvia',
      'Sellado y protección energética',
      'Recomendaciones para mantener tu energía limpia',
    ],
    duration: '60 minutos',
    price: '$700',
  },
  {
    id: 'combo',
    icon: '\u2728',
    title: 'Lectura + Limpieza',
    description: 'Combinación poderosa: lectura de tarot con limpieza energética profunda.',
    fullDescription:
      'Esta sesión integradora combina lo mejor de ambas prácticas para una transformación completa. Primero identificamos a través del tarot qué áreas de tu vida necesitan atención y dónde se encuentran los bloqueos energéticos.\n\n' +
      'Luego realizamos una limpieza energética enfocada precisamente en esos puntos detectados. Es la opción más completa porque no solo obtienes la guía del tarot, sino que además liberas la energía estancada para que esa guía pueda materializarse en tu vida.',
    includes: [
      'Tirada de tarot completa (12 cartas)',
      'Limpieza energética focalizada en bloqueos detectados',
      'Alineación y equilibrio de chakras',
      'Protección energética',
      'Grabación de la sesión (opcional)',
      'Guía de cuidados posteriores',
    ],
    duration: '90 minutos',
    price: '$1000',
  },
]

export default services

# Feature: Testimonios reales en el carrusel de Reseñas

## Objetivo
Reemplazar las tres reseñas de ejemplo por los doce testimonios reales que la clienta recibió por WhatsApp, agrandar la card del carrusel y agregar al pie de la sección un link a la historia destacada de Instagram con más testimonios.

## Por qué
La sección Reseñas mostraba texto inventado. La clienta entregó 13 capturas de conversaciones reales (una repite otra, quedan 12 testimonios únicos) y pidió publicarlas, con cards más grandes y una salida hacia el resto de su contenido.

## Alcance (autorizado)
- `src/data/reviews.ts` — los 12 testimonios + la constante del link a Instagram
- `src/components/Reviews/Reviews.tsx` — card más grande, contador en lugar de puntos, epígrafe y CTA
- `src/components/Reviews/Reviews.module.css` — estilos de todo lo anterior
- `src/tests/Reviews.test.tsx` — contrato nuevo
- `src/tests/App.test.tsx` — el título de la sección pasó de "Reseñas" a "Testimonios"
- `docs/project.md` — sección Reviews y descripción de `src/data/reviews.ts`
- `odd/tasks/testimonios-reales.md` — este documento

Fuera de alcance: `index.html`/JSON-LD, Contact, Hero, otros componentes, dependencias nuevas.

## Decisión de la user (elegida explícitamente)
**Edición mínima.** Se corrigen tipeos y puntuación, se sacan los "jajaja" repetidos y los emojis, se conserva el voseo y las palabras de cada persona, y cada testimonio se recorta a sus 2–3 líneas más fuertes. No se suavizan las expresiones fuertes.

## Decisiones de diseño tomadas por el orquestador (informadas a la user, sin objeción)
- **Sin nombres.** Las capturas no los tienen y no se inventa ninguno. Se quita el `author` de cada card. (El epígrafe "Testimonios reales recibidos por WhatsApp" se agregó y después se quitó por pedido de la user, junto con el cambio de título a "Testimonios" y las estrellas por un corazón.)
- **Contador en vez de puntos.** 12 dots no entran en mobile ni aportan; se reemplazan por `3 / 12`.
- **Card más grande.** Ancho de lectura ~620px, cuerpo 1.05rem (1.15rem desde 768px), más padding y `min-height` para que el carrusel no cambie de alto al pasar de un testimonio corto a uno largo.

## Datos (curados por el orquestador desde las capturas, edición mínima)

Orden definitivo = orden del array:

1. `autoestima` — "Te re mil agradezco por escucharme, por bancarme y por cambiarme tanto en pocos días. Hasta mi autoestima subió: me siento hermosa. Hace mucho no me sentía así."
2. `depresion` — "Yo no me olvido cómo me ayudaste. Después de vos todo empezó a mejorar y no volví a caer en depresión. Increíble cómo me liberé."
3. `antes-despues` — "Es un antes y un después recibir tus sesiones. Eternamente agradecido por la ayuda y por mostrarme el camino. Era por acá. Gracias por tanto."
4. `me-recebi` — "Me recibí. Mil gracias, Ro. Sé que vos ayudaste."
5. `techo-casa` — "Ese abre caminos siguió haciendo efecto: cuando te conté del crédito compré todos los materiales y después surgió un crédito a tasa baja y pude techar. Estoy realmente feliz."
6. `moto-trabajo` — "Estoy muy agradecida con tu abre caminos. Pudimos vender la moto que teníamos en venta hace meses y a él lo llamaron para una oferta laboral. Vamos avanzando."
7. `top-healer` — "Desde que me hiciste Top Healer 4 cambió por completo mi energía. Todos los días tengo trabajo. Me siento una persona nueva, más abierta y recibiendo cosas hermosas."
8. `sanar` — "Rocío sos la mejor. Me acuerdo que hace años me ayudaste a sanar y a partir de ahí cambiaron muchas cosas. Cuando esté un poquito mejor te voy a pedir otro abre caminos."
9. `hogar` — "Desde que nos limpiaste a todos cambió la energía del hogar. Estamos de buen humor, relajados, tranquilos y nos llevamos mejor. También mejoramos económicamente."
10. `proyectos` — "Gracias a vos, increíble cómo se me fueron dando todos los proyectos trabados."
11. `energias` — "Gracias por mandarme tus buenas energías. Los trabajos que hacés me alivian bastante."
12. `paz` — "Por suerte me siento mejor, más tranquila. Más allá del sueño, siento paz."

Link de más testimonios (historia destacada, entregado por la user, verbatim):
`https://www.instagram.com/stories/highlights/17984356390758039/`

## Checklist
- [x] T1 — `src/data/reviews.ts`: quitar `author` del interface y de los datos, cargar los 12 testimonios, exportar `TESTIMONIALS_HIGHLIGHT`
- [x] T2 — `src/tests/Reviews.test.tsx`: contrato nuevo (contador, ausencia de tabs, CTA con href/target/rel contra la constante) y observar RED
- [x] T3 — `Reviews.tsx`: título "Testimonios", card sin `author`, corazón debajo de la cita en lugar de las estrellas, contador `N / 12`, link al pie
- [x] T4 — `Reviews.module.css`: card más grande + `min-height`, estilos de contador, epígrafe y CTA
- [x] T5 — `docs/project.md`: sección Reviews y descripción de `src/data/reviews.ts`
- [x] T6 — `bun run typecheck` + `bun run test` + `bun run build` en verde

## Ruta
- T1–T5: **delegado** (un writer único) — trigger: 2+ archivos no triviales.
- T6: **delegado al mismo writer** (verificación en primer plano), con spot check del orquestador.

## Criterios de aceptación
- 12 testimonios visibles, en el orden de este documento, sin nombres inventados
- El carrusel no cambia de alto al pasar entre un texto corto y uno largo
- El contador refleja la posición real y el auto-avance sigue funcionando
- El link abre en pestaña nueva con `rel="noopener noreferrer"`
- Agregar o quitar un testimonio = editar solo `src/data/reviews.ts`
- Sin dependencias nuevas

## Verificación
- `bun run typecheck` → tres proyectos limpios
- `bun run test` → todas las suites en verde
- `bun run build` → build de producción emitido

## Progreso
- [x] Exploración (Reviews.tsx/css, reviews.ts, Reviews.test.tsx, social.ts, App.module.css, docs)
- [x] Decisión de edición con la user (edición mínima)
- [x] T1–T6

## Commit
`feat(reviews): publish the real testimonials with a larger card and an Instagram CTA`

Branch: `feat/testimonios-reales`. Contenido: los seis archivos del alcance.

Rollback: revertir el commit — no toca WhatsApp, JSON-LD ni otras secciones.

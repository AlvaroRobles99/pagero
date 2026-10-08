# Feature: Nueva sección de Servicios (7 servicios, sin precio)

## Objetivo
Reemplazar los 3 servicios actuales por los 7 servicios nuevos de Sanarse, sin precios, manteniendo tarjetas clickeables: la card muestra un resumen corto y el modal muestra el texto completo + CTA de WhatsApp. Los servicios deben ser fáciles de actualizar (todo en un único archivo de datos).

## Por qué
Los servicios reales de la marca cambiaron (Tarot Angelical, Registros Akáshicos, Limpiezas, Velomancia, Abre Caminos, Armonización de Chakras, Constelaciones Familiares) y ya no se publican precios.

## Alcance (autorizado)
- `src/data/services.js` — nuevo contenido y shape mínimo
- `src/components/Services/Services.jsx` + `Services.module.css` — quitar precio, adaptar bordes a 7 cards
- `src/components/ServiceModal/ServiceModal.jsx` + `ServiceModal.module.css` — quitar precio/includes/duración
- `src/tests/Services.test.jsx` — reflejar el nuevo contrato
- `docs/project.md` y `AGENTS.md` — actualizar la descripción de la sección

Fuera de alcance: About, Reviews, Contact, SEO/index.html, JSON-LD.

## Restricciones
- Textos de los servicios: los que entregó la user, verbatim (incluido el voseo).
- Título de card en caja normal (el emoji pasa a ser `icon`); si la user quiere MAYÚSCULAS es un cambio de una línea.
- Resumen de card ≤ ~120 caracteres, derivado del texto completo, en español neutro.
- Sin precio, sin `includes`, sin `duration` en datos ni en UI.
- `whatsappLink()` sigue siendo la única forma de armar el href.

## Checklist
- [x] T1 — Reescribir `src/data/services.js` con los 7 servicios (id, icon, title, description corta, fullDescription) y sin price/includes/duration
- [x] T2 — Services.jsx: quitar render de precio; Services.module.css: quitar `.price`, generalizar colores de borde a `nth-child(3n+…)`
- [x] T3 — ServiceModal.jsx: quitar includes/duración/precio (mantener texto completo + CTA WhatsApp); ServiceModal.module.css: quitar `.includes*`, `.duration`, `.price`, `.footer` si queda vacío
- [x] T4 — Actualizar `src/tests/Services.test.jsx` (7 títulos, sin precios)
- [x] T5 — Actualizar `docs/project.md` y `AGENTS.md` (AGENTS.md no tiene fila de `services.js`: sin cambios necesarios)
- [x] T6 — `bun run test` en verde

## Ruta de implementación
- T1–T6: **delegado** (writer único) — trigger: 2+ archivos no triviales

## Criterios de aceptación
- 7 tarjetas renderizadas con icono, título y resumen; ninguna muestra precio.
- Clic en tarjeta → modal con el texto completo del servicio + "Consultar vía WhatsApp".
- Agregar/quitarse un servicio = editar solo `src/data/services.js`.
- `bun run test` pasa.

## Verificación
- `bun run test` → `Test Files 10 passed (10)`, `Tests 77 passed (77)`
- `bun run build` → `✓ built in 942ms` (dist/assets/index-DqhDJL5J.js 205.53 kB)

## Progreso
- [x] Exploración (services.js, Services, ServiceModal, CSS, tests)
- [x] T1–T6

## Commit
`feat(services): replace services with 7 new offerings and drop prices`

Branch: `feat/nuevos-servicios`. Contenido: `src/data/services.js` (7 servicios, shape mínimo), Services + ServiceModal (JSX y CSS), `src/tests/Services.test.jsx`, `docs/project.md` y este documento.

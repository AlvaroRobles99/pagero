# Accesibilidad del modal + locale es_AR

## Objective

Corregir los dos hallazgos MAJOR de la auditoría del 2026-10-08:

1. El sitio declara `es_MX` como idioma (Open Graph y JSON-LD) cuando el negocio es argentino (`+54 297`, voseo).
2. El modal de servicio anuncia `aria-modal="true"` pero no atrapa el foco ni lo devuelve al cerrar, y no tiene test propio.

## Problem

- **Locale incorrecto:** `index.html:41` (`og:locale=es_MX`) y `index.html:144` (`inLanguage: es-MX`). Los previews de enlaces y el `WebSite` de schema.org declaran un locale equivocado para un negocio argentino. Peor: `src/tests/seo.test.jsx:82` y `:219` fijan el valor incorrecto, así que el bug está blindado por el test.
- **Modal inaccesible por teclado:** con Tab el foco escapa a la página de fondo pese a `aria-modal`. Al cerrar, el foco no vuelve a la card que abrió el modal. El componente más interactivo del sitio es el único sin suite propia.

## Why

Pedido del usuario: "arranca por los 2 major" — implementar las dos correcciones marcadas MAJOR en la auditoría completa del proyecto.

## Scope

### In scope

1. `og:locale` → `es_AR` y JSON-LD `inLanguage` → `es-AR` en `index.html`.
2. Actualizar las aserciones que fijan el locale en `src/tests/seo.test.jsx`.
3. Focus trap + restauración de foco en `src/components/ServiceModal/ServiceModal.jsx`.
4. Nueva suite `src/tests/ServiceModal.test.jsx`.
5. Actualizar la mención de locale en `docs/project.md`.

### Out of scope (no tocar en este cambio)

- Los demás hallazgos MINOR de la auditoría (Space en las cards de Servicios, `role="tab"` del carrusel, `prefers-reduced-motion` del auto-avance, tokens `#b02e4e`/`#a62f4c`, drift del README, registro de copy).
- Migrar el modal al elemento nativo `<dialog>`: refactor mayor, no pedido.
- Self-hosting de fuentes.

## Constraints

- **Idioma de artefactos:** código y comentarios en inglés (convención del código fuente); descripciones de test en español, siguiendo el estilo de `src/tests/Services.test.jsx` y `Reviews.test.jsx`; documentación en español como el resto de `odd/tasks/` y `docs/project.md`.
- Sin dependencias nuevas.
- Un solo writer (no hay delegación disponible en este runtime — ver Notas).
- Los tests existentes no deben romperse: `bun run test` debe quedar en verde al cierre.
- No modificar `src/data/contact.js` ni el formato del link de WhatsApp.

## Delivery forecast

- Líneas authored estimadas: ~120 (T1 ~10, T2 ~110).
- Muy por debajo del presupuesto de ~400 → estrategia `ask-on-risk` por defecto, sin encadenado de PRs.
- Un commit por tarea (work-unit commits) en la rama `fix/a11y-locale`.

## Tasks

### T1 — locale `es_AR` (MAJOR #1)

- [x] `src/tests/seo.test.jsx`: cambiar la expectativa de `og:locale` a `es_AR` y de `inLanguage` a `es-AR` (RED observable antes de tocar `index.html`).
- [x] `index.html:41`: `og:locale` → `es_AR`.
- [x] `index.html:144`: `inLanguage` → `es-AR`.
- [x] `docs/project.md`: actualizar `og:locale=es_MX` en la tabla de SEO.
- [x] **Verify:** `bunx vitest run src/tests/seo.test.jsx` en verde (RED previo: 2 fallos exactos, ambos de locale; GREEN: 35/35).

### T2 — focus trap + restauración de foco en el modal (MAJOR #2)

- [x] `src/tests/ServiceModal.test.jsx` (nueva): render/portal, cierre con Escape, cierre click en overlay, no cierra click adentro, `role=dialog` + `aria-modal`, trap Tab/Shift+Tab, restauración de foco al trigger, CTA con `whatsappLink` del título (RED observable antes de implementar).
- [x] `ServiceModal.jsx`: ref del modal, trap de Tab dentro de los focusables, captura del elemento previamente enfocado y restauración en el cleanup, handler estable.
- [x] **Verify:** `bunx vitest run src/tests/ServiceModal.test.jsx` (RED: 3 fallos exactos de foco; GREEN: 12/12) y luego la suite completa (11 archivos / 97 tests en verde).

## Evidence

- Rama: `fix/a11y-locale`.
- T1 — locale `es_AR`: `ab6fe74` `fix(seo): declare Argentine locale (es_AR) instead of es_MX`.
- T2 — foco del modal: `2ab51aa` `fix(a11y): trap focus inside the service modal and restore it on close`.
- Tests: T1 RED 2 fallos → GREEN 35/35 · T2 RED 3 fallos → GREEN 12/12 · suite completa 11 archivos / 97 tests en verde.
- No se tocaron los hallazgos MINOR (fuera de alcance).

## Notas

- La delegación a subagentes no está disponible en este runtime (`task` falla con `OpenCode's free tier can only be used from within OpenCode`), así que el trabajo se implementa inline con verificación por test. No cuenta como verificación independiente.
- El review nativo RDD no pudo correr sobre el proyecto completo (`lens_context_budget_exceeded`); queda pendiente por slices.

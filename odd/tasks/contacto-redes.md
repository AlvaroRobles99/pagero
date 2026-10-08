# Feature: Redes sociales en la sección Contacto

## Objetivo
Agregar al final de la sección Contacto un bloque "Ver mi contenido" con tres botones circulares (Instagram, Facebook, TikTok) que abran los perfiles de la marca en pestaña nueva.

## Por qué
La marca quiere canalizar visitas hacia sus redes; hoy la sección Contacto solo tiene el CTA de WhatsApp.

## Alcance (autorizado)
- `src/data/social.js` — nuevo: links como única fuente de verdad (patrón de `contact.js`)
- `src/components/Contact/Contact.jsx` + `Contact.module.css` — bloque social
- `src/tests/Contact.test.jsx` — tests del bloque
- `docs/project.md` — bullet del componente Contact
- `odd/tasks/contacto-redes.md` — este documento

Fuera de alcance: Footer, Hero, index.html/JSON-LD (no se agregan `sameAs` sin pedido explícito).

## Datos (entregados por la user, verbatim)
- Instagram → https://www.instagram.com/sanarse_22
- Facebook → https://www.facebook.com/rocio.durazno
- TikTok → https://www.tiktok.com/@rocioduraznooloc

## Decisión de diseño (elegida por la user)
Círculos con ícono: 3 botones circulares con borde dorado, ícono SVG inline (sin librería de íconos), hover teñido con el color de la red. No le compite al botón de WhatsApp.

## Checklist
- [x] T1 — `src/data/social.js` con `SOCIAL_LINKS` (id, name, url)
- [x] T2 — Contact.jsx: bloque centrado al final (regla dorada + "Ver mi contenido" + fila de 3 links) con SVG inline, `aria-label`, `target="_blank"` y `rel="noopener noreferrer"`
- [x] T3 — Contact.module.css: círculos 52px, borde dorado, ícono 22px, hover, `:focus-visible`
- [x] T4 — `src/tests/Contact.test.jsx`: texto, 3 hrefs exactos, target/rel, aria-labels
- [x] T5 — `docs/project.md`: documentar el bloque social en Contact
- [x] T6 — `bun run test` + `bun run build` en verde

## Ruta
- T1–T5: **delegado** (writer único) — trigger: 2+ archivos no triviales

## Criterios de aceptación
- 3 links clickeables que abren en pestaña nueva con los URLs exactos
- Agregar/quitar una red = editar solo `src/data/social.js`
- Acento visual mínimo: no roba protagonismo al CTA de WhatsApp
- Sin dependencias nuevas

## Verificación
- `bun run test` → 10 archivos, 84 tests, todos en verde (7 nuevos para el bloque social)
- `bun run build` → `✓ built in 1.15s`, `dist/assets/index-sgcKUpNe.css` y `index-DcpWx8Si.js` emitidos sin errores
- Runtime harness: N/A — la sección es estática y sin datos en tiempo de ejecución; el build de producción cubre el boundary

## Progreso
- [x] Exploración (Contact.jsx/css, App.module.css, package.json sin librería de íconos)
- [x] Decisión de estilo con la user (círculos con ícono)
- [x] T1–T5
- [x] T6 (verificación en verde)

## Commit
`feat(contact): add social profile links with circular icons`

Branch: `feat/contacto-redes`. Contenido: `src/data/social.js` (SOCIAL_LINKS con URLs e íconos Simple Icons verbatim), `Contact.jsx` + `Contact.module.css` (bloque "Ver mi contenido"), `src/tests/Contact.test.jsx`, `docs/project.md` y este documento.

Rollback: eliminar `src/data/social.js` y revertir los otros cinco archivos — no toca CTA de WhatsApp, Footer ni index.html.

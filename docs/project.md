# Sanarse — Documentación del proyecto

## ¿Qué es?

Sanarse es la marca de terapias holísticas de **Rocío Durazno** (tarot, limpiezas energéticas, acompañamiento espiritual). Esta SPA funciona como su sitio web profesional: presenta sus servicios, muestra reseñas de clientas, y canaliza contactos a través de WhatsApp.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Estilos | CSS Modules |
| Tipografía | Cormorant Garamond (display) + Figtree (body) — Google Fonts |
| Tests | Vitest + React Testing Library + jsdom |
| Runtime | Bun 1.3 |

## Estructura del proyecto

```
pageRo/
├── docs/
│   └── project.md              ← Esta documentación
├── public/
│   ├── images/
│   │   ├── banner.svg          ← Hero background (paisaje espiritual con montañas, mar, loto)
│   │   ├── logo.png            ← Marca de la marca (Hero + logo JSON-LD)
│   │   └── og-image.png        ← Imagen de compartir 1200×630 (generada, no editar a mano)
│   ├── favicon.ico             ← Favicon de pestaña (formato ICO, sizes any)
│   ├── favicon-16x16.png       ← Favicon de pestaña 16×16 (estático, no generado)
│   ├── favicon-32x32.png       ← Favicon de pestaña 32×32 (estático, no generado)
│   ├── android-chrome-192x192.png ← Ícono Android 192×192 (vía site.webmanifest)
│   ├── android-chrome-512x512.png ← Ícono Android 512×512 (vía site.webmanifest)
│   ├── apple-touch-icon.png    ← Icono 180×180 para iOS (iOS no acepta SVG aquí)
│   └── site.webmanifest        ← Manifest PWA: marca, colores #1f0f14, íconos android
├── scripts/
│   ├── generate-og.mjs         ← Genera la imagen OG (SVG en memoria → PNG con resvg)
│   └── fonts/                  ← TTFs de marca, usados solo por el generador OG
├── src/
│   ├── main.jsx                ← Entry point de React
│   ├── App.jsx                 ← Layout principal: landmark `<main>` con todas las secciones + divisores Lotus, entre el header (Hero) y el footer
│   ├── App.module.css          ← Estilos de layout compartidos (.section, .container, h2)
│   ├── index.css               ← CSS reset + variables globales (colores, fuentes, prefers-reduced-motion)
│   ├── shared.module.css       ← .btnPrimary (botón reutilizable)
│   ├── data/
│   │   ├── services.ts          ← Array de servicios (id, title, description, fullDescription)
│   │   ├── reviews.ts           ← Array de reseñas (id, text, author)
│   │   ├── contact.ts           ← Constantes del número de WhatsApp + helper `whatsappLink()`
│   │   └── social.ts            ← Array `SOCIAL_LINKS` (id, name, url, icon) de las tres redes
│   ├── components/
│   │   ├── Hero/                ← Header full-viewport con banner SVG + CTA
│   │   ├── About/               ← Sección "Sobre mí" con texto de presentación
│   │   ├── Lotus/               ← SVG decorativo de loto con rotación animada
│   │   ├── Services/            ← Grid de 7 cards clickeables con stagger reveal + apertura de modal
│   │   ├── ServiceModal/        ← Modal a pantalla completa con detalle del servicio y CTA WhatsApp
│   │   ├── Reviews/             ← Grid de reseñas con estrellas y reveal animation
│   │   ├── Contact/             ← Sección con botón de WhatsApp
│   │   └── Footer/              ← Footer con copyright y año dinámico
│   └── tests/
│       ├── setup.js             ← Setup global (@testing-library/jest-dom + mock IntersectionObserver)
│       ├── seo.test.jsx         ← Contrato de meta de index.html (lee el archivo del disco)
│       ├── App.test.jsx
│       ├── Hero.test.jsx
│       ├── About.test.jsx
│       ├── Services.test.jsx
│       ├── Reviews.test.jsx
│       ├── Contact.test.jsx
│       ├── Footer.test.jsx
│       ├── Lotus.test.jsx
│       └── whatsapp.test.jsx    ← Guard del formato del link de WhatsApp
├── .github/
│   └── workflows/
│       ├── ci.yml               ← GitHub Actions: tests y build en cada PR
│       └── release-please.yml   ← GitHub Actions: PR de release + release notes
├── .opencode/
│   ├── commands/
│   │   ├── dev.md               ← @dev: inicia servidor de desarrollo
│   │   ├── build.md             ← @build: compila para producción
│   │   └── testRo.md            ← @testRo: ejecuta tests
│   └── skills/
│       └── frontend-design/     ← Skill de diseño visual
├── tsconfig.json                ← Proyecto TS de la app (navegador, `src/`, sin tests por ahora)
├── tsconfig.node.json           ← Proyecto TS del tooling (`scripts/` + configs de Vite, Bun/Node)
├── opencode.json                ← Config de opencode (MCP Context7 + instrucciones)
├── AGENTS.md                    ← Instrucciones para agentes de opencode
├── release-please-config.json   ← Config de release-please (changelog + versión)
├── .release-please-manifest.json ← Versión publicada; la mantiene release-please
├── vitest.config.js             ← Config de Vitest
└── package.json
```

## Sistema de diseño

### Variables CSS

Definidas en `src/index.css` y usadas en todos los módulos CSS via `var(--nombre)`.

| Variable | Valor | Uso |
|---|---|---|
| `--color-deep` | `#1f0f14` | Footer, overlays |
| `--color-primary` | `#c73a5a` | Títulos h2, botones, acentos |
| `--color-light` | `#fef0f5` | Fondos alternados (About, Reviews) |
| `--color-accent` | `#c99a4a` | Tagline, líneas y bordes decorativos |
| `--color-accent-deep` | `#8f661d` | Acento como texto sobre fondos claros (eyebrow de About, estrellas de reseñas) |
| `--color-text` | `#3a1f28` | Texto sobre fondos claros |
| `--color-warm-white` | `#fffafc` | Fondo principal (Services, Contact) |
| `--font-display` | `'Cormorant Garamond', Georgia, serif` | Títulos, hero, tagline |
| `--font-body` | `'Figtree', 'Segoe UI', Tahoma, sans-serif` | Texto general, botones |

### Tipografía

| Rol | Fuente | Pesos usados |
|---|---|---|
| Display | Cormorant Garamond | 400, 500, 600, 700 (regular + itálica) |
| Body | Figtree | 300, 400, 500, 600 |

Cargadas desde Google Fonts en `index.html` con preconnect.

## Componentes

### Hero
- Header full viewport con `banner.svg` de fondo
- Overlay con `radial-gradient` spotlight (centro más claro, bordes oscuros)
- Logo de marca (`images/logo.png`) sobre el título, como imagen decorativa (`alt=""`) con `drop-shadow`
- Título, subtítulo, tagline, botón CTA
- Animación `fadeInUp` en el contenido al cargar

### About
- Sección con fondo `--color-light`
- Loto decorativo arriba del título
- Loto semi-transparente como marca de agua de fondo (vía `::before` con SVG inline y radial-gradient)
- Presentación, herramientas de trabajo (Tarot Terapéutico, Limpieza Energética, Escucha sin Juicio), qué se busca en el proceso, cita inspiradora y CTA con WhatsApp

### Lotus
- SVG de loto estilizado (6 pétalos + centro)
- Props: `size` (default 48), `className`
- Animación `spin` continua (20s, linear)
- `aria-hidden="true"` (decorativo)

### Services
- Datos importados desde `src/data/services.ts` (id, título, resumen corto para la card, texto completo para el modal) — sin precios, sin `includes`, sin duración, sin íconos
- 7 cards clickeables (`role="button"`, `tabIndex={0}`, `onClick`, `onKeyDown Enter`)
- Borde izquierdo decorativo por card en ciclo de 3: gold (`3n+1`), rose (`3n+2`), gold→rose gradiente (`3n+3`)
- Texto "Ver cómo es →" al pie de cada card, visible en hover desktop
- Al hacer clic abre `ServiceModal` con el texto completo del servicio
- Animación stagger via `IntersectionObserver` (delay `index × 120ms`)

### ServiceModal
- Portal a `document.body` para superponerse a toda la página
- Overlay oscuro con `backdrop-filter: blur` + animación `fadeIn`
- Modal centrado con animación `scaleIn` (cubic-bezier spring)
- Cierre con ✕, Escape, o click fuera del modal
- Muestra: título (display font), párrafos de `fullDescription` (separados por línea en blanco) y CTA "Consultar por WhatsApp" (el href lo arma `whatsappLink()` con el título del servicio como mensaje)
- `prefers-reduced-motion` respetado

### Reviews
- Datos importados desde `src/data/reviews.ts` (id, text, author)
- **Las tres reseñas actuales son de ejemplo.** Para poner las reales alcanza con editar `src/data/reviews.ts`: cada objeto lleva `text` (la cita) y `author` (el nombre que aparece después del guion), y el `id` solo tiene que ser único. El carrusel y los puntos se ajustan solos al número de reseñas, y `Reviews.test.jsx` lee del mismo archivo, así que no hay que tocar ningún test.
- Carrusel horizontal que muestra una reseña a la vez
- Navegación con flechas ◀ ▶ y dots inferiores
- Auto-avance cada 6s, pausa en hover/focus
- Track con `transform: translateX` animado (cubic-bezier 0.4, 0, 0.2, 1)
- `aria-roledescription="carousel"`, `aria-hidden` en slides no visibles, `role="tab"` en dots
- `prefers-reduced-motion` respetado
- Flechas ocultas en mobile (≤600px)

### Contact
- Sección con fondo `--color-warm-white`
- Loto semi-transparente como marca de agua de fondo (vía `::before`)
- Texto de invitación cálido + botón WhatsApp que abre `wa.me` vía `whatsappLink()`
- Bloque "Ver mi contenido" al final, debajo del CTA: regla dorada + 3 botones circulares (52px, borde dorado) con ícono SVG inline que abren Instagram, Facebook y TikTok en pestaña nueva — los links viven en `src/data/social.ts` (única fuente de verdad)

### Footer
- Copyright dinámico con `new Date().getFullYear()`
- Fondo `--color-deep`

## SEO + Social

Toda la metadata vive en `index.html`. React nunca la toca, y por eso el contrato se verifica leyendo el archivo del disco en lugar de renderizar un componente.

### Qué declara hoy

| Grupo | Etiquetas |
|---|---|
| Canonical | `link[rel=canonical]` con `href="/"` |
| Documento | `lang="es"`, `robots` (`index, follow`), `theme-color` (`#1f0f14`) |
| Open Graph | `og:type=website`, `og:locale=es_AR`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt` |
| Twitter | `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt` |
| Iconos | `link[rel=icon]` ICO (`sizes="any"`) + PNG 16×16 y 32×32, `link[rel=apple-touch-icon]` (PNG 180×180) y `link[rel=manifest]` → `site.webmanifest` |
| Datos estructurados | JSON-LD `@graph` con `Organization` (con `sameAs` → Instagram), `LocalBusiness`, `Person` (Rocío Durazno, con `telephone` y `sameAs` → Facebook y TikTok) y `WebSite` (`inLanguage=es-AR`) |

Los textos de `og:*` y del JSON-LD están en español, igual que el resto del contenido del sitio. Las URLs de los nodos son referencias relativas (`/#organization`), y el `@context` es el IRI que exige schema.org.

### Imagen para compartir

`public/images/og-image.png` es un PNG real de 1200×630. SVG no sirve como `og:image`: WhatsApp y Facebook no lo renderizan.

```bash
bun run generate:og
```

El script arma el SVG en memoria (degradado de marca `#1f0f14` → `#c73a5a`, wordmark en Cormorant Garamond, subtítulo "Tarot · Limpiezas · Acompañamiento espiritual" en Figtree, marca de loto en dorado) y lo rasteriza con `@resvg/resvg-js` usando las fuentes de `scripts/fonts/` y `loadSystemFonts: false`, de modo que la salida es idéntica en cualquier máquina. El resultado es determinista: correrlo dos veces produce el mismo archivo byte a byte.

El PNG está versionado y `@resvg/resvg-js` es una devDependency, así que producción nunca necesita la herramienta.

> El diseño se edita en `scripts/generate-og.mjs`, nunca en el PNG.

### Paso de deploy: URLs absolutas

Las URLs son relativas a propósito, porque el dominio todavía no está definido. Los previews ya funcionan con rutas relativas; volverlas absolutas solo hace falta para que la tarjeta se resuelva igual desde fuera del sitio. Cuando exista el dominio, hay que reemplazar el origen en exactamente cuatro lugares, todos señalados con un comentario en `index.html`:

1. `link[rel=canonical]` → `href`
2. `meta[property="og:url"]` → `content`
3. `meta[property="og:image"]` → `content`
4. `meta[name="twitter:image"]` → `content`

## Tests

### Ejecutar
```bash
bun run test        # Una vez
bun run test:watch  # Modo watch
```

### Agregar un test nuevo
1. Crear `src/tests/MiComponente.test.jsx`
2. Usar `render`, `screen`, `describe`, `it`, `expect` (globales de Vitest + testing-library)
3. Si el componente usa `IntersectionObserver`, ya está mockeado en `setup.js`
4. Vitest escanea `src/tests/**/*.test.jsx` automáticamente

### Test de metadata
`src/tests/seo.test.jsx` no renderiza nada: lee `index.html` con `node:fs`, lo parsea con `DOMParser` y verifica el contrato de la sección "SEO + Social". Si se borra o cambia una etiqueta, la suite falla. Resuelve la raíz del proyecto con `process.cwd()`, que Vitest configura como cwd.

### Mock disponible
```js
// src/tests/setup.js — mock global
class MockIntersectionObserver { observe() {} unobserve() {} disconnect() {} }
window.IntersectionObserver = MockIntersectionObserver
```

## TypeScript

La migración es incremental. `allowJs` sigue activo y `checkJs` está en `false`, así que los `.jsx`
que todavía no se migraron se resuelven pero no se chequean. Los `.ts` sí se verifican siempre.

| Archivo | Alcance |
|---|---|
| `tsconfig.json` | App: `src/` (excluye `src/tests` por ahora), `lib` con DOM y `types: ["vite/client"]` |
| `tsconfig.node.json` | Tooling: `scripts/`, `vite.config.js` y `vitest.config.js`, `types: ["bun"]`, sin DOM |

```bash
bun run typecheck   # los dos proyectos, vía `bun check`
```

`bun check` es el checker nativo de Bun (TypeScript 7): reporta los mismos errores que `tsc` y usa
todos los núcleos. `typescript` vive en `devDependencies` porque es una herramienta de desarrollo de
la app, no una dependencia que se publique.

Ojo con leer el resultado: con `checkJs` apagado, el proyecto de tooling incluye sus tres `.js` pero
no los chequea, así que hoy el gate real son los cuatro `.ts` de `src/data/` y los nueve `.tsx` de
`src/`: 13 de los 14 archivos del proyecto.

La primera capa migrada fue `src/data/`: exporta las interfaces `Service`, `Review` y `SocialLink`,
y `whatsappLink(message?: string): string`. Después se sumaron todos los componentes. Los que tienen
estado llevan lo suyo: `ServiceCardProps` y `ServiceModalProps`, `RefObject<HTMLDivElement | null>`
en `useOnScreen`, y en el focus trap del modal conviven los dos tipos de evento —
`KeyboardEvent` del DOM para el listener de `window`, `MouseEvent` de React para el `onClick` del
JSX. Confundirlos compila mal: son tipos distintos con el mismo nombre.

`src/main.jsx` es el único archivo de la app que sigue en `.jsx`; cuando se migre, `allowJs` se apaga
para el proyecto de la app. Los tests quedan fuera hasta que se migren, para no arrastrar
`@types/node` y `vitest/globals` a código que corre en el navegador.

> `allowJs` + `checkJs: false` es un estado de transición, no el destino: cuando todos los `.jsx`
> sean `.tsx`, se apaga `allowJs` y el gate cubre el repo completo.

Hoy `bun run typecheck` es manual: el CI todavía corre solo test y build, así que falta sumarlo como
paso requerido. Sin ese paso, los tipos se degradan sin que nadie se entere.

## CI

`.github/workflows/ci.yml` corre en GitHub Actions con Bun `1.4.4` (la misma versión que usa el proyecto) y Node 24, e instala con `--frozen-lockfile` para que el lockfile sea la única fuente de dependencias. Bun instala las dependencias; Node ejecuta Vite y Vitest.

| Se ejecuta | Cuándo |
|---|---|
| `pull_request` | En cada PR abierto, actualizado o reabierto |
| `push` a `main` | Después de cada merge |
| `workflow_dispatch` | Manual desde la pestaña Actions |

Pasos del job `Verify`: **test → build**. Si cualquiera falla, el check queda en rojo.

No hay paso de lint porque el proyecto todavía no tiene linter configurado. Si se agrega uno, se suma un paso más antes de los tests.

### Protección de `main`

La rama `main` está protegida con `Verify` como *required status check*. La regla se aplica también a administradores, así que un check en rojo o ausente bloquea el merge. Tampoco se puede pushear directo un commit nuevo: GitHub lo rechaza porque ese commit no pasó por CI. En la práctica, todo cambio entra por PR.

| Ajuste | Estado |
|---|---|
| Required status check | `Verify` (GitHub Actions) |
| Aplica a administradores | Sí |
| Force pushes | Bloqueados |
| Borrado de la rama | Bloqueado |
| Require branches to be up to date | No |
| Require a pull request before merging | No |

Para editar la regla: **Settings → Branches → `main`**.

## Releases

`.github/workflows/release-please.yml` usa `googleapis/release-please-action@v5.0.0` para generar las release notes a partir de los commits convencionales.

1. Un `push` a `main` (o una ejecución manual) analiza los commits desde la última release.
2. Si hay cambios visibles (`feat`, `fix`, `perf`, `revert`), abre o actualiza un PR de release con el `CHANGELOG.md` y el bump de versión en `package.json`.
3. Al mergear ese PR, crea el tag `vX.Y.Z` y publica el GitHub Release con las notas.

| Archivo | Rol |
|---|---|
| `release-please-config.json` | Release type `node`, tags `vX.Y.Z` sin prefijo de componente, y `bootstrap-sha` |
| `.release-please-manifest.json` | Última versión conocida. Empieza en `0.0.0` y lo actualiza release-please |

Reglas de versión: `fix:` → patch, `feat:` → minor, `!` o `BREAKING CHANGE` → major (minor mientras la versión sea `0.x`). `chore:`, `ci:`, `docs:` y `test:` no generan release.

`bootstrap-sha` limita la primera release a los commits posteriores a ese SHA, para no volcar toda la historia del repo en el primer changelog. Si quieres que la primera release incluya todo el historial, borra esa clave.

### Token y CI del PR de release

Con el `GITHUB_TOKEN` por defecto el PR de release se crea igual, pero GitHub **no dispara workflows** para eventos generados por ese token. Consecuencia: el PR de release no corre `Verify`. Como `Verify` es required status check y la regla aplica a administradores, el PR queda bloqueado.

Para evitarlo, crea un fine-grained PAT con acceso al repo y permisos `Contents: Read and write`, `Pull requests: Read and write` e `Issues: Read and write`, y guárdalo como secreto `RELEASE_PLEASE_TOKEN`. El workflow lo usa automáticamente si existe y cae a `github.token` si no. Los PAT caducan: si expira, el workflow vuelve a crear PRs sin disparar CI y esos PRs quedan bloqueados por la protección de `main`.

También hay que habilitar **Settings → Actions → General → Allow GitHub Actions to create and approve pull requests** para que el PR se pueda abrir.

> release-please no toca `bun.lock`: la versión de la app no vive en el lockfile, así que `bun install --frozen-lockfile` sigue funcionando en el PR de release.

## Comandos opencode

| Comando | Descripción |
|---|---|
| `@dev` | Inicia servidor de desarrollo Vite |
| `@build` | Compila para producción |
| `@testRo` | Ejecuta `bun run test` |
| `bun run generate:og` | Regenera `public/images/og-image.png` desde `scripts/generate-og.mjs` |

## Número de WhatsApp

`src/data/contact.ts` es la **única fuente de verdad**. `Hero.jsx`, `Contact.jsx` y `ServiceModal.jsx` arman su href con `whatsappLink()`; el número no se hardcodea en ningún otro lado.

El mismo número tiene tres representaciones correctas, y confundirlas rompe el CTA:

| Destino | Forma | Por qué |
|---|---|---|
| href de `wa.me` | `542974216017` | Solo dígitos. Un `+`, un espacio o un guion matan el link. |
| Texto visible en la UI | `+54 297 421 6017` | Legible para una persona. |
| `telephone` del JSON-LD | `+54 297 421 6017` | schema.org quiere la forma internacional con `+`. |

`whatsappLink(message)` devuelve `https://wa.me/<número>` o, si se le pasa un mensaje, `https://wa.me/<número>?text=<codificado>`. Cuando no hay mensaje, omite el `?text=` por completo: un `?text=` vacío abre el chat con un compositor en blanco que la clienta tiene que borrar a mano.

`src/tests/whatsapp.test.jsx` bloquea ese formato, así que una edición mal hecha falla ruidosamente. `Hero.test.jsx` y `Contact.test.jsx` assertan contra la constante, nunca contra dígitos literales.

> **Confirmado en un teléfono real:** el link abre el chat en el número correcto con la forma sin `9` (`542974216017`). Los móviles argentinos se escriben `+54 9 297 421 6017`, pero la convención de `wa.me` **omite** el `9`, que es lo que hace la constante. Si algún día falla, el ajuste es de un carácter en `src/data/contact.ts`.

## Known gaps

- Ciudad o zona de servicio → `address`, `geo` y `areaServed` en el JSON-LD.
- Dominio de deploy → volver absolutas `canonical`, `og:url` y `og:image` (ver "Paso de deploy").

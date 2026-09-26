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
│   │   └── og-image.png        ← Imagen de compartir 1200×630 (generada, no editar a mano)
│   ├── favicon.svg             ← Marca de loto para el favicon
│   └── apple-touch-icon.png    ← Icono 180×180 para iOS (generado desde favicon.svg)
├── scripts/
│   ├── generate-og.mjs         ← Genera la imagen OG (SVG en memoria → PNG con resvg)
│   └── fonts/                  ← TTFs de marca, usados solo por el generador OG
├── src/
│   ├── main.jsx                ← Entry point de React
│   ├── App.jsx                 ← Layout principal (renderiza todas las secciones + divisores Lotus)
│   ├── App.module.css          ← Estilos de layout compartidos (.section, .container, h2)
│   ├── index.css               ← CSS reset + variables globales (colores, fuentes, prefers-reduced-motion)
│   ├── shared.module.css       ← .btnWhatsapp (botón reutilizable)
│   ├── data/
│   │   ├── services.js          ← Array de servicios con datos extendidos (id, fullDescription, includes, duration)
│   │   └── reviews.js           ← Array de reseñas (id, text, author)
│   ├── components/
│   │   ├── Hero/                ← Header full-viewport con banner SVG + CTA
│   │   ├── About/               ← Sección "Sobre mí" con texto de presentación
│   │   ├── Lotus/               ← SVG decorativo de loto con rotación animada
│   │   ├── Services/            ← Grid de 3 cards clickeables con stagger reveal + apertura de modal
│   │   ├── ServiceModal/        ← Modal a pantalla completa con detalle del servicio, includes, duración, CTA WhatsApp
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
│       └── Lotus.test.jsx
├── .opencode/
│   ├── commands/
│   │   ├── dev.md               ← @dev: inicia servidor de desarrollo
│   │   ├── build.md             ← @build: compila para producción
│   │   └── testRo.md            ← @testRo: ejecuta tests
│   └── skills/
│       └── frontend-design/     ← Skill de diseño visual
├── opencode.json                ← Config de opencode (MCP Context7 + instrucciones)
├── AGENTS.md                    ← Instrucciones para agentes de opencode
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
| `--color-accent` | `#c99a4a` | Tagline, estrellas, línea bajo h2 |
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
- Título, subtítulo, tagline, botón CTA
- Animación `fadeInUp` en el contenido al cargar

### About
- Sección con fondo `--color-light`
- Loto decorativo arriba del título
- Loto semi-transparente como marca de agua de fondo (vía `::before` con SVG inline y radial-gradient)
- Párrafo de presentación personal

### Lotus
- SVG de loto estilizado (6 pétalos + centro)
- Props: `size` (default 48), `className`
- Animación `spin` continua (20s, linear)
- `aria-hidden="true"` (decorativo)

### Services
- Datos importados desde `src/data/services.js` (icono, título, descripción corta, descripción completa, includes, duración, precio)
- Cada card es clickeable (`role="button"`, `tabIndex={0}`, `onClick`, `onKeyDown Enter`)
- Borde izquierdo decorativo por card: gold (Tarot), rose (Limpieza), gold→rose gradiente (Combo)
- Texto "Conoce más →" al pie de cada card, visible en hover desktop
- Al hacer clic abre `ServiceModal` con información detallada
- Animación stagger via `IntersectionObserver` (delay 0, 120, 240ms)

### ServiceModal
- Portal a `document.body` para superponerse a toda la página
- Overlay oscuro con `backdrop-filter: blur` + animación `fadeIn`
- Modal centrado con animación `scaleIn` (cubic-bezier spring)
- Cierre con ✕, Escape, o click fuera del modal
- Muestra: icono grande, título (display font), descripción completa, lista "Qué incluye", duración, precio, CTA "Consultar vía WhatsApp"
- Lotus decorativo entre descripción y lista de includes
- `prefers-reduced-motion` respetado

### Reviews
- Datos importados desde `src/data/reviews.js` (id, text, author)
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
- Texto de invitación cálido + botón WhatsApp con ícono 📱 que abre `wa.me`

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
| Open Graph | `og:type=website`, `og:locale=es_MX`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt` |
| Twitter | `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt` |
| Iconos | `link[rel=icon]` (SVG) y `link[rel=apple-touch-icon]` (PNG 180×180) |
| Datos estructurados | JSON-LD `@graph` con `Organization`, `LocalBusiness`, `Person` (Rocío Durazno) y `WebSite` |

Los textos de `og:*` y del JSON-LD están en español, igual que el resto del contenido del sitio. Las URLs de los nodos son referencias relativas (`/#organization`), y el `@context` es el IRI que exige schema.org.

### Imagen para compartir

`public/images/og-image.png` es un PNG real de 1200×630. SVG no sirve como `og:image`: WhatsApp y Facebook no lo renderizan.

```bash
bun run generate:og
```

El script arma el SVG en memoria (degradado de marca `#1f0f14` → `#c73a5a`, wordmark en Cormorant Garamond, subtítulo "Lectura de Tarot · Limpieza Energética" en Figtree, marca de loto en dorado) y lo rasteriza con `@resvg/resvg-js` usando las fuentes de `scripts/fonts/` y `loadSystemFonts: false`, de modo que la salida es idéntica en cualquier máquina. El resultado es determinista: correrlo dos veces produce el mismo archivo byte a byte.

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

## Comandos opencode

| Comando | Descripción |
|---|---|
| `@dev` | Inicia servidor de desarrollo Vite |
| `@build` | Compila para producción |
| `@testRo` | Ejecuta `bun run test` |
| `bun run generate:og` | Regenera `public/images/og-image.png` desde `scripts/generate-og.mjs` |

## Placeholders

| Dónde | Qué actualizar | Antes de publicar |
|---|---|---|
| `Hero.jsx:13`, `Contact.jsx:12`, `ServiceModal.jsx:79` | Número WhatsApp | `521234567890` → número real |
| `Hero.test.jsx:24`, `Contact.test.jsx:19` | El mismo número, en las aserciones de los tests | `521234567890` → número real |

## Known gaps

- Número real de WhatsApp → reemplazar `521234567890` en los cinco lugares de la tabla anterior.
- Ciudad o zona de servicio → `address`, `geo` y `areaServed` en el JSON-LD.
- Moneda de los precios (`$500`, `$700`, `$1000`) → `offers.priceCurrency`.
- Dominio de deploy → volver absolutas `canonical`, `og:url` y `og:image` (ver "Paso de deploy").
- **Falta el visto bueno visual de `og-image.png`.** La validación automática comprueba que el PNG es válido, que mide 1200×630 y que usa las fuentes de marca, pero no puede juzgar el diseño. Hay que revisarlo a ojo.

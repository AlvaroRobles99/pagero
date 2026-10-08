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
│   │   ├── logo.png            ← Marca de la marca; fuente de todos los favicons
│   │   └── og-image.png        ← Imagen de compartir 1200×630 (generada, no editar a mano)
│   ├── favicon-32x32.png       ← Favicon de pestaña 32×32 (generado desde logo.png)
│   ├── favicon-192x192.png     ← Ícono 192×192 (generado desde logo.png)
│   ├── favicon-512x512.png     ← Ícono 512×512 (generado desde logo.png)
│   └── apple-touch-icon.png    ← Icono 180×180 para iOS (generado desde logo.png)
├── scripts/
│   ├── generate-og.mjs         ← Genera la imagen OG (SVG en memoria → PNG con resvg)
│   ├── generate-favicon.mjs    ← Genera los favicons + apple-touch-icon desde logo.png (resvg)
│   └── fonts/                  ← TTFs de marca, usados solo por el generador OG
├── src/
│   ├── main.jsx                ← Entry point de React
│   ├── App.jsx                 ← Layout principal (renderiza todas las secciones + divisores Lotus)
│   ├── App.module.css          ← Estilos de layout compartidos (.section, .container, h2)
│   ├── index.css               ← CSS reset + variables globales (colores, fuentes, prefers-reduced-motion)
│   ├── shared.module.css       ← .btnWhatsapp (botón reutilizable)
│   ├── data/
│   │   ├── services.js          ← Array de servicios (id, icon, title, description, fullDescription)
│   │   ├── reviews.js           ← Array de reseñas (id, text, author)
│   │   └── contact.js           ← Constantes del número de WhatsApp + helper `whatsappLink()`
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
- Logo de marca (`images/logo.png`) sobre el título, como imagen decorativa (`alt=""`) con `drop-shadow`
- Título, subtítulo, tagline, botón CTA
- Animación `fadeInUp` en el contenido al cargar

### About
- Sección con fondo `--color-light`
- Loto decorativo arriba del título
- Loto semi-transparente como marca de agua de fondo (vía `::before` con SVG inline y radial-gradient)
- Bienvenida, pilares de sanación (Tarot Terapéutico, Limpieza Energética, Escucha sin Juicio), modelo de trabajo en bienestar, cita inspiradora y CTA con WhatsApp

### Lotus
- SVG de loto estilizado (6 pétalos + centro)
- Props: `size` (default 48), `className`
- Animación `spin` continua (20s, linear)
- `aria-hidden="true"` (decorativo)

### Services
- Datos importados desde `src/data/services.js` (id, icono emoji, título, resumen corto para la card, texto completo para el modal) — sin precios, sin `includes`, sin duración
- 7 cards clickeables (`role="button"`, `tabIndex={0}`, `onClick`, `onKeyDown Enter`)
- Borde izquierdo decorativo por card en ciclo de 3: gold (`3n+1`), rose (`3n+2`), gold→rose gradiente (`3n+3`)
- Texto "Conoce más →" al pie de cada card, visible en hover desktop
- Al hacer clic abre `ServiceModal` con el texto completo del servicio
- Animación stagger via `IntersectionObserver` (delay `index × 120ms`)

### ServiceModal
- Portal a `document.body` para superponerse a toda la página
- Overlay oscuro con `backdrop-filter: blur` + animación `fadeIn`
- Modal centrado con animación `scaleIn` (cubic-bezier spring)
- Cierre con ✕, Escape, o click fuera del modal
- Muestra: icono grande, título (display font), párrafos de `fullDescription` (separados por línea en blanco) y CTA "Consultar vía WhatsApp" (el href lo arma `whatsappLink()` con el título del servicio como mensaje)
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
- Texto de invitación cálido + botón WhatsApp con ícono 📱 que abre `wa.me` vía `whatsappLink()`

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
| Iconos | `link[rel=icon]` PNG (32×32, 192×192, 512×512) y `link[rel=apple-touch-icon]` (PNG 180×180) |
| Datos estructurados | JSON-LD `@graph` con `Organization`, `LocalBusiness`, `Person` (Rocío Durazno, con `telephone`) y `WebSite` |

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
| `bun run generate:favicon` | Regenera los favicons + `apple-touch-icon.png` desde `public/images/logo.png` |

## Número de WhatsApp

`src/data/contact.js` es la **única fuente de verdad**. `Hero.jsx`, `Contact.jsx` y `ServiceModal.jsx` arman su href con `whatsappLink()`; el número no se hardcodea en ningún otro lado.

El mismo número tiene tres representaciones correctas, y confundirlas rompe el CTA:

| Destino | Forma | Por qué |
|---|---|---|
| href de `wa.me` | `542974216017` | Solo dígitos. Un `+`, un espacio o un guion matan el link. |
| Texto visible en la UI | `+54 297 421 6017` | Legible para una persona. |
| `telephone` del JSON-LD | `+54 297 421 6017` | schema.org quiere la forma internacional con `+`. |

`whatsappLink(message)` devuelve `https://wa.me/<número>` o, si se le pasa un mensaje, `https://wa.me/<número>?text=<codificado>`. Cuando no hay mensaje, omite el `?text=` por completo: un `?text=` vacío abre el chat con un compositor en blanco que la clienta tiene que borrar a mano.

`src/tests/whatsapp.test.jsx` bloquea ese formato, así que una edición mal hecha falla ruidosamente. `Hero.test.jsx` y `Contact.test.jsx` assertan contra la constante, nunca contra dígitos literales.

> **Sin confirmar:** los móviles argentinos suelen escribirse `+54 9 297 421 6017`, donde el `9` marca la línea móvil. La convención de `wa.me` es **omitir** el `9`, que es lo que hace la constante. Hay que confirmar esto abriendo el link en un teléfono real. Si el `9` turns out necesario, es un cambio de un solo carácter en `src/data/contact.js`.

## Known gaps

- **Confirmar el `9` del número argentino** en un teléfono real (ver "Número de WhatsApp").
- Ciudad o zona de servicio → `address`, `geo` y `areaServed` en el JSON-LD.
- Moneda de los precios (`$500`, `$700`, `$1000`) → `offers.priceCurrency`.
- Dominio de deploy → volver absolutas `canonical`, `og:url` y `og:image` (ver "Paso de deploy").
- **Falta el visto bueno visual de `og-image.png`.** La validación automática comprueba que el PNG es válido, que mide 1200×630 y que usa las fuentes de marca, pero no puede juzgar el diseño. Hay que revisarlo a ojo.

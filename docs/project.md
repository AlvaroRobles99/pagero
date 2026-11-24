# Sanarse — Documentación del proyecto

## ¿Qué es?

Sanarse es la marca de terapias holísticas de **Rocío Durazno** (tarot, limpiezas energéticas, acompañamiento espiritual). Esta SPA funciona como su sitio web profesional: presenta sus servicios, muestra reseñas de clientas, y canaliza contactos a través de WhatsApp.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Estilos | CSS Modules |
| Tipografía | Cormorant Garamond (display) + Figtree (body) — self-hosted WOFF2 en `public/fonts/` |
| Tests | Vitest + React Testing Library + jsdom |
| Runtime | Bun 1.3 |

## Estructura del proyecto

```
pageRo/
├── docs/
│   └── project.md              ← Esta documentación
├── public/
│   ├── images/
│   │   ├── abanico-cartas.webp  ← Abanico de cinco cartas, fondo de las cards de Services (900×466, WebP q85, 48 KB)
│   │   ├── agenda-cuarzos.webp  ← Foto de la agenda con cuarzos (Contact: 1128×785, WebP lossy con alfa, 52 KB)
│   │   ├── logo.png             ← Marca de la marca (Contact + logo JSON-LD)
│   │   ├── meditacion-playa.webp ← Rocío meditando en la playa (Hero derecha: 960×1280, WebP q75, 102 KB)
│   │   ├── og-image.png         ← Imagen de compartir 1200×630 (generada, no editar a mano)
│   │   ├── rocio-oraculos.webp  ← Retrato de Rocío con las cartas en la mano (Hero centro: 960×966, WebP q75, 81 KB)
│   │   ├── rocio-tarot.webp     ← Rocío con las cartas en las manos sobre el mantel de tarot (card de Bio: 900×900, WebP q75, 78 KB)
│   │   └── rocio-playa.webp     ← Rocío de pie en la playa (Hero izquierda: 960×966, WebP q75, 40 KB)
│   ├── fonts/                  ← Fuentes de marca self-hosted (WOFF2 variable, subset latin — ver "Tipografía")
│   │   ├── cormorant-garamond-latin.woff2        ← Cormorant Garamond variable 300–700 (37.640 B)
│   │   ├── cormorant-garamond-italic-latin.woff2 ← Cormorant Garamond itálica variable 300–700 (39.260 B)
│   │   └── figtree-latin.woff2                   ← Figtree 300–600 (20.156 B)
│   ├── favicon.ico             ← Favicon de pestaña (formato ICO, sizes any)
│   ├── favicon-16x16.png       ← Favicon de pestaña 16×16 (estático, no generado)
│   ├── favicon-32x32.png       ← Favicon de pestaña 32×32 (estático, no generado)
│   ├── android-chrome-192x192.png ← Ícono Android 192×192 (vía site.webmanifest)
│   ├── android-chrome-512x512.png ← Ícono Android 512×512 (vía site.webmanifest)
│   ├── apple-touch-icon.png    ← Icono 180×180 para iOS (iOS no acepta SVG aquí)
│   └── site.webmanifest        ← Manifest PWA: marca, colores #1f0f14, íconos android
├── scripts/
│   ├── generate-og.ts          ← Genera la imagen OG (SVG en memoria → PNG con resvg)
│   ├── inline-css.ts           ← Plugin de build: mete la hoja de estilos en el HTML y no la emite como archivo
│   └── fonts/                  ← TTFs de marca, usados solo por el generador OG
├── src/
│   ├── main.tsx                ← Entry point de React
│   ├── App.tsx                 ← Layout principal: Hero, y en `<main>` About → Testimonios → Servicios → Bio → Contacto, con divisores Lotus; después el footer
│   ├── App.module.css          ← Estilos de layout compartidos (.section, .container, h2)
│   ├── index.css               ← CSS reset + variables globales (colores, fuentes, prefers-reduced-motion) + los `@font-face` self-hosted
│   ├── shared.module.css       ← .btnPrimary (botón reutilizable)
│   ├── data/
│   │   ├── about.ts            ← Fechas personales + `ageOn()` / `yearsOfPracticeOn()` del copy de Bio
│   │   ├── services.ts          ← Array de servicios (id, title, description, fullDescription)
│   │   ├── reviews.ts           ← Array de testimonios reales (id, text) + `TESTIMONIALS_HIGHLIGHT`
│   │   ├── contact.ts           ← Constantes del número de WhatsApp + helper `whatsappLink()`
│   │   ├── hero.ts              ← Array `HERO_PHOTOS` del tríptico + `LCP_PHOTO` (la foto que el preload de `index.html` debe nombrar)
│   │   └── social.ts            ← Array `SOCIAL_LINKS` (id, name, url, icon) de las tres redes
│   ├── components/
│   │   ├── Hero/                ← Header full-viewport con tríptico de fotos + CTA
│   │   ├── About/               ← Sección "Sobre mí": cómo empieza el proceso y qué se busca
│   │   ├── Bio/                 ← Card horizontal con el retrato y la historia de Rocío
│   │   ├── Lotus/               ← SVG decorativo de loto con rotación animada
│   │   ├── Services/            ← Grid de 8 cards clickeables con stagger reveal + apertura de modal
│   │   ├── ServiceModal/        ← Modal a pantalla completa con detalle del servicio y CTA WhatsApp
│   │   ├── Reviews/             ← Carrusel de testimonios con corazón y contador
│   │   ├── Contact/             ← Sección con botón de WhatsApp
│   │   ├── WhatsAppFab/         ← Botón flotante de WhatsApp fijo en pantalla
│   │   └── Footer/              ← Footer con copyright y año dinámico
│   └── tests/
│       ├── setup.ts             ← Setup global (@testing-library/jest-dom + mock IntersectionObserver)
│       ├── seo.test.tsx         ← Contrato de meta de index.html (lee el archivo del disco)
│       ├── App.test.tsx
│       ├── Hero.test.tsx
│       ├── About.test.tsx
│       ├── Bio.test.tsx
│       ├── Services.test.tsx
│       ├── ServiceModal.test.tsx
│       ├── Reviews.test.tsx
│       ├── Contact.test.tsx
│       ├── Footer.test.tsx
│       ├── WhatsAppFab.test.tsx
│       ├── Lotus.test.tsx
│       ├── whatsapp.test.tsx    ← Guard del formato del link de WhatsApp
│       ├── fonts.test.tsx       ← Guard de la entrega de fuentes: sin terceros, swap, archivos WOFF2 reales, preloads
│       ├── deploy.test.tsx      ← Guard de `vercel.json`: qué se cachea immutable y qué no
│       ├── lcp.test.tsx         ← Guard del LCP: el preload de imagen coincide con `LCP_PHOTO` y no lleva `crossorigin`
│       ├── inline-css.test.ts   ← Guard del CSS inline: el `<link>` se reemplaza por `<style>` y el plugin sigue enchufado en Vite
│       └── copy.test.tsx        ← Guard de la regla de copy: sin la palabra «trabajo»
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
├── tsconfig.json                ← Proyecto TS de la app (navegador, `src/` sin los tests)
├── tsconfig.test.json           ← Proyecto TS de los tests (`src/tests`, DOM + Node)
├── tsconfig.node.json           ← Proyecto TS del tooling (`scripts/` + configs de Vite, Bun/Node)
├── opencode.json                ← Config de opencode (MCP Context7 + instrucciones)
├── vercel.json                  ← Headers de caché `immutable` para `/assets` y `/fonts` (ver "Caché y entrega")
├── AGENTS.md                    ← Instrucciones para agentes de opencode
├── release-please-config.json   ← Config de release-please (changelog + versión)
├── .release-please-manifest.json ← Versión publicada; la mantiene release-please
├── vitest.config.ts             ← Config de Vitest
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
| `--color-accent-deep` | `#8f661d` | Acento como texto sobre fondos claros (eyebrow de About, contador de testimonios) |
| `--color-primary-deep` | `#a82c47` | Rosa como texto chico sobre fondos claros: hint «Ver cómo es» de las cards de Services (6.10:1 sobre `--color-light`) |
| `--color-text` | `#3a1f28` | Texto sobre fondos claros |
| `--color-warm-white` | `#fffafc` | Fondo principal (Services, Contact) |
| `--font-display` | `'Cormorant Garamond', Georgia, serif` | Títulos, hero, tagline |
| `--font-body` | `'Figtree', 'Segoe UI', Tahoma, sans-serif` | Texto general, botones |

### Tipografía

| Rol | Fuente | Rango declarado | Archivo |
|---|---|---|---|
| Display | Cormorant Garamond | 300–700 variable | `public/fonts/cormorant-garamond-latin.woff2` |
| Display itálica | Cormorant Garamond | 300–700 variable | `public/fonts/cormorant-garamond-italic-latin.woff2` |
| Body | Figtree | 300–600 variable | `public/fonts/figtree-latin.woff2` |

Los tres archivos son **variables y self-hosted**: viven en `public/fonts/`, se declaran con `@font-face` al principio de `src/index.css` y se sirven desde el propio origen. Antes venían de Google Fonts, y ese `<link>` bloqueaba el render de **toda** la página —no solo del texto— mientras encadenaba dos DNS/TLS antes de pedir el archivo: ~780 ms de bloqueo en el perfil mobile de Lighthouse.

Tres reglas sostienen esto:

1. **El rango `font-weight` del `@font-face` es el contrato.** Un peso fuera del rango lo sintetiza el navegador en lugar de bajarlo. Si el diseño necesita un peso nuevo, se regenera el archivo.
2. **Reemplazar un archivo de fuente obliga a renombrarlo.** `/fonts/*` se sirve con caché `immutable` de un año (ver "Caché y entrega"), así que el mismo nombre con bytes nuevos nunca llega a quien ya visitó el sitio.
3. **Solo viaja el subset latin**, y alcanza: `U+0000-00FF` cubre á é í ó ú ñ, y `U+2000-206F` el guion largo y el punto medio que usa el copy.

`index.html` precarga solo dos caras, las que necesita la primera pantalla: Cormorant (el `h1` del Hero) y Figtree (todo el cuerpo de texto). La itálica no se precarga porque es una sola línea de tagline y competiría con la foto del Hero, que es el elemento LCP. El `crossorigin` del `preload` es obligatorio **aunque sea el mismo origen**: las fuentes siempre se piden en modo CORS, y sin él el navegador baja cada archivo dos veces.

`src/tests/fonts.test.tsx` es el guard: falla si vuelve un host de terceros, si un archivo declarado no existe o no es un WOFF2 real, si un `@font-face` pierde `font-display: swap`, o si un `preload` apunta a la nada.

## Componentes

### Hero
- Header full viewport con **tres fotos reales** de fondo, en lugar del banner ilustrado: `rocio-playa.webp` (de pie, a la izquierda), `rocio-oraculos.webp` (con las cartas en la mano, al centro y más ancha) y `meditacion-playa.webp` (meditando, a la derecha)
- El responsive recorta el tríptico: 3 columnas desde 900px, 2 en tablet (cartas + meditando) y 1 en mobile (las cartas). Los paneles ocultos son `display: none`, así que su `loading="lazy"` evita descargarlos
- La foto central es la candidata a LCP: `fetchPriority="high"` y sin lazy; las laterales van con `fetchPriority="low"`
- **Pero lo que de verdad la hace descubrible es un `<link rel="preload" as="image">` en `index.html`.** La página es una SPA: el `<img>` no existe hasta que se parsea el bundle y React renderiza, así que `fetchPriority` y `loading="eager"` llegan tarde y Lighthouse marca «la solicitud se puede descubrir en el documento inicial» en rojo. Medido en local: sin el preload la foto sale en el request #8 (después del JS), con el preload sale en el #7 (antes).
- Dos detalles rompen ese preload si cambian: **no lleva `crossorigin`** (a diferencia de las fuentes, que sí lo necesitan; en una imagen cambiaría el modo de la request y el `<img>` la bajaría de nuevo), y su `href` tiene que ser **idéntico** al `src`. El array de fotos vive en `src/data/hero.ts` justamente para que haya una sola fuente de verdad, y `src/tests/lcp.test.tsx` falla si el preload se despega de la foto marcada `priority: true`.
- Overlay de marca obligatorio, no decorativo: las fotos de playa tienen el cielo quemado y la de las cartas es de clave media. Un `linear-gradient` vertical oscurece arriba y abajo, y un `radial-gradient` evita que el centro se aplane
- `object-position: 44%` en la foto central para que las dos cartas entren en la columna, que recorta el ancho
- El `h1` dice «Sanarse» y, debajo, «Terapeuta holística en San Rafael, Mendoza»: la ciudad vive en el `h1` por el SEO local. La tagline nombra a Rocío y la práctica, y cierra el botón CTA
- Animación `fadeInUp` en el contenido al cargar
- **Sin logo:** el logo flotaba sobre las caras y competía con ellas; ahora firma la sección de Contacto (ver abajo)

### About
- Sección con fondo `--color-warm-white` (cambió desde `--color-light` al reordenarse: ahora Testimonios toma el fondo claro y las dos secciones no se funden)
- Loto decorativo arriba del título
- Loto semi-transparente como marca de agua de fondo (vía `::before` con SVG inline y radial-gradient)
- Ya **no** lleva la bio de presentación: esa historia vive en la card de `Bio`, debajo de Servicios. Acá queda cómo empieza el proceso (consulta con nombre completo y fecha de nacimiento, evaluación energética incluida en el valor de las sesiones, sesiones presenciales en San Rafael, Mendoza y online vía WhatsApp), qué se busca en el proceso, la cita inspiradora y el CTA con WhatsApp

### Bio
- Card horizontal debajo de Servicios con el retrato y la historia de Rocío: la intro que antes abría About, textual y sin recortes
- Sección con fondo `--color-deep` y dos radial-gradients de marca (rosa arriba, dorado abajo a la derecha): es la única sección oscura del cuerpo de la página y hace que el fondo rojo de la foto se funda con el fondo en lugar de recortarse contra otro crema
- La card es `--color-warm-white` con borde dorado hairline, radio 20px y sombra profunda; adentro, un marco dorado de 1px inset sobre la foto, guiño al borde de una carta de tarot
- Grid a dos columnas desde 880px (`minmax(300px, 380px) 1fr`): foto a la izquierda a sangre, texto a la derecha y centrado vertical. En mobile se apila con la foto cuadrada arriba
- Foto `public/images/rocio-tarot.webp` (900×900, WebP q75, 78 KB), `loading="lazy"`, `decoding="async"`, `width`/`height` declarados
- La edad y los años de dedicación se calculan con `ageOn()` / `yearsOfPracticeOn()` de `src/data/about.ts`, igual que antes: nada hardcodeado
- «Seguime» cierra la historia como link al Instagram, con `INSTAGRAM_URL` de `src/data/social.ts` (única fuente de verdad de las tres redes)
- El `h2` de la card es "Mi historia"; la regla dorada que `App.module.css` centra bajo cada `h2` se alinea a la izquierda dentro de la card (selector `.card .body h2::after`, con especificidad suficiente para ganarle a la regla global)

### Lotus
- SVG de loto estilizado (6 pétalos + centro)
- Props: `size` (default 48), `className`
- Animación `spin` continua (20s, linear)
- `aria-hidden="true"` (decorativo)

### Services
- Datos importados desde `src/data/services.ts` (id, título, resumen corto para la card, texto completo para el modal) — sin precios, sin `includes`, sin duración, sin íconos
- 8 cards clickeables (`role="button"`, `tabIndex={0}`, `onClick`, `onKeyDown Enter`)
- Borde izquierdo decorativo por card en ciclo de 3: gold (`3n+1`), rose (`3n+2`), gold→rose gradiente (`3n+3`)
- Fondo: `public/images/abanico-cartas.webp` como marca de agua de cada card vía `::before`, a 32% de opacidad y con un degradado de máscara que lo despeja detrás del título y del pie
- Texto "Ver cómo es →" al pie de cada card, siempre en `--color-primary-deep` (6.10:1 sobre el fondo de la card, AA); el subrayado aparece en hover desktop
- Al hacer clic abre `ServiceModal` con el texto completo del servicio
- Animación stagger via `IntersectionObserver` (delay `index × 120ms`), que se limpia a `0ms` al terminar la entrada: el hover arranca igual en las ocho cards
- Sobre el `h2` va una etiqueta chica con «Tarot, limpiezas energéticas y abre caminos», el mismo patrón de eyebrow que About y Contacto: es texto de cuerpo, no un segundo encabezado compitiendo con el `h2`

### ServiceModal
- Portal a `document.body` para superponerse a toda la página
- Overlay oscuro con `backdrop-filter: blur` + animación `fadeIn`
- Modal centrado con animación `scaleIn` (cubic-bezier spring)
- Cierre con ✕, Escape, o click fuera del modal
- Muestra: título (display font), párrafos de `fullDescription` (separados por línea en blanco) y CTA "Consultar por WhatsApp" (el href lo arma `whatsappLink()` con el título del servicio como mensaje)
- `prefers-reduced-motion` respetado

### Reviews
- Título de la sección: "Testimonios"
- Datos importados desde `src/data/reviews.ts` (id, text)
- **Los doce testimonios son reales:** mensajes que Rocío recibió por WhatsApp, publicados con una edición mínima (tipeos, puntuación, sin emojis ni "jajaja" repetidos) y sin nombres, porque las capturas originales tampoco los tenían. Para agregar o quitar uno alcanza con editar `src/data/reviews.ts`: cada objeto lleva `text` (la cita publicada) y un `id` único; el carrusel, el contador y `Reviews.test.tsx` se ajustan solos.
- Cada card cierra con un corazón rosa debajo de la cita (antes eran cinco estrellas doradas arriba)
- Carrusel horizontal que muestra un testimonio a la vez, con card ancha (lectura cómoda) y `min-height` para que la sección no cambie de alto entre una cita corta y una larga
- Navegación con flechas ◀ ▶ y un contador `N / total` debajo (reemplazó a los puntos: doce dots no entraban en mobile)
- Auto-avance cada 6s, pausa en hover/focus
- Track con `transform: translateX` animado (cubic-bezier 0.4, 0, 0.2, 1)
- `aria-roledescription="carousel"`, `aria-hidden` en slides no visibles; el contador va con `aria-hidden` porque la etiqueta de cada slide ya anuncia la posición
- Link al pie "Ver más testimonios en Instagram", con el href de `TESTIMONIALS_HIGHLIGHT` (única fuente de verdad), `target="_blank"` y `rel="noopener noreferrer"`
- `prefers-reduced-motion` respetado
- Flechas ocultas en mobile (≤600px)

### Contact
- Sección con fondo `--color-warm-white`, ancla `#contact` (se conserva aunque el título visible cambie)
- Encabezado en dos niveles: la etiqueta chica `Contacto` en mayúsculas doradas (`.eyebrow`, mismo tratamiento que About) y el `h2` real **Agenda tu turno**
- Debajo de la invitación declara la modalidad: «Sesiones presenciales en San Rafael, Mendoza y a distancia por WhatsApp», antes del botón
- Dos columnas a partir de 900px: a la izquierda el encabezado, el texto y el CTA; a la derecha la foto de la agenda con cuarzos
- En mobile se apila en el orden encabezado → texto → CTA → foto → bloque social, así el botón queda primero y el objeto refuerza lo que el botón hace
- La foto es `public/images/agenda-cuarzos.webp` (1128×785, WebP lossy con alfa, 52 KB). Se muestra con `filter: drop-shadow` en lugar de un marco, porque el recorte es transparente
- Levita: `@keyframes levitate` la desplaza 10px hacia arriba en 7s, `infinite alternate`, el mismo ritmo que tenía el logo del Hero. La regla global de `prefers-reduced-motion` de `index.css` la reduce a un solo cuadro
- Debajo de la agenda firma el **logo de la marca** (`images/logo.png`, 200×200, 45 KB —era 1254×1254, 314 KB—, `clamp(64px, 14vw, 92px)`, decorativo). Vivía en el Hero, pero ahí flotaba sobre las caras y competía con ellas; acá funciona como el sello de la persona a la que le escribís
- **No** lleva el loto de marca de agua en `::before`: se transparentaba a través del recorte de la foto y se leía como una mancha detrás del CTA
- Texto de invitación cálido + botón WhatsApp que abre `wa.me` vía `whatsappLink()`
- Bloque "Ver mi contenido" al final, debajo del CTA: regla dorada + 3 botones circulares (52px, borde dorado) con ícono SVG inline que abren Instagram, Facebook y TikTok en pestaña nueva — los links viven en `src/data/social.ts` (única fuente de verdad)

### WhatsApp flotante
- `WhatsAppFab` vive fuera de `<main>` y del `<footer>`, al final del árbol: un `<a>` fijo abajo a la derecha que sigue al lector mientras scrollea
- Círculo de 56px en mobile y 60px desde 768px, con `env(safe-area-inset-*)` para que no lo tape el notch ni la barra gestual
- Rosa de marca (`--color-primary`) con glifo blanco y hairline dorado, no el verde de WhatsApp: en una página crema, rosa y dorada un punto verde sería el único elemento fuera de la paleta, y el glifo ya carga el reconocimiento
- `z-index: 900`: siempre debajo del `ServiceModal` (1000), así una card abierta lo tapa en lugar de mezclarse
- Hover: se eleva 2px y oscurece el fondo; foco visible con doble anillo (crema + `--color-primary-deep`) porque un solo outline dorado no llega a AA ni sobre crema ni sobre el fondo profundo
- Abre `wa.me` con `whatsappLink()` de `src/data/contact.ts`, en pestaña nueva con `rel="noopener noreferrer"`, y lleva `aria-label` porque el ícono es decorativo
- La regla global de `prefers-reduced-motion` de `index.css` ya anula su transición

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
| Datos estructurados | JSON-LD `@graph` con `Organization` (con `sameAs` → Instagram), `LocalBusiness` (con `address` en San Rafael, Mendoza, y `areaServed` San Rafael / Mendoza / Argentina), `Person` (Rocío Durazno, con `telephone` y `sameAs` → Facebook y TikTok) y `WebSite` (`inLanguage=es-AR`) |

Los textos de `og:*` y del JSON-LD están en español, igual que el resto del contenido del sitio. Las URLs de los nodos son referencias relativas (`/#organization`), y el `@context` es el IRI que exige schema.org.

### Imagen para compartir

`public/images/og-image.png` es un PNG real de 1200×630. SVG no sirve como `og:image`: WhatsApp y Facebook no lo renderizan.

```bash
bun run generate:og
```

El script arma el SVG en memoria (degradado de marca `#1f0f14` → `#c73a5a`, wordmark en Cormorant Garamond, subtítulo "Tarot · Limpiezas · Acompañamiento espiritual" en Figtree, marca de loto en dorado) y lo rasteriza con `@resvg/resvg-js` usando las fuentes de `scripts/fonts/` y `loadSystemFonts: false`, de modo que la salida es idéntica en cualquier máquina. El resultado es determinista: correrlo dos veces produce el mismo archivo byte a byte.

El PNG está versionado y `@resvg/resvg-js` es una devDependency, así que producción nunca necesita la herramienta.

> El diseño se edita en `scripts/generate-og.ts`, nunca en el PNG.

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
1. Crear `src/tests/MiComponente.test.tsx`
2. Usar `render`, `screen`, `describe`, `it`, `expect` (globales de Vitest + testing-library)
3. Si el componente usa `IntersectionObserver`, ya está mockeado en `setup.ts`
4. Vitest escanea `src/tests/**/*.test.tsx` automáticamente

### Test de metadata
`src/tests/seo.test.tsx` no renderiza nada: lee `index.html` con `node:fs`, lo parsea con `DOMParser` y verifica el contrato de la sección "SEO + Social". Si se borra o cambia una etiqueta, la suite falla. Resuelve la raíz del proyecto con `process.cwd()`, que Vitest configura como cwd.

### Mock disponible
```ts
// src/tests/setup.ts — mock global
class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})
```

`defineProperty` en lugar de una asignación directa es lo que evita un cast: la clase no implementa
`IntersectionObserver` entera, y `window.IntersectionObserver = ...` no compilaría sin `as`.

## TypeScript

El repo es TypeScript puro: cada archivo que resuelve alguno de los tres proyectos se chequea. Son
tres, y cada uno tiene su mundo de tipos:

| Archivo | Alcance |
|---|---|
| `tsconfig.json` | App: `src/` menos `src/tests`, `lib` con DOM y `types: ["vite/client"]`. Sin Node, así que `process` o `node:fs` no pueden entrar al código del navegador |
| `tsconfig.test.json` | Tests: `src/tests`, con `types: ["vite/client", "vitest/globals", "node"]`. Es el único lugar donde DOM y Node conviven, porque el test de SEO lee `index.html` del disco |
| `tsconfig.node.json` | Tooling: `scripts/` y los configs de Vite y Vitest, `types: ["bun"]`, sin DOM. `@types/bun` arrastra `@types/node`, así que `process`, `node:fs` y `Buffer` resuelven |

```bash
bun run typecheck   # los tres proyectos, vía `bun check`
```

`bun check` es el checker nativo de Bun (TypeScript 7): reporta los mismos errores que `tsc` y usa
todos los núcleos. `typescript` vive en `devDependencies` porque es una herramienta de desarrollo de
la app, no una dependencia que se publique.

Los tres son gate real, y el conteo dice qué cubre cada uno: la app 18 archivos (los seis `.ts` de
`src/data/`, los diez `.tsx` de componentes, `App.tsx` y `src/main.tsx`), los tests 37 (los 19 de
`src/tests` más los de la app que importan) y el tooling 4 (`vite.config.ts`, `vitest.config.ts`,
`scripts/generate-og.ts` y `scripts/inline-css.ts`).

La primera capa migrada fue `src/data/`: exporta las interfaces `Service`, `Review` y `SocialLink`,
y `whatsappLink(message?: string): string`. Después se sumaron todos los componentes. Los que tienen
estado llevan lo suyo: `ServiceCardProps` y `ServiceModalProps`, `RefObject<HTMLDivElement | null>`
en `useOnScreen`, y en el focus trap del modal conviven los dos tipos de evento —
`KeyboardEvent` del DOM para el listener de `window`, `MouseEvent` de React para el `onClick` del
JSX. Confundirlos compila mal: son tipos distintos con el mismo nombre.

`src/main.tsx` guarda el contenedor antes de montar: si `index.html` pierde el `div#root`, la app
falla con un error explícito en vez de con un `null` de casualidad. Por eso el entry point no
necesita un `!`.

`allowJs` está apagado en los tres proyectos: no queda un solo `.js` en el repo, y el tooling dejó de
aportar archivos al conteo sin chequearlos.

Dos detalles del port del tooling valen la pena. `vitest.config.ts` importa `defineConfig` de
`vitest/config`, no de `vite`, porque la firma de Vite no conoce la clave `test`. Y `generate-og.ts`
solo necesitó cuatro anotaciones de retorno: el generador es la única parte del repo con oráculo byte
a byte, así que correr `bun run generate:og` después del port tiene que dejar
`public/images/og-image.png` intacto.

`bun run typecheck` corre en CI como paso del job `Verify` (ver abajo), así que los tipos no se
degradan sin que nadie se entere.

## CI

`.github/workflows/ci.yml` corre en GitHub Actions con Bun `1.4.4` (la misma versión que usa el proyecto) y Node 24, e instala con `--frozen-lockfile` para que el lockfile sea la única fuente de dependencias. Bun instala las dependencias; Node ejecuta Vite y Vitest.

| Se ejecuta | Cuándo |
|---|---|
| `pull_request` | En cada PR abierto, actualizado o reabierto |
| `push` a `main` | Después de cada merge |
| `workflow_dispatch` | Manual desde la pestaña Actions |

Pasos del job `Verify`: **install → typecheck → test → build**. Si cualquiera falla, el check queda en rojo.

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

## Caché y entrega

El deploy es Vercel, y su default es `cache-control: public, max-age=0, must-revalidate` para todo lo estático —verificado contra el sitio publicado, donde incluso el CSS con hash en `/assets/` revalidaba en cada visita. `vercel.json` lo corrige para las dos únicas rutas donde el nombre cambia cuando cambia el contenido:

| Ruta | Header | Por qué es seguro |
|---|---|---|
| `/assets/(.*)` | `public, max-age=31536000, immutable` | Vite le pone hash al nombre: contenido nuevo, nombre nuevo. |
| `/fonts/(.*)` | `public, max-age=31536000, immutable` | Nombre estable a propósito, para que el `preload` pueda nombrarlo. **Reemplazar una fuente exige renombrarla.** |

`public/images/*` queda en el default a propósito: los nombres son estables y reemplazar una foto tiene que notarse en la visita siguiente, no dentro de un año. Por la misma razón tampoco hay una regla catch-all: una regla demasiado amplia (`/.*`) sería la forma más rápida de servir un bundle viejo durante un año, y como `main` se despliega en cada merge, eso dejaría a la gente con una versión congelada.

`src/tests/deploy.test.tsx` fija el contrato: solo esas dos rutas, y ninguna regla que toque `images`.

### El CSS viaja dentro del HTML

`vite.config.ts` registra el plugin `scripts/inline-css.ts`, que al compilar reemplaza el `<link rel="stylesheet">` por un `<style>` con la hoja completa y deja de emitirla como archivo. Después de un build, `dist/assets/` contiene el JS y nada más.

La hoja pesa ~19 KB crudos (4.8 KB gzip), así que entra inline sin discusión. Como request aparte era **render-blocking** y se descubría recién detrás del documento: Lighthouse lo medía en 160 ms de ahorro y lo dibujaba como un nodo extra del camino crítico (documento → JS → CSS). Inline no cuesta bytes —los mismos viajan dentro del HTML que ya se descargaba— y borra esa RTT.

El tradeoff, escrito para que nadie lo descubra por sorpresa: el CSS deja de cachearse por separado con `immutable`. En un sitio de una sola página no cambia nada, porque el HTML se revalida en cada visita (normalmente un 304 sin cuerpo) y la hoja cambia con el bundle igual. Si algún día el sitio crece a varias páginas con CSS compartido, esto se revisa.

`src/tests/inline-css.test.ts` cubre el reemplazo —incluido que un `$` dentro del CSS no se interprete como token de `String.replace`— y falla si alguien desenchufa el plugin de `vite.config.ts`.

## Comandos opencode

| Comando | Descripción |
|---|---|
| `@dev` | Inicia servidor de desarrollo Vite |
| `@build` | Compila para producción |
| `@testRo` | Ejecuta `bun run test` |
| `bun run generate:og` | Regenera `public/images/og-image.png` desde `scripts/generate-og.ts` |

## Número de WhatsApp

`src/data/contact.ts` es la **única fuente de verdad**. `Hero.tsx`, `Contact.tsx` y `ServiceModal.tsx` arman su href con `whatsappLink()`; el número no se hardcodea en ningún otro lado.

El mismo número tiene tres representaciones correctas, y confundirlas rompe el CTA:

| Destino | Forma | Por qué |
|---|---|---|
| href de `wa.me` | `542974216017` | Solo dígitos. Un `+`, un espacio o un guion matan el link. |
| Texto visible en la UI | `+54 297 421 6017` | Legible para una persona. |
| `telephone` del JSON-LD | `+54 297 421 6017` | schema.org quiere la forma internacional con `+`. |

`whatsappLink(message)` devuelve `https://wa.me/<número>` o, si se le pasa un mensaje, `https://wa.me/<número>?text=<codificado>`. Cuando no hay mensaje, omite el `?text=` por completo: un `?text=` vacío abre el chat con un compositor en blanco que la clienta tiene que borrar a mano.

`src/tests/whatsapp.test.tsx` bloquea ese formato, así que una edición mal hecha falla ruidosamente. `Hero.test.tsx` y `Contact.test.tsx` assertan contra la constante, nunca contra dígitos literales.

> **Confirmado en un teléfono real:** el link abre el chat en el número correcto con la forma sin `9` (`542974216017`). Los móviles argentinos se escriben `+54 9 297 421 6017`, pero la convención de `wa.me` **omite** el `9`, que es lo que hace la constante. Si algún día falla, el ajuste es de un carácter en `src/data/contact.ts`.

## Known gaps

- Coordenadas exactas (`geo`) → si algún día hacen falta, se agregan al `LocalBusiness`; no se inventan. `address` y `areaServed` ya están publicados.
- Dominio de deploy → volver absolutas `canonical`, `og:url` y `og:image` (ver "Paso de deploy").

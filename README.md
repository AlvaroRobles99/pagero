# Sanarse

SPA de terapias holísticas para **Rocío Durazno** — tarot, limpiezas energéticas y acompañamiento espiritual.

En producción: **https://www.sanarseconro.com/**

## Stack

React 19 • Vite 8 • TypeScript 7 (`bun check`) • CSS Modules • Vitest + Testing Library • Bun 1.4

## Inicio rápido

| Comando | Qué hace |
|---|---|
| `bun install` | Instala las dependencias |
| `bun run dev` | Servidor de desarrollo (Vite) |
| `bun run build` | Build de producción |
| `bun run preview` | Sirve el build local |
| `bun run test` | Suite completa (Vitest) |
| `bun run test:watch` | Suite en modo watch |
| `bun run typecheck` | Los tres proyectos TS: app, tests y tooling |
| `bun run generate:og` | Regenera `public/images/og-image.png` |

## Estructura

```
src/components/   → Hero, About, Bio, Lotus, Services, ServiceModal, Reviews,
                    Contact, WhatsAppFab y Footer (cada uno con su CSS Module)
src/data/         → datos y helpers: servicios, testimonios, WhatsApp, redes,
                    fechas personales y fotos del hero
src/tests/        → una suite por componente + guards de contrato (SEO, copy,
                    fuentes, caché, LCP y CSS inline)
scripts/          → generate-og.ts (imagen de compartir) · inline-css.ts (plugin de build)
public/           → fuentes WOFF2, imágenes, favicons, robots.txt, sitemap.xml,
                    site.webmanifest
docs/project.md   → documentación completa
```

[Documentación completa →](docs/project.md)

## Fuentes únicas de verdad

Cada uno de estos datos vive en un solo lugar. Duplicarlo rompe el sitio en silencio, así que hay un test que lo vigila:

| Dato | Vive en | Guard |
|---|---|---|
| Número de WhatsApp | `src/data/contact.ts` → `whatsappLink()` | `whatsapp.test.tsx` |
| Fotos del hero y cuál es el LCP | `src/data/hero.ts` | `lcp.test.tsx` |
| Origen del sitio (`www`) | `SITE_ORIGIN` en `src/tests/seo.test.tsx` | `seo.test.tsx` |
| Edad y años de dedicación | `src/data/about.ts` → `ageOn()`, `yearsOfPracticeOn()` | `Bio.test.tsx` |
| Redes sociales | `src/data/social.ts` | `Bio.test.tsx`, `Contact.test.tsx`, `seo.test.tsx` |
| Headers de caché | `vercel.json` | `deploy.test.tsx` |

## Reglas que no se rompen

- **Fuentes self-hosted.** Nada de Google Fonts: un stylesheet de terceros bloquea el primer pintado de toda la página. Reemplazar un archivo obliga a **renombrarlo**, porque `/fonts/*` se cachea `immutable` durante un año.
- **El CSS viaja dentro del HTML.** `scripts/inline-css.ts` lo inyecta en el build; si se desenchufa, vuelve la request que bloquea el render.
- **El preload del LCP no lleva `crossorigin`.** Con él, el navegador descarga la imagen dos veces.
- **Copy sin la palabra «trabajo»** ni sus derivados: usá labor, proceso, acompañamiento o sesión. `copy.test.tsx` falla si vuelve.
- **Sin emojis** en el copy. Los símbolos tipográficos (✕, ★, ◀, ▶, ❤) son intencionales.

## Calidad y entrega

- **CI**: `install → typecheck → test → build` en cada PR y en cada push a `main`. El check se llama `Verify` y es obligatorio en `main`, también para administradores.
- **Releases** automáticas con release-please a partir de commits convencionales (`feat:`, `fix:`, `perf:`). Para forzar una versión exacta, el commit lleva el footer `Release-As: X.Y.Z`.
- **Deploy** en Vercel. Producción responde en `www` y redirige el apex con 308, por eso el canonical nombra `www`.
- `AGENTS.md` tiene las convenciones para agentes; `docs/project.md`, el porqué de cada decisión.

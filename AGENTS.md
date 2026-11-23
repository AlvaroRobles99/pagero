# Sanarse — AGENTS.md

## Reglas

Antes de planificar cambios grandes en el proyecto (nuevas secciones, cambios de estructura, refactors, rediseños), leé `docs/project.md` para entender la arquitectura completa y el sistema de diseño actual.

Cuando el trabajo toque UI (secciones nuevas, cambios visuales, tipografía, color, layout o rediseños), cargá la skill `frontend-design` (`.opencode/skills/frontend-design/SKILL.md`) antes de proponer o escribir código, para mantener la identidad visual de la marca y evitar resultados genéricos.

## Project

React SPA (Vite + CSS Modules) for "Sanarse", a holistic therapy brand (tarot, energy cleansing). All content is in Spanish.

## Commands

- `bun run dev` — start Vite dev server
- `bun run build` — production build
- `bun run preview` — preview production build
- `bun run test` — run all tests (Vitest)
- `bun run test:watch` — run tests in watch mode
- `bun run generate:og` — regenerate `public/images/og-image.png` from `scripts/generate-og.ts`
- `bun run typecheck` — type-check the app, the tests and the Node tooling (`bun check`, TypeScript 7)

## Structure

| Path | Purpose |
|---|---|
| `docs/project.md` | Full project documentation |
| `index.html` | Vite entry HTML |
| `vite.config.ts` | Vite config |
| `src/main.tsx` | React entry point |
| `src/App.tsx` | Layout — Hero, then About → Reviews → Services → Bio → Contact |
| `src/index.css` | Global reset + CSS variables + the self-hosted `@font-face` blocks |
| `src/shared.module.css` | Shared styles (btn-primary) |
| `src/components/Lotus/` | Animated lotus SVG divider |
| `src/components/Hero/` | Hero section + module CSS |
| `src/components/About/` | About section: how the process starts + module CSS |
| `src/components/Bio/` | Horizontal bio card with Rocío's portrait and story + module CSS |
| `src/components/Services/` | Services cards + module CSS |
| `src/components/Reviews/` | Reviews section + module CSS |
| `src/components/Contact/` | Contact section + module CSS |
| `src/components/Footer/` | Footer with year + module CSS |
| `src/components/WhatsAppFab/` | Fixed WhatsApp button pinned to the viewport corner + module CSS |
| `src/data/about.ts` | Fechas personales (cumpleaños y año de inicio) + `ageOn()` / `yearsOfPracticeOn()` para el copy de Bio |
| `src/data/contact.ts` | WhatsApp number constants + `whatsappLink()` helper (single source of truth) |
| `src/data/hero.ts` | `HERO_PHOTOS` (the hero tríptico) + `LCP_PHOTO`, the frame the `index.html` image preload must name |
| `src/tests/` | Vitest suites, one per component + `seo.test.tsx` for the `index.html` meta, `whatsapp.test.tsx` for the link format, `fonts.test.tsx` for font delivery, `deploy.test.tsx` for `vercel.json`, `lcp.test.tsx` for the LCP image preload and `inline-css.test.ts` for the inlined stylesheet |
| `scripts/generate-og.ts` | Builds the 1200×630 share image (inline SVG → PNG via resvg) |
| `scripts/inline-css.ts` | Vite build plugin: inlines the single stylesheet into the HTML `<style>` and stops emitting the file, so the CSS is not a render-blocking request |
| `scripts/fonts/` | Brand TTFs, used only by the OG generator |
| `public/fonts/` | Self-hosted brand fonts, WOFF2 variable + latin subset (`cormorant-garamond-latin.woff2`, `cormorant-garamond-italic-latin.woff2`, `figtree-latin.woff2`) |
| `public/images/` | Static assets (`agenda-cuarzos.webp`, `logo.png`, the three hero photographs, `rocio-tarot.webp` for the bio card, generated `og-image.png`) |
| `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png` | Tab/PWA icon set — static files supplied as-is, not generated |
| `public/apple-touch-icon.png` | 180×180 iOS home-screen icon (iOS does not accept SVG here); static file |
| `public/site.webmanifest` | PWA manifest: brand name, deep theme/background `#1f0f14`, android icons |
| `vercel.json` | Deploy headers: `immutable` caching for `/assets` and `/fonts` only (see "Fonts" below) |

## Fonts

- The brand fonts are **self-hosted**, never loaded from Google Fonts. A third-party stylesheet blocks the first paint of the whole page; removing it reclaimed ~780 ms on Lighthouse's mobile profile. `src/tests/fonts.test.tsx` fails if a `fonts.googleapis.com` or `fonts.gstatic.com` reference comes back.
- Three WOFF2 files in `public/fonts/`, declared in `src/index.css` with `font-display: swap`. The `font-weight` range in each `@font-face` is a contract: a weight outside it is synthesised, not downloaded.
- **Replacing a font file requires renaming it.** `/fonts/*` is served `immutable` for a year, so new bytes under the same name never reach a returning visitor.
- `index.html` preloads only the two faces the first screen needs (Cormorant for the hero `h1`, Figtree for body copy), each with `crossorigin` — fonts are always fetched in CORS mode, and without it the browser downloads every file twice.
- Only the latin subset ships, and it covers the copy: `U+0000-00FF` has á é í ó ú ñ, `U+2000-206F` has the em dash and middle dot.

## SEO + Social

- Meta lives in `index.html` only — canonical, Open Graph, Twitter card, `theme-color`, `robots`, and a JSON-LD `@graph` (Organization, LocalBusiness, Person, WebSite).
- `src/tests/seo.test.tsx` reads `index.html` from disk and asserts the whole contract, so a removed tag fails the suite.
- URLs are intentionally **relative** until a domain is chosen. See the deploy-time step in `docs/project.md`.
- `og-image.png` is generated, not hand-drawn. Change `scripts/generate-og.ts`, then run `bun run generate:og`.
- The LCP photograph is preloaded from `index.html` (`<link rel="preload" as="image">`). This is a client-rendered SPA, so the `<img>` does not exist until the bundle runs; `fetchpriority` alone is too late and Lighthouse reports the request as undiscoverable. Two rules: the preload carries **no** `crossorigin` (an image preload with it forces a second download), and its `href` must match `LCP_PHOTO.src` from `src/data/hero.ts`. `src/tests/lcp.test.tsx` fails if either drifts.

## MCP

- Context7 MCP server is configured (`opencode.json`) with API key for up-to-date library docs and code examples.
- When the user asks to plan or research something for the project, use Context7 to fetch current documentation.

## Copy

- El copy visible **nunca usa la palabra «trabajo»** ni sus derivados (`trabajos`, `trabajar`, `trabaja`, `trabajamos`). Usá sinónimos: `labor`, `proceso`, `acompañamiento`, `práctica`, `sesión`, `objetivo`.
- La única excepción es `src/data/reviews.ts`: son citas textuales de clientas reales, publicadas palabra por palabra, así que no se reescriben.
- El copy va **sin emojis**: la página no usa ninguno. Los símbolos tipográficos (`✕` del modal, `★`, `◀`, `▶`, `❤`) no son emojis y se conservan a propósito.
- `src/tests/copy.test.tsx` es el guard: si la palabra vuelve al copy de marca, la suite falla.
- La edad y los años de dedicación **se calculan**, no se escriben: viven en `src/data/about.ts` (`ageOn()`, `yearsOfPracticeOn()`) y Bio los lee en cada render. No hardcodees "26 años" ni "4 años" en el copy.

## Brand

| Token | Value |
|---|---|
| Display font | Cormorant Garamond — self-hosted, variable 300–700 (roman + italic) |
| Body font | Figtree — self-hosted, variable 300–600 |
| Deep background | `#1f0f14` |
| Primary rose | `#c73a5a` |
| Light rose | `#fef0f5` |
| Accent gold | `#c99a4a` |
| Text on light | `#3a1f28` |
| Warm white | `#fffafc` |

## WhatsApp number

- `src/data/contact.ts` is the **single source of truth**. `Hero.tsx`, `Contact.tsx` and `ServiceModal.tsx` all build their href with `whatsappLink()`. Never hardcode the number anywhere else.
- The same number has three correct forms. Using the wrong one breaks the CTA:

| Destination | Form | Why |
|---|---|---|
| `wa.me` href | `542974216017` | Digits only. A `+`, space or dash makes the link dead. |
| Visible UI text | `+54 297 421 6017` | Human-readable. |
| JSON-LD `telephone` | `+54 297 421 6017` | schema.org wants the international form with `+`. |

- `src/tests/whatsapp.test.tsx` locks that format, so a bad edit fails loudly. `Hero.test.tsx` / `Contact.test.tsx` assert against the constant, never against literal digits.
- **Confirmed on a real phone:** the link opens a chat on the correct number in the digits-only form. Argentine `+54 9 297 421 6017` mobiles are written with a `9`, but the `wa.me` convention drops it, which is what the constant does. If it ever regresses, the fix is a single character in `src/data/contact.ts`.
- The test file is named `whatsapp.test.tsx`, not `contact.test.tsx`: the filesystem is case-insensitive on Windows, so a name differing from `Contact.test.tsx` only by case would resolve to it and overwrite that suite.


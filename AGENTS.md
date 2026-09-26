# Sanarse — AGENTS.md

## Reglas

Antes de planificar cambios grandes en el proyecto (nuevas secciones, cambios de estructura, refactors, rediseños), leé `docs/project.md` para entender la arquitectura completa y el sistema de diseño actual.

## Project

React SPA (Vite + CSS Modules) for "Sanarse", a holistic therapy brand (tarot, energy cleansing). All content is in Spanish.

## Commands

- `bun run dev` — start Vite dev server
- `bun run build` — production build
- `bun run preview` — preview production build
- `bun run test` — run all tests (Vitest)
- `bun run test:watch` — run tests in watch mode
- `bun run generate:og` — regenerate `public/images/og-image.png` from `scripts/generate-og.mjs`

## Structure

| Path | Purpose |
|---|---|
| `docs/project.md` | Full project documentation |
| `index.html` | Vite entry HTML |
| `vite.config.js` | Vite config |
| `src/main.jsx` | React entry point |
| `src/App.jsx` | Layout — renders all sections |
| `src/index.css` | Global reset + CSS variables |
| `src/shared.module.css` | Shared styles (btn-whatsapp) |
| `src/components/Lotus/` | Animated lotus SVG divider |
| `src/components/Hero/` | Hero section + module CSS |
| `src/components/About/` | About section + module CSS |
| `src/components/Services/` | Services cards + module CSS |
| `src/components/Reviews/` | Reviews section + module CSS |
| `src/components/Contact/` | Contact section + module CSS |
| `src/components/Footer/` | Footer with year + module CSS |
| `src/tests/` | Vitest suites, one per component + `seo.test.jsx` for the `index.html` meta |
| `scripts/generate-og.mjs` | Builds the 1200×630 share image (inline SVG → PNG via resvg) |
| `scripts/fonts/` | Brand TTFs, used only by the OG generator |
| `public/images/` | Static assets (`banner.svg`, generated `og-image.png`) |
| `public/favicon.svg` | Lotus mark; also the source for the apple-touch-icon |
| `public/apple-touch-icon.png` | 180×180 iOS home-screen icon (iOS does not accept SVG here) |

## SEO + Social

- Meta lives in `index.html` only — canonical, Open Graph, Twitter card, `theme-color`, `robots`, and a JSON-LD `@graph` (Organization, LocalBusiness, Person, WebSite).
- `src/tests/seo.test.jsx` reads `index.html` from disk and asserts the whole contract, so a removed tag fails the suite.
- URLs are intentionally **relative** until a domain is chosen. See the deploy-time step in `docs/project.md`.
- `og-image.png` is generated, not hand-drawn. Change `scripts/generate-og.mjs`, then run `bun run generate:og`.

## MCP

- Context7 MCP server is configured (`opencode.json`) with API key for up-to-date library docs and code examples.
- When the user asks to plan or research something for the project, use Context7 to fetch current documentation.

## Brand

| Token | Value |
|---|---|
| Display font | Cormorant Garamond (Google Fonts) |
| Body font | Figtree (Google Fonts) |
| Deep background | `#1f0f14` |
| Primary rose | `#c73a5a` |
| Light rose | `#fef0f5` |
| Accent gold | `#c99a4a` |
| Text on light | `#3a1f28` |
| Warm white | `#fffafc` |

## Placeholder

- WhatsApp number `521234567890` in `Hero.jsx`, `Contact.jsx`, `ServiceModal.jsx` **and** in the assertions of `Hero.test.jsx` / `Contact.test.jsx` — update all five before publish. It is deliberately absent from `index.html`; `seo.test.jsx` fails if it ever appears there.

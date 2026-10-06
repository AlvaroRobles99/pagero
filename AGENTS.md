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
- `bun run generate:favicon` — regenerate the favicon PNG set + `apple-touch-icon.png` from `public/images/logo.png`

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
| `src/data/contact.js` | WhatsApp number constants + `whatsappLink()` helper (single source of truth) |
| `src/tests/` | Vitest suites, one per component + `seo.test.jsx` for the `index.html` meta and `whatsapp.test.jsx` for the link format |
| `scripts/generate-og.mjs` | Builds the 1200×630 share image (inline SVG → PNG via resvg) |
| `scripts/generate-favicon.mjs` | Derives the favicon PNG set + `apple-touch-icon.png` from `logo.png` (embedded in SVG → PNG via resvg) |
| `scripts/fonts/` | Brand TTFs, used only by the OG generator |
| `public/images/` | Static assets (`banner.svg`, `logo.png`, generated `og-image.png`) |
| `public/favicon-32x32.png`, `public/favicon-192x192.png`, `public/favicon-512x512.png` | Tab/PWA icon set; generated from `logo.png` via `bun run generate:favicon`, never edited by hand |
| `public/apple-touch-icon.png` | 180×180 iOS home-screen icon (iOS does not accept SVG here); generated from `logo.png` |

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

## WhatsApp number

- `src/data/contact.js` is the **single source of truth**. `Hero.jsx`, `Contact.jsx` and `ServiceModal.jsx` all build their href with `whatsappLink()`. Never hardcode the number anywhere else.
- The same number has three correct forms. Using the wrong one breaks the CTA:

| Destination | Form | Why |
|---|---|---|
| `wa.me` href | `542974216017` | Digits only. A `+`, space or dash makes the link dead. |
| Visible UI text | `+54 297 421 6017` | Human-readable. |
| JSON-LD `telephone` | `+54 297 421 6017` | schema.org wants the international form with `+`. |

- `src/tests/whatsapp.test.jsx` locks that format, so a bad edit fails loudly. `Hero.test.jsx` / `Contact.test.jsx` assert against the constant, never against literal digits.
- **Unconfirmed:** Argentine mobile numbers are often written `+54 9 297 421 6017`, where the `9` marks a mobile line. `wa.me` convention drops the `9`, which is what the constant does. This must be confirmed by opening the link on a real phone. If the `9` turns out to be required, it is a one-character fix in `src/data/contact.js`.
- The test file is named `whatsapp.test.jsx`, not `contact.test.jsx`: the filesystem is case-insensitive on Windows, so a name differing from `Contact.test.jsx` only by case would resolve to it and overwrite that suite.


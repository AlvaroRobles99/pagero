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
| `src/App.tsx` | Layout — renders all sections |
| `src/index.css` | Global reset + CSS variables |
| `src/shared.module.css` | Shared styles (btn-primary) |
| `src/components/Lotus/` | Animated lotus SVG divider |
| `src/components/Hero/` | Hero section + module CSS |
| `src/components/About/` | About section + module CSS |
| `src/components/Services/` | Services cards + module CSS |
| `src/components/Reviews/` | Reviews section + module CSS |
| `src/components/Contact/` | Contact section + module CSS |
| `src/components/Footer/` | Footer with year + module CSS |
| `src/data/contact.ts` | WhatsApp number constants + `whatsappLink()` helper (single source of truth) |
| `src/tests/` | Vitest suites, one per component + `seo.test.tsx` for the `index.html` meta and `whatsapp.test.tsx` for the link format |
| `scripts/generate-og.ts` | Builds the 1200×630 share image (inline SVG → PNG via resvg) |
| `scripts/fonts/` | Brand TTFs, used only by the OG generator |
| `public/images/` | Static assets (`banner.svg`, `logo.png`, generated `og-image.png`) |
| `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png` | Tab/PWA icon set — static files supplied as-is, not generated |
| `public/apple-touch-icon.png` | 180×180 iOS home-screen icon (iOS does not accept SVG here); static file |
| `public/site.webmanifest` | PWA manifest: brand name, deep theme/background `#1f0f14`, android icons |

## SEO + Social

- Meta lives in `index.html` only — canonical, Open Graph, Twitter card, `theme-color`, `robots`, and a JSON-LD `@graph` (Organization, LocalBusiness, Person, WebSite).
- `src/tests/seo.test.tsx` reads `index.html` from disk and asserts the whole contract, so a removed tag fails the suite.
- URLs are intentionally **relative** until a domain is chosen. See the deploy-time step in `docs/project.md`.
- `og-image.png` is generated, not hand-drawn. Change `scripts/generate-og.ts`, then run `bun run generate:og`.

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


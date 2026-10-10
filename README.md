# Sanarse

SPA de terapias holísticas para **Rocío Durazno** — tarot, limpiezas energéticas y acompañamiento espiritual.

## Stack

React 19 • Vite 8 • CSS Modules • Vitest • Bun

## Inicio rápido

```bash
bun install
bun run dev          # Servidor de desarrollo
bun run build        # Compilación producción
bun run test         # Tests (Vitest)
bun run generate:og  # Regenera public/images/og-image.png
```

## Estructura

```
src/components/   → 8 componentes (Hero, About, Lotus, Services, ServiceModal, Reviews, Contact, Footer)
src/data/         → services.js, reviews.js, contact.js (WhatsApp), social.js (redes)
src/tests/        → 11 suites de test + setup.js
scripts/          → generate-og.mjs (imagen de compartir 1200×630)
public/           → favicons, site.webmanifest, imágenes estáticas
docs/project.md   → Documentación completa del proyecto
```

[Documentación completa →](docs/project.md)

## Antes de publicar

- Completar el dominio de deploy y volver absolutas las URLs de `index.html` (ver `docs/project.md`).

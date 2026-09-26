# Sanarse

SPA de terapias holísticas para **Rocío Durazno** — tarot, limpiezas energéticas y acompañamiento espiritual.

## Stack

React 19 • Vite 8 • CSS Modules • Vitest • Bun

## Inicio rápido

```bash
bun install
bun run dev      # Servidor de desarrollo
bun run build    # Compilación producción
bun run test     # Tests
```

## Estructura

```
src/components/   → 7 componentes (Hero, About, Lotus, Services, Reviews, Contact, Footer)
src/data/contact.js → número de WhatsApp + helper whatsappLink()
src/tests/        → 10 archivos de test (67 tests)
docs/project.md   → Documentación completa del proyecto
```

[Documentación completa →](docs/project.md)

## Antes de publicar

- Confirmar el número de WhatsApp en un teléfono real: la constante vive en `src/data/contact.js`. Ver la ambigüedad del `9` en `AGENTS.md`.
- Completar el dominio de deploy y volver absolutas las URLs de `index.html` (ver `docs/project.md`).

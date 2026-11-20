# Self-host fonts + immutable cache — Sanarse

Objective: remove the third-party render-blocking font chain and give the Vercel deployment real HTTP caching.
Branch: `perf/self-host-fonts-and-cache`. Delivery: single PR. Runner: `bun run test`, `bun run typecheck`, `bun run build`.

## Specs

S1. `index.html` must not reference any third-party font host. No `fonts.googleapis.com`, no `fonts.gstatic.com`, and no `preconnect` to either. The only remaining font source is the site's own origin under `/fonts/`.

S2. The brand typography must be visually unchanged: `--font-display` stays `'Cormorant Garamond', Georgia, serif` and `--font-body` stays `'Figtree', 'Segoe UI', Tahoma, sans-serif`. The same families, the same weights, the same fallbacks.

S3. Every `@font-face` in `src/index.css` declares `font-display: swap`, so first paint never waits for the font. This preserves the current behaviour (`display=swap` in the Google URL).

S4. `index.html` preloads exactly two faces — the ones text above the fold needs: `cormorant-garamond-latin.woff2` (the hero `h1`, weight 700) and `figtree-latin.woff2` (all body copy). Each preload carries `as="font"`, `type="font/woff2"` and `crossorigin`; without `crossorigin` the browser fetches the font twice. The italic face is not preloaded: it is one tagline line and competes with the LCP photo.

S5. `vercel.json` serves the content-addressed build output and the stable font files with `cache-control: public, max-age=31536000, immutable`:
- `/assets/(.*)` — Vite fingerprints these, so a content change always changes the name.
- `/fonts/(.*)` — stable names, so a replaced font file must be renamed. Documented, not enforced.
Nothing else changes: `public/images/*` keeps Vercel's default, because those filenames are stable and replacing a photograph must take effect immediately, not after a year.

S6. The regression guard is a test, not a comment. `src/tests/fonts.test.tsx` reads `index.html`, `src/index.css` and `vercel.json` from disk and fails if:
- a third-party font host or preconnect comes back;
- a declared font file is missing from `public/fonts/` or is not a WOFF2 (`wOF2` signature);
- an `@font-face` loses `font-display: swap`;
- a preload target does not resolve to an existing file.

S7. The font payload must not grow beyond the status quo. Baseline measured against the live Google CSS: 58,880 B across three files. Shipped: 82,832 B (`23,416` roman + `39,260` italic + `20,156` Figtree). The +23 KB buys an explicit `font-weight` range per file — the italic keeps a real 400–500 axis instead of a static 400 instance — and is recorded here instead of being an accident. The 780 ms of render-blocking this removes is the trade.

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T1 | S1-S4, S6, S7 | inline | done | `bebdcbd` |
| T2 | S5 | inline | done | `0a68bb5` |
| T3 | S1-S7 (docs) | inline | done | docs commit |

## Log

L1 (original request, verbatim):

> solo lectura [Image 1] analiza esa informacion y dime como puedo mejorarla cfeo que las fuentes de google me atrasa como lo arrglo opciones

L2 (authorization, verbatim):

> implementa la 1 opcion

L3 — Diagnosis. The PageSpeed panel reports "Solicitudes de bloqueo de renderización — Ahorro estimado de 780 ms" for `https://fonts.googleapis.com/css2?...`. Measured facts:
- The Google CSS is 15,469 bytes with 38 `@font-face` blocks (5 subsets × variants), 1.6 KB brotli, 780 ms on Lighthouse's mobile profile. It is a `<link rel="stylesheet">`, so it blocks the whole page render, not only the text.
- Trimming weights saves nothing: Google already serves variable files and repeats one URL per style. The live payload is 3 unique files, 58,880 B.
- `fonts.gstatic.com` serves `public, max-age=31536000`. `fonts.googleapis.com` serves `private, max-age=86400`.
- The Vercel deployment (`pagero.vercel.app`) serves **everything** with `cache-control: public, max-age=0, must-revalidate`, including hashed `/assets/*.css`. No `vercel.json` exists in the repo. Without fixing that first, self-hosted fonts would revalidate on every visit — worse than today.

L4 — Decision: option 1 (self-host + immutable headers), with the cache work treated as a prerequisite rather than an afterthought.

L5 — Font calibration. Requesting discrete weights and requesting a range do not return the same file; the axis span drives the size. Probed per family/style:

| Request | File | Bytes |
|---|---|---|
| Cormorant `wght@400` | static 400 | 13,920 |
| Cormorant `wght@700` | static 700 | 13,832 |
| Cormorant `wght@400..700` | variable 400-700 | 23,416 |
| Cormorant `ital,wght@1,400` | static 400 italic | 23,660 |
| Cormorant `ital,wght@1,400..500` | variable 400-500 italic | 39,260 |
| Figtree `wght@300..600` | variable 300-600 | 20,156 |

Shipped the three variable files (82,832 B): one file per style, `font-weight` ranges declared explicitly, so a later italic bold degrades gracefully instead of synthesising faux-bold. The latin subset covers Spanish entirely — `U+0000-00FF` carries `á é í ó ú ñ`, and `U+2000-206F` carries the em dash and middle dot the copy uses.

L6 — Why `/fonts/` and not `src/assets/fonts/` with a Vite hash: the preload in `index.html` cannot name a hashed file, because the hash only exists after the build. Stable filenames plus an explicit immutable header gets the same cache behaviour and a working preload. The cost is a rule the docs must state: replacing a font file requires renaming it, or the old bytes stay cached for a year.

L7 — Verification evidence.

| Check | Command | Result |
|---|---|---|
| Suite | `bun run test` | 16 files, 144 tests passed |
| Types | `bun run typecheck` | no errors in 17 + 3 + 33 files (app, tooling, tests) |
| Build | `bun run build` | 1.29 s; `dist/fonts/` holds the three files; built HTML keeps both preloads; built CSS keeps `font-weight:400 700` / `400 500` / `300 600` and `font-display:swap`, and Vite leaves `/fonts/*` unhashed |
| Asset serving | `bun run preview` + `curl -I /fonts/*.woff2` | `200`, `Content-Type: font/woff2`, `Content-Length` identical to disk (20.156 B / 39.260 B) |
| Third-party gone | grep of the served HTML | no `googleapis`, both `rel="preload"` present |

Gap, stated rather than hidden: jsdom does not load fonts, so no automated check proves the glyphs render. The structural proofs are that each file is a real WOFF2 (`wOF2` signature, > 5 KB) and that the declaration matches the range the file was generated for. A visual pass in a browser before merging is the remaining human step, together with a re-run of PageSpeed against the deployed preview to confirm the 780 ms is gone.

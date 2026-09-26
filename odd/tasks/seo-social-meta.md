# SEO + Social Meta

## Objective

Make the Sanarse landing page discoverable and correctly previewed when shared. Today `index.html` has only a `<title>` and one `description`. There is no canonical URL, no Open Graph, no Twitter card, no structured data, no favicon, and no share image.

## Problem

The entire conversion path of this site is a WhatsApp link. When Rocío shares `sanarse` on WhatsApp, Instagram, or Facebook, the link renders with **no preview image and no card formatting** — plain URL text. For a tarot/holistic-practice business whose entire funnel is "tap through and message me," a broken preview is a measurable loss of trust at the exact moment a prospective client decides whether to tap.

Secondary problem: the site is invisible to Google rich results. It has no structured data, so it cannot qualify for price/service snippets.

## Why

User request: "Not a bug — a new feature," selected as **SEO + social meta**.

## Scope

### In scope
1. **OG share image** — generate a real 1200×630 PNG. SVG is not acceptable: WhatsApp and Facebook do not render SVG for `og:image`.
2. **`index.html` meta** — canonical, Open Graph, Twitter card, `theme-color`, `robots`, and JSON-LD structured data.
3. **Favicon** — SVG favicon + `apple-touch-icon` so the tab and iOS home screen are not blank.
4. **Tests** — assert the meta contract so it cannot silently regress.
5. **Docs** — record the new files in `AGENTS.md` and `docs/project.md`.

### Out of scope (requires user input, do NOT invent)
- **Real WhatsApp number.** `521234567890` is a placeholder hardcoded in `Hero.jsx:13`, `Contact.jsx:12`, `ServiceModal.jsx:79`. It is **excluded from JSON-LD `telephone`** — publishing a fake number in structured data is worse than omitting it.
- **Domain / absolute URLs.** Site is not live yet. Per user decision: use **relative** URLs. A single canonical URL becomes absolute at deploy time in one place.
- **`address`, `geo`, `areaServed`, `priceCurrency`, `openingHours`.** Not known. Omitted rather than fabricated. See "Known gaps" below.

## Constraints

- **Artifact language: English** for code, comments, identifiers, and script internals. **Spanish for user-facing `og:title`, `og:description`, JSON-LD `name`/`description`** — that is site content, matching existing `index.html`.
- Zero new runtime dependencies. `@resvg/resvg-js` is a **devDependency only**; the generated PNG is committed so production never needs it.
- No visual design change to the site itself.
- Repository is **not under git**. No commits. Do not initialize git.

## Toolchain — VERIFIED, do not re-derive

| Fact | Evidence |
|---|---|
| `@resvg/resvg-js@2.6.2` installs and rasterizes | Installed clean; rendered valid PNG |
| Brand **variable** fonts render correctly | Brand-font render ≠ system-fallback render (`Buffer.compare` differs) |
| Fonts fetched from `google/fonts` | `ofl/cormorantgaramond/CormorantGaramond[wght].ttf` (1168 KB), `ofl/figtree/Figtree[wght].ttf` (61 KB) |
| Downloaded to `scripts/fonts/` | Both present, verified |
| PowerShell 5.1 **globs `[wght]`** in `-OutFile` | Must use `[System.IO.File]::WriteAllBytes` / `WebClient.DownloadFile` |
| `C:\Windows\system32\convert.exe` is the **NTFS converter, not ImageMagick** | Do not use for rasterizing |
| `bun` on PowerShell 5.1 prints a spurious `NativeCommandError` preamble on success | Not a failure; read the result that follows |

## Tasks

### T1 — OG image pipeline
- [x] `scripts/generate-og.mjs`: builds the 1200×630 SVG (brand gradient `#1f0f14`→`#c73a5a`, `Cormorant Garamond` wordmark, `Figtree` subtitle) → `Resvg` with `fontFiles` pointing at `scripts/fonts/*.ttf`, `loadSystemFonts: false` → writes `public/images/og-image.png`.
- [x] Subtitle text uses real site content: `Lectura de Tarot · Limpieza Energética`.
- [x] `package.json` script `generate:og`.
- [x] **Verify:** PNG exists, is a valid PNG signature, and is exactly 1200×630. Also assert it is **not** byte-identical to a system-font render (proves the brand font applied).

### T2 — index.html meta
- [x] `<link rel="canonical" href="/">` — single place to make absolute at deploy.
- [x] Open Graph: `og:type`, `og:locale=es_MX`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (+ `og:image:width/height/alt`).
- [x] Twitter: `summary_large_image` card.
- [x] `<meta name="theme-color" content="#1f0f14">`, `<meta name="robots" content="index, follow">`.
- [x] Favicon SVG + `apple-touch-icon`.
- [x] JSON-LD `@graph`: `Organization`/`LocalBusiness` + `Person` (Rocío Durazno) + `WebSite`. Spanish `name`/`description`. `offers` **omitted** (currency unknown). No fabricated `address`/`geo`/`telephone`.

### T3 — Meta contract test
- [x] `src/tests/seo.test.jsx` reading `index.html` from disk via `node:fs`.
- [x] Asserts: canonical present, all 5 required `og:*`, `og:image` width/height, `twitter:card`, `theme-color`, valid parseable JSON-LD.
- [x] **Write this test BEFORE T2 changes land, and observe it fail.** That RED is the evidence.

### T4 — Docs
- [x] `AGENTS.md`: add `scripts/generate-og.mjs`, `scripts/fonts/`, `public/images/og-image.png`, favicon to structure.
- [x] `docs/project.md`: add a "SEO + Social" section; document the `generate:og` command and the deploy-time canonical step.

## Route declaration

| Task | Route | Trigger evidence |
|---|---|---|
| T1 | Delegated writer | New non-trivial file, design decisions |
| T2 | Delegated writer | Non-trivial; shares T1's design context |
| T3 | Delegated writer | New test file |
| T4 | Delegated writer | 2 files, must match what was built |

Single bounded writer for all four: 5+ non-trivial files touched with shared design context. Splitting would fragment the design decisions.

## TDD

Not configured in this project — no declared mode. Repo convention is **one test file per component** (`src/tests/*.test.jsx`). Resolved: test runner `bun run test`; tests written alongside behavior, and T3 is written first so its RED is observed before T2.

## Acceptance criteria

1. `bun run test` passes with the new suite included.
2. `bun run build` succeeds.
3. `public/images/og-image.png` is a valid 1200×630 PNG rendered in the brand fonts.
4. `index.html` contains canonical, OG, Twitter, theme-color, and parseable JSON-LD.
5. No fabricated business data (no phone, address, geo, or currency).
6. Docs match the actual file tree.

## Checks

- `bun run test`
- `bun run build`
- PNG structural validation (signature + dimensions + brand-font-difference assertion)

## Known environmental failures

None. Baseline is green: 25/25 tests, build succeeds.

## Known gaps (need Rocío, not engineering)

- ~~Real WhatsApp number~~ → **resolved** in `550dc63`; `telephone` is now on the JSON-LD `Person`
  node. Remaining caveat: confirm the Argentine `9` by tapping on a real phone.
- City / service area → `address`, `geo`, `areaServed`.
- Currency for `$500` / `$700` / `$1000` → `offers.priceCurrency`.
- Deploy domain → make canonical, `og:url`, `og:image` absolute.
- **Visual sign-off on `og-image.png` cannot be automated here.** This model has no image input. I can only assert it is structurally valid and rendered with the brand fonts. Rocío must eyeball the design.

## Progress

All four tasks complete. Independently re-verified by the orchestrator, not taken on trust.

| Task | Status | Evidence |
|---|---|---|
| T1 | ✅ | `public/images/og-image.png` valid PNG sig `89504e470d0a1a0a`, exactly 1200×630, 291 KB. `bun run generate:og` byte-idempotent across runs (sha256 `D6555D4…2FDB33`). Brand-font render differs from no-font render. |
| T2 | ✅ | `index.html` has canonical, robots, theme-color, 9 `og:*`, 5 `twitter:*`, favicon, apple-touch-icon, JSON-LD `@graph` with 4 nodes. |
| T3 | ✅ | `src/tests/seo.test.jsx`, 29 substantive assertions. **RED observed before T2: 27 failed / 2 passed** (the 2 passing were `lang="es"` and the placeholder-number absence, both correct on the pre-T2 file). |
| T4 | ✅ | `AGENTS.md` structure + `docs/project.md` "SEO + Social" section. |

Final suite: **9 files, 54 tests, all passing.** Build succeeds.

### The one real bug found and fixed

`<link rel="canonical" href="/" />` **breaks the Vite build** without `vite-ignore`. Vite resolves every `link[href]` as a build asset, and `href="/"` is a directory.

**Verified empirically, not assumed:** stripping `vite-ignore` → `EISDIR: illegal operation on a directory, read` in `vite:build-html`. Restoring it → build passes. `og:url` and `og:image` are unaffected; only `link[href]` is asset-resolved.

> `vite-ignore` on that tag is **load-bearing while the href is relative**. Stripping it from
> `href="/"` fails the build. Re-verified in `ad65c95` with tag-anchored replacements and cold
> builds: once the href becomes absolute at deploy time, Vite leaves external URLs alone and the
> attribute becomes optional. Keep it or drop it — both build. The `index.html` comment was
> corrected to state this.

### Findings outside the original scope

- **`go.mod` is junk** — contains `module e` / `go 1.27.1`, created 2026-09-26 00:27 (before this session). Stray Go file in a React/Vite project. **Flagged, not deleted** — out of authorized scope.
- **The repo has zero commits and all 58 files untracked.** `gentle-ai review assess` therefore rates any candidate `unassessable`, which the contract escalates to `high` risk. That rating is a mechanical artifact of the missing baseline, not a real risk signal. `gentle-ai review status` reported `applicability: "unrelated"`, `base_tree` = git's empty tree, `paths: []`, and demanded an `intended_untracked_selection` spanning all 58 files including 1.2 MB font binaries.
- The `.git` directory was created by the orchestrator's own `gentle-ai review` call at 11:16, **not** by the delegated writer (writer's last write 11:07:47; `.git/logs/HEAD` empty).
- resvg ignores `font-weight` on variable fonts — 400/600/700 render byte-identical. Type hierarchy in the OG image comes from size/color/tracking.
- Windows: `path.resolve(root, 'public', '/images/og-image.png')` yields `C:\images\…` — a leading slash is drive-absolute. The test strips it.

## Next step

Nothing pending on the feature itself. Resolved during the session:

- ~~Establish a git baseline~~ — **done.** Commit `2c0a35a`, 56 files, 3286 insertions. Stray `go.mod` deleted. Working tree clean.
- `opencode.json` was found to contain a live `CONTEXT7_API_KEY` and is now **gitignored**. It was never committed, so the key was never exposed and does not need rotating.

Still awaiting the user:

1. ~~**Real WhatsApp number**~~ — **done** in `550dc63`. The placeholder was replaced with the real
   number via a single `src/data/contact.js` module, and `telephone` was added to the JSON-LD
   `Person` node. One caveat remains open: whether the Argentine mobile form needs the `9`
   (`5492974216017`) must be confirmed by tapping the link on a real phone.
2. **Visual sign-off on `og-image.png`** — structural validity is proven; the design is not. Needs human eyes.
3. **Deploy domain** — make canonical, `og:url`, `og:image`, `twitter:image` absolute.

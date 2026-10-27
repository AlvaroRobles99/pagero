# TypeScript migration — F0 + F1

Status: phase 2 done · next is F2 slice B · Branch: `refactor/typescript-baseline` · Started: 2026-10-27

## Objective

Make the TypeScript toolchain that is already installed actually type-check something, and give the
data layer real contracts, without touching a single component or test.

## Problem

`typescript@7.0.2` is installed, `tsconfig.json` exists and `bun run typecheck` prints
"No type errors in 30 files". That green is decorative:

- `checkJs` is off, so every `.js` / `.jsx` file is parsed but never checked.
- `tsconfig.json` has no `include` / `exclude`, so `tsc -p tsconfig.json` also walks `dist/` and
  reports 2,366 errors from the minified bundle.
- `lib` is `["ESNext"]` and `types` is `["bun"]`: no DOM lib for a browser app, and Bun globals leak
  into component code.
- `typescript` sits in `peerDependencies`, which is where a published library declares it, not an app.

## Why

The four files in `src/data/` are the single source of truth for services, reviews, social links and
the WhatsApp link. Nothing verifies their shape, so a missing field only fails at runtime — and the
WhatsApp number is the site's only conversion path.

## Scope (authorized)

- **F0 — toolchain honesty.** `tsconfig.json`, new `tsconfig.node.json`, `package.json`.
- **F1 — data contracts.** `src/data/{services,reviews,social,contact}.js` → `.ts` with exported types.

## Out of scope (not authorized in this pass)

- F2: components (`src/components/**`, `App.jsx`, `main.jsx`) stay `.jsx`.
- F3: tests (`src/tests/**`) stay `.jsx` / `.js`.
- F4: CI gate (`bun run typecheck` as a required check).
- F5: `scripts/generate-og` to TS, typed CSS Modules.

## Constraints

- No behavior change: same exported values, same default/named exports, same module specifiers.
- No `any`, no `as`, no `@ts-ignore`, no non-null assertions. If a type fights back, fix the type.
- Existing comments stay verbatim (they are the domain documentation). New comments in the same
  neutral Spanish as the file they live in.
- No formatting churn: only the lines the migration actually needs.
- No new dependencies.
- Old `.js` data files must be deleted, not left beside the `.ts` ones: Vite resolves `.js` before
  `.ts`, so a leftover file would silently win and the typed file would be dead code.

### Two authorized exceptions (recorded, not silent)

- The `whatsappLink` JSDoc was rewritten instead of merely stripped of `@param` / `@returns`, to keep
  the empty-`?text=` rationale in the file's own Spanish. Behavior text unchanged.
- The `it()` title in `src/tests/seo.test.jsx` was updated from `social.js` to `social.ts`. It is a
  documentation string inside a test name; no test logic, selector or assertion was touched.

## Tasks

| ID | Task | Route | State |
|---|---|---|---|
| F0.1 | Rewrite `tsconfig.json` as the app project (DOM lib, explicit `include`, `checkJs: false` with a note, no `dist`) | inline (design) | done |
| F0.2 | Add `tsconfig.node.json` for `scripts/` + Vite configs (Bun/Node types, no DOM) | inline (design) | done |
| F0.3 | `package.json`: move `typescript` to `devDependencies`, drop `peerDependencies`, chain both projects in `typecheck` | delegated | done |
| F1.1 | `services.js` → `services.ts` + `Service` interface | delegated | done |
| F1.2 | `reviews.js` → `reviews.ts` + `Review` interface | delegated | done |
| F1.3 | `social.js` → `social.ts` + `SocialLink` interface | delegated | done |
| F1.4 | `contact.js` → `contact.ts` typed `whatsappLink()` | delegated | done |

## Route declaration

Writer trigger fired: 7 non-trivial files (2 configs + 4 data files + `package.json`), so F0.3 + F1
go to one bounded `gentle-ai-worker`. The config *design* was decided inline during exploration, so
the worker executes a fixed spec instead of re-deriving it.

### Phase 2 — F4 + F2 slice A (current)

| ID | Task | Route | State |
|---|---|---|---|
| F4.1 | Add `bun run typecheck` to the existing `verify` job, before Test | delegated | done |
| F2A.1 | `Lotus` → `.tsx` with `LotusProps` | delegated | done |
| F2A.2 | `Footer` → `.tsx` | delegated | done |
| F2A.3 | `Hero` → `.tsx` | delegated | done |
| F2A.4 | `About` → `.tsx` | delegated | done |
| F2A.5 | `Contact` → `.tsx` (first consumer of the typed `SOCIAL_LINKS`) | delegated | done |
| F2A.6 | `App` → `.tsx` | delegated | done |

F4 is one step inside the existing `Verify` job, which is already a required status check on `main`:
no new check, no GitHub Settings change, and the gate becomes mandatory as soon as it merges.

Slice A is the low-risk half of F2: five of the six components take no props at all, and only
`Lotus` needs an interface (`size?: number`, `className?: string`). `Services`, `Reviews` and
`ServiceModal` stay `.jsx` for slice B, where the refs, timers and focus trap live.

### Phase 2 evidence — observed

| Check | Result |
|---|---|
| `bun run typecheck` | 14 app + 3 node files, exit 0 |
| `bun run test` | 11 suites / 103 tests, exit 0 |
| `bun run build` | 38 modules, exit 0 |
| Rename fidelity | five files are 100% identical blobs; `Lotus` has exactly one hunk (interface + typed parameter) |
| Program membership | `bun check --listFiles` lists all six `.tsx` and nothing from `src/tests` |
| Risk assessment | `high` (`shell_source` on `ci.yml`), `review_due: true` |
| Independent verification | `pass-with-notes`: CI diff is +3/−0, no leftover `.jsx` at the six paths, no `any`/`as`/`!`, lockfile ships `@typescript/typescript-linux-x64` |

The gate is one step inside the already-required `Verify` job: no new check, no GitHub Settings
change. It cannot be proven locally — the first real Actions run happens on the first push of this
branch.

## Delivery forecast

Measured after phase 2: 342 authored changed lines (additions + deletions, docs included), of which
117 are code. Still under the ~400-line budget, so the feature stays a single PR slice with
`ask-on-risk` and no chaining. If slice B pushes the count past 400, the chain-strategy question is
asked once, before the next commit — not after.

## Test-first policy

No new behavior, so there is no meaningful RED: the existing suite *is* the regression guard. Every
test must stay green and no test file may be modified in this pass. The type-level proof is the gate
itself (see Checks).

## Checks — observed

| Check | Result |
|---|---|
| `bun run typecheck` | `✓ No type errors in 14 files` + `✓ No type errors in 3 files`, exit 0 |
| `bun run test` | `Test Files 11 passed (11)` · `Tests 103 passed (103)`, exit 0 |
| `bun run build` | `✓ 38 modules transformed`, built in ~4.5s, exit 0 |
| Negative probe | `const __probe: number = 'not a number'` in `src/data/services.ts` → `TS2322`, exit 1. Reverted, gate green again |
| No `src/data/*.js` | `src/data/` holds exactly the four `.ts` files |
| Risk assessment | `gentle-ai review assess` → `medium`, `review_due: false` (`under_budget`) |
| Independent verification | `pass-with-notes`: zero string drift (28/28, 9/9, 12/12, 2/2 literals), WhatsApp digits unchanged, lockfile matches, no stray edits |

Findings from the independent verifier, resolved before the docs commit:

- `README.md` still listed the four `.js` data files → fixed.
- The node project's three files are JS with `checkJs: false`, so "3 files" reports inclusion, not
  checking. Documented in `docs/project.md` so nobody reads that green as coverage.

## Commits

| Work unit | Commit |
|---|---|
| F0 config | `0715c51 chore(tooling): split tsconfig into app and node projects` |
| F1 data | `38cf6b5 refactor(data): migrate the data layer to TypeScript` |
| Docs (phase 1) | `952134a docs: document the TypeScript baseline and update data paths` |
| F4 CI gate | `fa726c0 ci: typecheck before tests in the verify job` |
| F2 slice A | `5727018 refactor(components): migrate the static components to TypeScript` |
| Docs (phase 2) | this commit |

## Progress log

- 2026-10-27: branch created, task document written, baseline measured (30 files, 0 errors, nothing
  checked; `tsc -p` pulls `dist/`; 66 errors under an honest web config).
- 2026-10-27: F0 + F1 implemented by one worker, verified by the parent and by an independent
  verifier, committed in three work units.

## Next step

F2 slice B: `Services` (with `useOnScreen` and the `IntersectionObserver` callback), `Reviews`
(timer, `useRef`, modulo indexing) and `ServiceModal` (portal, focus trap, `querySelectorAll` under
`noUncheckedIndexedAccess`). Those are the ~20 real possibly-null findings from the baseline
measurement — the only place in this repo where the types catch bugs instead of styling.

Then slice C (`main.jsx` and the root guard) and F3 (tests). The `allowJs` note comes off only when
no `.js` or `.jsx` is left in `src`.

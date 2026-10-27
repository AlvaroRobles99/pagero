# TypeScript migration — the app is TypeScript

Status: phase 4 done, merged in #18 · phase 5 (F3) implemented, pending PR · Branch: `refactor/typescript-tests` · Started: 2026-10-27

## Objective

Make the TypeScript toolchain that was already installed actually type-check something, give the
data layer real contracts, put the gate in CI, and move the app to `.ts` / `.tsx` without changing
behaviour.

## Problem

`typescript@7.0.2` is installed, `tsconfig.json` exists and `bun run typecheck` printed
"No type errors in 30 files". That green was decorative:

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

## Scope (authorized, all delivered)

- **F0 — toolchain honesty.** `tsconfig.json`, new `tsconfig.node.json`, `package.json`.
- **F1 — data contracts.** `src/data/{services,reviews,social,contact}.js` → `.ts` with exported types.
- **F2 — components.** Every component, `App` and `main` → `.tsx`; `allowJs` off for the app project.
- **F4 — CI gate.** `bun run typecheck` inside the already-required `Verify` job.
- **F3 — tests.** New `tsconfig.test.json` (DOM + Node); `src/tests/**` → `.tsx`; `setup.js` → `setup.ts`.

## Not done (deliberate)

- F5: `scripts/generate-og` to TS, typed CSS Modules.
- The three `.js` of the tooling project are still included but not checked (`checkJs: false`).

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
- The `it()` title in `src/tests/seo.test.tsx` was updated from `social.js` to `social.ts`. It is a
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

### Phase 3 — F2 slice B

| ID | Task | Route | State |
|---|---|---|---|
| F2B.1 | `Services` → `.tsx`: `ServiceCardProps`, `useOnScreen(ref: RefObject<HTMLDivElement \| null>)`, `useState<Service \| null>` | delegated | done |
| F2B.2 | `Reviews` → `.tsx`: `useRef<ReturnType<typeof setInterval> \| null>`, typed `goTo` | delegated | done |
| F2B.3 | `ServiceModal` → `.tsx`: `ServiceModalProps`, typed refs, DOM `KeyboardEvent` for the window listener, React `MouseEvent` for the JSX handler, `focusables` guard | delegated | done |

This is the slice where the compiler can prevent a runtime crash instead of a CSS typo. Two rules
decide whether it stays honest:

- `verbatimModuleSyntax` is on: every type-only import must be `import type`, or the build breaks.
- `noUncheckedIndexedAccess` is on: `focusables[0]` is `Element | undefined`. Guard it; do not assert.

### Phase 3 evidence — observed

| Check | Result |
|---|---|
| `bun run typecheck` | 14 app + 3 node files, exit 0 |
| `bun run test` (changed suites) | 3 files / 22 tests, exit 0 — re-run by the parent |
| `bun run test` (full) | 11 files / 103 tests, exit 0 — worker |
| `bun run build` | 38 modules, exit 0 |
| Diff shape | `-M` similarity 95% / 81% / 79%: only imports, type annotations and two guards |
| Risk assessment | `medium` (`executable_change`), `review_due: false` (`under_budget`) |
| Discipline | no `any`/`as`/`!`; DOM `KeyboardEvent` on the window listener, React `MouseEvent` on the JSX handler |

Three places where the compiler paid for itself instead of decorating the code:

- `([entry])` from `IntersectionObserver` is `IntersectionObserverEntry | undefined`; `entry?.isIntersecting`
  keeps the original behaviour and stops a crash the JS version could have had.
- `focusables[0]` and `focusables[length - 1]` are `Element | undefined`; the `if (!first || !last) return`
  guard is unreachable in practice, but it is what makes the rest provable without a cast.
- `querySelectorAll<HTMLElement>(FOCUSABLE)` gives `.focus()` on the results — a type argument, not an
  assertion, so nothing was silenced.

### Phase 4 — F2 slice C + closing `allowJs` (current)

| ID | Task | Route | State |
|---|---|---|---|
| F2C.1 | `src/main.jsx` → `main.tsx`, with a real root guard instead of `!` | inline | done |
| F2C.2 | `index.html` entry points at `/src/main.tsx` | inline | done |
| F2C.3 | App tsconfig turns `allowJs` off and drops the now-dead `checkJs` | inline | done |
| F2C.4 | Docs stop claiming a `.jsx` is left in `src/` | inline | done |

Route is inline on purpose: one source file plus two one-line config edits. The writer trigger asks
for two or more non-trivial files, and this is one.

### Phase 4 evidence — observed

| Check | Result |
|---|---|
| `bun run typecheck` | 14 app + 3 node files, exit 0 |
| App program | `bun check --listFiles`: 14 project files, all `.ts`/`.tsx`, zero `.js`/`.jsx`, nothing from `src/tests` |
| `bun run test` | full suite, 11 files / 103 tests, exit 0 — `index.html` changed, so the SEO contract had to be re-proven |
| `bun run build` | 38 modules, exit 0 — Vite resolves the new entry point |
| Leftover JS | `src/` outside `src/tests` holds zero `.js` and zero `.jsx` |
| Risk assessment | `medium` (`executable_change`), `review_due: false` (`under_budget`) |
| CI, first real run | `Verify` green on PR #18: `Typecheck` printed **`No type errors in 14 files`** on ubuntu (not an empty program), `Test` 11 files, `Build` ok |

The root guard is the whole point of the slice: `createRoot` needs an `Element`, and the cheap fix is
`document.getElementById('root')!`. Instead the container is checked once and the app fails with
`Root element #root not found in index.html` — a message a human can act on — which is why no `!`
was needed anywhere in the migration.

### Phase 5 — F3, tests to TypeScript (done)

| ID | Task | Route | State |
|---|---|---|---|
| F3.1 | New `tsconfig.test.json`: `src/tests`, `types: ["vite/client", "vitest/globals", "node"]` | delegated | done |
| F3.2 | `@types/node` declared in `devDependencies` — it is already installed through `@types/bun`, so declaring it removes the reliance on hoisting rather than adding a package | delegated | done |
| F3.3 | 11 `*.test.jsx` → `.test.tsx` and `setup.js` → `setup.ts` | delegated | done |
| F3.4 | `vitest.config.js` setup path, and the `typecheck` script chains the third project | delegated | done |

The third project is what keeps the browser project honest: the app project still carries no Node
types, so `process` or `node:fs` can never leak into component code. Tests are the only place where
both worlds meet, and that project is excluded from the app program.

Evidence, re-run by the parent instead of taken from the worker's report:

| Check | Result |
|---|---|
| `bun run typecheck` | 14 app files, 3 node files, 25 test files, no errors |
| `bun run test` | 11 files / 103 tests, exit 0 |
| `bun run build` | 38 modules transformed |
| `bun check -p tsconfig.test.json --listFiles` | 12 entries under `src/tests`, no `.js` / `.jsx` left |

Five of the eleven suites moved with zero content change (`About`, `App`, `Footer`, `Lotus`,
`Services`). The rest only added what the compiler demanded: parameter types and helpers in
`seo.test.tsx` (`required<T>`, `JsonLdNode`), a `Review` helper in `Reviews.test.tsx` that throws
instead of indexing into `reviews[index]`, and `if (!node) throw` guards where a DOM lookup returns
`T | null` right before `fireEvent.click` or `getAttribute`. No `any`, no `as`, no `!`, and not one
assertion changed.

One deviation worth naming: `seo.test.tsx` validates the JSON-LD script at module scope, so a missing
`<script type="application/ld+json">` now fails during collection instead of producing about eighteen
assertion failures. Same red suite, earlier and clearer message.

## Delivery forecast

At the phase 4 code commit (`851d664`) the branch measures **471 authored lines** (405 insertions +
66 deletions), of which **175 are code** and 296 are documentation; the commits that close this
phase add a few more, all of it documentation. Git's rename detection collapses the ten
`.jsx` → `.tsx` moves, so a reviewer sees annotation lines, not moved files.

The ~400 heuristic is exceeded by 71, and every one of those 71 lines is documentation. The split is
what decides the size question: the code half is 175 lines, every component hunk is a rename or a
type annotation, and chaining would either separate the docs from the code they describe or hold the
CI gate back into a second PR. `ask-on-risk` is recorded here with the measurement rather than a
forecast, and the eleven work-unit commits are already cut on the seams — config, data, CI,
components, entry point, docs — so splitting later is a cherry-pick away, not a rewrite.

## Test-first policy

No new behavior, so there is no meaningful RED: the existing suite *is* the regression guard. Every
test must stay green and no test file may be modified in this pass. The type-level proof is the gate
itself (see Checks).

F3 is the one place where a test file changes: extensions, type annotations, and null guards only.
Not one assertion, selector, test name or expectation was touched, and the suite still reports 11
files / 103 tests.

## Checks — observed

| Check | Result |
|---|---|
| `bun run typecheck` | `✓ No type errors in 14 files` (app) + `3 files` (node) + `25 files` (tests), exit 0 |
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
| Docs (phase 2) | `51f1fea docs(odd): record the phase 2 evidence and delivery count` |
| F2 slice B | `9eac62c refactor(components): migrate the stateful components to TypeScript` |
| Docs (phase 3) | `b5d51e7 docs(odd): record the phase 3 evidence and close slice B` |
| F2 slice C | `6af5270 refactor(app): migrate the entry point to TypeScript with a root guard` |
| `allowJs` off | `8942e9b build(typescript): stop allowing JavaScript in the app project` |
| Docs (phase 4) | `851d664 docs: update the file extensions and the TypeScript section` |
| Task doc (phase 4) | `408896a docs(odd): record the phase 4 evidence and close the app migration` |
| PR + CI | `98cce0d docs(odd): record the PR and the first green CI run` |
| F3 config | `084e826 build(typescript): add a project for the test suite` |
| F3 files | `a9f387e test(typescript): migrate the test suite to TypeScript` |
| Docs (phase 5) | `7b039bd docs: document the test project and the three-project gate` |
| Task doc (phase 5) | this commit |

## Progress log

- 2026-10-27: branch created, task document written, baseline measured (30 files, 0 errors, nothing
  checked; `tsc -p` pulls `dist/`; 66 errors under an honest web config).
- 2026-10-27: F0 + F1 implemented by one worker, verified by the parent and by an independent
  verifier, committed in three work units.
- 2026-10-27: F4 + slice A implemented by one worker. Risk came back `high` because `ci.yml` is
  shell source, so an independent verifier re-checked it: `pass-with-notes`, no defects.
- 2026-10-27: slice B implemented by one worker, re-checked by the parent over the full `-M` diff.
  Risk `medium`, `under_budget`. The three changed suites were re-run by the parent, not taken on
  trust.
- 2026-10-27: slice C + `allowJs` off, done inline. The app project is now pure TypeScript and the
  full suite was re-run because `index.html` changed.
- 2026-10-27: PR #18 merged into `main` (`5a3fbfe`), `Verify` green twice on the PR and again on
  `main`. The branch was deleted and `main` synced.
- 2026-10-27: F3 implemented by one worker on `refactor/typescript-tests`. Risk `medium`,
  `under_budget`. Five of the eleven suites are byte-identical renames; the rest add types and
  guards only. The parent re-ran typecheck, tests and build over the finished diff before committing.

## Next step

What is left is the tooling: `vite.config.js`, `vitest.config.js` and `scripts/generate-og.mjs` are
included by `tsconfig.node.json` but unchecked, because `checkJs` is off. Migrating them is what
closes the last `allowJs`.

Typed CSS Modules — the rest of F5 — stays deliberately out of the migration.

This branch still needs its PR: `bun check -p tsconfig.test.json` has only ever run locally.

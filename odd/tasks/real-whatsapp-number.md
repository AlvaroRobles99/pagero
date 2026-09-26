# Real WhatsApp number, centralized

## Objective

Replace the placeholder `521234567890` with Rocío's real number, and make it a **single-point change** so it never again has to be edited in five places at once.

## Problem

`521234567890` is hardcoded in **five** locations: three components and two test files. Every "contact me" button on the site is currently a dead link — the single highest-value conversion path on a site whose entire funnel is a WhatsApp message.

Worse, the number is *also* asserted in the test suite, so a naive find-and-replace silently breaks the build. The next person to update this number will hit that trap.

## Why

User supplied the real number: `+54 297 421 6017`.

## The format rule (this is the part that matters)

The same number has **three different correct representations**. Using the wrong one breaks the CTA:

| Destination | Format | Reason |
|---|---|---|
| `wa.me` link (`href`) | `542974216017` | **Digits only.** No `+`, no spaces, no dashes. A `+` or space makes the link dead. |
| Visible text in the UI | `+54 297 421 6017` | Human-readable display form. |
| JSON-LD `telephone` | `+54 297 421 6017` | schema.org wants the full international form with `+`. |

**Open question the user must confirm by tapping:** Argentine mobile numbers are often
written `+54 9 297 421 6017`, where the `9` marks a mobile line. The `wa.me` convention is to
**drop the 9** (`542974216017`), which is what this implementation uses. Some carriers and
businesses instead need `5492974216017`. This is genuinely ambiguous and cannot be resolved
from here — it must be confirmed by opening the link on a real phone.

Because of that, the number lives in exactly one constant so adding a `9` is a one-character fix.

## Scope

### In scope
1. **`src/data/contact.js`** (new) — single source of truth: the digits-only number, a
   human-readable display form, and a `whatsappLink()` helper that URL-encodes an optional message.
2. **`Hero.jsx`, `Contact.jsx`, `ServiceModal.jsx`** — import the helper instead of hardcoding.
3. **`Hero.test.jsx`, `Contact.test.jsx`** — stop hardcoding the number in assertions; assert
   against the constant and add a format guard.
4. **`index.html`** — add `telephone` to the JSON-LD `Person` node in international format.
5. **`src/tests/seo.test.jsx`** — relax the blanket `telephone` ban, but KEEP the guards on
   `address`, `geo`, `areaServed`, `priceCurrency`, `offers`, `openingHours`.
6. **New test for `contact.js`** — lock the link format so a bad edit fails loudly.
7. **Docs** — remove the "placeholder" warning from `AGENTS.md` and `docs/project.md`; document
   `src/data/contact.js` and the three-format rule.

### Out of scope
- `address`, `geo`, `areaServed`, `priceCurrency`, `openingHours` — still unknown. Stay omitted.
- Domain / absolute URLs — still not live.
- Visual sign-off on `og-image.png` — unrelated, still pending.

## Constraints

- Digits-only in the `wa.me` href. This is the one non-negotiable rule.
- Spanish for any user-visible text; English for code, comments, identifiers, docs headings.
- Zero new dependencies.
- Do NOT `git push`. No remote exists.
- Conventional commit, no AI attribution.
- Working tree is clean at `2c0a35a`; this work lands as a separate commit.

## Toolchain notes (verified, do not re-derive)

- `bun run test` — 9 files, 54 tests, ~60s (jsdom env is ~40s of it).
- `bun run build` — must succeed.
- PowerShell 5.1 `Out-File -Encoding utf8` writes a BOM. **Author git commit messages from Bun**
  (`writeFileSync(..., 'utf8')` then `git commit -F`), never from PowerShell.
- Vitest cwd is the project root, so `process.cwd()` resolves the repo root.

## Tasks

### T1 — `src/data/contact.js`
- [ ] `WHATSAPP_NUMBER = '542974216017'` (digits only, no `+`).
- [ ] `WHATSAPP_DISPLAY = '+54 297 421 6017'` (human-readable).
- [ ] `whatsappLink(message?)` returning `https://wa.me/<number>` or
      `https://wa.me/<number>?text=<encoded>`. Must omit `?text=` entirely when no message is given.

### T2 — Rewire the three components
- [ ] `Hero.jsx`, `Contact.jsx` — `href={whatsappLink()}`.
- [ ] `ServiceModal.jsx` — `href={whatsappLink(\`Hola Rocío, me interesa saber más sobre ${service.title}\`)}`,
      preserving the existing Spanish message and the `encodeURIComponent` behaviour.

### T3 — JSON-LD
- [ ] Add `"telephone": "+54 297 421 6017"` to the `Person` node.
- [ ] Do NOT add it to `Organization`/`LocalBusiness` unless it reads naturally there.

### T4 — Tests
- [ ] `src/tests/contact.test.jsx` (new): assert the number is digits-only, starts with `54`,
      has no `+`/space/dash, `whatsappLink()` matches `^https://wa\.me/\d+$`, and the message
      variant URL-encodes correctly. This suite is the guard that catches a bad future edit.
- [ ] `Hero.test.jsx` / `Contact.test.jsx` — import the constant, stop hardcoding digits.
- [ ] `src/tests/seo.test.jsx` — allow `telephone`; keep every other fabrication guard.

### T5 — Docs
- [ ] `AGENTS.md`, `docs/project.md` — drop the placeholder warning, document `src/data/contact.js`
      and the three-format rule, and record the unconfirmed `9` caveat.

## Route declaration

All T1–T5 delegated to a single bounded writer: 9+ non-trivial files sharing one design
decision (the contact module). Splitting would fragment the format rule.

## TDD

Not configured in this project. Repo convention is one test file per module. Runner:
`bun run test`. `src/tests/contact.test.jsx` is the format guard and must be written before or
alongside T1, and observed RED before T1 satisfies it.

## Acceptance criteria

1. No file contains the literal `521234567890`.
2. Every `wa.me` href matches `^https://wa\.me/\d+$` (digits only).
3. `bun run test` passes; `bun run build` succeeds.
4. JSON-LD has `telephone` in `+54 297 421 6017` form.
5. Guards on `address`/`geo`/`areaServed`/`priceCurrency`/`offers`/`openingHours` still fail if violated.
6. Docs no longer describe the number as a placeholder.

## Checks

- `bun run test`
- `bun run build`
- `git grep -n "521234567890"` → must return nothing
- regex sweep: every `wa.me` href in the codebase is digits-only

## Known environmental failures

None. Baseline green at `2c0a35a`: 54 tests passing, build succeeds.

## Progress

All five tasks complete and committed as `550dc63` (12 files, +197/−26). Orchestrator re-verified independently.

| Task | Status | Evidence |
|---|---|---|
| T1 | ✅ | `src/data/contact.js` — `WHATSAPP_NUMBER='542974216017'`, `WHATSAPP_DISPLAY='+54 297 421 6017'`, `whatsappLink(message?)`. |
| T2 | ✅ | `Hero.jsx:14` and `Contact.jsx:13` → `href={whatsappLink()}`; `ServiceModal.jsx:80` → helper with the original Spanish message. **Zero hardcoded numbers remain in `src/`.** |
| T3 | ✅ | `index.html:117` — `"telephone": "+54 297 421 6017"` on the `Person` node only. |
| T4 | ✅ | `src/tests/whatsapp.test.jsx`, 11 assertions. **RED proven non-vacuous**: a deliberately broken stub failed 9 of 11 with `expected '+54 297 421 6017' to match /^\d+$/`. |
| T5 | ✅ | `AGENTS.md`, `docs/project.md`, `README.md` — the stale "update the number in Hero.jsx and Contact.jsx" instruction was removed. |

Final suite: **10 files, 67 tests passing.** Build succeeds.

### Runtime link verification (executed against the real module)

```
digits-only constant : 542974216017 | valid = true
Hero + Contact CTA   : https://wa.me/542974216017
ServiceModal CTA     : https://wa.me/542974216017?text=Hola%20Roc%C3%ADo%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20Lectura%20de%20Tarot
path is digits only  : true
no-arg has ?text=    : false
message round-trips  : true
```

### Two mistakes caught during this change

1. **`contact.test.jsx` silently destroyed `Contact.test.jsx`.** On a case-insensitive
   filesystem the two names resolve to the same file, so the first write wiped an existing
   suite. Vitest surfaced it; the suite was restored byte-exact via `git checkout`. The new
   guard is therefore `whatsapp.test.jsx`, and both now coexist safely.
2. **The orchestrator wrongly claimed the working tree was clean at `2c0a35a`** — it was not;
   `odd/tasks/seo-social-meta.md` was already modified. The writer staged explicit paths
   instead of `git add -A` and left the orchestrator's own notes uncommitted. Correct call.

### The `9` caveat — still unconfirmed, still one character

Implementation **drops the `9`**: `https://wa.me/542974216017`.

If the link does not open, the alternative is `https://wa.me/5492974216017` — the `9` goes
**after** the `54` country code, giving `54` + `9` + `2974216017`. The change is a single
character in `src/data/contact.js` and the guard suite stays green, because it tests *format*,
not the digits.

## Next step

Nothing pending on the implementation. Awaiting the user:

1. **Tap `https://wa.me/542974216017` on a real phone** to confirm it opens Rocío's chat. If
   not, switch to `5492974216017`.
2. **Visual sign-off on `public/images/og-image.png`** — structural validity only.
3. **Deploy domain** — make `canonical`, `og:url`, `og:image`, `twitter:image` absolute.
4. Still unknown and deliberately omitted: `address`, `geo`, `areaServed`, `priceCurrency`,
   `openingHours`. Guards fail if anyone invents them.

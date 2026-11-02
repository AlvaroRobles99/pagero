# Hero triptych — replace the illustrated banner with three photos

## Objective

The Hero stops using the illustrated `banner.svg` as its background and shows the
client's own photographs instead: three on desktop, two on tablet, one on mobile.

## Problem

`banner.svg` is a 4.9 KB vector landscape that has no relationship with the person
the site sells. The client already supplied five real photographs; three of them
answer the hero's question ("who is this?") far better than a drawing of a sunset.

## Why

A therapy brand is bought on trust, and trust is carried by a face, not by an
illustration. The photographs are already optimized and in `public/images/`, so the
change costs one component, its stylesheet and its tests.

## Scope

In scope:

- `src/components/Hero/Hero.tsx`: three `<figure>` panels behind the content.
- `src/components/Hero/Hero.module.css`: responsive 3 / 2 / 1 panel grid, veil,
  readable content layer.
- `src/tests/Hero.test.tsx`: panel contract, plus the duplicated logo tests cleaned up.
- `docs/project.md`, `AGENTS.md`: describe the new hero and the removed asset.
- Delete `public/images/banner.svg` once nothing references it.

Out of scope: the logo weight (`logo.png`, 322 KB), copy changes, any new animation.

## Decisions

- **Composition.** Desktop is a triptych: `rocio-playa.webp` (standing) on the left,
  `rocio-oraculos.webp` (cards in hand) in the middle and wider, `meditacion-playa.webp`
  (meditating) on the right. The order follows the client's own sentence.
- **Tablet keeps cards + meditating.** Narrower viewports get two panels; the standing
  beach shot is the one that loses the least, because the other two keep the arc
  "she reads the cards" → "she sits with you".
- **Mobile keeps the cards.** On a phone the hero can carry one face, and the cards in
  hand is the gesture that names the service.
- **The veil is not decoration.** Both beach photographs have a blown-out sky and the
  coral card shot is mid-key, so white type needs a real layer: a flat
  `rgba(31, 15, 20, 0.55)` wash plus a vertical gradient and an edge vignette. The
  photographs read as memories in low light instead of a stock collage.
- **No seams.** Panels are separated by a single 1px hairline at 9% warm white: the
  joins read as a triptych frame instead of a gap.
- **Framed prints were tried and rejected.** A second pass turned the photographs into
  three rotated prints over a plum background, which avoided every crop. The client saw
  it and asked for the full-bleed background instead, so the triptych is the design.
- **No new motion.** The hero keeps only `fadeInUp` on the content. Adding a Ken Burns
  drift to three panels would turn a composed page into a slideshow.
- **The mark left the hero.** The floating logo landed on top of a face at every
  breakpoint, so it moved to Contact, under the agenda.
- **Photographs are decorative.** `alt=""` with `aria-hidden` on the container: the h1
  and the subtitle already name the person and the practice, and the same portraits
  reappear with real descriptions where they carry content.
- **Loading.** The centre panel is the LCP candidate: no `loading="lazy"`,
  `fetchPriority="high"`. The side panels are `loading="lazy"` and
  `fetchPriority="low"`, so mobile never downloads the two it hides.

## Route

| Task | Route | Trigger evidence |
| --- | --- | --- |
| H1 markup + styles | inline | One component and its stylesheet, visually coupled; the judgement is compositional and needs the screenshot loop, which a writer cannot run |
| H2 responsive panels | inline | Same two files |
| H3 tests | inline | Follows the markup it asserts |
| H4 docs + asset removal | inline | Mechanical edits in already-read files |

## Tasks

- [x] **H1 — Markup.** `Hero.tsx` renders `div.backdrop` with three `<figure class="panel">`,
  each holding an `<img>` with `src`, `width`, `height`, `alt=""` and `decoding="async"`.
  Centre panel gets `fetchPriority="high"`; sides get `loading="lazy"` and
  `fetchPriority="low"`. `aria-hidden="true"` on the backdrop.
- [x] **H2 — Styles.** Replace the `background: url(banner.svg)` with the panel grid.
  `object-position` per photo so the face survives every crop. Veil layers, hairline,
  900px and 599px breakpoints.
- [x] **H3 — Tests.** Assert three panels in DOM order with the exact `src` list, all
  decorative (`alt=""`), the centre marked as the priority image, and that the side
  panels are lazy.
- [x] **H4 — Docs and cleanup.** `docs/project.md` (image tree, Hero section) and
  `AGENTS.md` (asset list); delete `public/images/banner.svg`.
- [x] **H5 — The mark moves to Contact.** The logo left the hero because it landed over
  the faces; it now signs the Contact section under the agenda, with its own test.

## Acceptance criteria

- Desktop shows three photographs with the card shot centred and widest.
- Tablet shows two; mobile shows one, and the hidden panels are not requested.
- The h1, subtitle, tagline and CTA keep AA contrast over every panel.
- No horizontal overflow at 320, 390, 600, 834, 1024 or 1440 px.
- `bun run test`, `bun run typecheck` and `bun run build` are green.
- `banner.svg` is gone and nothing references it.

## Checks

`bun run test`, `bun run typecheck`, `bun run build`, plus rendered captures at
1440 / 834 / 390 and a reduced-motion pass.

## Delivery

Forecast: ~200 authored lines. Single PR, well under the 400-line budget.

## Progress

- Hero renders the three photographs full-bleed behind the content, 3 / 2 / 1 by
  breakpoint; measured at 1440×900, 834×1000 and 390×844 with no horizontal overflow,
  and the hidden panels report `naturalWidth === 0` (they are never requested).
- The center panel keeps `fetchPriority="high"`; sides are lazy and low priority.
- `banner.svg` deleted with `git rm`; no reference left in the repo.
- The logo moved to Contact under the agenda, with two tests: decorative, and after the
  photo in document order.
- Gates: `bun run test` 112 passed (11 files), `bun run typecheck` clean across the
  three projects, `bun run build` OK.
- Rendered review: desktop, tablet, mobile hero and Contact (desktop + mobile).
- Not committed yet; `main` is protected, so this ships as a branch and a PR.

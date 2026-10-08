/**
 * Builds the Open Graph / Twitter share image for Sanarse (1200x630 PNG).
 *
 * The image is rendered from an inline SVG with resvg so the share card can be
 * regenerated deterministically without any design tool or runtime dependency.
 * `@resvg/resvg-js` is a devDependency only: the generated PNG is committed,
 * so production never needs this script.
 *
 * Rendered with the brand fonts from `scripts/fonts/` (variable TTFs) and with
 * system fonts disabled, so the output is identical on any machine.
 *
 * Note: resvg exposes only the default instance of a variable font, so
 * `font-weight` has no effect here. Type hierarchy is carried by size, color
 * and letter-spacing instead of weight.
 *
 * Usage: bun run generate:og
 */
import { Resvg } from '@resvg/resvg-js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

/** Brand fonts, resolved relative to this file so cwd does not matter. */
export const OG_FONT_FILES = [
  fileURLToPath(new URL('CormorantGaramond[wght].ttf', new URL('./fonts/', import.meta.url))),
  fileURLToPath(new URL('Figtree[wght].ttf', new URL('./fonts/', import.meta.url))),
]

/** Output asset, resolved relative to this file. */
export const OG_OUTPUT_PATH = fileURLToPath(
  new URL('../public/images/og-image.png', import.meta.url),
)

/* Brand tokens — mirror of src/index.css */
const DEEP = '#1f0f14'
const ROSE = '#c73a5a'
const PLUM = '#3a1f28'
const GOLD = '#c99a4a'
const LIGHT = '#fef0f5'

/* Real site content, kept in sync with src/data/services.js */
const WORDMARK = 'Sanarse'
const SUBTITLE = 'Tarot \u00b7 Limpiezas \u00b7 Acompa\u00f1amiento espiritual'
const SIGNATURE = 'Roc\u00eda Durazno'

/* Composition grid */
const MARGIN_X = 104
const WORDMARK_SIZE = 140
const WORDMARK_BASELINE = 277
const RULE_Y = 329
const SUBTITLE_SIZE = 34
const SUBTITLE_BASELINE = 389
const SIGNATURE_SIZE = 26
const SIGNATURE_BASELINE = 445

/**
 * One lotus petal, drawn in a local 200x200 space with its base at (100, 175)
 * so petals can be rotated and scaled around a shared origin.
 */
const PETAL_PATH =
  'M 100 175 C 62 132 60 54 100 15 C 140 54 138 132 100 175 Z'

/**
 * Lotus construction: the centre petal stays full size and the side pairs step
 * down, which is how a lotus actually reads and keeps the mark from looking
 * like a symmetric clip-art flower.
 */
const PETALS = [
  { rotate: 0, scale: 1 },
  { rotate: -38, scale: 0.8 },
  { rotate: 38, scale: 0.8 },
  { rotate: -70, scale: 0.56 },
  { rotate: 70, scale: 0.56 },
]

/** Places the 200x200 lotus space into canvas coordinates. */
const LOTUS_TRANSFORM = 'translate(910 470) scale(1.9) translate(-100 -175)'

function petals() {
  return PETALS.map(
    ({ rotate, scale }) =>
      `<path d="${PETAL_PATH}" transform="rotate(${rotate} 100 175) translate(100 175) scale(${scale}) translate(-100 -175)" />`,
  ).join('')
}

/** Returns the share card as an SVG string. */
export function buildOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${DEEP}" />
      <stop offset="1" stop-color="${ROSE}" />
    </linearGradient>
    <radialGradient id="spotlight" cx="0.3" cy="0.5" r="0.66">
      <stop offset="0" stop-color="${PLUM}" stop-opacity="0.5" />
      <stop offset="1" stop-color="${DEEP}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#brand)" />
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#spotlight)" />

  <g fill="none" stroke="${GOLD}" stroke-width="3" stroke-linejoin="round" opacity="0.55" transform="${LOTUS_TRANSFORM}">
    ${petals()}
  </g>
  <path d="M 6 190 Q 100 162 194 190" fill="none" stroke="${GOLD}" stroke-width="2.5" stroke-linecap="round" opacity="0.32" transform="${LOTUS_TRANSFORM}" />

  <text x="${MARGIN_X}" y="${WORDMARK_BASELINE}" font-family="Cormorant Garamond" font-size="${WORDMARK_SIZE}" letter-spacing="2" fill="${LIGHT}">${WORDMARK}</text>

  <line x1="${MARGIN_X + 4}" y1="${RULE_Y}" x2="${MARGIN_X + 212}" y2="${RULE_Y}" stroke="${GOLD}" stroke-width="2" opacity="0.65" />

  <text x="${MARGIN_X}" y="${SUBTITLE_BASELINE}" font-family="Figtree" font-size="${SUBTITLE_SIZE}" letter-spacing="1.2" fill="${LIGHT}" opacity="0.92">${SUBTITLE}</text>

  <text x="${MARGIN_X}" y="${SIGNATURE_BASELINE}" font-family="Figtree" font-size="${SIGNATURE_SIZE}" letter-spacing="4" fill="${GOLD}">${SIGNATURE}</text>
</svg>
`
}

/** Rasterizes the share card with the brand fonts. */
export function renderOgPng(svg = buildOgSvg()) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
    font: {
      fontFiles: OG_FONT_FILES,
      loadSystemFonts: false,
      defaultFontFamily: 'Cormorant Garamond',
    },
  })
    .render()
    .asPng()
}

/** Writes the share card to public/images/og-image.png. */
export function writeOgImage() {
  mkdirSync(new URL('../public/images/', import.meta.url), { recursive: true })
  const png = renderOgPng()
  writeFileSync(OG_OUTPUT_PATH, png)
  return OG_OUTPUT_PATH
}

const invokedDirectly =
  process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url

if (invokedDirectly) {
  const path = writeOgImage()
  console.log(`OG image written: ${path} (${OG_WIDTH}x${OG_HEIGHT})`)
}

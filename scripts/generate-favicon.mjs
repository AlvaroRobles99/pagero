/**
 * Derives the favicon set and the iOS home-screen icon from public/images/logo.png.
 *
 * The brand mark is a LIGHT warm-white symbol on a transparent background, which
 * is invisible on a light browser tab. Every output therefore composites the
 * mark onto an opaque #1f0f14 backing with padding around it, and the
 * apple-touch-icon is fully opaque because iOS renders transparency badly.
 *
 * The source PNG is embedded as a base64 data URI inside a small SVG string and
 * rasterized with resvg, so no extra image dependency is needed. Like the OG
 * generator, `@resvg/resvg-js` is a devDependency only: the PNGs are committed,
 * so production never needs this script.
 *
 * Usage: bun run generate:favicon
 */
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

/** Source brand mark, resolved relative to this file so cwd does not matter. */
export const FAVICON_SOURCE_PATH = fileURLToPath(
  new URL('../public/images/logo.png', import.meta.url),
)

/** Output asset, resolved relative to this file. */
export const FAVICON_OUTPUT_DIR = fileURLToPath(new URL('../public/', import.meta.url))

/** Tab favicons + PWA-style sizes, in pixels. */
export const FAVICON_SIZES = [32, 192, 512]

/** iOS home-screen icon. iOS requires exactly 180x180 for a bare apple-touch-icon. */
export const APPLE_TOUCH_SIZE = 180

/* Brand tokens — mirror of src/index.css */
const DEEP = '#1f0f14'

/**
 * Padding around the mark, as a ratio of the canvas. The mark is light, so the
 * dark backing plus this inset is what keeps the icon legible on a light tab.
 * The source image already has ~3% internal margins, so the effective gap is
 * slightly larger than this value.
 */
const PADDING_RATIO = 0.13

/** Logical canvas the SVG is composed on; each size scales from it via fitTo. */
const VIEW_BOX = 512

/** Returns one favicon/apple-touch SVG string with the logo embedded. */
export function buildFaviconSvg(source = readFileSync(FAVICON_SOURCE_PATH)) {
  const dataUri = `data:image/png;base64,${source.toString('base64')}`
  const pad = Math.round(VIEW_BOX * PADDING_RATIO)
  const inner = VIEW_BOX - pad * 2

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${VIEW_BOX}" height="${VIEW_BOX}" viewBox="0 0 ${VIEW_BOX} ${VIEW_BOX}">
  <rect width="${VIEW_BOX}" height="${VIEW_BOX}" fill="${DEEP}" />
  <image href="${dataUri}" x="${pad}" y="${pad}" width="${inner}" height="${inner}" preserveAspectRatio="xMidYMid meet" />
</svg>
`
}

/** Rasterizes the favicon SVG at one target size. */
export function renderFaviconPng(size, svg = buildFaviconSvg()) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
  })
    .render()
    .asPng()
}

/** Maps a pixel size to its output file name inside public/. */
export function outputFileName(size) {
  if (size === APPLE_TOUCH_SIZE) return 'apple-touch-icon.png'
  return `favicon-${size}x${size}.png`
}

/**
 * Writes the full icon set to public/ and returns the written paths.
 * Output is deterministic: the same source bytes always produce the same PNGs.
 */
export function writeFavicons() {
  const svg = buildFaviconSvg()
  const paths = []
  for (const size of [...FAVICON_SIZES, APPLE_TOUCH_SIZE]) {
    const path = new URL(`../public/${outputFileName(size)}`, import.meta.url)
    writeFileSync(path, renderFaviconPng(size, svg))
    paths.push(fileURLToPath(path))
  }
  return paths
}

const invokedDirectly =
  process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url

if (invokedDirectly) {
  const paths = writeFavicons()
  for (const path of paths) console.log(`Favicon written: ${path}`)
}

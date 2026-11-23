/**
 * LCP discovery contract.
 *
 * This is a client-rendered SPA: `index.html` ships an empty `#root` and a
 * module script, so the hero photograph does not exist in the document until
 * the 214 kB bundle is parsed and React renders. Lighthouse scores that as
 * "the request can be discovered in the initial document" — false, by
 * construction, unless the head preloads the image itself.
 *
 * The preload is static HTML and cannot import a module, so this suite is the
 * bridge: it reads the real `index.html` from disk and compares it against the
 * one photo `src/data/hero.ts` marks as priority. Moving or replacing the hero
 * photo without touching the preload fails here instead of silently wasting
 * the optimisation.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { LCP_PHOTO } from '../data/hero'

const PROJECT_ROOT = process.cwd()
const html = readFileSync(resolve(PROJECT_ROOT, 'index.html'), 'utf8')
const doc = new DOMParser().parseFromString(html, 'text/html')

/**
 * Scoped to `as="image"`: `fonts.test.tsx` asserts the font preloads are
 * exactly two, and an image preload must not be counted as one of them.
 */
const imagePreloads = [...doc.querySelectorAll('link[rel="preload"][as="image"]')]
const preloadHref = imagePreloads[0]?.getAttribute('href') ?? null

/** Maps a root-relative `/images/...` href to the file `public/` ships. */
const onDisk = (href: string) => resolve(PROJECT_ROOT, 'public', href.replace(/^\//, ''))

const isWebp = (path: string) => {
  const bytes = readFileSync(path)
  const riff = bytes.subarray(0, 4).toString('ascii')
  const webp = bytes.subarray(8, 12).toString('ascii')
  return riff === 'RIFF' && webp === 'WEBP'
}

describe('index.html — the LCP image is discoverable before the bundle', () => {
  it('preloads exactly one image', () => {
    expect(
      imagePreloads.map((link) => link.getAttribute('href')),
      'the document must preload one image: zero leaves the LCP undiscoverable until React runs, and two would compete for the same bandwidth',
    ).toHaveLength(1)
  })

  it('preloads the frame the hero marks as priority, not another photograph', () => {
    expect(
      preloadHref,
      'the preloaded image must be the one photo src/data/hero.ts marks as priority: true',
    ).toBe(LCP_PHOTO.src)
  })

  it('asks for it at high priority', () => {
    expect(
      imagePreloads[0]?.getAttribute('fetchpriority'),
      'without fetchpriority=high the preload is queued behind the stylesheet and the fonts',
    ).toBe('high')
  })

  it('does not ask for it in CORS mode', () => {
    // The opposite of the font preloads: an image preload with crossorigin
    // changes the request mode, so the <img> afterwards cannot reuse the cached
    // response and the file downloads twice.
    expect(
      imagePreloads[0]?.hasAttribute('crossorigin'),
      'an image preload must not carry crossorigin, or the element re-downloads the file',
    ).toBe(false)
  })

  it('points at a file that exists and is a real WebP', () => {
    if (preloadHref === null) throw new Error('no image preload found in index.html')
    expect(preloadHref.startsWith('/'), 'a preload href must be root-relative').toBe(true)
    const path = onDisk(preloadHref)
    expect(isWebp(path), `${preloadHref} is preloaded but is not a WebP file on disk`).toBe(true)
  })
})

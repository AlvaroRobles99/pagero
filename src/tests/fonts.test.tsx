/**
 * Font delivery contract.
 *
 * The brand fonts used to come from Google Fonts. That `<link>` is a
 * cross-origin stylesheet, so it blocked the first paint of the WHOLE page —
 * not just the text — and cost two DNS/TLS chains before the font file was
 * requested: ~780 ms of blocking on Lighthouse's mobile profile. They are now
 * served from /fonts/, and this suite locks the invariants that keep that move
 * from silently undoing itself.
 *
 * Like seo.test.tsx, it reads the real files from disk: the declarations live in
 * a static stylesheet and the tags in the static shell, neither of which React
 * renders.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

// Vitest runs with the project root as cwd (see vitest.config.ts).
const PROJECT_ROOT = process.cwd()
const FONTS_DIR = resolve(PROJECT_ROOT, 'public', 'fonts')

const html = readFileSync(resolve(PROJECT_ROOT, 'index.html'), 'utf8')
const css = readFileSync(resolve(PROJECT_ROOT, 'src', 'index.css'), 'utf8')
const doc = new DOMParser().parseFromString(html, 'text/html')

/** Collects group 1 of every match, without relying on matchAll's lib target. */
function collect(pattern: RegExp, text: string): string[] {
  const found: string[] = []
  let match: RegExpExecArray | null
  while ((match = pattern.exec(text)) !== null) {
    const value = match[1]
    if (value !== undefined) found.push(value)
  }
  return found
}

/** Raw body of each @font-face block, so the assertions can read it as CSS text. */
const faces = css
  .split('@font-face')
  .slice(1)
  .map((block) => block.slice(0, block.indexOf('}')))

const declaredFontPaths = collect(/url\('(\/fonts\/[^']+)'\)\s*format\('woff2'\)/g, css)
const preloads = [...doc.querySelectorAll('link[rel="preload"][as="font"]')]

/** Maps a `/fonts/name.woff2` href to its absolute path. */
const onDisk = (href: string) => resolve(FONTS_DIR, href.replace('/fonts/', ''))

describe('fonts — nothing third-party on the render path', () => {
  it('does not link or preconnect to a font host', () => {
    expect(html).not.toMatch(/fonts\.googleapis\.com/)
    expect(html).not.toMatch(/fonts\.gstatic\.com/)
  })

  it('links no stylesheet from another origin', () => {
    const external = [...doc.querySelectorAll('link[rel="stylesheet"]')]
      .map((el) => el.getAttribute('href') ?? '')
      .filter((href) => /^https?:\/\//i.test(href))

    expect(external).toEqual([])
  })
})

describe('fonts — @font-face declarations', () => {
  it('declares the three faces the design uses', () => {
    expect(faces).toHaveLength(3)
    expect(css).toMatch(/font-family: 'Cormorant Garamond';\s*font-style: normal;/)
    expect(css).toMatch(/font-family: 'Cormorant Garamond';\s*font-style: italic;/)
    expect(css).toMatch(/font-family: 'Figtree';\s*font-style: normal;/)
  })

  it('keeps font-display: swap on every face, so first paint never waits', () => {
    for (const face of faces) expect(face).toMatch(/font-display:\s*swap;/)
  })

  it('declares a variable weight range on every face', () => {
    for (const face of faces) expect(face).toMatch(/font-weight:\s*\d+ \d+;/)
  })

  it('points every face at a self-hosted file', () => {
    expect(declaredFontPaths).toHaveLength(3)
    for (const href of declaredFontPaths) expect(href.startsWith('/fonts/')).toBe(true)
  })
})

describe('fonts — files on disk', () => {
  it('ships every declared file as a real WOFF2', () => {
    for (const href of declaredFontPaths) {
      const path = onDisk(href)
      expect(existsSync(path), `${href} is declared in index.css but missing on disk`).toBe(true)
      // A WOFF2 starts with the ASCII signature "wOF2"; an HTML error page does not.
      expect(readFileSync(path).subarray(0, 4).toString('latin1'), `${href} is not a WOFF2`).toBe('wOF2')
      expect(statSync(path).size, `${href} looks truncated`).toBeGreaterThan(5_000)
    }
  })
})

describe('fonts — preloads', () => {
  it('preloads only faces that exist and are declared', () => {
    expect(preloads).toHaveLength(2)
    for (const link of preloads) {
      const href = link.getAttribute('href') ?? ''
      expect(declaredFontPaths, `${href} is preloaded but never declared`).toContain(href)
      expect(existsSync(onDisk(href)), `${href} is preloaded but missing on disk`).toBe(true)
    }
  })

  it('keeps crossorigin on every preload, or the font downloads twice', () => {
    for (const link of preloads) expect(link.hasAttribute('crossorigin')).toBe(true)
  })

  it('restricts preloads to WOFF2', () => {
    for (const link of preloads) expect(link.getAttribute('type')).toBe('font/woff2')
  })
})

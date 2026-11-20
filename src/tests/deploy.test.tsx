/**
 * Deploy contract for vercel.json.
 *
 * Vercel serves every static file with `cache-control: public, max-age=0,
 * must-revalidate` unless a rule says otherwise — verified against the live
 * deployment, where even the hashed `/assets/*.css` revalidated on each visit.
 * Immutable caching is the fix, but it is also the easiest way to break a
 * deploy: one too-broad `source` and a visitor keeps a stale bundle for a year.
 * So the rules are pinned to the two directories where the name is guaranteed
 * to change when the content does.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface HeaderRule {
  source: string
  headers: { key: string; value: string }[]
}

const raw = readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8')
const config = JSON.parse(raw) as { headers?: HeaderRule[] }
const rules = config.headers ?? []

/** Cache-Control declared for a given source pattern. */
const cacheControlFor = (source: string) =>
  rules
    .find((rule) => rule.source === source)
    ?.headers.find((header) => header.key.toLowerCase() === 'cache-control')?.value ?? null

describe('vercel.json — immutable caching', () => {
  it('caches the content-addressed build output for a year', () => {
    expect(cacheControlFor('/assets/(.*)')).toBe('public, max-age=31536000, immutable')
  })

  it('caches the self-hosted fonts for a year', () => {
    expect(cacheControlFor('/fonts/(.*)')).toBe('public, max-age=31536000, immutable')
  })

  it('limits every rule to a directory Vite hashes or the fonts', () => {
    for (const rule of rules) {
      expect(['/assets/(.*)', '/fonts/(.*)']).toContain(rule.source)
    }
  })

  it('leaves the mutable image directory on the default', () => {
    // A replaced photograph must take effect on the next visit, not next year.
    for (const rule of rules) expect(rule.source).not.toMatch(/images/)
  })
})

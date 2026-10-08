/**
 * Meta contract for index.html.
 *
 * This suite reads the real file from disk rather than a rendered component,
 * because the tags under test live in the static shell that React never touches.
 * It locks in two things: the discovery/preview contract, and the honesty
 * constraint that unpublished business facts must stay out of structured data.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { SOCIAL_LINKS } from '../data/social'

// Vitest runs with the project root as cwd (see vitest.config.js).
const PROJECT_ROOT = process.cwd()
const INDEX_HTML_PATH = resolve(PROJECT_ROOT, 'index.html')

const html = readFileSync(INDEX_HTML_PATH, 'utf8')
const doc = new DOMParser().parseFromString(html, 'text/html')

/** Content of <meta property="..."> (Open Graph convention). */
const og = (property) =>
  doc.querySelector(`meta[property="${property}"]`)?.getAttribute('content') ?? null
/** Content of <meta name="..."> (Twitter / document convention). */
const metaName = (name) =>
  doc.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ?? null
const linkHref = (rel) =>
  doc.querySelector(`link[rel="${rel}"]`)?.getAttribute('href') ?? null
const jsonLdRaw =
  doc.querySelector('script[type="application/ld+json"]')?.textContent ?? null

const ABSOLUTE_URL = /^https?:\/\//i
const ogImage = og('og:image')

describe('index.html — canonical URL', () => {
  it('declares a canonical link with a non-empty href', () => {
    expect(linkHref('canonical'), 'link[rel=canonical] not found in index.html').toBeTruthy()
    expect(linkHref('canonical')).not.toBe('')
  })

  it('keeps the canonical URL relative, since the domain is not decided yet', () => {
    expect(linkHref('canonical'), 'link[rel=canonical] must exist to be checked').toBeTruthy()
    expect(linkHref('canonical')).not.toMatch(ABSOLUTE_URL)
  })
})

describe('index.html — Open Graph', () => {
  it('declares og:type as website', () => {
    expect(og('og:type'), 'meta[property="og:type"] not found').toBe('website')
  })

  it('declares a non-empty og:title', () => {
    expect(og('og:title'), 'meta[property="og:title"] not found').toBeTruthy()
    expect(og('og:title').length).toBeGreaterThan(0)
  })

  it('declares a non-empty og:description of at most 160 characters', () => {
    expect(og('og:description'), 'meta[property="og:description"] not found').toBeTruthy()
    expect(og('og:description').length).toBeGreaterThan(0)
    expect(og('og:description').length).toBeLessThanOrEqual(160)
  })

  it('declares og:image pointing at the generated share image', () => {
    expect(ogImage, 'meta[property="og:image"] not found').toBeTruthy()
    expect(ogImage).toBe('/images/og-image.png')
  })

  it('declares og:image:width 1200 and og:image:height 630', () => {
    expect(og('og:image:width'), 'meta[property="og:image:width"] not found').toBe('1200')
    expect(og('og:image:height'), 'meta[property="og:image:height"] not found').toBe('630')
  })

  it('declares a non-empty Spanish og:image:alt', () => {
    expect(og('og:image:alt'), 'meta[property="og:image:alt"] not found').toBeTruthy()
    expect(og('og:image:alt').length).toBeGreaterThan(0)
  })

  it('declares og:url', () => {
    expect(og('og:url'), 'meta[property="og:url"] not found').toBeTruthy()
  })

  it('declares og:locale and og:site_name', () => {
    expect(og('og:locale'), 'meta[property="og:locale"] not found').toBe('es_MX')
    expect(og('og:site_name'), 'meta[property="og:site_name"] not found').toBe('Sanarse')
  })

  it('keeps og:url and og:image relative, since the domain is not decided yet', () => {
    expect(og('og:url'), 'og:url must exist to be checked').toBeTruthy()
    expect(ogImage, 'og:image must exist to be checked').toBeTruthy()
    expect(og('og:url')).not.toMatch(ABSOLUTE_URL)
    expect(ogImage).not.toMatch(ABSOLUTE_URL)
  })
})

describe('index.html — Twitter card', () => {
  it('declares a summary_large_image card', () => {
    expect(metaName('twitter:card'), 'meta[name="twitter:card"] not found').toBe(
      'summary_large_image',
    )
  })

  it('declares twitter:title, twitter:description and twitter:image', () => {
    expect(metaName('twitter:title'), 'meta[name="twitter:title"] not found').toBeTruthy()
    expect(
      metaName('twitter:description'),
      'meta[name="twitter:description"] not found',
    ).toBeTruthy()
    expect(metaName('twitter:image'), 'meta[name="twitter:image"] not found').toBeTruthy()
  })

  it('keeps twitter:image relative, since the domain is not decided yet', () => {
    expect(metaName('twitter:image'), 'twitter:image must exist to be checked').toBeTruthy()
    expect(metaName('twitter:image')).not.toMatch(ABSOLUTE_URL)
  })
})

describe('index.html — document meta', () => {
  it('declares theme-color with the deep brand background', () => {
    expect(metaName('theme-color'), 'meta[name="theme-color"] not found').toBe('#1f0f14')
  })

  it('declares robots as index, follow', () => {
    expect(metaName('robots'), 'meta[name="robots"] not found').toBe('index, follow')
  })

  it('links the PNG favicon set (32, 192 and 512), not an SVG', () => {
    const icons = [...doc.querySelectorAll('link[rel="icon"]')]
    expect(icons.length, 'index.html must link three PNG favicon sizes').toBe(3)
    const expected = new Map([
      ['/favicon-32x32.png', '32x32'],
      ['/favicon-192x192.png', '192x192'],
      ['/favicon-512x512.png', '512x512'],
    ])
    for (const link of icons) {
      const href = link.getAttribute('href')
      expect(expected.has(href), `unexpected favicon href: ${href}`).toBe(true)
      expect(link.getAttribute('sizes'), `wrong sizes on ${href}`).toBe(expected.get(href))
      expect(link.getAttribute('type'), `wrong type on ${href}`).toBe('image/png')
    }
  })

  it('links an apple-touch-icon', () => {
    expect(linkHref('apple-touch-icon'), 'link[rel="apple-touch-icon"] not found').toBe(
      '/apple-touch-icon.png',
    )
  })

  it('keeps the page language set to Spanish', () => {
    expect(doc.documentElement.getAttribute('lang')).toBe('es')
  })
})

describe('index.html — the og:image asset', () => {
  // og:image is site-relative ("/images/og-image.png"), so drop the leading
  // slash before joining: on Windows path.resolve would otherwise treat it as
  // drive-absolute and look for C:\images\og-image.png.
  const assetPath = resolve(PROJECT_ROOT, 'public', (ogImage ?? '').replace(/^\//, ''))

  it('exists on disk at the path og:image points to', () => {
    expect(ogImage, 'og:image is required to resolve the asset').toBeTruthy()
    expect(() => readFileSync(assetPath)).not.toThrow()
  })

  it('is a real 1200x630 PNG, because WhatsApp and Facebook do not render SVG', () => {
    expect(ogImage, 'og:image is required to resolve the asset').toBeTruthy()
    const bytes = readFileSync(assetPath)
    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
    expect(bytes.readUInt32BE(16)).toBe(1200)
    expect(bytes.readUInt32BE(20)).toBe(630)
  })
})

describe('index.html — the favicon assets', () => {
  // Site-relative public path: drop the leading slash before joining, exactly
  // like the og:image block above, or path.resolve is drive-absolute on Windows.
  const publicAsset = (href) => resolve(PROJECT_ROOT, 'public', (href ?? '').replace(/^\//, ''))

  it.each([
    ['/favicon-32x32.png', 32],
    ['/favicon-192x192.png', 192],
    ['/favicon-512x512.png', 512],
    ['/apple-touch-icon.png', 180],
  ])('%s is a real %ix%i PNG on disk', (href, size) => {
    const bytes = readFileSync(publicAsset(href))
    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
    expect(bytes.readUInt32BE(16)).toBe(size)
    expect(bytes.readUInt32BE(20)).toBe(size)
  })
})

describe('index.html — JSON-LD structured data', () => {
  it('is present and parses as valid JSON', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    expect(() => JSON.parse(jsonLdRaw)).not.toThrow()
  })

  it('declares a non-empty @graph', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    const data = JSON.parse(jsonLdRaw)
    expect(Array.isArray(data['@graph']), 'JSON-LD is missing an @graph array').toBe(true)
    expect(data['@graph'].length).toBeGreaterThan(0)
  })

  it('describes the organization, the practitioner and the website', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    const types = JSON.parse(jsonLdRaw)['@graph'].map((node) => node['@type'])
    expect(types).toContain('Organization')
    expect(types).toContain('LocalBusiness')
    expect(types).toContain('Person')
    expect(types).toContain('WebSite')
  })

  it('names the practitioner and the brand', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    const nodes = JSON.parse(jsonLdRaw)['@graph']
    const person = nodes.find((node) => node['@type'] === 'Person')
    const website = nodes.find((node) => node['@type'] === 'WebSite')
    expect(person.name, 'Person node needs a name').toBe('Rocío Durazno')
    expect(website.name, 'WebSite node needs a name').toBe('Sanarse')
    expect(website.inLanguage).toBe('es-MX')
  })

  it('points the Organization logo at the brand mark image', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    const nodes = JSON.parse(jsonLdRaw)['@graph']
    const organization = nodes.find((node) => node['@type'] === 'Organization')
    expect(organization.logo, 'Organization node needs a logo').toBe('/images/logo.png')
  })

  it('keeps sameAs in sync with src/data/social.js, in both directions', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    const nodes = JSON.parse(jsonLdRaw)['@graph']
    const declared = nodes.flatMap((node) => node.sameAs ?? [])
    const published = SOCIAL_LINKS.map((social) => social.url)

    for (const social of SOCIAL_LINKS) {
      expect(declared, `${social.name} profile missing from JSON-LD sameAs`).toContain(social.url)
    }
    for (const url of declared) {
      expect(published, `JSON-LD declares a profile absent from social.js: ${url}`).toContain(url)
    }
  })
})

describe('index.html — no fabricated business data', () => {
  it('never publishes the placeholder WhatsApp number', () => {
    expect(html).not.toContain('521234567890')
  })

  it('publishes the real telephone on the Person node, in international form', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    const nodes = JSON.parse(jsonLdRaw)['@graph']
    const person = nodes.find((node) => node['@type'] === 'Person')
    expect(person.telephone, 'Person node needs a telephone').toBeTruthy()
    expect(person.telephone).toBe('+54 297 421 6017')
    // schema.org wants the full international form here, unlike wa.me hrefs.
    expect(person.telephone.startsWith('+')).toBe(true)
  })

  it('omits business facts that are still unknown', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    for (const key of ['address', 'geo', 'areaServed', 'priceCurrency', 'offers', 'openingHours']) {
      expect(jsonLdRaw, `JSON-LD must not declare ${key} until it is known`).not.toContain(
        `"${key}"`,
      )
    }
  })

  it('uses site-relative @id references instead of invented URLs', () => {
    expect(jsonLdRaw, 'script[type="application/ld+json"] not found').toBeTruthy()
    const nodes = JSON.parse(jsonLdRaw)['@graph']
    for (const node of nodes) {
      expect(node['@id'], 'node @id should be a site-relative fragment').not.toMatch(ABSOLUTE_URL)
    }
  })
})

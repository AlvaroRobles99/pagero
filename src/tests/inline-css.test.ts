import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { inlineStylesheet } from '../../scripts/inline-css'

const LINK_TAG =
  '<link rel="stylesheet" crossorigin href="/assets/index-Fr_mb7Q3.css">'

/** Shaped like the HTML Vite emits: the stylesheet link comes after the module script. */
const BUILT_HTML = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    ${LINK_TAG}
    <script type="module" crossorigin src="/assets/index-C0SafuSB.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`

describe('inlineStylesheet', () => {
  it('replaces the stylesheet link with an inline style tag', () => {
    const html = inlineStylesheet(
      BUILT_HTML,
      '/assets/index-Fr_mb7Q3.css',
      ':root{--color-deep:#1f0f14}',
    )

    expect(html).toContain('<style>:root{--color-deep:#1f0f14}</style>')
    expect(html).not.toContain('<link rel="stylesheet"')
    expect(html).not.toContain('/assets/index-Fr_mb7Q3.css')
  })

  it('leaves every other tag untouched', () => {
    const html = inlineStylesheet(BUILT_HTML, '/assets/index-Fr_mb7Q3.css', 'a{color:red}')

    expect(html).toContain('<script type="module" crossorigin src="/assets/index-C0SafuSB.js">')
    expect(html).toContain('<div id="root"></div>')
    expect(html.match(/<style>/g)).toHaveLength(1)
  })

  it('does not interpret $ patterns inside the CSS as replacement tokens', () => {
    const html = inlineStylesheet(BUILT_HTML, '/assets/index-Fr_mb7Q3.css', 'a::after{content:"$&$1"}')

    expect(html).toContain('<style>a::after{content:"$&$1"}</style>')
  })

  it('fails loudly when the stylesheet link is missing', () => {
    expect(() => inlineStylesheet(BUILT_HTML, '/assets/missing.css', 'a{}')).toThrow(
      /no <link rel="stylesheet">/i,
    )
  })

  it('keeps the preload links that are not stylesheets', () => {
    const withPreload = BUILT_HTML.replace(
      '<meta charset="UTF-8" />',
      '<link rel="preload" as="image" href="/images/rocio-oraculos.webp" />',
    )
    const html = inlineStylesheet(withPreload, '/assets/index-Fr_mb7Q3.css', 'a{}')

    expect(html).toContain('<link rel="preload" as="image" href="/images/rocio-oraculos.webp" />')
  })
})

describe('build wiring', () => {
  it('registers the inline-css plugin in vite.config.ts', () => {
    const config = readFileSync(join(process.cwd(), 'vite.config.ts'), 'utf8')

    expect(config).toMatch(/from '\.\/scripts\/inline-css'/)
    expect(config).toContain('inlineCss()')
  })
})

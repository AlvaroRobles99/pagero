import type { Plugin } from 'vite'

const LINK_TAG = /<link\b[^>]*>/gi

/**
 * Replaces the `<link rel="stylesheet">` tag that points at `href` with the CSS
 * itself, inline in the document.
 *
 * The site has one stylesheet of a few kilobytes. As a separate render-blocking
 * request it costs a full round trip behind the document; inlined it costs
 * nothing extra, because the bytes ride along with the HTML that was being
 * fetched anyway.
 */
export function inlineStylesheet(html: string, href: string, css: string): string {
  const stylesheet = (html.match(LINK_TAG) ?? []).find(
    (tag) => /rel=["']stylesheet["']/i.test(tag) && tag.includes(href),
  )

  if (!stylesheet) {
    throw new Error(`inline-css: no <link rel="stylesheet"> found for ${href}`)
  }

  // A function replacement keeps `$&`, `$1` and friends inside the CSS literal:
  // CSS can legitimately contain `$` and a string replacement would expand them.
  return html.replace(stylesheet, () => `<style>${css}</style>`)
}

function asText(source: string | Uint8Array): string {
  return typeof source === 'string' ? source : Buffer.from(source).toString('utf8')
}

/**
 * Vite build plugin: moves every stylesheet the HTML links to into the document
 * and stops emitting the now unreferenced file.
 *
 * `enforce: 'post'` matters: the HTML asset is produced by Vite's own build-html
 * plugin, so this has to run after it.
 */
export function inlineCss(): Plugin {
  return {
    name: 'sanarse:inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type !== 'asset' || !fileName.endsWith('.html')) continue

        let html = asText(output.source)

        for (const [cssFile, cssOutput] of Object.entries(bundle)) {
          if (cssOutput.type !== 'asset' || !cssFile.endsWith('.css')) continue

          const href = `/${cssFile}`
          if (!html.includes(href)) continue

          html = inlineStylesheet(html, href, asText(cssOutput.source))
          delete bundle[cssFile]
        }

        output.source = html
      }
    },
  }
}

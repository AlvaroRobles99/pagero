/**
 * The photographs of the hero tríptico.
 *
 * They live here rather than inside `Hero.tsx` because two places need the one
 * that is the LCP element: the component that renders it, and the preload in
 * `index.html`. The preload cannot import a module — it is static HTML — so the
 * guard in `src/tests/lcp.test.tsx` compares the static href against this array.
 * Moving a photo without updating the preload makes that guard fail.
 */
export interface HeroPhoto {
  readonly src: string
  readonly width: number
  readonly height: number
  /** The CSS Module class that gives this frame its column. */
  readonly panel: 'panelLeft' | 'panelCenter' | 'panelRight'
  /** The frame the first screen is built around: eager, high priority, preloaded. */
  readonly priority: boolean
}

/*
 * The photographs the client supplied replace the illustrated banner. The
 * middle one is the cards in her hand: it is the gesture that names the
 * service, so it gets the widest column and is the only frame a phone loads.
 */
export const HERO_PHOTOS: readonly HeroPhoto[] = [
  {
    src: '/images/rocio-playa.webp',
    width: 960,
    height: 966,
    panel: 'panelLeft',
    priority: false,
  },
  {
    src: '/images/rocio-oraculos.webp',
    width: 960,
    height: 966,
    panel: 'panelCenter',
    priority: true,
  },
  {
    src: '/images/meditacion-playa.webp',
    width: 960,
    height: 1280,
    panel: 'panelRight',
    priority: false,
  },
]

/**
 * The image the browser must start fetching before the JS bundle is parsed.
 * Exactly one photo carries `priority: true`, and the preload in `index.html`
 * names it. Throws rather than silently preloading a different frame.
 */
export const LCP_PHOTO: HeroPhoto = (() => {
  const priority = HERO_PHOTOS.filter((photo) => photo.priority)
  if (priority.length !== 1) {
    throw new Error(
      `exactly one hero photo must be the LCP element, found ${priority.length}: ` +
        priority.map((photo) => photo.src).join(', '),
    )
  }
  return priority[0] as HeroPhoto
})()

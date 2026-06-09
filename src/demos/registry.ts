import type { DemoContent } from './types'
import { content as fischerHaus } from './clients/fischer-haus/content'
import { content as muellerReinigung } from './clients/mueller-reinigung/content'
import { content as schmidtMaler } from './clients/schmidt-maler/content'
import { content as weberGarten } from './clients/weber-garten/content'

const DEMOS: DemoContent[] = [
  muellerReinigung,
  weberGarten,
  schmidtMaler,
  fischerHaus,
]

const bySlug = new Map(DEMOS.map((d) => [d.slug, d]))
const byCode = new Map(DEMOS.map((d) => [d.code, d.slug]))

/** Legacy code — routes to first demo */
byCode.set('montagfrei', 'mueller-reinigung')

export function getDemoBySlug(slug: string): DemoContent | undefined {
  return bySlug.get(slug)
}

export function getDemoSlugByCode(code: string): string | undefined {
  return byCode.get(code.trim().toLowerCase())
}

export function getAllDemos(): DemoContent[] {
  return DEMOS
}

export const DEMO_SLUGS = DEMOS.map((d) => d.slug)

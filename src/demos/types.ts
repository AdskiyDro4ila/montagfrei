export type DemoTemplate = 'reinigung' | 'garten' | 'maler' | 'hausmeister'

export interface DemoService {
  title: string
  description: string
}

export interface DemoStat {
  value: string
  label: string
}

export interface DemoContent {
  slug: string
  code: string
  template: DemoTemplate
  branch: string
  business: {
    name: string
    city: string
    phone: string
    email: string
  }
  hero: {
    headline: string
    subline: string
  }
  about: string
  services: DemoService[]
  hours: string
  stats: DemoStat[]
  testimonial: {
    quote: string
    author: string
  }
}

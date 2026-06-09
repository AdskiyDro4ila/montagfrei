export interface DemoService {
  title: string
  description: string
}

export interface DemoContent {
  slug: string
  code: string
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
}

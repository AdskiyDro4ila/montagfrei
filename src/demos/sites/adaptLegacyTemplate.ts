import type { ClientData } from '../../clients/data/types'
import type { DemoContent, DemoTemplate } from '../types'

/** Hilft bestehende Branchen-Templates mit ClientData zu füttern */
export function toLegacyDemoContent(data: ClientData, template: DemoTemplate): DemoContent {
  return {
    slug: data.slug,
    code: data.code,
    template,
    branch: data.business.branch,
    business: {
      name: data.business.name,
      city: data.business.city,
      phone: data.business.phone,
      email: data.business.email,
    },
    hero: data.display?.hero ?? {
      headline: data.business.name,
      subline: data.about,
    },
    about: data.about,
    services: data.services,
    hours: data.hours,
    stats: data.display?.stats ?? [],
    testimonial: data.display?.testimonial ?? { quote: '', author: '' },
  }
}

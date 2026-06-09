/**
 * Template for new customers.
 *
 * To add a customer:
 * 1. Copy this file → rename to {slug}.ts (e.g. muster-garten.ts)
 * 2. Fill in all fields below
 * 3. Add one import line in definitions/index.ts
 *
 * That's it — website, access code, and admin panel update automatically.
 */

import type { ClientDefinition } from '../types'

export const templateClient: ClientDefinition = {
  id: '5',
  status: 'pending',
  slug: 'kunden-slug',
  code: 'kunden-slug',
  template: 'reinigung', // reinigung | garten | maler | hausmeister
  branch: 'Branche',
  city: 'Stadt',
  business: {
    name: 'Firmenname',
    phone: '+49 …',
    email: 'kontakt@firma.de',
  },
  hero: {
    headline: 'Headline hier.',
    subline: 'Kurzbeschreibung der Firma.',
  },
  about: 'Über-uns-Text.',
  services: [
    { title: 'Leistung 1', description: 'Beschreibung.' },
    { title: 'Leistung 2', description: 'Beschreibung.' },
    { title: 'Leistung 3', description: 'Beschreibung.' },
  ],
  hours: 'Mo–Fr 08:00–17:00',
  stats: [
    { value: '10+', label: 'Jahre' },
    { value: '100+', label: 'Kunden' },
    { value: '5.0', label: 'Bewertung' },
  ],
  testimonial: {
    quote: 'Kundenstimme hier.',
    author: 'Name, Ort',
  },
  // Optional — remove if not needed yet:
  scraper: {
    source: 'Website',
    target: 'Leistungen, Kontakt',
    status: 'idle',
    lastRun: '—',
    itemsFound: 0,
  },
  agent: {
    model: 'Anfragen',
    status: 'offline',
    conversations: 0,
    lastActive: '—',
  },
}

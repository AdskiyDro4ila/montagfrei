/**
 * Neue Demo-Website einbinden
 *
 * Ablauf:
 * 1. Demo-Ersteller füllt den Block „INHALTE“ aus (Texte, Leistungen, Kontakt)
 * 2. Betreiber setzt „EINSTELLUNGEN“ (slug, code, template, status)
 * 3. Eine Zeile in definitions/index.ts hinzufügen
 *
 * → Demo unter /demo/{slug}, Zugangscode, Admin-Eintrag — automatisch.
 */

import type { ClientDefinition } from '../types'

export const templateClient: ClientDefinition = {
  // ─── EINSTELLUNGEN (Betreiber) ───────────────────────────────────────────
  id: '5',
  status: 'pending', // pending | active | archived
  slug: 'kunden-slug', // URL: /demo/kunden-slug
  code: 'kunden-slug', // Zugangscode auf der Startseite
  template: 'reinigung', // reinigung | garten | maler | hausmeister

  // ─── INHALTE (Demo-Ersteller) ────────────────────────────────────────────
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

  // ─── OPTIONAL (Betreiber / später) ───────────────────────────────────────
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

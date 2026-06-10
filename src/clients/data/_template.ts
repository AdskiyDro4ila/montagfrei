/**
 * Kundendaten-Vorlage (Scraper + KI-Agent)
 *
 * Später: Scraper schreibt/aktualisiert phone, email, services, hours, about.
 * Demo-Builder lesen dieselben Felder — Kontaktdaten müssen übereinstimmen.
 *
 * Einbinden:
 * 1. Diese Datei kopieren → data/neuer-kunde.ts
 * 2. In data/index.ts eintragen
 * 3. Demo-Site in demos/sites/neuer-kunde/Demo.tsx (siehe demos/sites/_template)
 * 4. In demos/sites/registry.ts eintragen
 */

import type { ClientData } from './types'

export const templateData: ClientData = {
  id: '5',
  status: 'pending',
  slug: 'kunden-slug',
  code: 'kunden-slug',

  business: {
    name: 'Firmenname',
    branch: 'Branche',
    city: 'Stadt',
    phone: '+49 …',
    email: 'kontakt@firma.de',
    address: 'Straße, PLZ Ort',
    website: 'https://beispiel.de',
  },

  about: 'Kurzbeschreibung des Betriebs.',
  services: [
    { title: 'Leistung 1', description: 'Beschreibung.' },
    { title: 'Leistung 2', description: 'Beschreibung.' },
  ],
  hours: 'Mo–Fr 08:00–17:00',
  serviceArea: 'Stadt und Umgebung',

  display: {
    hero: { headline: 'Headline', subline: 'Subline' },
    stats: [
      { value: '10+', label: 'Jahre' },
    ],
    testimonial: { quote: 'Kundenstimme', author: 'Name' },
  },

  scraper: {
    source: 'Website',
    target: 'Kontakt, Leistungen, Öffnungszeiten',
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

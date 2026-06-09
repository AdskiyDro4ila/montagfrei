import type { ClientDefinition } from '../types'

export const fischerHaus: ClientDefinition = {
  id: '4',
  status: 'inactive',
  slug: 'fischer-haus',
  code: 'fischer-haus',
  template: 'hausmeister',
  branch: 'Hausmeisterservice',
  city: 'Stuttgart',
  business: {
    name: 'Fischer Hausmeisterservice',
    phone: '+49 711 987 65 43',
    email: 'service@fischer-haus.de',
  },
  hero: {
    headline: 'Ihr Gebäude in guten Händen.',
    subline: 'Hausmeisterservice, Wartung und schnelle Hilfe — für Wohnanlagen und Gewerbeobjekte.',
  },
  about:
    'Wir betreuen über 60 Objekte in Stuttgart und Umgebung. Von der Treppenhauspflege bis zur Koordination aller Gewerke — ein Ansprechpartner für alles.',
  services: [
    { title: 'Objektbetreuung', description: 'Kontrollgänge, Kleinreparaturen, Winterdienst und Grünflächenpflege.' },
    { title: 'Notfallservice', description: '24/7 erreichbar bei Wasserschaden, Stromausfall und akuten Schäden.' },
    { title: 'Wartung & Instandhaltung', description: 'Heizung, Beleuchtung, Aufzüge — proaktiv gewartet, Ausfälle vermieden.' },
  ],
  hours: '24/7 Notfall · Mo–Fr 08:00–18:00',
  stats: [
    { value: '60+', label: 'Objekte' },
    { value: '<30', label: 'Min. Reaktion' },
    { value: '24/7', label: 'Notfall' },
  ],
  testimonial: {
    quote: 'Seit dem Wechsel zu Fischer läuft alles reibungslos. Notfälle werden sofort bearbeitet.',
    author: 'WG Verwaltung Stuttgart-Nord',
  },
  agent: {
    model: 'Notfall & Wartung',
    status: 'offline',
    conversations: 18,
    lastActive: 'vor 3 Tagen',
  },
}

import type { ClientData } from './types'

export const muellerReinigung: ClientData = {
  id: '1',
  status: 'active',
  slug: 'mueller-reinigung',
  code: 'mueller-reinigung',
  business: {
    name: 'Müller Reinigung',
    branch: 'Gebäudereinigung',
    city: 'München',
    phone: '+49 89 321 45 67',
    email: 'kontakt@mueller-reinigung.de',
    website: 'https://mueller-reinigung.de',
  },
  about:
    'Seit über 15 Jahren sorgen wir in München und Umgebung für hygienische Räume. Zuverlässig, diskret und mit geschultem Personal, ISO-zertifizierte Prozesse inklusive.',
  services: [
    { title: 'Büroreinigung', description: 'Tägliche oder wöchentliche Reinigung nach individuellem Plan. Abends oder früh morgens, störungsfrei.' },
    { title: 'Fensterreinigung', description: 'Streifenfreie Glasflächen innen und außen. Auch für Hochhäuser und Schaufenster.' },
    { title: 'Grundreinigung', description: 'Intensive Tiefenreinigung für Neubezug, Übergaben und Sanierungen.' },
  ],
  hours: 'Mo–Fr 07:00–18:00',
  serviceArea: 'München und Umgebung',
  display: {
    hero: {
      headline: 'Sauberkeit, der Sie vertrauen können.',
      subline: 'Professionelle Gebäudereinigung für Büro, Praxis und Privat, feste Teams, feste Qualität.',
    },
    stats: [
      { value: '15+', label: 'Jahre Erfahrung' },
      { value: '240+', label: 'Zufriedene Kunden' },
      { value: '98%', label: 'Weiterempfehlung' },
    ],
    testimonial: {
      quote: 'Seit drei Jahren unser fester Partner, pünktlich, gründlich, unkompliziert.',
      author: 'Dr. Hartmann, Praxis am Sendlinger Tor',
    },
  },
  scraper: {
    source: 'Google Business',
    target: 'Leistungen, Öffnungszeiten, Bewertungen',
    status: 'done',
    lastRun: '09.06.2026, 14:32',
    itemsFound: 24,
  },
  agent: {
    model: 'Anfragen & Angebote',
    status: 'online',
    conversations: 47,
    lastActive: 'vor 12 Min.',
  },
}

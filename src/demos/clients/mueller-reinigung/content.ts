import type { DemoContent } from '../../types'

export const content: DemoContent = {
  slug: 'mueller-reinigung',
  code: 'mueller-reinigung',
  template: 'reinigung',
  branch: 'Gebäudereinigung',
  business: {
    name: 'Müller Reinigung',
    city: 'München',
    phone: '+49 89 321 45 67',
    email: 'kontakt@mueller-reinigung.de',
  },
  hero: {
    headline: 'Sauberkeit, der Sie vertrauen können.',
    subline: 'Professionelle Gebäudereinigung für Büro, Praxis und Privat — feste Teams, feste Qualität.',
  },
  about:
    'Seit über 15 Jahren sorgen wir in München und Umgebung für hygienische Räume. Zuverlässig, diskret und mit geschultem Personal — ISO-zertifizierte Prozesse inklusive.',
  services: [
    {
      title: 'Büroreinigung',
      description: 'Tägliche oder wöchentliche Reinigung nach individuellem Plan. Abends oder früh morgens — störungsfrei.',
    },
    {
      title: 'Fensterreinigung',
      description: 'Streifenfreie Glasflächen innen und außen. Auch für Hochhäuser und Schaufenster.',
    },
    {
      title: 'Grundreinigung',
      description: 'Intensive Tiefenreinigung für Neubezug, Übergaben und Sanierungen.',
    },
  ],
  hours: 'Mo–Fr 07:00–18:00',
  stats: [
    { value: '15+', label: 'Jahre Erfahrung' },
    { value: '240+', label: 'Zufriedene Kunden' },
    { value: '98%', label: 'Weiterempfehlung' },
  ],
  testimonial: {
    quote: 'Seit drei Jahren unser fester Partner — pünktlich, gründlich, unkompliziert.',
    author: 'Dr. Hartmann, Praxis am Sendlinger Tor',
  },
}

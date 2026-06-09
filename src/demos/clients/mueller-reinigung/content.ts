import type { DemoContent } from '../../types'

export const content: DemoContent = {
  slug: 'mueller-reinigung',
  code: 'mueller-reinigung',
  branch: 'Gebäudereinigung',
  business: {
    name: 'Müller Reinigung',
    city: 'München',
    phone: '+49 89 321 45 67',
    email: 'kontakt@mueller-reinigung.de',
  },
  hero: {
    headline: 'Sauberkeit, der Sie vertrauen können.',
    subline: 'Professionelle Gebäudereinigung für Büro, Praxis und Privat.',
  },
  about:
    'Seit über 15 Jahren sorgen wir in München und Umgebung für hygienische Räume — zuverlässig, diskret und mit festen Teams vor Ort.',
  services: [
    {
      title: 'Büroreinigung',
      description: 'Tägliche oder wöchentliche Reinigung nach individuellem Plan.',
    },
    {
      title: 'Fensterreinigung',
      description: 'Streifenfreie Glasflächen — innen und außen.',
    },
    {
      title: 'Grundreinigung',
      description: 'Intensive Tiefenreinigung für Neubezug und Übergaben.',
    },
  ],
  hours: 'Mo–Fr 07:00–18:00',
}

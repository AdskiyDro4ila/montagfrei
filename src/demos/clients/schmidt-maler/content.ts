import type { DemoContent } from '../../types'

export const content: DemoContent = {
  slug: 'schmidt-maler',
  code: 'schmidt-maler',
  branch: 'Maler',
  business: {
    name: 'Schmidt Malerbetrieb',
    city: 'Nürnberg',
    phone: '+49 911 234 56 78',
    email: 'anfrage@schmidt-maler.de',
  },
  hero: {
    headline: 'Farbe mit Handwerk.',
    subline: 'Innen- und Außenanstrich für Wohnung, Haus und Gewerbe.',
  },
  about:
    'Der Schmidt Malerbetrieb steht für saubere Kanten, hochwertige Materialien und termingerechte Abwicklung in Nürnberg und der Metropolregion.',
  services: [
    {
      title: 'Innenanstrich',
      description: 'Wände, Decken, Tapezierarbeiten — sauber und schnell.',
    },
    {
      title: 'Fassadenanstrich',
      description: 'Wetterfeste Beschichtungen mit langjähriger Haltbarkeit.',
    },
    {
      title: 'Lackierarbeiten',
      description: 'Türen, Fenster und Holzelemente in perfekter Oberfläche.',
    },
  ],
  hours: 'Mo–Fr 07:30–16:30',
}

import type { DemoContent } from '../../types'

export const content: DemoContent = {
  slug: 'schmidt-maler',
  code: 'schmidt-maler',
  template: 'maler',
  branch: 'Maler & Lackierer',
  business: {
    name: 'Schmidt Malerbetrieb',
    city: 'Nürnberg',
    phone: '+49 911 234 56 78',
    email: 'anfrage@schmidt-maler.de',
  },
  hero: {
    headline: 'Farbe mit Handwerk.',
    subline: 'Innen- und Außenanstrich für Wohnung, Haus und Gewerbe — saubere Kanten, hochwertige Materialien.',
  },
  about:
    'Der Schmidt Malerbetrieb steht für termingerechte Abwicklung und perfekte Oberflächen in Nürnberg und der Metropolregion. Meisterbetrieb mit eigenem Farbberatungsservice.',
  services: [
    {
      title: 'Innenanstrich',
      description: 'Wände, Decken, Tapezierarbeiten. Abdeckung und Sauberkeit inklusive.',
    },
    {
      title: 'Fassadenanstrich',
      description: 'Wetterfeste Beschichtungen mit 10 Jahren Garantie auf die Ausführung.',
    },
    {
      title: 'Lackierarbeiten',
      description: 'Türen, Fenster, Treppengeländer — präzise und langlebig.',
    },
  ],
  hours: 'Mo–Fr 07:30–16:30',
  stats: [
    { value: '25+', label: 'Jahre Meisterqualität' },
    { value: '1.800', label: 'm² / Monat' },
    { value: '48h', label: 'Angebot' },
  ],
  testimonial: {
    quote: 'Pünktlich fertig, kein Klecksen, perfekte Farbabstimmung. Absolute Empfehlung.',
    author: 'Thomas K., Nürnberg-Süd',
  },
}

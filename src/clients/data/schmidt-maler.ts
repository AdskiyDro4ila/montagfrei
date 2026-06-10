import type { ClientData } from './types'

export const schmidtMaler: ClientData = {
  id: '3',
  status: 'pending',
  slug: 'schmidt-maler',
  code: 'schmidt-maler',
  business: {
    name: 'Schmidt Malerbetrieb',
    branch: 'Maler & Lackierer',
    city: 'Nürnberg',
    phone: '+49 911 234 56 78',
    email: 'anfrage@schmidt-maler.de',
    website: 'https://schmidt-maler.de',
  },
  about:
    'Der Schmidt Malerbetrieb steht für termingerechte Abwicklung und perfekte Oberflächen in Nürnberg und der Metropolregion. Meisterbetrieb mit eigenem Farbberatungsservice.',
  services: [
    { title: 'Innenanstrich', description: 'Wände, Decken, Tapezierarbeiten. Abdeckung und Sauberkeit inklusive.' },
    { title: 'Fassadenanstrich', description: 'Wetterfeste Beschichtungen mit 10 Jahren Garantie auf die Ausführung.' },
    { title: 'Lackierarbeiten', description: 'Türen, Fenster, Treppengeländer, präzise und langlebig.' },
  ],
  hours: 'Mo–Fr 07:30–16:30',
  serviceArea: 'Nürnberg und Metropolregion',
  display: {
    hero: {
      headline: 'Farbe mit Handwerk.',
      subline: 'Innen- und Außenanstrich für Wohnung, Haus und Gewerbe, saubere Kanten, hochwertige Materialien.',
    },
    stats: [
      { value: '25+', label: 'Jahre Meisterqualität' },
      { value: '1.800', label: 'm² / Monat' },
      { value: '48h', label: 'Angebot' },
    ],
    testimonial: {
      quote: 'Pünktlich fertig, kein Klecksen, perfekte Farbabstimmung. Absolute Empfehlung.',
      author: 'Thomas K., Nürnberg-Süd',
    },
  },
  scraper: {
    source: 'Branchenbuch',
    target: 'Kontakt, Servicegebiet, Farbpalette',
    status: 'idle',
    lastRun: '—',
    itemsFound: 0,
  },
}

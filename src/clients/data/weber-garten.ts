import type { ClientData } from './types'

export const weberGarten: ClientData = {
  id: '2',
  status: 'active',
  slug: 'weber-garten',
  code: 'weber-garten',
  business: {
    name: 'Grün & Garten Weber',
    branch: 'Gartenbau',
    city: 'Augsburg',
    phone: '+49 821 456 78 90',
    email: 'info@weber-garten.de',
    website: 'https://weber-garten.de',
  },
  about:
    'Wir verwandeln Außenflächen in lebendige Rückzugsorte. Regional verwurzelt in Augsburg, mit Fokus auf heimische Bepflanzung, nachhaltige Materialien und handwerkliche Präzision.',
  services: [
    { title: 'Gartengestaltung', description: 'Individuelle Konzepte mit 3D-Planung, Wege, Beete, Teiche und Sitzplätze.' },
    { title: 'Gartenpflege', description: 'Rasen, Hecken, saisonale Arbeiten. Jahresvertrag mit festem Ansprechpartner.' },
    { title: 'Terrassen & Wege', description: 'Naturstein, Holz und moderne Beläge, fachgerecht und frostbeständig verlegt.' },
  ],
  hours: 'Mo–Sa 08:00–17:00',
  serviceArea: 'Augsburg und Umgebung',
  display: {
    hero: {
      headline: 'Gärten, die bleiben.',
      subline: 'Planung, Pflege und Gestaltung, von der Terrasse bis zum kompletten Gartenkonzept.',
    },
    stats: [
      { value: '320+', label: 'Projekte' },
      { value: '12', label: 'Gärtner im Team' },
      { value: '4.9', label: 'Bewertung' },
    ],
    testimonial: {
      quote: 'Unser Garten ist jetzt unser Lieblingsort. Die Beratung war hervorragend.',
      author: 'Familie Brenner, Augsburg',
    },
  },
  scraper: {
    source: 'Website',
    target: 'Referenzprojekte, Leistungsspektrum',
    status: 'running',
    lastRun: '09.06.2026, 18:01',
    itemsFound: 12,
  },
  agent: {
    model: 'Termin & Beratung',
    status: 'training',
    conversations: 0,
    lastActive: '—',
  },
}

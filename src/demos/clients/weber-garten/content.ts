import type { DemoContent } from '../../types'

export const content: DemoContent = {
  slug: 'weber-garten',
  code: 'weber-garten',
  template: 'garten',
  branch: 'Gartenbau',
  business: {
    name: 'Grün & Garten Weber',
    city: 'Augsburg',
    phone: '+49 821 456 78 90',
    email: 'info@weber-garten.de',
  },
  hero: {
    headline: 'Gärten, die bleiben.',
    subline: 'Planung, Pflege und Gestaltung — von der Terrasse bis zum kompletten Gartenkonzept.',
  },
  about:
    'Wir verwandeln Außenflächen in lebendige Rückzugsorte. Regional verwurzelt in Augsburg, mit Fokus auf heimische Bepflanzung, nachhaltige Materialien und handwerkliche Präzision.',
  services: [
    {
      title: 'Gartengestaltung',
      description: 'Individuelle Konzepte mit 3D-Planung — Wege, Beete, Teiche und Sitzplätze.',
    },
    {
      title: 'Gartenpflege',
      description: 'Rasen, Hecken, saisonale Arbeiten. Jahresvertrag mit festem Ansprechpartner.',
    },
    {
      title: 'Terrassen & Wege',
      description: 'Naturstein, Holz und moderne Beläge — fachgerecht und frostbeständig verlegt.',
    },
  ],
  hours: 'Mo–Sa 08:00–17:00',
  stats: [
    { value: '320+', label: 'Projekte' },
    { value: '12', label: 'Gärtner im Team' },
    { value: '4.9', label: 'Bewertung' },
  ],
  testimonial: {
    quote: 'Unser Garten ist jetzt unser Lieblingsort. Die Beratung war hervorragend.',
    author: 'Familie Brenner, Augsburg',
  },
}

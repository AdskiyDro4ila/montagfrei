import type { DemoContent } from '../../types'

export const content: DemoContent = {
  slug: 'weber-garten',
  code: 'weber-garten',
  branch: 'Gartenbau',
  business: {
    name: 'Grün & Garten Weber',
    city: 'Augsburg',
    phone: '+49 821 456 78 90',
    email: 'info@weber-garten.de',
  },
  hero: {
    headline: 'Gärten, die bleiben.',
    subline: 'Planung, Pflege und Gestaltung — von der Terrasse bis zum Gartenkonzept.',
  },
  about:
    'Wir verwandeln Außenflächen in lebendige Rückzugsorte. Regional verwurzelt in Augsburg, mit Fokus auf nachhaltige Bepflanzung und präzise Ausführung.',
  services: [
    {
      title: 'Gartengestaltung',
      description: 'Individuelle Konzepte, Wege, Beete und Bepflanzung.',
    },
    {
      title: 'Gartenpflege',
      description: 'Rasen, Hecken, saisonale Arbeiten — im Jahresvertrag.',
    },
    {
      title: 'Terrassen & Wege',
      description: 'Naturstein, Holz und moderne Beläge fachgerecht verlegt.',
    },
  ],
  hours: 'Mo–Sa 08:00–17:00',
}

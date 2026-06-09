import type { DemoContent } from '../../types'

export const content: DemoContent = {
  slug: 'fischer-haus',
  code: 'fischer-haus',
  branch: 'Hausmeister',
  business: {
    name: 'Fischer Hausmeisterservice',
    city: 'Stuttgart',
    phone: '+49 711 987 65 43',
    email: 'service@fischer-haus.de',
  },
  hero: {
    headline: 'Ihr Gebäude in guten Händen.',
    subline: 'Hausmeisterservice, Wartung und schnelle Hilfe bei Notfällen.',
  },
  about:
    'Wir betreuen Wohnanlagen und Gewerbeobjekte in Stuttgart — von der Treppenhauspflege bis zur Koordination von Handwerkern vor Ort.',
  services: [
    {
      title: 'Objektbetreuung',
      description: 'Regelmäßige Kontrollgänge, Kleinreparaturen, Winterdienst.',
    },
    {
      title: 'Notfallservice',
      description: 'Erreichbar bei Wasserschaden, Stromausfall und dringenden Fällen.',
    },
    {
      title: 'Wartung & Instandhaltung',
      description: 'Heizung, Beleuchtung, Außenanlagen — proaktiv gepflegt.',
    },
  ],
  hours: '24/7 Notfall · Mo–Fr 08:00–18:00',
}

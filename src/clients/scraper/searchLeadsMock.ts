import { areaCenter } from './areaUtils'

import { SCRAPER_BRANCHES, type ScraperBranchId, type ScraperLead, type ScraperSearchParams } from './leadTypes'



const BRANCH_LABEL = Object.fromEntries(

  SCRAPER_BRANCHES.map((b) => [b.id, b.label]),

) as Record<ScraperBranchId, string>



const MOCK_NAMES: Record<ScraperBranchId, string[]> = {

  reinigung: ['Müller Gebäudereinigung', 'CleanPro Service', 'Brillant Reinigung GmbH'],

  garten: ['Grün & Garten Weber', 'Naturgarten Schmidt', 'Gartenbau Hoffmann'],

  maler: ['Schmidt Malerbetrieb', 'Farben Meister Klein', 'Malerwerk Richter'],

  hausmeister: ['Fischer Hausmeisterservice', 'Objektbetreuung Kern', 'Facility Nord'],

  elektriker: ['Elektro Wagner', 'Strom & Sicherheit Huber'],

  sanitaer: ['Sanitär König', 'Heizung & Bad Müller'],

  schreiner: ['Schreinerei Holzwerk', 'Tischlerei Bergmann'],

  dachdecker: ['Dachdeckerei Süd', 'Bedachungen Krämer'],

  fliesenleger: ['Fliesen Meister Braun', 'Platten & Design Koch'],

  metallbau: ['Metallbau Fischer', 'Schlosserei Hartmann'],

  bodenleger: ['Parkett Profi Lehmann', 'Boden & Parkett Sommer'],

}



const STREETS = ['Hauptstraße', 'Bahnhofstraße', 'Gartenweg', 'Industriestraße']



function randomInRadius(centerLat: number, centerLng: number, radiusKm: number) {

  const r = radiusKm * Math.sqrt(Math.random()) * 1000

  const angle = Math.random() * 2 * Math.PI

  const dx = r * Math.cos(angle)

  const dy = r * Math.sin(angle)

  const lat = centerLat + dy / 111_320

  const lng = centerLng + dx / (111_320 * Math.cos((centerLat * Math.PI) / 180))

  const distanceKm = Math.sqrt(dx * dx + dy * dy) / 1000

  return { lat, lng, distanceKm }

}



function slugify(name: string) {

  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

}



function mockRadiusKm(params: ScraperSearchParams): number {

  if (params.area.type === 'circle') return params.area.radiusM / 1000

  return 5

}



/** Demo-Fallback wenn Geoapify nicht erreichbar */

export async function searchMockLeads(params: ScraperSearchParams): Promise<ScraperLead[]> {

  await new Promise((r) => setTimeout(r, 500))



  if (params.branches.length === 0) return []



  const center = areaCenter(params.area)

  const radiusKm = mockRadiusKm(params)

  const leads: ScraperLead[] = []

  const cities = ['München', 'Augsburg', 'Nürnberg', 'Stuttgart']



  for (const branch of params.branches) {

    const names = MOCK_NAMES[branch]

    for (let i = 0; i < 2; i++) {

      const name = names[i % names.length]

      const geo = randomInRadius(center.lat, center.lng, radiusKm)

      const slug = slugify(name)



      leads.push({

        id: `mock-${branch}-${slug}-${i}`,

        name,

        branch,

        branchLabel: BRANCH_LABEL[branch],

        address: `${STREETS[i % STREETS.length]} ${10 + i}`,

        city: cities[i % cities.length],

        phone: `+49 89 ${100 + i} ${200 + i} ${30 + i}`,

        email: `kontakt@${slug}.de`,

        website: `https://${slug}.de`,

        distanceKm: Math.round(geo.distanceKm * 10) / 10,

        lat: geo.lat,

        lng: geo.lng,

      })

    }

  }



  return leads.sort((a, b) => a.distanceKm - b.distanceKm)

}



const center = { lat: 48.137, lng: 11.575 }
const radiusKm = 10
const branches = ['reinigung', 'garten', 'maler', 'hausmeister']

const BRANCH_TAG_FILTERS = {
  reinigung: [
    '["name"~"Reinigung|Gebäudereinigung|Putz",i]',
    '["craft"="cleaning"]',
    '["office"="cleaning"]',
  ],
  garten: ['["craft"="gardener"]', '["craft"="landscaper"]'],
  maler: ['["craft"="painter"]'],
  hausmeister: ['["office"="property_management"]', '["name"~"Hausmeister",i]'],
}

const radiusM = radiusKm * 1000
const lines = []
for (const branch of branches) {
  for (const filter of BRANCH_TAG_FILTERS[branch]) {
    lines.push(`  nwr(around:${radiusM},${center.lat},${center.lng})${filter};`)
  }
}

const query = `[out:json][timeout:90];
(
${lines.join('\n')}
);
out center tags;`

const res = await fetch('http://localhost:5173/api/overpass', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
  body: `data=${encodeURIComponent(query)}`,
})
console.log('status:', res.status)
const text = await res.text()
if (!res.ok) {
  console.log(text.slice(0, 300))
  process.exit(1)
}
const json = JSON.parse(text)
const els = json.elements ?? []
const named = els.filter((e) => e.tags?.name || e.tags?.operator || e.tags?.brand)
console.log(`elements: ${els.length}, named: ${named.length}`)
if (named.length) console.log('sample:', named.slice(0, 5).map((e) => e.tags.name || e.tags.operator))

const query = `[out:json][timeout:25];
(
  node(around:5000,48.137,11.575)["craft"="painter"];
  way(around:5000,48.137,11.575)["craft"="painter"];
);
out center tags;`

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
  'User-Agent': 'Montagfrei/1.0 (https://montagfrei.com; kontakt@montagfrei.com)',
}

async function test(url, label) {
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: `data=${encodeURIComponent(query)}`,
  })
  const text = await res.text()
  console.log(`${label}: ${res.status} len=${text.length}`)
  if (!res.ok) {
    console.log(text.slice(0, 200))
    return
  }
  const json = JSON.parse(text)
  console.log(`elements: ${json.elements?.length ?? 0}`)
}

await test('https://overpass-api.de/api/interpreter', 'direct')
await test('http://localhost:5173/api/overpass', 'local-proxy')

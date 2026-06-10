const OVERPASS_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
  'User-Agent': 'Montagfrei/1.0 (https://montagfrei.com; kontakt@montagfrei.com)',
}

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

/** Proxy für Overpass API — Scraper auf Netlify (CORS + User-Agent). */
export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = await request.text()
  let lastError = null

  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: OVERPASS_HEADERS,
        body,
      })

      if (res.ok) {
        return new Response(await res.text(), {
          status: res.status,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        })
      }

      lastError = `${endpoint} → ${res.status}`
    } catch (err) {
      lastError = err instanceof Error ? err.message : 'Unbekannter Fehler'
    }
  }

  return new Response(
    JSON.stringify({ error: 'Overpass nicht erreichbar', detail: lastError }),
    { status: 502, headers: { 'Content-Type': 'application/json' } },
  )
}

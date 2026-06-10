/** Proxy für Geoapify Places API — API-Key bleibt serverseitig. */
export default async (request) => {
  const apiKey = Netlify.env.get('GEOAPIFY_API_KEY')
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEOAPIFY_API_KEY fehlt' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(request.url)
  url.searchParams.set('apiKey', apiKey)

  const res = await fetch(`https://api.geoapify.com/v2/places?${url.searchParams}`)
  return new Response(await res.text(), {
    status: res.status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

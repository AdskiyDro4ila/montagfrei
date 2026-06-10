import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

function placesProxyMiddleware(apiKey: string) {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void,
  ) => {
    if (!req.url?.startsWith('/api/places')) return next()
    if (req.method !== 'GET') {
      res.statusCode = 405
      res.end('Method not allowed')
      return
    }
    if (!apiKey) {
      res.statusCode = 503
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'GEOAPIFY_API_KEY fehlt in .env.local' }))
      return
    }

    const query = req.url.slice('/api/places'.length) || ''
    const geoUrl = `https://api.geoapify.com/v2/places${query}${query.includes('?') ? '&' : '?'}apiKey=${apiKey}`

    try {
      const upstream = await fetch(geoUrl)
      res.statusCode = upstream.status
      res.setHeader('Content-Type', 'application/json')
      res.end(await upstream.text())
    } catch {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Geoapify nicht erreichbar' }))
    }
  }
}

function geoapifyProxyPlugin(apiKey: string): Plugin {
  return {
    name: 'geoapify-proxy',
    configureServer(server) {
      server.middlewares.use(placesProxyMiddleware(apiKey))
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), geoapifyProxyPlugin(env.GEOAPIFY_API_KEY ?? '')],
  }
})

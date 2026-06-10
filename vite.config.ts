import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/overpass': {
        target: 'https://overpass-api.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/overpass/, '/api/interpreter'),
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Montagfrei/1.0 (https://montagfrei.com; kontakt@montagfrei.com)',
        },
      },
    },
  },
})

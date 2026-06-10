import { readFileSync } from 'node:fs'

const env = readFileSync('.env.local', 'utf8')
const hasKey = /^GEOAPIFY_API_KEY=(.+)$/m.test(env) && !env.match(/^GEOAPIFY_API_KEY=\s*$/m)

const url =
  'http://localhost:5173/api/places?categories=commercial,office,service&filter=circle:11.575,48.137,5000&limit=3&lang=de'

const res = await fetch(url)
const text = await res.text()
console.log('key in .env.local:', hasKey ? 'yes' : 'no')
console.log('proxy status:', res.status)
console.log('content-type:', res.headers.get('content-type'))
if (text.startsWith('{')) {
  const json = JSON.parse(text)
  console.log('features:', json.features?.length ?? 0)
  if (json.error) console.log('error:', json.error)
  if (json.message) console.log('message:', json.message)
} else {
  console.log('response starts with:', text.slice(0, 80))
}

import { CLIENT_DATA } from './data'
import { getDynamicClientsFromStore } from './data/repository'
import type { ClientData } from './data/types'

function allClients(): ClientData[] {
  return [...CLIENT_DATA, ...getDynamicClientsFromStore()]
}

function buildMaps() {
  const clients = allClients()
  const bySlug = new Map(clients.map((c) => [c.slug, c]))
  const byCode = new Map(clients.map((c) => [c.code, c]))
  const legacy = bySlug.get('mueller-reinigung')
  if (legacy) byCode.set('montagfrei', legacy)
  return { bySlug, byCode }
}

export function getAllClients(): ClientData[] {
  return allClients()
}

export function getClientBySlug(slug: string): ClientData | undefined {
  return buildMaps().bySlug.get(slug)
}

export function getClientByCode(code: string): ClientData | undefined {
  return buildMaps().byCode.get(code.trim().toLowerCase())
}

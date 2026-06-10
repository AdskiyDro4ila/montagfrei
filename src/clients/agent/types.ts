import type { ClientData } from '../data/types'

/**
 * KI-Agent-Wissensbasis — abgeleitet aus ClientData.
 * Dieselben Felder die auf der Demo-Website sichtbar sind.
 */
export interface AgentKnowledgeBase {
  businessName: string
  branch: string
  city: string
  phone: string
  email: string
  about: string
  services: ClientData['services']
  hours: string
  serviceArea?: string
}

export function toAgentKnowledge(data: ClientData): AgentKnowledgeBase {
  return {
    businessName: data.business.name,
    branch: data.business.branch,
    city: data.business.city,
    phone: data.business.phone,
    email: data.business.email,
    about: data.about,
    services: data.services,
    hours: data.hours,
    serviceArea: data.serviceArea,
  }
}

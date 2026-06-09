import type { AgentRecord, ClientRecord, ScraperJob } from '../types/admin'

/** Placeholder data — replace with API responses when backend is connected */

export const CLIENTS: ClientRecord[] = [
  {
    id: '1',
    name: 'Müller Reinigung',
    branch: 'Gebäudereinigung',
    code: 'mueller-reinigung',
    city: 'München',
    status: 'active',
  },
  {
    id: '2',
    name: 'Grün & Garten Weber',
    branch: 'Gartenbau',
    code: 'weber-garten',
    city: 'Augsburg',
    status: 'active',
  },
  {
    id: '3',
    name: 'Schmidt Malerbetrieb',
    branch: 'Maler',
    code: 'schmidt-maler',
    city: 'Nürnberg',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Fischer Hausmeisterservice',
    branch: 'Hausmeister',
    code: 'fischer-haus',
    city: 'Stuttgart',
    status: 'inactive',
  },
]

export function getClientCodeByName(name: string): string | undefined {
  return CLIENTS.find((c) => c.name === name)?.code
}

export const SCRAPER_JOBS: ScraperJob[] = [
  {
    id: '1',
    clientName: 'Müller Reinigung',
    source: 'Google Business',
    target: 'Leistungen, Öffnungszeiten, Bewertungen',
    status: 'done',
    lastRun: '09.06.2026, 14:32',
    itemsFound: 24,
  },
  {
    id: '2',
    clientName: 'Grün & Garten Weber',
    source: 'Website',
    target: 'Referenzprojekte, Leistungsspektrum',
    status: 'running',
    lastRun: '09.06.2026, 18:01',
    itemsFound: 12,
  },
  {
    id: '3',
    clientName: 'Schmidt Malerbetrieb',
    source: 'Branchenbuch',
    target: 'Kontakt, Servicegebiet, Farbpalette',
    status: 'idle',
    lastRun: '—',
    itemsFound: 0,
  },
]

export const AGENTS: AgentRecord[] = [
  {
    id: '1',
    clientName: 'Müller Reinigung',
    branch: 'Gebäudereinigung',
    model: 'Anfragen & Angebote',
    status: 'online',
    conversations: 47,
    lastActive: 'vor 12 Min.',
  },
  {
    id: '2',
    clientName: 'Grün & Garten Weber',
    branch: 'Gartenbau',
    model: 'Termin & Beratung',
    status: 'training',
    conversations: 0,
    lastActive: '—',
  },
  {
    id: '3',
    clientName: 'Fischer Hausmeisterservice',
    branch: 'Hausmeister',
    model: 'Notfall & Wartung',
    status: 'offline',
    conversations: 18,
    lastActive: 'vor 3 Tagen',
  },
]

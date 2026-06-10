export const CLIENTS_UPDATED_EVENT = 'montagfrei:clients-updated'

export function notifyClientsUpdated(): void {
  window.dispatchEvent(new CustomEvent(CLIENTS_UPDATED_EVENT))
}

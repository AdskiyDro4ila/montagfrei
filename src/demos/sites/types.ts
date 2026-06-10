import type { ComponentType } from 'react'
import type { ClientData } from '../../clients/data/types'

/** Props für jede Demo-Site — externe Builder implementieren diese Schnittstelle */
export interface ClientSiteProps {
  data: ClientData
}

export type ClientSiteComponent = ComponentType<ClientSiteProps>

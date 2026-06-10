import { GartenTemplate } from '../../templates/GartenTemplate'
import { toLegacyDemoContent } from '../adaptLegacyTemplate'
import type { ClientSiteProps } from '../types'

export default function Demo({ data }: ClientSiteProps) {
  return <GartenTemplate content={toLegacyDemoContent(data, 'garten')} />
}

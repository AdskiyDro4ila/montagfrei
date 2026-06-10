import { ReinigungTemplate } from '../../templates/ReinigungTemplate'
import { toLegacyDemoContent } from '../adaptLegacyTemplate'
import type { ClientSiteProps } from '../types'

export default function Demo({ data }: ClientSiteProps) {
  return <ReinigungTemplate content={toLegacyDemoContent(data, 'reinigung')} />
}

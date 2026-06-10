import { MalerTemplate } from '../../templates/MalerTemplate'
import { toLegacyDemoContent } from '../adaptLegacyTemplate'
import type { ClientSiteProps } from '../types'

export default function Demo({ data }: ClientSiteProps) {
  return <MalerTemplate content={toLegacyDemoContent(data, 'maler')} />
}

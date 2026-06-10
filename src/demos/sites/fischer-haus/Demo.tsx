import { HausmeisterTemplate } from '../../templates/HausmeisterTemplate'
import { toLegacyDemoContent } from '../adaptLegacyTemplate'
import type { ClientSiteProps } from '../types'

export default function Demo({ data }: ClientSiteProps) {
  return <HausmeisterTemplate content={toLegacyDemoContent(data, 'hausmeister')} />
}

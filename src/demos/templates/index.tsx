import type { DemoContent } from '../types'
import { GartenTemplate } from './GartenTemplate'
import { HausmeisterTemplate } from './HausmeisterTemplate'
import { MalerTemplate } from './MalerTemplate'
import { ReinigungTemplate } from './ReinigungTemplate'

export function DemoTemplate({ content }: { content: DemoContent }) {
  switch (content.template) {
    case 'reinigung':
      return <ReinigungTemplate content={content} />
    case 'garten':
      return <GartenTemplate content={content} />
    case 'maler':
      return <MalerTemplate content={content} />
    case 'hausmeister':
      return <HausmeisterTemplate content={content} />
  }
}

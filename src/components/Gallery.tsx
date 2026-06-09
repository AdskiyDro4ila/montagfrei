import { DesignBrutalist } from './designs'

interface GalleryProps {
  onLogoClick: () => void
}

export function Gallery({ onLogoClick }: GalleryProps) {
  return (
    <main className="w-full">
      <DesignBrutalist onLogoClick={onLogoClick} />
    </main>
  )
}

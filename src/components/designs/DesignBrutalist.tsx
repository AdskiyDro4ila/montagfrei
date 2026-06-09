import { DesignSection } from '../DesignSection'
import { Logo } from '../Logo'

interface Props {
  onLogoClick: () => void
}

export function DesignBrutalist({ onLogoClick }: Props) {
  return (
    <DesignSection id="design-1" className="bg-white">
      <Logo
        onClick={onLogoClick}
        variant="mono"
        className="max-w-full text-center font-display text-[clamp(2.25rem,10vw,9rem)] font-bold uppercase leading-none tracking-tight text-black"
      />
    </DesignSection>
  )
}

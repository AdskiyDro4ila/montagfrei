import { useCallback, useState } from 'react'
import type { AppView } from '../lib/routes'

export type View = AppView

export function useViewTransition(initial: View = 'gallery') {
  const [view, setView] = useState<View>(initial)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigate = useCallback((next: View) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setView(next)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 400)
  }, [])

  return { view, navigate, isTransitioning }
}

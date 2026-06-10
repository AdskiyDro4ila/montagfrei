import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { HomeFooter } from './HomeFooter'

const SCROLL_BUFFER = '4rem'

export function HomePage() {
  const navigate = useNavigate()
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setFooterVisible(window.scrollY > 8)
    }

    function onWheel(e: WheelEvent) {
      if (e.deltaY > 0) setFooterVisible(true)
      if (e.deltaY < 0 && window.scrollY <= 8) setFooterVisible(false)
    }

    let touchStartY = 0
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY
    }
    function onTouchMove(e: TouchEvent) {
      const delta = touchStartY - e.touches[0].clientY
      if (delta > 8) setFooterVisible(true)
      if (delta < -8 && window.scrollY <= 8) setFooterVisible(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <div
      className="relative bg-white"
      style={{ minHeight: `calc(100dvh + ${SCROLL_BUFFER})` }}
    >
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-5 sm:px-8">
        <Logo
          onClick={() => navigate('/access')}
          variant="mono"
          className="pointer-events-auto max-w-full text-center font-display text-[clamp(2.25rem,10vw,9rem)] font-bold uppercase leading-none tracking-tight text-black"
        />
      </div>

      <HomeFooter visible={footerVisible} />
    </div>
  )
}

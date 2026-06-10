import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { HomeFooter } from './HomeFooter'

export function HomePage() {
  const navigate = useNavigate()
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setFooterVisible(window.scrollY > window.innerHeight * 0.12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-[200dvh] bg-white">
      {/* Logo — fixed center, stays on scroll */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-5 sm:px-8">
        <Logo
          onClick={() => navigate('/access')}
          variant="mono"
          className="pointer-events-auto max-w-full text-center font-display text-[clamp(2.25rem,10vw,9rem)] font-bold uppercase leading-none tracking-tight text-black"
        />
      </div>

      {/* Scroll spacer — enables scroll without moving logo */}
      <div className="h-dvh" aria-hidden />

      <HomeFooter visible={footerVisible} />
    </div>
  )
}

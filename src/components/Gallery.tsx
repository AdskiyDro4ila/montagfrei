import { useNavigate } from 'react-router-dom'
import { DesignBrutalist } from './designs'

export function Gallery() {
  const navigate = useNavigate()

  return (
    <main className="w-full">
      <DesignBrutalist onLogoClick={() => navigate('/access')} />
    </main>
  )
}

import { Gallery } from './components/Gallery'
import { CodeEntry } from './components/CodeEntry'
import { AdminDashboard } from './components/AdminDashboard'
import { useViewTransition } from './hooks/useViewTransition'

export default function App() {
  const { view, navigate, isTransitioning } = useViewTransition()

  return (
    <div className="relative min-h-dvh">
      <div
        className={`
          transition-opacity duration-400 ease-out
          ${isTransitioning ? 'pointer-events-none opacity-0' : 'opacity-100'}
        `}
        style={{ transitionDuration: '400ms' }}
      >
        {view === 'gallery' && (
          <Gallery onLogoClick={() => navigate('code')} />
        )}
        {view === 'code' && (
          <CodeEntry
            onBack={() => navigate('gallery')}
            onAdminSuccess={() => navigate('admin')}
          />
        )}
        {view === 'admin' && (
          <AdminDashboard onLogout={() => navigate('gallery')} />
        )}
      </div>
    </div>
  )
}

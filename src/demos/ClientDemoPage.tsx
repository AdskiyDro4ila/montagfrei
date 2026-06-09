import { Link, useParams } from 'react-router-dom'
import { getDemoBySlug } from './registry'
import { DemoTemplate } from './templates'

export function ClientDemoPage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? getDemoBySlug(slug) : undefined

  if (!content) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-white px-5">
        <div className="text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
            Demo nicht gefunden
          </p>
          <Link
            to="/"
            className="mt-8 inline-block font-display text-[10px] uppercase tracking-[0.15em] text-black/40 transition-opacity hover:text-black/70"
          >
            Zurück
          </Link>
        </div>
      </div>
    )
  }

  return <DemoTemplate content={content} />
}

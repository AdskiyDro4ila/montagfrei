import type { DemoContent } from '../types'

export function HausmeisterTemplate({ content }: { content: DemoContent }) {
  const { business, hero, about, services, hours, stats, testimonial, branch } = content

  return (
    <div className="min-h-dvh bg-slate-100 font-[DM_Sans,Inter,sans-serif] text-slate-900">
      <div className="bg-amber-500 px-5 py-2 text-center text-xs font-semibold text-slate-900 sm:text-sm">
        24/7 Notfall-Hotline: <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="underline">{business.phone}</a>
      </div>

      <nav className="border-b border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <p className="text-lg font-bold tracking-tight">{business.name}</p>
            <p className="text-xs text-slate-400">{branch} · {business.city}</p>
          </div>
          <a href="#kontakt" className="rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-amber-400">
            Objekt anmelden
          </a>
        </div>
      </nav>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            Notfallservice aktiv
          </div>
          <h1 className="mt-8 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-400">{hero.subline}</p>
          <div className="mt-14 grid grid-cols-3 gap-4 sm:max-w-lg">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-center">
                <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="text-2xl font-bold">Unsere Leistungen</h2>
        <p className="mt-2 text-slate-500">Alles aus einer Hand — für Ihr Objekt.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="mb-4 h-1 w-10 rounded-full bg-amber-500" />
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold">Warum Fischer?</h2>
            <p className="mt-4 leading-relaxed text-slate-500">{about}</p>
          </div>
          <div className="rounded-xl bg-slate-900 p-8 text-white">
            <p className="italic leading-relaxed text-slate-300">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-6 text-sm font-semibold text-amber-400">{testimonial.author}</p>
          </div>
        </div>
      </section>

      <section id="kontakt" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="rounded-2xl bg-slate-900 p-10 text-white sm:p-14">
          <h2 className="text-2xl font-bold">Kontakt aufnehmen</h2>
          <p className="mt-2 text-slate-400">{hours}</p>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-16">
            <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-xl font-bold text-amber-400 hover:underline">{business.phone}</a>
            <a href={`mailto:${business.email}`} className="text-slate-300 hover:text-white">{business.email}</a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-200 py-8 text-center text-xs text-slate-500">
        © {business.name} · Demo by Montagfrei
      </footer>
    </div>
  )
}

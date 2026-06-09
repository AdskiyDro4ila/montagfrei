import type { DemoContent } from '../types'

export function ReinigungTemplate({ content }: { content: DemoContent }) {
  const { business, hero, about, services, hours, stats, testimonial, branch } = content

  return (
    <div className="min-h-dvh bg-slate-50 font-[Inter,sans-serif] text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white">
              M
            </div>
            <span className="text-sm font-semibold tracking-tight">{business.name}</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-500 sm:flex">
            <a href="#leistungen" className="transition-colors hover:text-sky-600">Leistungen</a>
            <a href="#ueber-uns" className="transition-colors hover:text-sky-600">Über uns</a>
            <a href="#kontakt" className="transition-colors hover:text-sky-600">Kontakt</a>
          </div>
          <a
            href={`tel:${business.phone.replace(/\s/g, '')}`}
            className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
          >
            Anrufen
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-sky-50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">{branch} · {business.city}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-500">{hero.subline}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#kontakt" className="rounded-lg bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700">
                Kostenloses Angebot
              </a>
              <a href="#leistungen" className="rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-600">
                Leistungen ansehen
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 self-center">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center shadow-sm">
                <p className="text-2xl font-bold text-sky-600 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="leistungen" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">Leistungen</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Was wir für Sie tun</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.title} className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition hover:border-sky-200 hover:shadow-md">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-lg font-bold text-sky-600">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ueber-uns" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">Über uns</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Ihr Partner für Sauberkeit</h2>
            <p className="mt-6 leading-relaxed text-slate-500">{about}</p>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-slate-50 p-8">
            <p className="text-lg italic leading-relaxed text-slate-600">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-6 text-sm font-semibold text-slate-900">{testimonial.author}</p>
          </div>
        </div>
      </section>

      <section id="kontakt" className="bg-sky-600">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Bereit für strahlende Räume?</h2>
              <p className="mt-2 text-sky-100">{hours} · {business.city}</p>
            </div>
            <div className="flex flex-col gap-3 sm:text-right">
              <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-lg font-semibold text-white hover:underline">{business.phone}</a>
              <a href={`mailto:${business.email}`} className="text-sky-100 hover:text-white">{business.email}</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
        © {business.name} · Demo by Montagfrei
      </footer>
    </div>
  )
}

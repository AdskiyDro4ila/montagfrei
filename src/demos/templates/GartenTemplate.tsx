import type { DemoContent } from '../types'

export function GartenTemplate({ content }: { content: DemoContent }) {
  const { business, hero, about, services, hours, stats, testimonial, branch } = content

  return (
    <div className="min-h-dvh bg-[#f5f1e8] font-[Inter,sans-serif] text-[#1a2e1a]">
      <nav className="border-b border-[#1a2e1a]/10 bg-[#f5f1e8]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="font-[Instrument_Serif,serif] text-xl italic text-[#2d5a27]">{business.name}</span>
          <div className="hidden gap-8 text-sm text-[#1a2e1a]/60 sm:flex">
            <a href="#arbeiten" className="hover:text-[#2d5a27]">Arbeiten</a>
            <a href="#ueber-uns" className="hover:text-[#2d5a27]">Philosophie</a>
            <a href="#kontakt" className="hover:text-[#2d5a27]">Kontakt</a>
          </div>
          <a href="#kontakt" className="rounded-full bg-[#2d5a27] px-5 py-2 text-xs font-medium text-[#f5f1e8] transition hover:bg-[#1a2e1a]">
            Beratung
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#2d5a27]/10 to-transparent" />
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2d5a27]/70">{branch} · {business.city}</p>
          <h1 className="mt-6 max-w-3xl font-[Instrument_Serif,serif] text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#1a2e1a]/60">{hero.subline}</p>
          <div className="mt-14 flex flex-wrap gap-10 border-t border-[#1a2e1a]/10 pt-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-[Instrument_Serif,serif] text-4xl text-[#2d5a27]">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#1a2e1a]/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-[#2d5a27] lg:grid-cols-2">
          <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-[#3d7a35] to-[#1a2e1a] p-12">
            <div className="text-center text-[#f5f1e8]/30">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full border-2 border-dashed border-[#f5f1e8]/20" />
              <p className="text-xs uppercase tracking-widest">Gartenprojekt</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-10 lg:p-14">
            <p className="text-sm italic leading-relaxed text-[#f5f1e8]/80">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-6 text-sm font-medium text-[#f5f1e8]">{testimonial.author}</p>
          </div>
        </div>
      </section>

      <section id="arbeiten" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="font-[Instrument_Serif,serif] text-4xl text-[#2d5a27]">Unsere Arbeiten</h2>
        <div className="mt-12 space-y-6">
          {services.map((s) => (
            <div key={s.title} className="group flex flex-col gap-4 rounded-2xl border border-[#1a2e1a]/10 bg-white/60 p-8 transition hover:bg-white sm:flex-row sm:items-center">
              <div className="h-1 w-12 shrink-0 rounded-full bg-[#2d5a27] sm:h-12 sm:w-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1a2e1a]/60">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="ueber-uns" className="border-t border-[#1a2e1a]/10 bg-white/40">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <h2 className="font-[Instrument_Serif,serif] text-3xl text-[#2d5a27]">Unsere Philosophie</h2>
          <p className="mt-8 text-lg leading-relaxed text-[#1a2e1a]/70">{about}</p>
        </div>
      </section>

      <section id="kontakt" className="bg-[#1a2e1a] text-[#f5f1e8]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-[Instrument_Serif,serif] text-3xl">Lassen Sie uns Ihren Garten planen</h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-12">
            <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-lg hover:underline">{business.phone}</a>
            <a href={`mailto:${business.email}`} className="text-[#f5f1e8]/70 hover:text-[#f5f1e8]">{business.email}</a>
            <span className="text-[#f5f1e8]/50">{hours}</span>
          </div>
        </div>
      </section>

      <footer className="bg-[#1a2e1a] py-6 text-center text-xs text-[#f5f1e8]/30">
        © {business.name} · Demo by Montagfrei
      </footer>
    </div>
  )
}

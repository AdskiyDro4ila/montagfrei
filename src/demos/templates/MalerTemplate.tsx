import type { DemoContent } from '../types'

const PALETTE = ['#C45C3E', '#2C3E50', '#F4E4BC', '#8B9A6B', '#1A1A2E']

export function MalerTemplate({ content }: { content: DemoContent }) {
  const { business, hero, about, services, hours, stats, testimonial, branch } = content

  return (
    <div className="min-h-dvh bg-[#faf8f5] font-[Space_Grotesk,sans-serif] text-[#1a1a1a]">
      <header className="grid min-h-[85dvh] lg:grid-cols-2">
        <div className="flex flex-col justify-between bg-[#f4c430] px-6 py-8 sm:px-10 lg:px-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1a1a1a]/50">{branch}</p>
            <h1 className="mt-8 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              {business.name}
            </h1>
          </div>
          <p className="max-w-sm text-sm font-medium leading-relaxed text-[#1a1a1a]/70">{hero.subline}</p>
        </div>
        <div className="flex flex-col justify-center bg-[#1a1a1a] px-6 py-16 text-white sm:px-10 lg:px-14">
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {hero.headline}
          </h2>
          <div className="mt-12 flex gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[#f4c430]">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
          <a href="#kontakt" className="mt-12 inline-block w-fit border-2 border-[#f4c430] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#f4c430] transition hover:bg-[#f4c430] hover:text-[#1a1a1a]">
            Angebot anfordern
          </a>
        </div>
      </header>

      <section className="border-y-2 border-[#1a1a1a] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-0 px-5 py-8 sm:px-8">
          {PALETTE.map((color) => (
            <div
              key={color}
              className="h-16 w-16 border-2 border-[#1a1a1a] sm:h-20 sm:w-20"
              style={{ backgroundColor: color }}
            />
          ))}
          <p className="w-full text-center text-xs uppercase tracking-widest text-[#1a1a1a]/40 sm:mt-4 sm:w-auto sm:ml-6 sm:mt-0">
            Farbberatung inklusive
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#c45c3e]">Leistungen</h2>
        <div className="mt-10 grid gap-px bg-[#1a1a1a] sm:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.title} className={`bg-[#faf8f5] p-8 ${i === 1 ? 'sm:bg-[#f4c430]/30' : ''}`}>
              <span className="text-4xl font-bold text-[#1a1a1a]/10">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold uppercase">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1a1a1a]/60">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="flex items-center bg-[#c45c3e] px-8 py-16 text-white lg:px-14">
          <div>
            <p className="text-lg italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-6 text-sm font-bold uppercase tracking-wider">{testimonial.author}</p>
          </div>
        </div>
        <div className="flex items-center px-8 py-16 lg:px-14">
          <p className="text-base leading-relaxed text-[#1a1a1a]/70">{about}</p>
        </div>
      </section>

      <section id="kontakt" className="bg-[#1a1a1a] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold uppercase">Kontakt</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Telefon</p>
              <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="mt-2 block font-medium hover:text-[#f4c430]">{business.phone}</a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">E-Mail</p>
              <a href={`mailto:${business.email}`} className="mt-2 block font-medium hover:text-[#f4c430]">{business.email}</a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Standort</p>
              <p className="mt-2 font-medium">{business.city} · {hours}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#1a1a1a] py-6 text-center text-[10px] uppercase tracking-widest text-[#1a1a1a]/30">
        © {business.name} · Demo by Montagfrei
      </footer>
    </div>
  )
}

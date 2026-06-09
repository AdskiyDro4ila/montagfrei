import type { DemoContent } from '../types'

interface DemoLayoutProps {
  content: DemoContent
}

export function DemoLayout({ content }: DemoLayoutProps) {
  const { business, hero, about, services, hours, branch } = content

  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b-[3px] border-black px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-start justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-tight text-black sm:text-base">
              {business.name}
            </p>
            <p className="mt-1 font-display text-[10px] uppercase tracking-[0.15em] text-black/40">
              {branch} · {business.city}
            </p>
          </div>
          <a
            href={`tel:${business.phone.replace(/\s/g, '')}`}
            className="hidden shrink-0 rounded-[4px] border-[3px] border-black px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-black hover:text-white sm:inline-block"
          >
            Anrufen
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <section className="view-enter">
          <h1 className="font-display text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase leading-tight tracking-tight text-black">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl font-display text-sm leading-relaxed text-black/50 sm:text-base">
            {hero.subline}
          </p>
        </section>

        <section className="mt-20 border-t border-black/10 pt-16">
          <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            Über uns
          </h2>
          <p className="mt-6 max-w-xl font-display text-sm leading-relaxed text-black/70">
            {about}
          </p>
        </section>

        <section className="mt-20 border-t border-black/10 pt-16">
          <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            Leistungen
          </h2>
          <div className="mt-8 space-y-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[4px] border-[3px] border-black px-5 py-5"
              >
                <p className="font-display text-sm font-bold uppercase tracking-tight text-black">
                  {service.title}
                </p>
                <p className="mt-2 font-display text-xs leading-relaxed text-black/50">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-black/10 pt-16">
          <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            Kontakt
          </h2>
          <div className="mt-8 space-y-3 font-display text-sm text-black/70">
            <p>{business.phone}</p>
            <p>{business.email}</p>
            <p>{business.city}</p>
            <p className="text-black/40">{hours}</p>
          </div>
          <a
            href={`mailto:${business.email}`}
            className="mt-8 inline-block rounded-[4px] border-[3px] border-black px-6 py-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            Anfrage senden
          </a>
        </section>
      </main>

      <footer className="border-t-[3px] border-black px-5 py-8 sm:px-8">
        <p className="mx-auto max-w-3xl font-display text-[10px] uppercase tracking-[0.2em] text-black/25">
          Demo · Montagfrei
        </p>
      </footer>
    </div>
  )
}

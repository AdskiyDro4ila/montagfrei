/**
 * Demo-Site Vorlage für externe Builder
 *
 * REGELN:
 * - Design komplett frei (Layout, Farben, Animationen, Struktur)
 * - Pflicht: data.business.phone und data.business.email in der Kontakt-Sektion
 * - Empfohlen: data.services, data.about, data.hours aus data lesen (KI-Agent nutzt dieselben Werte)
 * - Optional: data.display.hero / stats / testimonial
 *
 * Einbinden:
 * 1. Ordner kopieren → demos/sites/neuer-kunde/
 * 2. In demos/sites/registry.ts eintragen
 * 3. Kundendaten in clients/data/neuer-kunde.ts + data/index.ts
 */

import type { ClientSiteProps } from '../types'

export default function Demo({ data }: ClientSiteProps) {
  const { business, services, about, hours } = data

  return (
    <div className="min-h-dvh bg-white font-sans text-neutral-900">
      <header className="border-b border-neutral-200 px-6 py-4">
        <h1 className="text-lg font-semibold">{business.name}</h1>
        <p className="text-sm text-neutral-500">{business.branch} · {business.city}</p>
      </header>

      <main className="mx-auto max-w-2xl space-y-10 px-6 py-12">
        <section>
          <h2 className="text-2xl font-bold">Über uns</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">{about}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Leistungen</h2>
          <ul className="mt-4 space-y-4">
            {services.map((s) => (
              <li key={s.title}>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-neutral-600">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="kontakt">
          <h2 className="text-2xl font-bold">Kontakt</h2>
          <p className="mt-2 text-sm text-neutral-500">{hours}</p>
          <p className="mt-4">
            <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="underline">
              {business.phone}
            </a>
          </p>
          <p className="mt-2">
            <a href={`mailto:${business.email}`} className="underline">
              {business.email}
            </a>
          </p>
        </section>
      </main>
    </div>
  )
}

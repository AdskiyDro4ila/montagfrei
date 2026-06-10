import { Link } from 'react-router-dom'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function KontaktPage() {
  return (
    <LegalLayout title="Kontakt">
      <p className="text-black/50">
        Wir melden uns in der Regel innerhalb von zwei Werktagen.
      </p>

      <LegalSection title="E-Mail">
        <a
          href="mailto:kontakt@montagfrei.de"
          className="inline-block font-display text-base font-bold uppercase tracking-tight text-black transition-opacity hover:opacity-60"
        >
          kontakt@montagfrei.de
        </a>
      </LegalSection>

      <LegalSection title="Anfrage">
        <p>
          Schreiben Sie uns kurz, welchen Betrieb Sie führen und was Sie
          benötigen — Demo-Website, Live-Umsetzung oder KI-Agent. Wir melden
          uns mit den nächsten Schritten.
        </p>
      </LegalSection>

      <LegalSection title="Zugang zur Demo">
        <p>
          Bereits einen Code? Auf der{' '}
          <Link to="/" className="text-black underline underline-offset-2">
            Startseite
          </Link>{' '}
          auf Montagfrei klicken und Code eingeben.
        </p>
      </LegalSection>

      <LegalSection title="Impressum">
        <p>
          Angaben zum Anbieter finden Sie im{' '}
          <Link to="/impressum" className="text-black underline underline-offset-2">
            Impressum
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

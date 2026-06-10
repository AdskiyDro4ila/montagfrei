import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <p className="text-black/50">
        Angaben gemäß § 5 TMG und § 18 Abs. 2 MStV
      </p>

      <LegalSection title="Anbieter">
        <p>
          Montagfrei
          <br />
          [Vor- und Nachname / Firma]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          Deutschland
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon: [Telefonnummer]
          <br />
          E-Mail:{' '}
          <a href="mailto:kontakt@montagfrei.de" className="text-black underline underline-offset-2">
            kontakt@montagfrei.de
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
          <br />
          [DE XXX XXX XXX] — sofern vorhanden
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)">
        <p>
          [Vor- und Nachname]
          <br />
          [Anschrift wie oben]
        </p>
      </LegalSection>

      <LegalSection title="Berufsbezeichnung und Kammer">
        <p>
          Montagfrei erbringt Dienstleistungen im Bereich Webdesign,
          Softwareentwicklung und digitale Kommunikation. Eine besondere
          Kammerzugehörigkeit besteht nicht, sofern nicht gesondert angegeben.
        </p>
      </LegalSection>

      <LegalSection title="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline underline-offset-2"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter verantwortlich.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

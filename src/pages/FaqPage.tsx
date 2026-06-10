import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function FaqPage() {
  return (
    <LegalLayout title="FAQ">
      <LegalSection title="Was ist Montagfrei?">
        <p>
          Montagfrei ist eine digitale Plattform für kleine Handwerks- und
          Dienstleistungsbetriebe — Putzfirmen, Gartenbauer, Maler, Hausmeister
          und vergleichbare Gewerbe. Wir erstellen professionelle Demo-Websites
          und bereiten die Integration eines KI-Agenten auf der Live-Website des
          Kunden vor.
        </p>
      </LegalSection>

      <LegalSection title="Wie erhalte ich Zugang zur Demo-Website?">
        <p>
          Sie erhalten von uns einen individuellen Zugangscode. Auf der
          Startseite klicken Sie auf „Montagfrei“, geben den Code ein und
          gelangen direkt zu Ihrer persönlichen Demo-Website.
        </p>
      </LegalSection>

      <LegalSection title="Ist die Demo-Website bereits meine finale Website?">
        <p>
          Die Demo dient als Entwurf zur Abstimmung von Texten, Struktur und
          Design. Nach Ihrer Freigabe implementieren wir die Website auf Ihrer
          Wunsch-Domain. Anpassungen können jederzeit besprochen werden.
        </p>
      </LegalSection>

      <LegalSection title="Was kostet der Service?">
        <p>
          Die Konditionen werden individuell vereinbart — abhängig von Umfang,
          Branche und gewünschten Zusatzleistungen wie KI-Agent oder laufender
          Wartung. Ein Angebot erhalten Sie nach dem Erstgespräch.
        </p>
      </LegalSection>

      <LegalSection title="Was ist der KI-Agent?">
        <p>
          Der KI-Agent wird auf Ihrer Live-Website eingebunden und beantwortet
          Kundenanfragen, unterstützt bei Terminanfragen und entlastet Ihren
          Betrieb im Alltag. Die Einführung erfolgt nach Fertigstellung und
          Freigabe Ihrer Website.
        </p>
      </LegalSection>

      <LegalSection title="Wie werden meine Daten geschützt?">
        <p>
          Wir verarbeiten personenbezogene Daten nur im Rahmen der geltenden
          Datenschutzgesetze (DSGVO). Details entnehmen Sie unserem Impressum
          und den gesonderten Datenschutzhinweisen, die wir Ihnen bei
          Vertragsschluss zur Verfügung stellen.
        </p>
      </LegalSection>

      <LegalSection title="An wen wende ich mich bei Fragen?">
        <p>
          Schreiben Sie uns an{' '}
          <a href="mailto:kontakt@montagfrei.de" className="text-black underline underline-offset-2">
            kontakt@montagfrei.de
          </a>
          . Wir melden uns in der Regel innerhalb von zwei Werktagen.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

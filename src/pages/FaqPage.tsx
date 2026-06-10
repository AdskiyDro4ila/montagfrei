import { Link } from 'react-router-dom'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function FaqPage() {
  return (
    <LegalLayout title="FAQ">
      <p className="text-lg leading-relaxed text-black/80">
        Montagfrei macht professionelle Online-Präsenz für kleine Betriebe
        einfach — ohne IT-Abteilung, ohne Komplexität.
      </p>

      <LegalSection title="Was ist Montagfrei?">
        <p>
          Montagfrei ist eine digitale Plattform für kleine Handwerks- und
          Dienstleistungsbetriebe — Putzfirmen, Gartenbauer, Maler, Hausmeister
          und vergleichbare Gewerbe. Wir erstellen professionelle Demo-Websites
          und bereiten die Integration eines KI-Agenten auf der Live-Website des
          Kunden vor.
        </p>
      </LegalSection>

      <LegalSection title="Für wen ist Montagfrei?">
        <p>
          Putzfirmen, Gartenbauer, Maler, Hausmeisterservices und vergleichbare
          Gewerbe. Betriebe, die Qualität in ihrem Handwerk liefern — und eine
          Website brauchen, die genauso zuverlässig wirkt.
        </p>
      </LegalSection>

      <LegalSection title="Was macht Montagfrei konkret?">
        <p>
          Wir erstellen individuelle Demo-Websites mit persönlichem Zugangscode.
          Der Kunde sieht sein digitales Schaufenster, gibt Feedback, und wir
          setzen es auf der Wunsch-Domain um. Schritt für Schritt, ohne
          Fachchinesisch.
        </p>
      </LegalSection>

      <LegalSection title="Wie arbeitet Montagfrei?">
        <p>
          Klar, minimal, ehrlich. Kein Agentur-Blabla. Eine Demo, ein Code,
          eine Website — fertig. Anpassungen jederzeit, weil Inhalte und Texte
          zentral gepflegt werden können.
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
          Freigabe Ihrer Website — weniger Unterbrechung, mehr Zeit fürs
          eigentliche Handwerk.
        </p>
      </LegalSection>

      <LegalSection title="Wie werden meine Daten geschützt?">
        <p>
          Wir verarbeiten personenbezogene Daten nur im Rahmen der geltenden
          Datenschutzgesetze (DSGVO). Details entnehmen Sie dem Abschnitt
          Datenschutz in unseren{' '}
          <Link to="/agb" className="text-black underline underline-offset-2">
            AGB
          </Link>
          .
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
        <p>
          Schreiben Sie uns kurz, welchen Betrieb Sie führen und was Sie
          benötigen — Demo-Website, Live-Umsetzung oder KI-Agent. Wir melden
          uns mit den nächsten Schritten.
        </p>
        <p>
          Bereits einen Code? Auf der{' '}
          <Link to="/" className="text-black underline underline-offset-2">
            Startseite
          </Link>{' '}
          auf Montagfrei klicken und Code eingeben.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

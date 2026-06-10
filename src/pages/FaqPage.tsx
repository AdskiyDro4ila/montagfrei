import { Link } from 'react-router-dom'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function FaqPage() {
  return (
    <LegalLayout title="FAQ">
      <p className="text-black/50">
        Die wichtigsten Fragen zu Website, Demo-Zugang und KI-Agent.
      </p>

      <LegalSection title="Was bietet Montagfrei?">
        <p>
          Montagfrei richtet für Handwerks- und Dienstleistungsbetriebe eine
          professionelle Website ein — inklusive persönlicher Demo zur Abstimmung
          und anschließender Live-Umsetzung auf Ihrer Domain. Im Anschluss wird
          ein KI-Agent auf der Website eingebunden, der Kundenanfragen übernimmt
          und Ihren Betrieb im Alltag entlastet.
        </p>
      </LegalSection>

      <LegalSection title="Wie läuft die Zusammenarbeit ab?">
        <p>
          (1) Sie erhalten eine Demo-Website mit individuellem Zugangscode zur
          Prüfung von Texten, Aufbau und Design.
        </p>
        <p>
          (2) Nach Ihrer Freigabe setzen wir die Website auf Ihrer Wunsch-Domain
          um.
        </p>
        <p>
          (3) Anschließend konfigurieren und aktivieren wir den KI-Agenten auf
          Ihrer Live-Website — abgestimmt auf Ihre Leistungen, Abläufe und
          Kommunikation.
        </p>
      </LegalSection>

      <LegalSection title="Der KI-Agent">
        <p>
          Der KI-Agent ist die zentrale Erweiterung Ihrer Website: Er beantwortet
          Anfragen von Besuchern direkt auf der Seite — zu Leistungen,
          Verfügbarkeit, Abläufen und Terminen. Er ist rund um die Uhr erreichbar,
          antwortet einheitlich und professionell und nimmt Ihnen wiederkehrende
          Rückfragen ab.
        </p>
        <p>
          So bleibt mehr Zeit für die eigentliche Arbeit im Betrieb, während
          potenzielle Kunden auch außerhalb Ihrer Geschäftszeiten eine schnelle
          Orientierung erhalten.
        </p>
      </LegalSection>

      <LegalSection title="Was übernimmt der KI-Agent konkret?">
        <p>
          Je nach Konfiguration beantwortet er Leistungs- und Preisfragen,
          erklärt Ihr Servicegebiet, unterstützt bei Termin- und
          Kontaktanfragen und leitet qualifizierte Anliegen strukturiert an Sie
          weiter. Inhalte und Antwortlogik werden auf Basis Ihrer freigegebenen
          Website und Ihrer Vorgaben eingerichtet.
        </p>
      </LegalSection>

      <LegalSection title="Wie erhalte ich Zugang zur Demo-Website?">
        <p>
          Sie erhalten von uns einen persönlichen Zugangscode. Auf der Startseite
          auf „Montagfrei“ klicken, Code eingeben — Sie gelangen direkt zu Ihrer
          Demo.
        </p>
      </LegalSection>

      <LegalSection title="Ist die Demo bereits die Live-Website?">
        <p>
          Nein. Die Demo dient der Abstimmung. Erst nach Ihrer Freigabe geht die
          Website auf Ihrer Domain live; der KI-Agent folgt im Anschluss.
        </p>
      </LegalSection>

      <LegalSection title="Was kostet der Service?">
        <p>
          Die Konditionen werden individuell vereinbart — abhängig von Umfang,
          Branche und gewünschten Leistungen wie KI-Agent oder laufender Wartung.
          Ein Angebot erhalten Sie nach dem Erstgespräch.
        </p>
      </LegalSection>

      <LegalSection title="Fragen oder Interesse?">
        <p>
          <a href="mailto:kontakt@montagfrei.de" className="text-black underline underline-offset-2">
            kontakt@montagfrei.de
          </a>
          {' '}— wir melden uns in der Regel innerhalb von zwei Werktagen.
          Rechtliche Hinweise:{' '}
          <Link to="/impressum" className="text-black underline underline-offset-2">
            Impressum
          </Link>
          ,{' '}
          <Link to="/agb" className="text-black underline underline-offset-2">
            AGB
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

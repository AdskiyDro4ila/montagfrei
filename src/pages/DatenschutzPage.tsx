import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutz">
      <p className="text-black/50">
        Informationen zur Verarbeitung personenbezogener Daten gemäß der
        Datenschutz-Grundverordnung (DSGVO). Stand: Juni 2026.
      </p>

      <LegalSection title="1. Verantwortlicher">
        <p>
          Montagfrei
          <br />
          [Vor- und Nachname / Firma]
          <br />
          [Anschrift]
          <br />
          E-Mail:{' '}
          <a href="mailto:kontakt@montagfrei.de" className="text-black underline underline-offset-2">
            kontakt@montagfrei.de
          </a>
        </p>
      </LegalSection>

      <LegalSection title="2. Überblick">
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur
          Bereitstellung der Montagfrei-Plattform, Demo-Websites und
          zugehöriger Dienstleistungen erforderlich ist. Betroffene sind
          primär gewerbliche Kunden (Handwerks- und Dienstleistungsbetriebe)
          sowie deren Ansprechpartner.
        </p>
      </LegalSection>

      <LegalSection title="3. Zugriffscodes und Sessions">
        <p>
          Bei Eingabe eines Zugangscodes speichern wir eine technische Session
          im sessionStorage Ihres Browsers (Token, Rolle, Ablaufzeit). Dies
          dient der Zugriffskontrolle auf Demo- und Admin-Bereiche. Die Daten
          werden nicht an Dritte weitergegeben und beim Schließen des
          Browsers bzw. nach Ablauf gelöscht.
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw.
          vorvertragliche Maßnahmen) und Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an sicherem Plattformzugang).
        </p>
      </LegalSection>

      <LegalSection title="4. Server-Logfiles und Hosting">
        <p>
          Beim Aufruf unserer Website werden durch den Hosting-Anbieter
          (Netlify) technisch notwendige Daten verarbeitet, z. B. IP-Adresse,
          Zeitpunkt des Zugriffs, Browsertyp und Betriebssystem. Diese Daten
          dienen der Auslieferung und Sicherheit der Website.
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an stabiler und sicherer Bereitstellung).
        </p>
      </LegalSection>

      <LegalSection title="5. Schriftarten (Google Fonts)">
        <p>
          Wir binden Schriftarten von Google Fonts ein. Dabei kann eine
          Verbindung zu Servern von Google LLC (USA) hergestellt werden.
          Weitere Informationen:{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline underline-offset-2"
          >
            Google Datenschutzerklärung
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Kontaktaufnahme">
        <p>
          Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen
          mitgeteilten Daten (z. B. Name, E-Mail-Adresse, Nachrichteninhalt)
          zur Bearbeitung Ihrer Anfrage.
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Kommunikation) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Beantwortung von Anfragen).
        </p>
      </LegalSection>

      <LegalSection title="7. KI-Agent (geplant)">
        <p>
          Sofern ein KI-Agent auf der Website eines Kunden eingebunden wird,
          können Konversationsinhalte und Kontaktdaten von Endnutzern
          verarbeitet werden. Hierfür wird ein gesonderter
          Auftragsverarbeitungsvertrag mit dem jeweiligen Kunden geschlossen.
          Endnutzer erhalten auf der Kunden-Website eigene Hinweise.
        </p>
      </LegalSection>

      <LegalSection title="8. Speicherdauer">
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie es für
          den jeweiligen Zweck erforderlich ist oder gesetzliche
          Aufbewahrungsfristen bestehen. Session-Daten im Browser werden nach
          Ablauf der Session oder beim Logout entfernt.
        </p>
      </LegalSection>

      <LegalSection title="9. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
          gegen die Verarbeitung. Beschwerden können Sie bei einer
          Datenschutz-Aufsichtsbehörde einreichen.
        </p>
      </LegalSection>

      <LegalSection title="10. Änderungen">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn
          sich unsere Dienste oder die Rechtslage ändert. Die aktuelle
          Fassung ist stets auf dieser Seite abrufbar.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

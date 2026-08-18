import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function AgbPage() {
  return (
    <LegalLayout title="AGB">
      <p className="text-black/50">
        Allgemeine Geschäftsbedingungen für die Nutzung der Montagfrei-Plattform
        und verbundener Dienstleistungen. Stand: Juni 2026.
      </p>

      <LegalSection title="§ 1 Geltungsbereich">
        <p>
          (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
          Verträge zwischen Montagfrei (nachfolgend „Anbieter") und gewerblichen
          Kunden (nachfolgend „Kunde") über die Bereitstellung von Demo-Websites,
          Webimplementierungen, Plattformzugang und optionalen Zusatzleistungen
          wie KI-Agenten-Integration.
        </p>
        <p>
          (2) Es gilt die zum Zeitpunkt des Vertragsschlusses aktuelle Fassung
          dieser AGB. Abweichende Bedingungen des Kunden werden nur anerkannt,
          wenn der Anbieter ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
        </p>
        <p>
          (3) Der Kunde ist Unternehmer im Sinne von § 14 BGB oder eine
          juristische Person des öffentlichen Rechts.
        </p>
      </LegalSection>

      <LegalSection title="§ 2 Vertragsgegenstand">
        <p>
          (1) Der Anbieter stellt dem Kunden eine auf dessen Betrieb
          zugeschnittene Demo-Website zur Veranschaulichung bereit. Der Zugang
          erfolgt über einen individuellen Zugangscode auf der Montagfrei-Plattform.
        </p>
        <p>
          (2) Nach Freigabe durch den Kunden kann der Anbieter die Website auf
          einer vom Kunden benannten Domain implementieren und betreiben.
          Optional kann ein KI-gestützter Kommunikationsagent auf der
          Live-Website integriert werden.
        </p>
        <p>
          (3) Der genaue Leistungsumfang ergibt sich aus dem individuellen
          Angebot bzw. der Leistungsbeschreibung im Vertrag.
        </p>
      </LegalSection>

      <LegalSection title="§ 3 Zugang, Codes und Verfügbarkeit">
        <p>
          (1) Der Kunde erhält einen persönlichen Zugangscode zur Demo-Website.
          Die Weitergabe an Dritte ist nur mit Zustimmung des Anbieters gestattet.
        </p>
        <p>
          (2) Der Anbieter bemüht sich um eine hohe Verfügbarkeit der Plattform,
          schuldet jedoch keine ununterbrochene Erreichbarkeit. Wartungsfenster
          werden nach Möglichkeit vorab angekündigt.
        </p>
        <p>
          (3) Der Anbieter ist berechtigt, Zugangscodes zu sperren, wenn der
          Kunde gegen diese AGB verstößt oder Zahlungsverpflichtungen nicht
          nachkommt.
        </p>
      </LegalSection>

      <LegalSection title="§ 4 Mitwirkungspflichten des Kunden">
        <p>
          (1) Der Kunde stellt dem Anbieter alle für die Erstellung der Website
          erforderlichen Informationen rechtzeitig zur Verfügung (Texte, Bilder,
          Kontaktdaten, Leistungsbeschreibungen, ggf. Logo).
        </p>
        <p>
          (2) Der Kunde stellt sicher, dass er über alle erforderlichen Rechte
          an den bereitgestellten Inhalten verfügt und keine Rechte Dritter
          verletzt werden.
        </p>
        <p>
          (3) Verzögerungen aufgrund fehlender oder verspäteter Mitwirkung des
          Kunden gehen nicht zu Lasten des Anbieters.
        </p>
      </LegalSection>

      <LegalSection title="§ 5 Nutzungsrechte">
        <p>
          (1) Der Anbieter räumt dem Kunden nach vollständiger Bezahlung ein
          einfaches, nicht übertragbares Nutzungsrecht an der erstellten Website
          für die Dauer des Vertrags ein.
        </p>
        <p>
          (2) Der Quellcode, die zugrunde liegende Plattform-Technologie und
          wiederverwendbare Designkomponenten von Montagfrei verbleiben beim
          Anbieter, sofern nicht anders vereinbart.
        </p>
        <p>
          (3) Der Kunde darf die Demo-Website ausschließlich zu Prüf- und
          Abstimmungszwecken nutzen, bis die Live-Implementierung freigegeben ist.
        </p>
      </LegalSection>

      <LegalSection title="§ 6 Vergütung und Zahlung">
        <p>
          (1) Die Vergütung richtet sich nach dem individuellen Angebot. Alle
          Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer, sofern
          nicht anders angegeben.
        </p>
        <p>
          (2) Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung
          ohne Abzug fällig, sofern nicht abweichend vereinbart.
        </p>
        <p>
          (3) Bei Zahlungsverzug ist der Anbieter berechtigt, Leistungen bis
          zum Ausgleich der offenen Forderungen einzustellen.
        </p>
      </LegalSection>

      <LegalSection title="§ 7 Änderungen und Support">
        <p>
          (1) Text- und Inhaltsänderungen auf der Demo-Website werden im Rahmen
          des vereinbarten Leistungsumfangs berücksichtigt. Umfangreiche
          Neugestaltungen bedürfen einer gesonderten Vereinbarung.
        </p>
        <p>
          (2) Laufender Support, Wartung und Updates können als separate
          Leistung gebucht werden.
        </p>
      </LegalSection>

      <LegalSection title="§ 8 KI-Agent (optional)">
        <p>
          (1) Sofern ein KI-Agent implementiert wird, antwortet dieser auf Basis
          der vom Kunden bereitgestellten und vom Anbieter konfigurierten
          Wissensbasis. Der Kunde ist für die Richtigkeit der zugrunde liegenden
          Informationen verantwortlich.
        </p>
        <p>
          (2) Der KI-Agent ersetzt keine individuelle Beratung durch den Kunden
          und keine rechtsverbindlichen Zusagen, sofern dies nicht ausdrücklich
          konfiguriert und vom Kunden freigegeben wurde.
        </p>
        <p>
          (3) Die Verarbeitung personenbezogener Daten im Rahmen des KI-Agenten
          erfolgt gemäß der gesonderten Datenschutzvereinbarung und der DSGVO.
        </p>
      </LegalSection>

      <LegalSection title="§ 9 Haftung">
        <p>
          (1) Der Anbieter haftet unbeschränkt bei Vorsatz und grober
          Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit.
        </p>
        <p>
          (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung
          wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den
          vorhersehbaren, vertragstypischen Schaden.
        </p>
        <p>
          (3) Eine Haftung für Datenverlust ist auf den typischen
          Wiederherstellungsaufwand beschränkt, der bei regelmäßiger und
          ordnungsgemäßer Datensicherung entstanden wäre.
        </p>
      </LegalSection>

      <LegalSection title="§ 10 Laufzeit und Kündigung">
        <p>
          (1) Demo-Zugänge können vom Anbieter jederzeit widerrufen werden, sofern
          kein Hauptvertrag besteht.
        </p>
        <p>
          (2) Laufzeitverträge über Website-Betrieb und optionale Zusatzleistungen
          richten sich nach der individuellen Vereinbarung. Die ordentliche
          Kündigungsfrist beträgt drei Monate zum Monatsende, sofern nicht
          anders vereinbart.
        </p>
        <p>
          (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund
          bleibt unberührt.
        </p>
      </LegalSection>

      <LegalSection title="§ 11 Datenschutz">
        <p>
          Der Anbieter verarbeitet personenbezogene Daten ausschließlich im
          Einklang mit der DSGVO. Auftragsverarbeitungsverträge werden gesondert
          geschlossen, sofern der Anbieter im Auftrag des Kunden Daten
          verarbeitet (z. B. Kontaktformulare, KI-Agent-Konversationen).
        </p>
        <p className="text-black/50">
          Informationen zur Verarbeitung personenbezogener Daten gemäß der
          Datenschutz-Grundverordnung (DSGVO).
        </p>
        <p>
          <strong>Verantwortlicher:</strong> Montagfrei, Maxim Prokoshev,
          Wilhelm-Geiger-Platz 8, 70469 Stuttgart Feuerbach, E-Mail:{' '}
          <a href="mailto:kontakt@montagfrei.com" className="text-black underline underline-offset-2">
            kontakt@montagfrei.com
          </a>
        </p>
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur
          Bereitstellung der Montagfrei-Plattform, Demo-Websites und
          zugehöriger Dienstleistungen erforderlich ist. Betroffene sind
          primär gewerbliche Kunden (Handwerks- und Dienstleistungsbetriebe)
          sowie deren Ansprechpartner.
        </p>
        <p>
          <strong>Zugriffscodes und Sessions:</strong> Bei Eingabe eines
          Zugangscodes speichern wir eine technische Session im sessionStorage
          Ihres Browsers (Token, Rolle, Ablaufzeit). Dies dient der
          Zugriffskontrolle auf Demo- und Admin-Bereiche. Die Daten werden nicht
          an Dritte weitergegeben und beim Schließen des Browsers bzw. nach
          Ablauf gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung bzw. vorvertragliche Maßnahmen) und Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse an sicherem Plattformzugang).
        </p>
        <p>
          <strong>Server-Logfiles und Hosting:</strong> Beim Aufruf unserer
          Website werden durch den Hosting-Anbieter (Netlify) technisch
          notwendige Daten verarbeitet, z. B. IP-Adresse, Zeitpunkt des
          Zugriffs, Browsertyp und Betriebssystem. Rechtsgrundlage: Art. 6 Abs.
          1 lit. f DSGVO (berechtigtes Interesse an stabiler und sicherer
          Bereitstellung).
        </p>
        <p>
          <strong>Schriftarten (Google Fonts):</strong> Wir binden Schriftarten
          von Google Fonts ein. Dabei kann eine Verbindung zu Servern von Google
          LLC (USA) hergestellt werden. Weitere Informationen:{' '}
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
        <p>
          <strong>Kontaktaufnahme:</strong> Wenn Sie uns per E-Mail
          kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten (z. B.
          Name, E-Mail-Adresse, Nachrichteninhalt) zur Bearbeitung Ihrer Anfrage.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Kommunikation) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an der Beantwortung von Anfragen).
        </p>
        <p>
          <strong>KI-Agent (geplant):</strong> Sofern ein KI-Agent auf der
          Website eines Kunden eingebunden wird, können Konversationsinhalte und
          Kontaktdaten von Endnutzern verarbeitet werden. Hierfür wird ein
          gesonderter Auftragsverarbeitungsvertrag mit dem jeweiligen Kunden
          geschlossen. Endnutzer erhalten auf der Kunden-Website eigene Hinweise.
        </p>
        <p>
          <strong>Speicherdauer:</strong> Personenbezogene Daten werden nur so
          lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist
          oder gesetzliche Aufbewahrungsfristen bestehen. Session-Daten im Browser
          werden nach Ablauf der Session oder beim Logout entfernt.
        </p>
        <p>
          <strong>Ihre Rechte:</strong> Sie haben das Recht auf Auskunft,
          Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch gegen die Verarbeitung.
          Beschwerden können Sie bei einer Datenschutz-Aufsichtsbehörde
          einreichen.
        </p>
        <p>
          Wir behalten uns vor, diese Datenschutzhinweise anzupassen, wenn sich
          unsere Dienste oder die Rechtslage ändert. Die aktuelle Fassung ist
          stets in diesem Abschnitt abrufbar.
        </p>
      </LegalSection>

      <LegalSection title="§ 12 Schlussbestimmungen">
        <p>
          (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
          des UN-Kaufrechts.
        </p>
        <p>
          (2) Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis
          ist, soweit gesetzlich zulässig, der Sitz des Anbieters.
        </p>
        <p>
          (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt
          die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

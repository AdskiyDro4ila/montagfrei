import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'

export function UeberUnsPage() {
  return (
    <LegalLayout title="Über uns">
      <p className="text-lg leading-relaxed text-black/80">
        Montagfrei macht professionelle Online-Präsenz für kleine Betriebe
        einfach — ohne IT-Abteilung, ohne Komplexität.
      </p>

      <LegalSection title="Für wen wir da sind">
        <p>
          Putzfirmen, Gartenbauer, Maler, Hausmeisterservices und vergleichbare
          Gewerbe. Betriebe, die Qualität in ihrem Handwerk liefern — und eine
          Website brauchen, die genauso zuverlässig wirkt.
        </p>
      </LegalSection>

      <LegalSection title="Was wir tun">
        <p>
          Wir erstellen individuelle Demo-Websites mit persönlichem Zugangscode.
          Der Kunde sieht sein digitales Schaufenster, gibt Feedback, und wir
          setzen es auf der Wunsch-Domain um. Schritt für Schritt, ohne
          Fachchinesisch.
        </p>
      </LegalSection>

      <LegalSection title="Wohin die Reise geht">
        <p>
          Als Nächstes integrieren wir einen KI-Agenten direkt auf der
          Live-Website des Kunden — für Anfragen, Termine und den Alltag im
          Betrieb. Weniger Unterbrechung, mehr Zeit fürs eigentliche Handwerk.
        </p>
      </LegalSection>

      <LegalSection title="Wie wir arbeiten">
        <p>
          Klar, minimal, ehrlich. Kein Agentur-Blabla. Eine Demo, ein Code,
          eine Website — fertig. Anpassungen jederzeit, weil Inhalte und Texte
          zentral gepflegt werden können.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

<p align="center">

  <strong style="font-size: 2rem; letter-spacing: 0.15em;">MONTAGFREI</strong>

</p>



<p align="center">

  Websites und KI-Agenten für Handwerks- und Dienstleistungsbetriebe.

</p>



<p align="center">

  Putzfirmen · Gartenbauer · Maler · Hausmeister — und mehr.

</p>



---



## Service-Modell



Montagfrei liefert drei aufeinander aufbauende Schritte:



```

Demo-Website  →  Live-Website  →  KI-Agent

   (Abstimmung)    (Domain)       (Automatisierung)

```



| Phase | Was passiert |

|-------|--------------|

| **Demo** | Individuelle Website mit Zugangscode — Kunde prüft Texte, Struktur, Design |

| **Live** | Nach Freigabe Umsetzung auf der Wunsch-Domain des Kunden |

| **KI-Agent** | Beantwortet Anfragen auf der Live-Website — Leistungen, Termine, Abläufe |



Die Plattform (Homepage, Zugang, Admin) ist von den Kunden-Demos getrennt. Demos werden extern erstellt und zentral eingebunden.



---



## Lokal testen

Aktuell arbeiten wir nur auf **localhost** — kein Netlify-Deploy bei jeder Änderung (Deploys verbrauchen Credits).

```bash
npm run dev
```

→ **http://localhost:5173**



| Seite | URL |

|-------|-----|

| Homepage | `/` |

| Zugang | `/access` |

| Admin | `/admin` |



### Demo-Websites



| Firma | Branche | Code | URL |

|-------|---------|------|-----|

| Müller Reinigung | Gebäudereinigung | `mueller-reinigung` | `/demo/mueller-reinigung` |

| Grün & Garten Weber | Gartenbau | `weber-garten` | `/demo/weber-garten` |

| Schmidt Malerbetrieb | Maler | `schmidt-maler` | `/demo/schmidt-maler` |

| Fischer Hausmeisterservice | Hausmeister | `fischer-haus` | `/demo/fischer-haus` |



> Legacy-Code `montagfrei` → leitet zu Müller Reinigung weiter.



### Admin-Zugang



| Feld | Wert |

|------|------|

| Code | `admin` |

| Passwort | `montagfrei2026` (Dev) · Prod: `VITE_ADMIN_PASSWORD` |



---



## Schnellstart

```bash
git clone https://github.com/AdskiyDro4ila/montagfrei.git
cd montagfrei
npm install
npm run dev
```

→ **http://localhost:5173** — hier entwickeln und testen wir.



```bash

npm run build    # Produktion

npm run preview  # Build lokal testen

```



---



## Architektur: Daten + Demo getrennt

Zwei Schichten, eine Wahrheit für Kontakt & KI-Agent:

```
ClientData (clients/data/)     Demo-Site (demos/sites/)
  Scraper füllt später           Externe Builder: Design frei
  phone, email, services    +    MUSS dieselben data.*-Felder nutzen
         │                              │
         └──────────► KI-Agent ◄────────┘
```

| Schicht | Wer | Was |
|---------|-----|-----|
| **Daten** | Du / Scraper | `business.phone`, `business.email`, `services`, `hours`, `about` |
| **Demo-Site** | Externe Builder | React-Komponente, Layout komplett frei |

Später liest der Scraper die Kunden-Website und aktualisiert `clients/data/{slug}.ts`. Dieselben Werte landen auf der Demo und im KI-Agent (`clients/agent/toAgentKnowledge`).

---

## Neuen Kunden anlegen (3 Schritte)

**1. Kundendaten** — `clients/data/_template.ts` kopieren → `neuer-kunde.ts`, in `data/index.ts` eintragen.

Pflichtfelder (Scraper + Agent): `business.phone`, `business.email`, `services`, `hours`, `about`.

**2. Demo-Site** — `demos/sites/_template/Demo.tsx` kopieren → `demos/sites/neuer-kunde/Demo.tsx`.

Externe Builder: Design frei. Pflicht: `data.business.phone` und `data.business.email` in der Kontakt-Sektion anzeigen.

```tsx
import type { ClientSiteProps } from '../types'

export default function Demo({ data }: ClientSiteProps) {
  // Beliebiges Design — data.business.phone, data.business.email, data.services nutzen
}
```

**3. Registry** — in `demos/sites/registry.ts` eintragen:

```typescript
import NeuerKundeDemo from './neuer-kunde/Demo'

const DEMO_SITES = {
  // ...
  'neuer-kunde': NeuerKundeDemo,
}
```

Fertig: `/demo/neuer-kunde`, Zugangscode, Admin-Eintrag.

### Bestehende Branchen-Templates (optional)

Externe Builder dürfen `demos/templates/` als Bausteine nutzen oder komplett eigenes UI bauen. Beispiel:

```tsx
import { ReinigungTemplate } from '../../templates/ReinigungTemplate'
import { toLegacyDemoContent } from '../adaptLegacyTemplate'

export default function Demo({ data }: ClientSiteProps) {
  return <ReinigungTemplate content={toLegacyDemoContent(data, 'reinigung')} />
}
```



---



## Projektstruktur



```

montagfrei/
├── src/
│   ├── clients/
│   │   ├── data/                  # ★ Kundendaten (Scraper + KI-Agent)
│   │   │   ├── _template.ts
│   │   │   ├── mueller-reinigung.ts
│   │   │   └── index.ts
│   │   ├── scraper/               # Scraper-Interface (vorbereitet)
│   │   ├── agent/                 # KI-Agent-Wissensbasis aus ClientData
│   │   └── registry.ts
│   ├── demos/
│   │   ├── sites/                 # ★ Freie Demo-Websites pro Kunde
│   │   │   ├── _template/Demo.tsx # Vorlage für externe Builder
│   │   │   ├── mueller-reinigung/Demo.tsx
│   │   │   └── registry.ts
│   │   ├── templates/             # Optionale Branchen-Bausteine
│   │   └── ClientDemoPage.tsx
│   └── components/                # Plattform (Homepage, Admin, …)
└── public/demos/{slug}/           # Optional: Bilder
```

### Datenfluss

```
clients/data/{slug}.ts
        ├──► demos/sites/{slug}/Demo.tsx   (data als Props)
        ├──► Zugangscode + Admin
        └──► KI-Agent (toAgentKnowledge)
```



---



## Design System



**Plattform** (Homepage, Access, Admin, Legal) — Brutalist.



**Kunden-Demos** — freies Design pro Kunde (`demos/sites/`), Daten aus `clients/data/`.



| Token | Wert |

|-------|------|

| Hintergrund | `#ffffff` |

| Text | `#000000` |

| Schrift | Space Grotesk |

| Rahmen | `3px` schwarz |

| Ecken | `4px` Radius |



---



## Architektur



### Routing



| Route | Komponente | Zugriff |

|-------|------------|---------|

| `/` | Gallery | Öffentlich |

| `/access` | CodeEntry | Öffentlich |

| `/demo/:slug` | ClientDemoPage | Nach Code-Eingabe |

| `/admin` | AdminDashboard | Code `admin` + Passwort |

| `/faq`, `/impressum`, `/agb` | Legal Pages | Öffentlich |



### Auth-Flow



```

Homepage → Klick „Montagfrei“ → /access

         → Code eingeben

              ├── Client-Code → /demo/{slug}

              └── admin + Passwort → /admin

```



### Admin-Bereiche



| Panel | Zweck |

|-------|-------|

| **Datenbank** | Kundenstammdaten, Codes, Status |

| **Scraper** | Automatisches Auslesen von Kundendaten |

| **Agenten** | KI-Agenten pro Kunde |



---



## Deployment (später)

Netlify-Deploys kosten Credits (Free Plan: 300/Monat, je Deploy 15). Deshalb erst bei bewusstem Release deployen — nicht bei jeder kleinen Änderung.

Für Produktion vorbereitet (`netlify.toml`). Anleitung → [`NETLIFY.md`](NETLIFY.md)

Lokalen Produktions-Build testen:

```bash
npm run build
npm run preview
```



---



## Roadmap



- [x] Plattform-Homepage (Brutalist)

- [x] Access Gate mit Admin-Login

- [x] Admin-Dashboard (Datenbank, Scraper, Agenten)

- [x] 4 Demo-Websites mit Content-System

- [x] React Router + `/demo/:slug`

- [x] FAQ, Impressum, AGB

- [x] Dynamische Kunden (localStorage oder Supabase — siehe [`SUPABASE.md`](SUPABASE.md))

- [ ] Admin-UI: Kunden per Formular anlegen

- [ ] KI-Agent pro Kunde (Live-Integration)

- [ ] Eigene Domain pro Kunden-Website



---



## Tech Stack



| | |

|---|---|

| React 19 | UI |

| TypeScript | Typsicherheit |

| Vite 6 | Build |

| Tailwind CSS 4 | Styling |

| React Router 7 | Navigation |

| Vite dev server | Lokale Entwicklung |



---



<p align="center">

  <sub>Privates Projekt — Montagfrei © 2026</sub>

</p>


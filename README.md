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

## Live testen

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

→ **http://localhost:5173**

```bash
npm run build    # Produktion
npm run preview  # Build lokal testen
```

---

## Demo einbinden

Ziel: Externe Demo-Erstellung, minimaler Aufwand beim Einfügen.

### Rollen

| Rolle | Aufgabe |
|-------|---------|
| **Demo-Ersteller** | Texte, Leistungen, Kontaktdaten, Branche — nach Vorlage |
| **Betreiber (du)** | Datei anlegen, in Registry eintragen, deployen |

### Was der Demo-Ersteller liefert

Eine ausgefüllte Kunden-Datei nach `definitions/_template.ts` — Block **INHALTE**:

- Firmenname, Branche, Stadt
- Hero (Headline + Subline)
- Über-uns-Text
- 3–6 Leistungen mit Beschreibung
- Öffnungszeiten, Kennzahlen, Kundenstimme
- Telefon und E-Mail

Optional später: Bilder unter `public/demos/{slug}/` (Logo, Fotos).

### Einbinden in 2 Schritte

**1.** `_template.ts` kopieren → `definitions/neuer-kunde.ts`

- Demo-Ersteller: Block **INHALTE** ausfüllen
- Betreiber: Block **EINSTELLUNGEN** setzen (`slug`, `code`, `template`, `status`)

**2.** In `definitions/index.ts` importieren und eintragen:

```typescript
import { neuerKunde } from './neuer-kunde'

export const CLIENT_DEFINITIONS = [
  // ...bestehende
  neuerKunde,
]
```

Fertig — automatisch verfügbar:

- Demo unter `/demo/neuer-kunde`
- Zugangscode `neuer-kunde`
- Eintrag im Admin-Dashboard
- Direktlink aus dem Admin zur Demo

`git push` → Netlify deployt automatisch.

### Texte nachträglich ändern

Nur die Kunden-Datei bearbeiten:

```typescript
// src/clients/definitions/mueller-reinigung.ts
hero: {
  headline: 'Neuer Slogan',
  subline: 'Neue Beschreibung',
},
```

Kein anderes File anfassen.

### Templates (Branche → Design)

Der Demo-Ersteller wählt eine Branche; das Layout kommt aus dem Template:

| `template` | Branche | Design |
|------------|---------|--------|
| `reinigung` | Putzfirma, Reinigung | Modern, hellblau |
| `garten` | Gartenbau, Landschaft | Organisch, grün |
| `maler` | Maler, Lackierer | Bold, gelb/schwarz |
| `hausmeister` | Hausmeister, Facility | Dunkel, amber |

Neues Branchen-Design nur nötig, wenn kein bestehendes Template passt → neues Template in `src/demos/templates/`.

---

## Projektstruktur

Logische Trennung: **Plattform** (Montagfrei selbst) vs. **Kunden-Demos** (einfach einfügbar).

```
montagfrei/
│
├── src/
│   │
│   ├── components/                  # Plattform-UI
│   │   ├── designs/                 # Homepage (Brutalist)
│   │   ├── admin/                   # Admin-Panels
│   │   ├── ui/                      # AccessField, AccessButton
│   │   ├── AdminDashboard.tsx
│   │   ├── CodeEntry.tsx
│   │   ├── Gallery.tsx
│   │   └── HomeFooter.tsx
│   │
│   ├── pages/                       # FAQ, Impressum, AGB
│   │
│   ├── clients/                     # ★ Kunden — hier einfügen
│   │   ├── definitions/
│   │   │   ├── _template.ts         # Vorlage (INHALTE + EINSTELLUNGEN)
│   │   │   ├── mueller-reinigung.ts # Eine Datei = ein Kunde
│   │   │   └── index.ts             # Registry (1 Zeile pro Kunde)
│   │   ├── registry.ts              # Lookup: slug, code
│   │   ├── admin.ts                 # Admin-Daten (abgeleitet)
│   │   └── types.ts                 # ClientDefinition-Typ
│   │
│   ├── demos/
│   │   ├── templates/               # Layout-Shells pro Branche
│   │   ├── ClientDemoPage.tsx       # Route /demo/:slug
│   │   └── registry.ts              # → clients/registry
│   │
│   └── lib/
│       ├── auth/                    # Zugangscodes, Sessions, Admin
│       └── routes.ts
│
├── public/
│   └── demos/{slug}/                # Optional: Bilder pro Kunde
│
├── netlify.toml
├── .env.example
├── NETLIFY.md
└── README.md
```

### Datenfluss

```
definitions/{slug}.ts
        │
        ├──► /demo/{slug}        (Website via Template)
        ├──► Zugangscode         (Auth)
        └──► Admin-Dashboard     (Stammdaten, Agent, Scraper)
```

Eine Datei pro Kunde. Kein separates Routing, kein manuelles Verdrahten.

---

## Design System

**Plattform** (Homepage, Access, Admin, Legal) — Brutalist.

**Kunden-Demos** — eigenes Design pro Branche (`template` in Kunden-Datei).

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

## Deployment (Netlify)

| | |
|---|---|
| Build | `npm run build` |
| Output | `dist` |
| Node | 20 |

**Environment Variable (Prod):**

```
VITE_ADMIN_PASSWORD=dein-sicheres-passwort
```

Anleitung → [`NETLIFY.md`](NETLIFY.md)

---

## Roadmap

- [x] Plattform-Homepage (Brutalist)
- [x] Access Gate mit Admin-Login
- [x] Admin-Dashboard (Datenbank, Scraper, Agenten)
- [x] 4 Demo-Websites mit Content-System
- [x] React Router + `/demo/:slug`
- [x] FAQ, Impressum, AGB
- [ ] Backend + echte Datenbank
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
| Netlify | Hosting |

---

<p align="center">
  <sub>Privates Projekt — Montagfrei © 2026</sub>
</p>

<p align="center">
  <strong style="font-size: 2rem; letter-spacing: 0.15em;">MONTAGFREI</strong>
</p>

<p align="center">
  Premium Web-Plattform für kleine Handwerks- und Dienstleistungsbetriebe.
</p>

<p align="center">
  Putzfirmen · Gartenbauer · Maler · Hausmeister — und mehr.
</p>

---

## Was ist Montagfrei?

Montagfrei gibt kleinen Betrieben ohne eigene IT eine **professionelle Online-Präsenz** — und bereitet den Weg für einen **KI-Agenten**, der später auf der Live-Website des Kunden eingebaut wird.

```
┌─────────────────────────────────────────────────────────────┐
│                        MONTAGFREI                           │
├─────────────┬──────────────┬──────────────┬─────────────────┤
│  Homepage   │  Access Gate │  Demo-Site   │  Admin Panel    │
│  (Marke)    │  (Code)      │  (Kunde)     │  (Intern)       │
└─────────────┴──────────────┴──────────────┴─────────────────┘
                                    │
                                    ▼
                          KI-Agent (geplant)
                          auf Kunden-Domain
```

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

## Kunden verwalten

**Eine Datei pro Kunde** — Website, Zugangscode und Admin-Panel leiten sich daraus ab.

```
src/clients/definitions/
├── _template.ts          ← Vorlage für neue Kunden
├── mueller-reinigung.ts
├── weber-garten.ts
├── schmidt-maler.ts
├── fischer-haus.ts
└── index.ts              ← Hier eintragen (1 Zeile)
```

### Neuen Kunden anlegen (2 Schritte)

**1.** `_template.ts` kopieren → `neuer-kunde.ts` ausfüllen

**2.** In `definitions/index.ts` importieren und zur Liste hinzufügen:

```typescript
import { neuerKunde } from './neuer-kunde'

export const CLIENT_DEFINITIONS = [
  // ...bestehende
  neuerKunde,
]
```

Fertig. Automatisch verfügbar:

- Demo-Website unter `/demo/neuer-kunde`
- Zugangscode `neuer-kunde`
- Eintrag im Admin-Dashboard (Datenbank, Scraper, Agenten)
- Klick im Admin → direkt zur Website

### Texte ändern

Nur die Kunden-Datei bearbeiten — kein anderes File anfassen:

```typescript
// src/clients/definitions/mueller-reinigung.ts
hero: {
  headline: 'Neuer Slogan',
  subline: 'Neue Beschreibung',
},
```

`git push` → Netlify deployt automatisch.

### Templates (Branche → Design)

| `template` | Branche | Design |
|------------|---------|--------|
| `reinigung` | Putzfirma, Reinigung | Modern, hellblau, SaaS |
| `garten` | Gartenbau, Landschaft | Organisch, grün, editorial |
| `maler` | Maler, Lackierer | Bold, gelb/schwarz, kreativ |
| `hausmeister` | Hausmeister, Facility | Dunkel, amber, industrial |

---

## Projektstruktur

```
montagfrei/
│
├── src/
│   ├── App.tsx                      # React Router
│   ├── components/
│   │   ├── designs/                 # Plattform-Homepage (Brutalist)
│   │   ├── admin/                   # Admin-Panels
│   │   ├── ui/                      # AccessField, AccessButton
│   │   ├── AdminDashboard.tsx
│   │   ├── CodeEntry.tsx
│   │   └── Gallery.tsx
│   │
│   ├── clients/                     # ★ Kunden — Single Source of Truth
│   │   ├── definitions/             # Pro Kunde: eine .ts Datei
│   │   ├── registry.ts              # Lookup: slug, code
│   │   ├── admin.ts                 # Admin-Panel (abgeleitet)
│   │   └── types.ts
│   │
│   ├── demos/
│   │   ├── templates/               # 4 Branchen-Designs
│   │   ├── ClientDemoPage.tsx
│   │   └── registry.ts              # → clients/registry
│   │
│   └── lib/
│       ├── auth/                    # Zugangscodes, Sessions, Admin
│       └── routes.ts
│
├── netlify.toml                     # Deploy-Konfiguration
├── .env.example
├── NETLIFY.md                       # Deploy-Anleitung
└── README.md
```

---

## Design System

**Plattform** (Homepage, Access, Admin) — **Design 1: Brutalist**.

**Kunden-Demos** — eigenes Design pro Branche (`template` in Kunden-Datei).

| Token | Wert |
|-------|------|
| Hintergrund | `#ffffff` |
| Text | `#000000` |
| Schrift | Space Grotesk |
| Rahmen | `3px` schwarz |
| Ecken | `4px` Radius |
| Schatten | Keine |
| Gradients | Keine |

---

## Architektur

### Routing

| Route | Komponente | Zugriff |
|-------|------------|---------|
| `/` | Gallery | Öffentlich |
| `/access` | CodeEntry | Öffentlich |
| `/demo/:slug` | ClientDemoPage | Nach Code-Eingabe |
| `/admin` | AdminDashboard | Code `admin` + Passwort |

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
| **Agenten** | KI-Agenten pro Kunde (geplant) |

---

## Deployment (Netlify)

Build-Einstellungen (automatisch via `netlify.toml`):

| | |
|---|---|
| Build | `npm run build` |
| Output | `dist` |
| Node | 20 |

**Environment Variable (Pflicht für Prod):**

```
VITE_ADMIN_PASSWORD=dein-sicheres-passwort
```

Ausführliche Anleitung → [`NETLIFY.md`](NETLIFY.md)

---

## Roadmap

- [x] Plattform-Homepage (Brutalist)
- [x] Access Gate mit Admin-Login
- [x] Admin-Dashboard (Datenbank, Scraper, Agenten)
- [x] 4 Demo-Websites mit Content-System
- [x] React Router + `/demo/:slug`
- [ ] Backend + echte Datenbank
- [ ] Admin-UI: Kunden per Formular anlegen (schreibt in DB)
- [ ] Scraper-Anbindung
- [ ] KI-Agent pro Kunde
- [ ] Eigene Domain pro Kunden-Demo

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

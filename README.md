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

## Demo-Websites ändern

Jede Demo besteht aus **einer Content-Datei** — Texte ändern ohne Layout anzufassen.

```
src/demos/clients/
├── mueller-reinigung/content.ts   ← Texte, Leistungen, Kontakt
├── weber-garten/content.ts
├── schmidt-maler/content.ts
└── fischer-haus/content.ts
```

**Beispiel** — Kunde will anderen Slogan:

```typescript
// src/demos/clients/mueller-reinigung/content.ts
hero: {
  headline: 'Neuer Slogan hier',
  subline: 'Neue Beschreibung',
},
```

Speichern → `git push` → Netlify deployt automatisch.

### Neuen Kunden anlegen

1. Ordner erstellen: `src/demos/clients/neuer-kunde/content.ts`
2. In `src/demos/registry.ts` importieren und registrieren
3. Eintrag in `src/data/admin-mock.ts` (Admin-Dashboard)
4. Fertig — Code = Slug (z. B. `neuer-kunde`)

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
│   ├── demos/                       # ★ Kunden-Demo-Websites
│   │   ├── clients/                 # Pro Kunde: content.ts
│   │   ├── templates/               # Gemeinsames Layout
│   │   ├── registry.ts              # Code → Demo Mapping
│   │   ├── ClientDemoPage.tsx
│   │   └── types.ts
│   │
│   ├── data/
│   │   └── admin-mock.ts            # Admin-Placeholder-Daten
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

Alle Seiten — Plattform, Access, Admin, Demos — folgen **Design 1: Brutalist**.

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
- [ ] Admin: Kunden & Codes bearbeiten
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

# Montagfrei

Premium Web-Plattform für kleine Handwerks- und Dienstleistungsbetriebe — Putzfirmen, Gartenbauer, Maler, und ähnliche **Kleingewerbe**.

Jeder Kunde erhält eine **Beispiel-Website** mit individuellem Zugangscode. Später wird auf der beim Kunden implementierten Seite ein **KI-Agent** integriert, der Anfragen bearbeitet, Termine koordiniert und den Betrieb entlastet.

---

## Vision

```
Montagfrei (Plattform)
    │
    ├── Homepage          → Markenauftritt, Zugang zur Demo
    ├── Access Gate       → Code-Eingabe (Kunde) oder Admin-Login
    ├── Client Demo       → Beispiel-Website pro Betrieb (geplant)
    └── KI-Agent          → Eingebaut auf der Live-Website des Kunden (geplant)
```

**Zielgruppe:** Kleine Betriebe ohne eigene IT-Abteilung, die eine professionelle Online-Präsenz und später intelligente Automatisierung brauchen.

**Design-Philosophie:** Brutalist minimal — schwarz/weiß, viel Whitespace, Space Grotesk, keine Dekoration. Premium-Software-Ästhetik.

---

## Aktueller Stand

| Bereich | Status |
|---------|--------|
| Homepage (Design 1 — Brutalist) | ✅ Fertig |
| Access Gate (Code-Eingabe) | ✅ Fertig |
| Admin-Login (Code `admin` + Passwort) | ✅ Fertig |
| Admin-Dashboard | 🔲 Placeholder |
| Client-Demo-Website | 🔲 Geplant |
| KI-Agent-Integration | 🔲 Geplant |
| Backend / API | 🔲 Geplant |

---

## Schnellstart

### Voraussetzungen

- [Node.js](https://nodejs.org) (LTS)
- npm

### Installation

```bash
cd montagfrei
npm install
```

### Entwicklung starten

```bash
npm run dev
```

Öffne **http://localhost:5173**

> **Windows / PowerShell:** Falls `npm` blockiert wird, nutze `npm.cmd run dev`.

### Produktion bauen

```bash
npm run build
npm run preview
```

---

## Deployment auf Netlify

Das Projekt ist für Netlify vorbereitet (`netlify.toml` liegt im Root).

### Netlify Build-Einstellungen (automatisch via `netlify.toml`)

| Einstellung | Wert |
|-------------|------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js Version | 20 |

---

### Option A — GitHub + Netlify (empfohlen, automatische Deploys)

**1. GitHub-Repository erstellen**

Falls noch kein Git installiert: [git-scm.com](https://git-scm.com)

```bash
cd montagfrei
git init
git add .
git commit -m "Initial commit — Montagfrei"
```

Auf [github.com](https://github.com) ein neues Repository erstellen (z. B. `montagfrei`), dann:

```bash
git remote add origin https://github.com/DEIN-USERNAME/montagfrei.git
git branch -M main
git push -u origin main
```

**2. Mit Netlify verbinden**

1. [app.netlify.com](https://app.netlify.com) → einloggen
2. **Add new site** → **Import an existing project**
3. **GitHub** wählen → Repository `montagfrei` auswählen
4. Netlify erkennt `netlify.toml` automatisch — nichts ändern nötig
5. **Environment variables** hinzufügen (wichtig für Admin-Passwort):

   | Key | Value |
   |-----|-------|
   | `VITE_ADMIN_PASSWORD` | dein-sicheres-passwort |

6. **Deploy site** klicken

Ab jetzt deployt Netlify bei jedem `git push` automatisch neu.

---

### Option B — Manuell (ohne GitHub, sofort)

**1. Lokal bauen**

```bash
npm run build
```

Das erzeugt den Ordner `dist/`.

**2. Auf Netlify hochladen**

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Deploy manually**
2. Den Ordner `dist` per Drag & Drop auf die Seite ziehen
3. Fertig — du erhältst eine URL wie `https://random-name.netlify.app`

> **Hinweis:** Bei manuellem Upload gibt es keine Umgebungsvariablen — das Admin-Passwort bleibt dann der Dev-Default `montagfrei2026`. Für Produktion Option A oder C nutzen.

---

### Option C — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Bei `netlify init` das bestehende Netlify-Projekt verknüpfen oder ein neues anlegen.

Umgebungsvariable setzen:

```bash
netlify env:set VITE_ADMIN_PASSWORD "dein-sicheres-passwort"
```

---

### Eigene Domain verbinden

1. Netlify Dashboard → deine Site → **Domain management**
2. **Add custom domain** → z. B. `montagfrei.de` eingeben
3. DNS-Einträge beim Domain-Anbieter setzen (Netlify zeigt dir die genauen Werte)
4. SSL-Zertifikat wird von Netlify automatisch erstellt (kostenlos)

---

### Nach dem Deploy testen

| Test | Erwartung |
|------|-----------|
| Homepage lädt | Großes **Montagfrei** zentriert |
| Klick auf Logo | Access-Seite |
| Code `montagfrei` | Access Granted |
| Code `admin` + Passwort | Admin-Dashboard |

---

## Zugang & Authentifizierung

### Kunden-Zugang (öffentlich)

1. Homepage → Klick auf **Montagfrei**
2. Code eingeben → **Continue**
3. Bei gültigem Code: **Access Granted**

| Code | Rolle | Passwort |
|------|-------|----------|
| `montagfrei` | Client (Demo) | — |

Weitere Client-Codes werden später über das Admin-Dashboard verwaltet.

### Admin-Zugang (versteckt)

Das Passwortfeld erscheint **nur**, wenn im Code-Feld exakt `admin` steht. Normale Nutzer sehen keinen Hinweis darauf.

1. Code: `admin`
2. Passwortfeld erscheint automatisch
3. Passwort eingeben → **Continue**
4. Weiterleitung zum Admin-Dashboard

| Feld | Wert (Development) |
|------|-------------------|
| Code | `admin` |
| Passwort | `montagfrei2026` |

**Produktion:** Passwort über `.env.local` setzen:

```bash
cp .env.example .env.local
# VITE_ADMIN_PASSWORD=dein-sicheres-passwort
```

---

## Projektstruktur

```
montagfrei/
├── src/
│   ├── App.tsx                    # View-Routing (gallery → code → admin)
│   ├── components/
│   │   ├── designs/
│   │   │   └── DesignBrutalist.tsx   # Homepage — einziges aktives Design
│   │   ├── ui/
│   │   │   ├── AccessField.tsx       # Input (Code + Passwort)
│   │   │   └── AccessButton.tsx      # Submit-Button
│   │   ├── AdminDashboard.tsx        # Admin-Placeholder
│   │   ├── CodeEntry.tsx             # Access Gate
│   │   ├── DesignSection.tsx         # Fullscreen-Layout-Wrapper
│   │   ├── Gallery.tsx               # Homepage
│   │   └── Logo.tsx                  # Klickbares Wortmarke
│   ├── hooks/
│   │   └── useViewTransition.ts      # Fade-Übergänge zwischen Views
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── config.ts             # Admin-Code, Passwort aus .env
│   │   │   ├── index.ts              # Public API
│   │   │   ├── session.ts            # sessionStorage
│   │   │   ├── types.ts              # AuthResult, InviteCode, UserRole
│   │   │   └── validate.ts           # Code- + Admin-Validierung
│   │   └── routes.ts                 # Route-Konstanten (für späteres Router-Setup)
│   └── types/
│       └── dashboard.ts              # Placeholder-Typen für Dashboards
├── .env.example
└── README.md
```

---

## Design System (Design 1 — Brutalist)

Alle neuen Seiten **müssen** diesem System folgen. Keine Abweichungen.

| Token | Wert |
|-------|------|
| Hintergrund | `#ffffff` |
| Text | `#000000` |
| Schrift Display | Space Grotesk (`font-display`) |
| Schrift Body | Inter (`font-sans`) |
| Border | `3px` schwarz, Focus `4px` |
| Border-Radius | `4px` (`rounded-[4px]`) |
| Input/Button Höhe | `60px` |
| Animationen | Fade, dezenter Shake bei Fehler — keine Schatten, keine Gradients |

### Wiederverwendbare Komponenten

- `DesignSection` — zentrierter Fullscreen-Container
- `AccessField` — Input (`variant="code"` oder `"password"`)
- `AccessButton` — Submit mit Hover-Invert
- `Logo` — klickbare Wortmarke

---

## Nächste Schritte (Roadmap)

### Phase 1 — Client-Demo
- [ ] Nach Client-Code-Login zur Demo-Website navigieren (`view: 'client'`)
- [ ] Beispiel-Template für Putzfirma / Gartenbauer (anpassbare Inhalte)
- [ ] Pro Kunde eigener Invite-Code in `validate.ts` → später API

### Phase 2 — Admin-Dashboard
- [ ] Kundenliste (Betriebsname, Branche, Code, Status)
- [ ] Codes generieren / widerrufen
- [ ] Vorschau der Demo-Website pro Kunde

### Phase 3 — Backend
- [ ] API für Auth (Codes, Sessions, Admin)
- [ ] Datenbank (Kunden, Websites, Agent-Konfiguration)
- [ ] `.env`-basierte Secrets, kein Hardcoding

### Phase 4 — KI-Agent
- [ ] Agent-Konfiguration pro Kunde im Admin
- [ ] Einbettung auf der Live-Website des Kunden (Widget oder eingebetteter Chat)
- [ ] Anbindung an Kalender, Angebote, FAQ des jeweiligen Betriebs

### Phase 5 — Routing
- [ ] React Router (oder ähnlich) statt `useViewTransition`
- [ ] URLs: `/`, `/access`, `/admin`, `/client/:slug`
- [ ] Geschützte Routen basierend auf `getSession()` und `role`

---

## Architektur-Hinweise für Entwicklung

### Auth erweitern

```typescript
// src/lib/auth/validate.ts
// Neue Client-Codes hier eintragen (bis API existiert):
const INVITE_CODES: InviteCode[] = [
  { code: 'montagfrei', role: 'client' },
  { code: 'mueller-garten', role: 'client' },  // Beispiel
]
```

### Session prüfen

```typescript
import { getSession, clearSession } from './lib/auth'

const session = getSession()
if (session?.role === 'admin') { /* ... */ }
```

### Neue View hinzufügen

1. `AppView` in `src/lib/routes.ts` erweitern
2. Komponente in `src/components/` anlegen (Design 1 beibehalten)
3. In `App.tsx` rendern + `navigate()` aufrufen

### Admin-Passwort ändern

Niemals im Code hardcoden (außer Dev-Fallback in `config.ts`). Immer `VITE_ADMIN_PASSWORD` in `.env.local` setzen.

---

## Tech Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| React | 19 | UI |
| TypeScript | 5.7 | Typsicherheit |
| Vite | 6 | Build & Dev-Server |
| Tailwind CSS | 4 | Styling |

---

## Lizenz

Privates Projekt — Montagfrei.

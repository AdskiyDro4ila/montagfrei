# Supabase — dynamische Kunden

Scraper-Kunden (über **Als Kunde** angelegt) werden in Supabase gespeichert, wenn die Umgebungsvariablen gesetzt sind. Feste Demo-Kunden (Müller, Weber, …) bleiben im Repo unter `src/clients/data/`.

Ohne Supabase-Konfiguration läuft alles weiter über **localStorage** — gleiche UI, gleiche API.

## 1. Tabelle anlegen (einmalig)

**Option A — SQL Editor** (schnellste):

1. [Supabase Dashboard](https://supabase.com/dashboard/project/bywkhyanddtlqcvhhrii) → **SQL Editor**
2. Inhalt von `supabase/migrations/001_clients.sql` einfügen → **Run**

**Option B — Supabase CLI**:

```bash
npx supabase login
npx supabase link --project-ref bywkhyanddtlqcvhhrii
npx supabase db push
```

(`supabase init` ist im Repo bereits erledigt.)

## 2. Umgebungsvariablen

`.env.local` (nicht committen):

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Werte unter **Project Settings → API**:

| Variable | Welcher Key |
|----------|-------------|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | **anon JWT** (`eyJ…`) oder Publishable key (`sb_publishable_…`) |

Den **Secret key** (`sb_secret_…`) und das **Postgres-Passwort** nie ins Frontend — nur serverseitig / CLI.

### Aktuelles Projekt

| | |
|--|--|
| URL | `https://bywkhyanddtlqcvhhrii.supabase.co` |
| Project ref | `bywkhyanddtlqcvhhrii` |

`.env.local` ist bereits gesetzt. **Tabelle `clients` fehlt noch** — siehe Schritt 1 unten.

## 3. Lokal testen

```bash
npm run dev
```

Admin → **Datenbank** zeigt unten rechts in der Beschreibung **Supabase** statt **Lokal**.

Bestehende localStorage-Kunden werden beim ersten Supabase-Load automatisch migriert.

## Architektur

| Schicht | Datei | Aufgabe |
|---------|-------|---------|
| UI | `DatabasePanel`, `ScraperPanel` | `saveClient` / `deleteClient` |
| API | `src/clients/data/repository.ts` | Einheitliche CRUD-Schnittstelle |
| Store | `src/clients/data/remoteStore.ts` | Supabase oder localStorage + Cache |
| Schema | `supabase/migrations/001_clients.sql` | Tabelle `clients` (JSONB `payload`) |

## Sicherheit (vor Produktion)

Die Migration erlaubt aktuell **anon**-Zugriff auf `dyn-*`-Einträge (MVP für localhost). Vor öffentlichem Deploy:

- Supabase Auth für Admin-Bereich, oder
- restriktive RLS-Policies, oder
- Schreibzugriff nur über Edge Function mit Service Role

# Supabase — dynamische Kunden

Scraper-Kunden (über **Als Kunde** angelegt) werden in Supabase gespeichert, wenn die Umgebungsvariablen gesetzt sind. Feste Demo-Kunden (Müller, Weber, …) bleiben im Repo unter `src/clients/data/`.

Ohne Supabase-Konfiguration läuft alles weiter über **localStorage** — gleiche UI, gleiche API.

## 1. Projekt anlegen

1. [supabase.com](https://supabase.com) → neues Projekt
2. **SQL Editor** → Inhalt von `supabase/migrations/001_clients.sql` ausführen

## 2. Umgebungsvariablen

`.env.local` (nicht committen):

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Werte unter **Project Settings → API** (Project URL + anon public key).

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

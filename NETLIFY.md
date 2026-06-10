# Netlify — 3 Schritte zum Live-Deploy

Alles ist vorbereitet. Du musst nur noch **einmal GitHub verbinden** und dann **Netlify klicken**.

---

## Schritt 0 — Code auf GitHub (einmalig, ~2 Minuten)

Doppelklick auf:

```
scripts/push-to-github.ps1
```

Falls Windows blockiert: Rechtsklick → **Mit PowerShell ausführen**

Oder im Terminal:

```powershell
cd c:\Users\avalk\Desktop\cursor\montagfrei
powershell -ExecutionPolicy Bypass -File scripts\push-to-github.ps1
```

Was passiert:
1. Browser öffnet sich → bei GitHub einloggen → bestätigen
2. Repository `montagfrei` wird erstellt
3. Code wird hochgeladen

---

## Schritt 1 — Netlify öffnen

👉 [app.netlify.com](https://app.netlify.com) → einloggen

**Add new site** → **Import an existing project**

---

## Schritt 2 — GitHub verbinden

1. **GitHub** auswählen
2. Falls gefragt: Netlify Zugriff auf GitHub erlauben
3. Repository **`montagfrei`** auswählen

Netlify erkennt automatisch:

| Einstellung | Wert |
|-------------|------|
| Build command | `npm run build` |
| Publish directory | `dist` |

**Nichts ändern** — einfach weiter.

---

## Schritt 3 — Environment Variable + Deploy

Vor dem ersten Deploy:

1. **Add environment variables** aufklappen
2. Hinzufügen:

   | Key | Value |
   |-----|-------|
   | `VITE_ADMIN_PASSWORD` | dein-sicheres-passwort |

3. **Deploy montagfrei** klicken

⏱ Nach ~1–2 Minuten ist die Seite live.

---

## Fertig

Netlify zeigt dir eine URL wie:

```
https://montagfrei.netlify.app
```

### Testen

| Aktion | Erwartung |
|--------|-----------|
| Seite öffnen | Großes **MONTAGFREI** |
| Klick auf Logo | Access-Seite |
| Code `montagfrei` | Access Granted |
| Code `admin` + Passwort | Admin-Dashboard |

---

## Eigene Domain (optional)

Netlify → **Domain management** → **Add custom domain**

---

## Kosten

**Nein — für dieses Projekt kostet Netlify nichts.**

Der [Free Plan](https://www.netlify.com/pricing/) ($0) reicht:

- Git-Deploys von `main`
- `netlify.app`-Subdomain + Custom Domain mit SSL
- 300 Credits/Monat (ca. 20 Production-Deploys à 15 Credits)

Keine Kreditkarte nötig. Upgrade erst bei deutlich mehr Traffic oder vielen täglichen Deploys.

---

## Automatische Updates

Jeder `git push` auf `main` deployt automatisch neu auf Netlify (~1–2 Min.).

Der Cursor-Agent committet und pusht nach jeder Änderung selbstständig (Regel: `.cursor/rules/auto-deploy-netlify.mdc`).

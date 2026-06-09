# Projekt ist noch NICHT auf GitHub — so behebst du das

Der Code liegt nur auf deinem Computer. Du musst ihn einmal hochladen.

---

## Schritt 1 — GitHub Login (Browser)

Öffne **PowerShell** und führe aus:

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" auth login
```

Dann wählen:

1. `GitHub.com` → Enter
2. `HTTPS` → Enter
3. `Login with a web browser` → Enter
4. Code kopieren → im Browser einfügen → **Authorize**

---

## Schritt 2 — Hochladen

```powershell
cd c:\Users\avalk\Desktop\cursor\montagfrei
powershell -ExecutionPolicy Bypass -File scripts\push-to-github.ps1
```

**ODER** manuell:

```powershell
cd c:\Users\avalk\Desktop\cursor\montagfrei
& "C:\Program Files\GitHub CLI\gh.exe" repo create montagfrei --public --source . --remote origin --push
```

---

## Schritt 3 — Prüfen

Browser öffnen: `https://github.com/DEIN-USERNAME/montagfrei`

Du solltest alle Dateien sehen (README.md, src/, netlify.toml, …).

---

## Falls „Repository already exists"

```powershell
cd c:\Users\avalk\Desktop\cursor\montagfrei
$git = "C:\Program Files\Git\bin\git.exe"
$gh  = "C:\Program Files\GitHub CLI\gh.exe"
$user = (& $gh api user --jq .login).Trim()
& $git remote add origin "https://github.com/$user/montagfrei.git"
& $git push -u origin main
```

---

## Alternative ohne GitHub CLI

1. Auf [github.com/new](https://github.com/new) ein **leeres** Repo `montagfrei` erstellen (ohne README)
2. Dann:

```powershell
cd c:\Users\avalk\Desktop\cursor\montagfrei
$git = "C:\Program Files\Git\bin\git.exe"
& $git remote add origin https://github.com/DEIN-USERNAME/montagfrei.git
& $git push -u origin main
```

Beim Push: GitHub-Login im Browser bestätigen.

# Montagfrei — einmalig ausführen, um das Projekt auf GitHub hochzuladen
# Danach nur noch auf Netlify verbinden (siehe NETLIFY.md)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path $PSScriptRoot -Parent
Set-Location $projectRoot

$git = "C:\Program Files\Git\bin\git.exe"
$gh  = "C:\Program Files\GitHub CLI\gh.exe"

Write-Host ""
Write-Host "=== Montagfrei → GitHub ===" -ForegroundColor White
Write-Host ""

if (-not (Test-Path $git)) {
    Write-Host "Git nicht gefunden. Bitte installieren: https://git-scm.com" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $gh)) {
    Write-Host "GitHub CLI nicht gefunden. Bitte installieren: https://cli.github.com" -ForegroundColor Red
    exit 1
}

# GitHub Login (öffnet Browser — einmalig)
$authStatus = & $gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "GitHub Login wird gestartet (Browser öffnet sich)..." -ForegroundColor Yellow
    & $gh auth login --web --git-protocol https
}

# Repository erstellen und pushen
Write-Host ""
Write-Host "Repository wird erstellt und Code hochgeladen..." -ForegroundColor Yellow
& $gh repo create montagfrei --public --source . --remote origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Fertig! Repository ist auf GitHub." -ForegroundColor Green
    Write-Host ""
    & $gh repo view --web
    Write-Host ""
    Write-Host "Naechster Schritt: NETLIFY.md oeffnen und Netlify verbinden." -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Repository existiert evtl. schon. Versuche manuellen Push..." -ForegroundColor Yellow
    $username = (& $gh api user --jq .login).Trim()
    & $git remote remove origin 2>$null
    & $git remote add origin "https://github.com/$username/montagfrei.git"
    & $git push -u origin main
    Write-Host "Push abgeschlossen: https://github.com/$username/montagfrei" -ForegroundColor Green
}

Write-Host ""
Read-Host "Enter druecken zum Beenden"

$env:Path = "C:\Program Files\nodejs;" + $env:Path
Write-Host "Starting Vanigan Frontend (Expo)..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\frontend"
npx expo start

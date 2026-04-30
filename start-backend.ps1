$env:Path = "C:\Program Files\nodejs;" + $env:Path
Write-Host "Starting Vanigan Backend..." -ForegroundColor Green
Set-Location "$PSScriptRoot\backend"
node server.js

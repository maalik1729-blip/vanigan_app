# Expo SDK 55 Upgrade Script for Windows PowerShell
# Run this script from the vanigan-app directory

Write-Host "🚀 Starting Expo SDK 55 Upgrade..." -ForegroundColor Green
Write-Host ""

# Navigate to frontend directory
Set-Location -Path "frontend"

# Step 1: Backup
Write-Host "📦 Step 1: Creating backup..." -ForegroundColor Yellow
git add .
git commit -m "Backup before Expo SDK 55 upgrade" -ErrorAction SilentlyContinue

# Step 2: Upgrade Expo
Write-Host ""
Write-Host "⬆️  Step 2: Upgrading Expo to latest version..." -ForegroundColor Yellow
npm install expo@latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Expo upgrade failed!" -ForegroundColor Red
    exit 1
}

# Step 3: Fix dependencies
Write-Host ""
Write-Host "🔧 Step 3: Fixing dependencies..." -ForegroundColor Yellow
npx expo install --fix

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Some dependencies may need manual fixing" -ForegroundColor Yellow
}

# Step 4: Update specific packages
Write-Host ""
Write-Host "📦 Step 4: Updating Expo packages..." -ForegroundColor Yellow
npx expo install expo-status-bar expo-modules-core expo-constants expo-image-picker expo-location

# Step 5: Clean and reinstall
Write-Host ""
Write-Host "🧹 Step 5: Cleaning cache and reinstalling..." -ForegroundColor Yellow
npm cache clean --force
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
npm install

# Step 6: Check version
Write-Host ""
Write-Host "✅ Step 6: Verifying installation..." -ForegroundColor Yellow
npx expo --version

# Step 7: Security audit
Write-Host ""
Write-Host "🔒 Step 7: Running security audit..." -ForegroundColor Yellow
npm audit

Write-Host ""
Write-Host "🎉 Upgrade Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test the app: npx expo start --clear" -ForegroundColor White
Write-Host "2. Check for errors in the console" -ForegroundColor White
Write-Host "3. Test all features (login, image picker, location, etc.)" -ForegroundColor White
Write-Host "4. If everything works, commit the changes" -ForegroundColor White
Write-Host "5. Rebuild APK: eas build -p android --profile production" -ForegroundColor White
Write-Host ""

# Return to root directory
Set-Location -Path ".."

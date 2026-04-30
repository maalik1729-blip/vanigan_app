#!/bin/bash
# Expo SDK 55 Upgrade Script for Bash
# Run this script from the vanigan-app directory

echo "🚀 Starting Expo SDK 55 Upgrade..."
echo ""

# Navigate to frontend directory
cd frontend || exit

# Step 1: Backup
echo "📦 Step 1: Creating backup..."
git add .
git commit -m "Backup before Expo SDK 55 upgrade" 2>/dev/null || true

# Step 2: Upgrade Expo
echo ""
echo "⬆️  Step 2: Upgrading Expo to latest version..."
npm install expo@latest

if [ $? -ne 0 ]; then
    echo "❌ Expo upgrade failed!"
    exit 1
fi

# Step 3: Fix dependencies
echo ""
echo "🔧 Step 3: Fixing dependencies..."
npx expo install --fix

# Step 4: Update specific packages
echo ""
echo "📦 Step 4: Updating Expo packages..."
npx expo install expo-status-bar expo-modules-core expo-constants expo-image-picker expo-location

# Step 5: Clean and reinstall
echo ""
echo "🧹 Step 5: Cleaning cache and reinstalling..."
npm cache clean --force
rm -rf node_modules .expo
npm install

# Step 6: Check version
echo ""
echo "✅ Step 6: Verifying installation..."
npx expo --version

# Step 7: Security audit
echo ""
echo "🔒 Step 7: Running security audit..."
npm audit

echo ""
echo "🎉 Upgrade Complete!"
echo ""
echo "Next steps:"
echo "1. Test the app: npx expo start --clear"
echo "2. Check for errors in the console"
echo "3. Test all features (login, image picker, location, etc.)"
echo "4. If everything works, commit the changes"
echo "5. Rebuild APK: eas build -p android --profile production"
echo ""

# Return to root directory
cd ..

# Vanigan App - Quick Start Guide

Get your Vanigan app up and running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js (should be v16+)
node --version

# Check npm
npm --version

# Check if MongoDB is installed (optional - can use Atlas)
mongod --version
```

## Step 1: Clone and Setup Backend (2 minutes)

```bash
# Navigate to backend
cd vanigan-app/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vanigan
JWT_SECRET=my_super_secret_key_12345

# Get these from cloudinary.com (free account)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Step 2: Start MongoDB (1 minute)

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (takes 3-5 minutes)
4. Get connection string
5. Update MONGODB_URI in .env

## Step 3: Seed Database (30 seconds)

```bash
# Still in backend directory
node scripts/seedData.js
```

You should see:
```
MongoDB Connected
Main categories created: 6
Sub-categories created: 16
✅ Seed data created successfully!
```

## Step 4: Start Backend Server (10 seconds)

```bash
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected: localhost:27017
```

✅ Backend is ready!

## Step 5: Setup Frontend (1 minute)

Open a **new terminal window**:

```bash
# Navigate to frontend
cd vanigan-app/frontend

# Install dependencies
npm install
```

## Step 6: Configure API URL (30 seconds)

Edit `frontend/src/config/api.js`:

```javascript
// For testing on physical device, use your computer's IP
// Find your IP: Windows (ipconfig), Mac/Linux (ifconfig)
const API_URL = 'http://192.168.1.XXX:5000/api';

// For Android emulator
const API_URL = 'http://10.0.2.2:5000/api';

// For iOS simulator or web
const API_URL = 'http://localhost:5000/api';
```

## Step 7: Start Frontend (30 seconds)

```bash
npm start
```

Expo DevTools will open in your browser!

## Step 8: Run on Device

**Option A: Physical Device (Easiest)**
1. Install "Expo Go" app from App Store or Play Store
2. Scan QR code from terminal
3. App will load on your device

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: iOS Simulator (Mac only)**
```bash
npm run ios
```

## Test the App

### 1. Language Selection
- Select your preferred language (English, Hindi, Tamil, Telugu)

### 2. Welcome Screen
- Enter your name: "Test User"
- Enter phone: "9876543210"
- Click Continue

### 3. Main Menu
You should see 6 options:
- 🏢 Business List
- 👥 Organizer List
- 👤 Members List
- ➕ Add Business
- 💳 Subscription
- 📰 News

### 4. Try Business List
1. Click "Business List"
2. Select a category (e.g., "Restaurants & Food")
3. Select "View All" or a sub-category
4. You'll see an empty list (add businesses to populate)

### 5. Try Add Business
1. Go back to Main Menu
2. Click "Add Business"
3. Fill in the form:
   - Business Name: "My Restaurant"
   - Description: "Best food in town"
   - Select Category
   - Contact Number: "9876543210"
   - Fill location details
4. Click "Add Photos" (optional)
5. Click "Submit Business"

## Troubleshooting

### Backend won't start

**Error: MongoDB connection failed**
```bash
# Check if MongoDB is running
# Windows: Check Services
# Mac/Linux: ps aux | grep mongod

# Or use MongoDB Atlas cloud database
```

**Error: Port 5000 already in use**
```bash
# Change PORT in .env to 5001
# Update API_URL in frontend to match
```

### Frontend won't connect

**Error: Network request failed**
```bash
# Check backend is running (http://localhost:5000/health)
# Update API_URL in frontend/src/config/api.js
# For physical device, use computer's IP address
# Check firewall settings
```

**Error: Unable to resolve module**
```bash
# Clear cache and reinstall
expo start -c
rm -rf node_modules
npm install
```

### Cloudinary upload fails

**Error: Invalid credentials**
```bash
# Verify Cloudinary credentials in .env
# Create free account at cloudinary.com
# Copy credentials from dashboard
```

## Quick Commands Reference

### Backend
```bash
cd backend
npm run dev          # Start development server
npm start            # Start production server
node scripts/seedData.js  # Seed database
```

### Frontend
```bash
cd frontend
npm start            # Start Expo dev server
npm run android      # Run on Android
npm run ios          # Run on iOS
expo start -c        # Clear cache and start
```

## Next Steps

1. **Explore the App**
   - Add more businesses
   - Test all features
   - Try different languages

2. **Customize**
   - Update colors in screen styles
   - Add more categories
   - Modify translations

3. **Deploy**
   - Deploy backend to Heroku/Railway
   - Build standalone app with Expo
   - Submit to app stores

## Getting Help

### Check Logs

**Backend logs:**
- Terminal where backend is running
- Look for error messages

**Frontend logs:**
- Expo DevTools in browser
- Device console in Expo Go app

### Common Issues

1. **"Cannot find module"** - Run `npm install`
2. **"Port already in use"** - Change port in .env
3. **"Network error"** - Check API_URL configuration
4. **"MongoDB error"** - Check MongoDB is running
5. **"Cloudinary error"** - Verify credentials

## Resources

- **Expo Docs**: https://docs.expo.dev
- **React Navigation**: https://reactnavigation.org
- **MongoDB**: https://docs.mongodb.com
- **Cloudinary**: https://cloudinary.com/documentation

## Success Checklist

- ✅ Backend running on port 5000
- ✅ MongoDB connected
- ✅ Categories seeded
- ✅ Frontend running on Expo
- ✅ App loads on device
- ✅ Can create user account
- ✅ Can view main menu
- ✅ Can add business

**Congratulations! Your Vanigan app is running! 🎉**

## What's Next?

- Read SETUP.md for detailed configuration
- Read PROJECT_STRUCTURE.md to understand architecture
- Start building features!
- Deploy to production

Happy coding! 🚀

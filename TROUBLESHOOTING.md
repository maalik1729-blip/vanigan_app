# Vanigan App - Troubleshooting Guide

## Common Issues and Solutions

### 1. ✅ FIXED: "PlatformConstants could not be found" Error

**Error Message:**
```
[runtime not ready]: Invariant Violation:
TurboModuleRegistry.getEnforcing(...):
'PlatformConstants' could not be found.
```

**Solution:**
This error occurs when the new React Native architecture is enabled but not all modules support it yet.

**What We Did:**
1. Disabled new architecture in `app.json`
2. Added `expo-build-properties` plugin
3. Set `newArchEnabled: false` for both iOS and Android
4. Cleared cache and restarted Expo

**Status:** ✅ FIXED - App now works with Expo Go SDK 54

---

### 2. Expo SDK Version Mismatch

**Error:** "Project is incompatible with this version of Expo Go"

**Solution:**
- Updated project to Expo SDK 54
- Installed compatible dependencies
- Cleared cache: `npx expo start --clear`

**Status:** ✅ FIXED

---

### 3. Missing Assets Error

**Error:** "Unable to resolve asset ./assets/icon.png"

**Solution:**
- Removed asset requirements from `app.json`
- Assets are optional for development
- Can add custom icons later

**Status:** ✅ FIXED

---

### 4. Backend Connection Issues

**Error:** "Network request failed" or "Cannot connect to backend"

**Solution:**

#### For Physical Device:
Update `frontend/src/config/api.js`:
```javascript
// Find your computer's IP address
// Windows: ipconfig
// Mac: ifconfig

const API_URL = 'http://YOUR_COMPUTER_IP:5000/api';
// Example: 'http://192.168.1.14:5000/api'
```

#### For Android Emulator:
```javascript
const API_URL = 'http://10.0.2.2:5000/api';
```

#### For iOS Simulator:
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

### 5. MongoDB Connection Error

**Error:** "MongoDB connection failed"

**Solutions:**

#### Check if MongoDB is Running:
```bash
# Windows: Check Services
# Mac/Linux: 
ps aux | grep mongod
```

#### Start MongoDB:
```bash
# Windows: Start MongoDB service
# Mac: 
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

#### Use MongoDB Atlas (Cloud):
1. Create free account at https://mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vanigan
```

---

### 6. Cloudinary Upload Fails

**Error:** "Invalid credentials" or "Upload failed"

**Solution:**

1. Create free account at https://cloudinary.com
2. Get credentials from Dashboard
3. Update `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
4. Restart backend server

---

### 7. Port Already in Use

**Error:** "Port 5000 already in use"

**Solution:**

#### Option 1: Kill Process on Port
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

#### Option 2: Change Port
Update `backend/.env`:
```env
PORT=5001
```

Then update `frontend/src/config/api.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

---

### 8. Metro Bundler Errors

**Error:** Various bundling errors

**Solution:**

#### Clear Cache:
```bash
cd frontend
npx expo start --clear
```

#### Reset Everything:
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
npx expo start --clear
```

---

### 9. Categories Not Showing

**Error:** Empty category list

**Solution:**

Seed the database:
```bash
cd backend
node scripts/seedData.js
```

This creates:
- 6 main categories
- 16 sub-categories

---

### 10. Image Picker Not Working

**Error:** "Permission denied" or picker doesn't open

**Solution:**

#### Check Permissions in app.json:
```json
"android": {
  "permissions": [
    "CAMERA",
    "READ_MEDIA_IMAGES",
    "READ_EXTERNAL_STORAGE"
  ]
}
```

#### Grant Permissions:
- On device: Settings → Apps → Expo Go → Permissions
- Allow Camera and Storage access

---

## Quick Fixes

### Restart Everything:

```bash
# Stop all servers (Ctrl+C in terminals)

# Backend:
cd backend
npm run dev

# Frontend:
cd frontend
npx expo start --clear
```

### Check Server Status:

```bash
# Backend health check:
curl http://localhost:5000/health

# Should return: {"status":"OK","message":"Vanigan API is running"}
```

### View Logs:

#### Backend Logs:
Check the terminal where backend is running

#### Frontend Logs:
- Expo DevTools in browser
- Device console in Expo Go app
- Press `j` in Expo terminal to open debugger

---

## Getting Help

### Check These First:
1. ✅ Backend server running on port 5000
2. ✅ MongoDB connected
3. ✅ Frontend server running on port 8081
4. ✅ Correct API_URL in frontend config
5. ✅ Expo Go app updated to latest version

### Still Having Issues?

1. **Check the error message** - Read it carefully
2. **Check the logs** - Backend and frontend terminals
3. **Try clearing cache** - `npx expo start --clear`
4. **Restart servers** - Stop and start both servers
5. **Check documentation** - README.md, SETUP.md, QUICKSTART.md

---

## Common Error Messages

### "Cannot find module"
```bash
npm install
```

### "EADDRINUSE: address already in use"
Port is already taken - change port or kill process

### "Network request failed"
Backend not running or wrong API_URL

### "MongoDB connection failed"
MongoDB not running or wrong connection string

### "Cloudinary error"
Wrong credentials or not configured

---

## Prevention Tips

1. **Always check backend is running** before testing frontend
2. **Use correct API_URL** for your testing environment
3. **Keep dependencies updated** but test after updates
4. **Clear cache** when switching branches or major changes
5. **Seed database** after fresh MongoDB setup

---

## Environment-Specific Issues

### Physical Device:
- Use computer's IP address in API_URL
- Ensure device and computer on same WiFi
- Check firewall settings

### Android Emulator:
- Use `10.0.2.2` instead of `localhost`
- Ensure emulator has internet access

### iOS Simulator:
- Use `localhost` in API_URL
- Ensure Xcode is installed (Mac only)

### Web Browser:
- CORS might be an issue
- Check browser console for errors

---

## Success Checklist

Before reporting an issue, verify:

- [ ] Node.js installed (v16+)
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file configured
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Correct API_URL
- [ ] Expo Go app updated
- [ ] Same WiFi network (for physical device)

---

## Contact & Resources

- **Documentation:** Check all .md files in project root
- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **MongoDB Docs:** https://docs.mongodb.com

---

**Last Updated:** April 28, 2026  
**Version:** 1.0.0

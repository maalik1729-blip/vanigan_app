# Vanigan App - Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Expo CLI
- Cloudinary account (for image uploads)

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vanigan
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

### 4. Setup Cloudinary

1. Create account at https://cloudinary.com
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Update .env file with these values

### 5. Seed Database

```bash
node scripts/seedData.js
```

This will create:
- Main categories (Restaurants, Retail, Healthcare, etc.)
- Sub-categories for each main category

### 6. Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:5000

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure API URL

Edit `src/config/api.js` and update the API_URL:

```javascript
// For local development
const API_URL = 'http://localhost:5000/api';

// For Android emulator
const API_URL = 'http://10.0.2.2:5000/api';

// For iOS simulator
const API_URL = 'http://localhost:5000/api';

// For physical device (use your computer's IP)
const API_URL = 'http://192.168.1.XXX:5000/api';
```

### 3. Start Expo Development Server

```bash
npm start
```

This will open Expo DevTools in your browser.

### 4. Run on Device/Emulator

**Option A: Physical Device**
1. Install Expo Go app from App Store/Play Store
2. Scan QR code from terminal

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: iOS Simulator** (Mac only)
```bash
npm run ios
```

## Testing the App

### 1. Create Test User

1. Open the app
2. Select language
3. Enter name and phone number
4. You'll be logged in automatically

### 2. Test Features

- **Business List**: Browse categories and businesses
- **Add Business**: Create a new business listing
- **Organizers**: View organizers by district/assembly
- **Members**: View members by district/assembly
- **News**: Read news by location
- **Subscription**: View subscription plans

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login/Register user
- GET `/api/auth/me` - Get current user

### Businesses
- GET `/api/businesses` - Get all businesses (with filters)
- GET `/api/businesses/:id` - Get business details
- POST `/api/businesses` - Create business (auth required)
- PUT `/api/businesses/:id` - Update business (auth required)
- POST `/api/businesses/:id/gallery` - Upload images (auth required)

### Categories
- GET `/api/categories` - Get all main categories
- GET `/api/categories/:id/subcategories` - Get sub-categories

### Organizers
- GET `/api/organizers` - Get organizers (with filters)
- POST `/api/organizers` - Create organizer (auth required)

### Members
- GET `/api/members` - Get members (with filters)
- POST `/api/members` - Create member (auth required)

### News
- GET `/api/news` - Get news (with filters)
- GET `/api/news/:id` - Get news details
- POST `/api/news` - Create news (auth required)

### Subscriptions
- GET `/api/subscriptions/plans` - Get subscription plans
- POST `/api/subscriptions` - Create subscription (auth required)
- GET `/api/subscriptions/my-subscriptions` - Get user subscriptions

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Check network connectivity for Atlas

**Cloudinary Upload Error**
- Verify Cloudinary credentials in .env
- Check file size limits
- Ensure uploads/ directory exists

### Frontend Issues

**Cannot Connect to Backend**
- Check API_URL in src/config/api.js
- Ensure backend server is running
- For physical device, use computer's IP address
- Check firewall settings

**Image Picker Not Working**
- Grant camera/storage permissions
- Check app.json permissions configuration

**Navigation Errors**
- Clear Metro bundler cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Production Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables
2. Update MONGODB_URI to production database
3. Deploy using platform CLI or Git

### Frontend Deployment

1. Build standalone app:
```bash
expo build:android
expo build:ios
```

2. Submit to stores:
```bash
expo submit:android
expo submit:ios
```

## Support

For issues or questions:
- Check documentation
- Review error logs
- Contact development team

## License

MIT License

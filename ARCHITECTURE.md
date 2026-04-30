# Vanigan App - System Architecture

## 📋 Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Database Schema](#database-schema)
- [API Architecture](#api-architecture)
- [Security Architecture](#security-architecture)
- [Deployment Architecture](#deployment-architecture)

---

## Overview

**Vanigan** is a full-stack mobile application designed for business directory management, member organization, news distribution, and partner management. The application follows a modern client-server architecture with RESTful API design principles.

### Key Features
- 🏢 Business Directory Management
- 👥 Member & Organizer Management
- 📰 News & Updates Distribution
- 🤝 Partner Management
- 📱 Multi-language Support (Tamil, English, Hindi)
- 🔐 JWT-based Authentication
- 📍 Location-based Services
- 📸 Image Upload & Management

---

## Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime Environment |
| **Express.js** | ^4.18.2 | Web Framework |
| **MongoDB** | ^8.0.0 | Database (via Mongoose) |
| **Mongoose** | ^8.0.0 | ODM for MongoDB |
| **JWT** | ^9.0.2 | Authentication |
| **Bcrypt.js** | ^2.4.3 | Password Hashing |
| **Cloudinary** | ^1.41.0 | Image Storage |
| **Multer** | ^1.4.5 | File Upload Middleware |
| **Express Validator** | ^7.0.1 | Input Validation |
| **CORS** | ^2.8.5 | Cross-Origin Resource Sharing |
| **Morgan** | ^1.10.0 | HTTP Request Logger |
| **Dotenv** | ^16.3.1 | Environment Configuration |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.81.5 | Mobile Framework |
| **Expo** | ~54.0.0 | Development Platform |
| **React** | 19.1.0 | UI Library |
| **React Navigation** | ^6.1.9 | Navigation |
| **Axios** | ^1.6.2 | HTTP Client |
| **AsyncStorage** | 2.2.0 | Local Storage |
| **Expo Image Picker** | ~17.0.11 | Image Selection |
| **Expo Location** | ~19.0.8 | Geolocation |
| **React Native Maps** | 1.20.1 | Map Integration |

### Infrastructure
- **Hosting**: Render.com (Backend)
- **Database**: MongoDB Atlas (Cloud)
- **CDN**: Cloudinary (Images)
- **Version Control**: GitHub
- **Build Platform**: EAS Build (Expo)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     VANIGAN SYSTEM                          │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│   Mobile App     │◄───────►│   Backend API    │
│  (React Native)  │  HTTPS  │   (Express.js)   │
│                  │         │                  │
│  - iOS/Android   │         │  - REST API      │
│  - Expo          │         │  - JWT Auth      │
│  - Navigation    │         │  - Validation    │
└──────────────────┘         └──────────────────┘
         │                            │
         │                            │
         ▼                            ▼
┌──────────────────┐         ┌──────────────────┐
│  AsyncStorage    │         │  MongoDB Atlas   │
│  (Local Cache)   │         │  (Cloud DB)      │
└──────────────────┘         └──────────────────┘
                                      │
                                      ▼
                             ┌──────────────────┐
                             │   Cloudinary     │
                             │  (Image CDN)     │
                             └──────────────────┘
```

---

## Backend Architecture

### Directory Structure
```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # Cloudinary configuration
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── upload.js            # File upload handling
├── models/
│   ├── User.js              # User schema
│   ├── Business.js          # Business schema
│   ├── Category.js          # Category schema
│   ├── Member.js            # Member schema
│   ├── Organizer.js         # Organizer schema
│   ├── News.js              # News schema
│   ├── Partner.js           # Partner schema
│   └── Subscription.js      # Subscription schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── businesses.js        # Business CRUD
│   ├── categories.js        # Category CRUD
│   ├── members.js           # Member CRUD
│   ├── organizers.js        # Organizer CRUD
│   ├── news.js              # News CRUD
│   ├── partners.js          # Partner CRUD
│   └── subscriptions.js     # Subscription CRUD
├── scripts/
│   ├── createAdmin.js       # Admin user creation
│   └── seedData.js          # Database seeding
├── uploads/                 # Temporary file storage
├── .env                     # Environment variables
├── .env.example             # Environment template
├── server.js                # Application entry point
└── package.json             # Dependencies
```

### Request Flow
```
Client Request
    ↓
CORS Middleware
    ↓
Body Parser
    ↓
Morgan Logger
    ↓
Route Handler
    ↓
Auth Middleware (if required)
    ↓
Validation Middleware
    ↓
Controller Logic
    ↓
Database Query
    ↓
Response Formatter
    ↓
Client Response
```

---

## Frontend Architecture

### Directory Structure
```
frontend/
├── src/
│   ├── config/
│   │   └── api.js                    # API configuration
│   ├── context/
│   │   └── AuthContext.js            # Authentication context
│   ├── hooks/
│   │   └── useAutoLogout.js          # Auto-logout hook
│   ├── screens/
│   │   ├── WelcomeScreen.js          # Landing page
│   │   ├── LanguageSelectionScreen.js
│   │   ├── DistrictSelectionScreen.js
│   │   ├── AssemblySelectionScreen.js
│   │   ├── MainMenuScreen.js         # Main dashboard
│   │   ├── business/
│   │   │   ├── CategoryListScreen.js
│   │   │   ├── SubCategoryListScreen.js
│   │   │   ├── BusinessListScreen.js
│   │   │   ├── BusinessDetailsScreen.js
│   │   │   └── AddBusinessScreen.js
│   │   ├── member/
│   │   │   └── MemberListScreen.js
│   │   ├── news/
│   │   │   ├── NewsListScreen.js
│   │   │   └── NewsDetailsScreen.js
│   │   ├── organizer/
│   │   │   └── OrganizerListScreen.js
│   │   ├── partner/
│   │   │   └── PartnerSignUpScreen.js
│   │   └── subscription/
│   │       └── SubscriptionScreen.js
│   └── utils/
│       ├── constants.js              # App constants
│       └── translations.js           # i18n translations
├── android/                          # Android native code
├── assets/                           # Static assets
├── App.js                            # Root component
├── app.json                          # Expo configuration
├── eas.json                          # EAS Build configuration
└── package.json                      # Dependencies
```

### Component Hierarchy
```
App
├── AuthContext.Provider
    ├── NavigationContainer
        ├── Stack.Navigator
            ├── WelcomeScreen
            ├── LanguageSelectionScreen
            ├── DistrictSelectionScreen
            ├── AssemblySelectionScreen
            ├── MainMenuScreen
            └── Feature Screens
                ├── Business Module
                ├── Member Module
                ├── News Module
                ├── Organizer Module
                ├── Partner Module
                └── Subscription Module
```

---

## Database Schema

### Collections Overview

#### 1. Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Businesses Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: ObjectId (ref: Category),
  subCategory: String,
  description: String,
  phone: String,
  email: String,
  address: String,
  district: String,
  assembly: String,
  location: {
    type: String (default: 'Point'),
    coordinates: [Number] // [longitude, latitude]
  },
  images: [String], // Cloudinary URLs
  owner: ObjectId (ref: User),
  status: String (enum: ['active', 'inactive']),
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Categories Collection
```javascript
{
  _id: ObjectId,
  name: String (unique),
  nameInTamil: String,
  nameInHindi: String,
  subCategories: [String],
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### 4. Members Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  email: String,
  district: String,
  assembly: String,
  membershipType: String,
  photo: String, // Cloudinary URL
  status: String (enum: ['active', 'inactive']),
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. Organizers Collection
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  phone: String,
  email: String,
  district: String,
  assembly: String,
  photo: String, // Cloudinary URL
  priority: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### 6. News Collection
```javascript
{
  _id: ObjectId,
  title: String,
  titleInTamil: String,
  titleInHindi: String,
  content: String,
  contentInTamil: String,
  contentInHindi: String,
  images: [String], // Cloudinary URLs
  author: ObjectId (ref: User),
  category: String,
  status: String (enum: ['draft', 'published']),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### 7. Partners Collection
```javascript
{
  _id: ObjectId,
  businessName: String,
  ownerName: String,
  phone: String,
  email: String,
  category: String,
  address: String,
  district: String,
  assembly: String,
  logo: String, // Cloudinary URL
  status: String (enum: ['pending', 'approved', 'rejected']),
  createdAt: Date,
  updatedAt: Date
}
```

#### 8. Subscriptions Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  plan: String (enum: ['basic', 'premium', 'enterprise']),
  startDate: Date,
  endDate: Date,
  status: String (enum: ['active', 'expired', 'cancelled']),
  amount: Number,
  paymentId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Database Indexes
```javascript
// Users
{ phone: 1 } // Unique index

// Businesses
{ location: '2dsphere' } // Geospatial index
{ category: 1, district: 1, assembly: 1 } // Compound index

// Categories
{ name: 1 } // Unique index

// News
{ publishedAt: -1, status: 1 } // Compound index
```

---

## API Architecture

### Base URL
- **Production**: `https://vanigan-app.onrender.com`
- **API Prefix**: `/api`

### Authentication Flow
```
1. User Registration/Login
   POST /api/auth/register or /api/auth/login
   ↓
2. Server validates credentials
   ↓
3. Server generates JWT token
   ↓
4. Client stores token in AsyncStorage
   ↓
5. Client includes token in Authorization header
   Authorization: Bearer <token>
   ↓
6. Server validates token via middleware
   ↓
7. Request proceeds to controller
```

### API Endpoints Summary

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Businesses
- `GET /api/businesses` - List all businesses
- `GET /api/businesses/:id` - Get business details
- `POST /api/businesses` - Create business (auth required)
- `PUT /api/businesses/:id` - Update business (auth required)
- `DELETE /api/businesses/:id` - Delete business (auth required)

#### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category details
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

#### Members
- `GET /api/members` - List all members
- `GET /api/members/:id` - Get member details
- `POST /api/members` - Create member (auth required)
- `PUT /api/members/:id` - Update member (auth required)
- `DELETE /api/members/:id` - Delete member (auth required)

#### Organizers
- `GET /api/organizers` - List all organizers
- `GET /api/organizers/:id` - Get organizer details
- `POST /api/organizers` - Create organizer (auth required)
- `PUT /api/organizers/:id` - Update organizer (auth required)
- `DELETE /api/organizers/:id` - Delete organizer (auth required)

#### News
- `GET /api/news` - List all news
- `GET /api/news/:id` - Get news details
- `POST /api/news` - Create news (admin only)
- `PUT /api/news/:id` - Update news (admin only)
- `DELETE /api/news/:id` - Delete news (admin only)

#### Partners
- `GET /api/partners` - List all partners
- `GET /api/partners/:id` - Get partner details
- `POST /api/partners` - Create partner (auth required)
- `PUT /api/partners/:id` - Update partner (auth required)
- `DELETE /api/partners/:id` - Delete partner (auth required)

#### Subscriptions
- `GET /api/subscriptions` - List all subscriptions
- `GET /api/subscriptions/:id` - Get subscription details
- `POST /api/subscriptions` - Create subscription (auth required)
- `PUT /api/subscriptions/:id` - Update subscription (auth required)
- `DELETE /api/subscriptions/:id` - Delete subscription (auth required)

### Response Format
```javascript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication
- **Token Expiry**: Configurable expiration time
- **Password Hashing**: Bcrypt with salt rounds
- **Role-Based Access**: User and Admin roles

### Data Security
- **Input Validation**: Express-validator for all inputs
- **SQL Injection Prevention**: Mongoose ODM parameterization
- **XSS Prevention**: Input sanitization
- **CORS**: Configured for specific origins

### API Security
- **Rate Limiting**: Recommended for production
- **HTTPS Only**: SSL/TLS encryption
- **Environment Variables**: Sensitive data in .env
- **Token in Headers**: Authorization header only

### File Upload Security
- **File Type Validation**: Multer configuration
- **File Size Limits**: Maximum upload size enforced
- **Cloudinary Storage**: Secure cloud storage
- **Temporary File Cleanup**: Auto-deletion after upload

---

## Deployment Architecture

### Production Environment

```
┌─────────────────────────────────────────────┐
│           PRODUCTION DEPLOYMENT             │
└─────────────────────────────────────────────┘

┌──────────────────┐
│   Mobile Users   │
└────────┬─────────┘
         │ HTTPS
         ▼
┌──────────────────┐
│   Render.com     │
│   (Backend API)  │
│   - Auto Deploy  │
│   - SSL/TLS      │
│   - Health Check │
└────────┬─────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌──────────────┐   ┌──────────────┐
│ MongoDB      │   │ Cloudinary   │
│ Atlas        │   │ CDN          │
│ (Database)   │   │ (Images)     │
└──────────────┘   └──────────────┘
```

### Deployment Configuration

#### Backend (Render.com)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `backend`
- **Environment**: Node.js
- **Auto-Deploy**: Enabled (GitHub integration)

#### Frontend (EAS Build)
- **Platform**: Android APK
- **Build Profile**: Production
- **Distribution**: Internal/Store
- **Auto-Update**: Expo OTA updates

### Environment Variables (Production)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<secure_secret>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
NODE_ENV=production
```

---

## Performance Considerations

### Backend Optimization
- **Database Indexing**: Optimized queries
- **Connection Pooling**: MongoDB connection reuse
- **Caching Strategy**: Recommended for frequent queries
- **Compression**: Gzip compression for responses
- **Pagination**: Limit results for large datasets

### Frontend Optimization
- **Image Optimization**: Cloudinary transformations
- **Lazy Loading**: On-demand component loading
- **AsyncStorage**: Local caching
- **Network Retry**: Axios retry logic
- **Bundle Size**: Code splitting recommended

### Scalability
- **Horizontal Scaling**: Render auto-scaling
- **Database Sharding**: MongoDB Atlas supports sharding
- **CDN**: Cloudinary global distribution
- **Load Balancing**: Render handles automatically

---

## Monitoring & Logging

### Backend Logging
- **Morgan**: HTTP request logging
- **Console Logs**: Error tracking
- **Render Logs**: Platform-level logging

### Error Handling
- **Global Error Handler**: Express middleware
- **Try-Catch Blocks**: Controller-level error handling
- **Validation Errors**: Express-validator messages
- **Database Errors**: Mongoose error handling

### Health Monitoring
- **Health Endpoint**: `/health`
- **Uptime Tracking**: Render dashboard
- **Database Connection**: Connection status monitoring

---

## Future Enhancements

### Planned Features
- [ ] Push Notifications (Firebase Cloud Messaging)
- [ ] Real-time Chat (Socket.io)
- [ ] Payment Gateway Integration
- [ ] Advanced Analytics Dashboard
- [ ] Multi-tenant Support
- [ ] GraphQL API
- [ ] Redis Caching Layer
- [ ] Elasticsearch Integration
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Automated Testing (Jest, Supertest)

### Performance Improvements
- [ ] API Response Caching
- [ ] Database Query Optimization
- [ ] Image Lazy Loading
- [ ] Progressive Web App (PWA)
- [ ] Service Workers for Offline Support

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-30 | Initial release |
| 1.0.1 | 2026-04-30 | Production backend integration |

---

## Contact & Support

- **GitHub**: https://github.com/maalik1729-blip/vanigan_app
- **Backend URL**: https://vanigan-app.onrender.com
- **Documentation**: This file

---

*Last Updated: April 30, 2026*

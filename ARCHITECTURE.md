# Vanigan App - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         VANIGAN ECOSYSTEM                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Android    │  │     iOS      │  │     Web      │            │
│  │   Device     │  │   Device     │  │   Browser    │            │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘            │
│         │                  │                  │                     │
│         └──────────────────┼──────────────────┘                     │
│                            │                                        │
│                            ▼                                        │
│                  ┌──────────────────┐                              │
│                  │  React Native    │                              │
│                  │  Expo App        │                              │
│                  └──────────────────┘                              │
│                            │                                        │
└────────────────────────────┼────────────────────────────────────────┘
                             │
                             │ HTTPS/REST API
                             │
┌────────────────────────────┼────────────────────────────────────────┐
│                            ▼         API LAYER                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                  ┌──────────────────┐                              │
│                  │   Express.js     │                              │
│                  │   REST API       │                              │
│                  └────────┬─────────┘                              │
│                           │                                         │
│         ┌─────────────────┼─────────────────┐                     │
│         │                 │                 │                     │
│         ▼                 ▼                 ▼                     │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐                 │
│  │   Auth   │     │ Business │     │   News   │                 │
│  │  Routes  │     │  Routes  │     │  Routes  │                 │
│  └──────────┘     └──────────┘     └──────────┘                 │
│         │                 │                 │                     │
│         ▼                 ▼                 ▼                     │
│  ┌──────────────────────────────────────────────┐               │
│  │         Middleware Layer                     │               │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │               │
│  │  │   Auth   │  │  Upload  │  │   CORS   │  │               │
│  │  │   JWT    │  │  Multer  │  │  Config  │  │               │
│  │  └──────────┘  └──────────┘  └──────────┘  │               │
│  └──────────────────────────────────────────────┘               │
│                           │                                       │
└───────────────────────────┼───────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────┐         │
│  │              MongoDB Database                        │         │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │         │
│  │  │  Users   │  │Business  │  │Categories│          │         │
│  │  └──────────┘  └──────────┘  └──────────┘          │         │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │         │
│  │  │Organizers│  │ Members  │  │   News   │          │         │
│  │  └──────────┘  └──────────┘  └──────────┘          │         │
│  │  ┌──────────┐                                       │         │
│  │  │Subscript.│                                       │         │
│  │  └──────────┘                                       │         │
│  └──────────────────────────────────────────────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐              ┌──────────────────┐           │
│  │   Cloudinary     │              │  MongoDB Atlas   │           │
│  │  Image Storage   │              │  Cloud Database  │           │
│  │   & CDN          │              │                  │           │
│  └──────────────────┘              └──────────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Authentication Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ 1. Enter Phone & Name
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 2. POST /api/auth/login
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 3. Check User Exists
     ▼
┌──────────────┐
│   MongoDB    │
└────┬─────────┘
     │
     │ 4. Return User Data
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 5. Generate JWT Token
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 6. Store Token & User Data
     ▼
┌──────────────┐
│ AsyncStorage │
└──────────────┘
```

---

### 2. Business Creation Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ 1. Fill Business Form
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 2. Select Images
     ▼
┌──────────────┐
│ Image Picker │
└────┬─────────┘
     │
     │ 3. POST /api/businesses
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 4. Validate & Save
     ▼
┌──────────────┐
│   MongoDB    │
└────┬─────────┘
     │
     │ 5. Return Business ID
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 6. POST /api/businesses/:id/gallery
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 7. Upload Images
     ▼
┌──────────────┐
│  Cloudinary  │
└────┬─────────┘
     │
     │ 8. Return Image URLs
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 9. Update Business Record
     ▼
┌──────────────┐
│   MongoDB    │
└────┬─────────┘
     │
     │ 10. Success Response
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 11. Show Success Message
     ▼
┌──────────┐
│  User    │
└──────────┘
```

---

### 3. Location-Based Filtering Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ 1. Select District
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 2. Navigate to Assembly Selection
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 3. Select Assembly
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 4. GET /api/organizers?district=X&assembly=Y
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 5. Query with Filters
     ▼
┌──────────────┐
│   MongoDB    │
└────┬─────────┘
     │
     │ 6. Return Filtered Results
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 7. Send JSON Response
     ▼
┌──────────────┐
│  Frontend    │
└────┬─────────┘
     │
     │ 8. Display List
     ▼
┌──────────┐
│  User    │
└──────────┘
```

---

## Component Architecture

### Frontend Component Hierarchy

```
App.js
│
├── NavigationContainer
│   │
│   └── Stack.Navigator
│       │
│       ├── LanguageSelectionScreen
│       │
│       ├── WelcomeScreen
│       │
│       └── MainMenuScreen
│           │
│           ├── Business Flow
│           │   ├── CategoryListScreen
│           │   ├── SubCategoryListScreen
│           │   ├── BusinessListScreen
│           │   ├── BusinessDetailsScreen
│           │   └── AddBusinessScreen
│           │
│           ├── Organizer Flow
│           │   ├── DistrictSelectionScreen
│           │   ├── AssemblySelectionScreen
│           │   └── OrganizerListScreen
│           │
│           ├── Member Flow
│           │   ├── DistrictSelectionScreen
│           │   ├── AssemblySelectionScreen
│           │   └── MemberListScreen
│           │
│           ├── News Flow
│           │   ├── DistrictSelectionScreen
│           │   ├── AssemblySelectionScreen
│           │   ├── NewsListScreen
│           │   └── NewsDetailsScreen
│           │
│           └── Subscription Flow
│               └── SubscriptionScreen
│
└── AuthContext.Provider
    └── User State Management
```

---

## Backend API Structure

```
server.js
│
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   ├── Morgan (Logging)
│   └── Error Handler
│
├── Routes
│   ├── /api/auth
│   │   ├── POST /login
│   │   └── GET /me
│   │
│   ├── /api/businesses
│   │   ├── GET /
│   │   ├── GET /:id
│   │   ├── POST /
│   │   ├── PUT /:id
│   │   ├── DELETE /:id
│   │   └── POST /:id/gallery
│   │
│   ├── /api/categories
│   │   ├── GET /
│   │   └── GET /:id/subcategories
│   │
│   ├── /api/organizers
│   │   ├── GET /
│   │   └── POST /
│   │
│   ├── /api/members
│   │   ├── GET /
│   │   └── POST /
│   │
│   ├── /api/news
│   │   ├── GET /
│   │   ├── GET /:id
│   │   └── POST /
│   │
│   └── /api/subscriptions
│       ├── GET /plans
│       ├── POST /
│       └── GET /my-subscriptions
│
└── Database Connection
    └── MongoDB
```

---

## Database Schema Relationships

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ owner
       ├──────────────────┐
       │                  │
       ▼                  ▼
┌─────────────┐    ┌─────────────┐
│  Business   │    │  Organizer  │
└──────┬──────┘    └─────────────┘
       │
       │ category
       ▼
┌─────────────┐
│  Category   │◄──┐
└──────┬──────┘   │
       │          │ parentCategory
       │          │
       └──────────┘
       
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ user
       ├──────────────────┐
       │                  │
       ▼                  ▼
┌─────────────┐    ┌─────────────┐
│   Member    │    │    News     │
└─────────────┘    └─────────────┘

┌─────────────┐
│  Business   │
└──────┬──────┘
       │
       │ business
       ▼
┌─────────────┐
│Subscription │
└─────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Layer 1: Transport Security                           │
│  ┌─────────────────────────────────────────────┐      │
│  │  HTTPS/TLS Encryption                       │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  Layer 2: Authentication                               │
│  ┌─────────────────────────────────────────────┐      │
│  │  JWT Token Verification                     │      │
│  │  Token Expiration (30 days)                 │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  Layer 3: Authorization                                │
│  ┌─────────────────────────────────────────────┐      │
│  │  Role-Based Access Control                  │      │
│  │  Resource Ownership Verification            │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  Layer 4: Input Validation                             │
│  ┌─────────────────────────────────────────────┐      │
│  │  Request Validation                         │      │
│  │  File Type Checking                         │      │
│  │  Size Limits                                │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  Layer 5: Data Protection                              │
│  ┌─────────────────────────────────────────────┐      │
│  │  Environment Variables                      │      │
│  │  Secure Token Storage                       │      │
│  │  CORS Configuration                         │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Production Environment                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │         Mobile App Distribution             │      │
│  │  ┌──────────────┐    ┌──────────────┐      │      │
│  │  │  App Store   │    │  Play Store  │      │      │
│  │  │    (iOS)     │    │  (Android)   │      │      │
│  │  └──────────────┘    └──────────────┘      │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │         Backend Hosting                     │      │
│  │  ┌──────────────────────────────────┐      │      │
│  │  │  Railway / Heroku / AWS          │      │      │
│  │  │  - Express.js Server             │      │      │
│  │  │  - Environment Variables         │      │      │
│  │  │  - HTTPS Enabled                 │      │      │
│  │  └──────────────────────────────────┘      │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │         Database Hosting                    │      │
│  │  ┌──────────────────────────────────┐      │      │
│  │  │  MongoDB Atlas                   │      │      │
│  │  │  - Automatic Backups             │      │      │
│  │  │  - Replication                   │      │      │
│  │  │  - Monitoring                    │      │      │
│  │  └──────────────────────────────────┘      │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │         Image Storage                       │      │
│  │  ┌──────────────────────────────────┐      │      │
│  │  │  Cloudinary CDN                  │      │      │
│  │  │  - Image Optimization            │      │      │
│  │  │  - Global CDN                    │      │      │
│  │  │  - Automatic Backups             │      │      │
│  │  └──────────────────────────────────┘      │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack Visualization

```
┌─────────────────────────────────────────────────────────┐
│                   Technology Stack                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend                                               │
│  ┌─────────────────────────────────────────────┐      │
│  │  React Native 0.74                          │      │
│  │  Expo ~51.0                                 │      │
│  │  React Navigation 6.x                       │      │
│  │  Axios 1.6                                  │      │
│  │  AsyncStorage                               │      │
│  │  Expo Image Picker                          │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  Backend                                                │
│  ┌─────────────────────────────────────────────┐      │
│  │  Node.js 18+                                │      │
│  │  Express.js 4.18                            │      │
│  │  Mongoose 8.0                               │      │
│  │  JWT 9.0                                    │      │
│  │  Multer 1.4                                 │      │
│  │  Cloudinary 1.41                            │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  Database                                               │
│  ┌─────────────────────────────────────────────┐      │
│  │  MongoDB 6.0+                               │      │
│  │  MongoDB Atlas (Cloud)                      │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  External Services                                      │
│  ┌─────────────────────────────────────────────┐      │
│  │  Cloudinary (Image Storage & CDN)           │      │
│  │  MongoDB Atlas (Database Hosting)           │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Performance Optimization Strategy

```
┌─────────────────────────────────────────────────────────┐
│              Performance Optimization                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend Optimizations                                 │
│  ├── Lazy Loading of Images                            │
│  ├── Pagination for Lists                              │
│  ├── Optimized Re-renders                              │
│  ├── Image Compression                                  │
│  └── Caching with AsyncStorage                         │
│                                                         │
│  Backend Optimizations                                  │
│  ├── Database Indexing                                  │
│  ├── Query Optimization                                 │
│  ├── Response Compression                               │
│  ├── Connection Pooling                                 │
│  └── Stateless API Design                              │
│                                                         │
│  Database Optimizations                                 │
│  ├── Indexed Fields                                     │
│  ├── Efficient Queries                                  │
│  ├── Aggregation Pipeline                               │
│  └── Proper Schema Design                              │
│                                                         │
│  CDN & Caching                                          │
│  ├── Cloudinary CDN                                     │
│  ├── Image Optimization                                 │
│  ├── Browser Caching                                    │
│  └── API Response Caching (Future)                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

This architecture provides a solid foundation for a scalable, maintainable, and performant application!

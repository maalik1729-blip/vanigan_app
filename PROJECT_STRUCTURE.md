# Vanigan App - Project Structure

## Overview

```
vanigan-app/
├── backend/                 # Node.js Express API
│   ├── config/             # Configuration files
│   │   ├── database.js     # MongoDB connection
│   │   └── cloudinary.js   # Cloudinary setup
│   │
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   └── upload.js       # Multer file upload
│   │
│   ├── models/             # Mongoose models
│   │   ├── User.js         # User model
│   │   ├── Business.js     # Business model
│   │   ├── Category.js     # Category model
│   │   ├── Organizer.js    # Organizer model
│   │   ├── Member.js       # Member model
│   │   ├── News.js         # News model
│   │   └── Subscription.js # Subscription model
│   │
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── businesses.js   # Business CRUD
│   │   ├── categories.js   # Category routes
│   │   ├── organizers.js   # Organizer routes
│   │   ├── members.js      # Member routes
│   │   ├── news.js         # News routes
│   │   └── subscriptions.js # Subscription routes
│   │
│   ├── scripts/            # Utility scripts
│   │   └── seedData.js     # Database seeding
│   │
│   ├── .env.example        # Environment variables template
│   ├── .gitignore          # Git ignore rules
│   ├── package.json        # Dependencies
│   └── server.js           # Express app entry point
│
└── frontend/               # React Native Expo app
    ├── src/
    │   ├── config/         # App configuration
    │   │   └── api.js      # Axios API client
    │   │
    │   ├── context/        # React Context
    │   │   └── AuthContext.js # Authentication context
    │   │
    │   ├── screens/        # Screen components
    │   │   ├── LanguageSelectionScreen.js
    │   │   ├── WelcomeScreen.js
    │   │   ├── MainMenuScreen.js
    │   │   ├── DistrictSelectionScreen.js
    │   │   ├── AssemblySelectionScreen.js
    │   │   │
    │   │   ├── business/   # Business screens
    │   │   │   ├── CategoryListScreen.js
    │   │   │   ├── SubCategoryListScreen.js
    │   │   │   ├── BusinessListScreen.js
    │   │   │   ├── BusinessDetailsScreen.js
    │   │   │   └── AddBusinessScreen.js
    │   │   │
    │   │   ├── organizer/  # Organizer screens
    │   │   │   └── OrganizerListScreen.js
    │   │   │
    │   │   ├── member/     # Member screens
    │   │   │   └── MemberListScreen.js
    │   │   │
    │   │   ├── news/       # News screens
    │   │   │   ├── NewsListScreen.js
    │   │   │   └── NewsDetailsScreen.js
    │   │   │
    │   │   └── subscription/ # Subscription screens
    │   │       └── SubscriptionScreen.js
    │   │
    │   └── utils/          # Utility functions
    │       ├── constants.js    # App constants
    │       └── translations.js # Multi-language support
    │
    ├── .gitignore          # Git ignore rules
    ├── App.js              # App entry point
    ├── app.json            # Expo configuration
    ├── babel.config.js     # Babel configuration
    └── package.json        # Dependencies
```

## Architecture

### Backend Architecture

**Technology Stack:**
- Node.js + Express.js
- MongoDB + Mongoose
- Cloudinary (image storage)
- JWT (authentication)
- Multer (file uploads)

**Key Features:**
- RESTful API design
- JWT-based authentication
- Image upload to Cloudinary
- MongoDB with Mongoose ODM
- Input validation
- Error handling middleware

**Database Models:**

1. **User** - User accounts
   - phoneNumber, name, language, role

2. **Business** - Business listings
   - name, description, category, owner
   - contact info, address, location
   - gallery images, subscription

3. **Category** - Business categories
   - name, translations, icon
   - parent-child relationship

4. **Organizer** - Community organizers
   - name, position, district, assembly
   - contact info, photo

5. **Member** - Community members
   - name, membershipId, district, assembly
   - contact info, photo

6. **News** - News articles
   - title, content, district, assembly
   - images, author, category

7. **Subscription** - Business subscriptions
   - business, plan, amount
   - dates, payment status

### Frontend Architecture

**Technology Stack:**
- React Native
- Expo
- React Navigation
- Axios
- AsyncStorage

**Navigation Flow:**

```
Entry Flow:
Language Selection → Welcome → Main Menu

Business Flow:
Main Menu → Category List → Sub-Category List → Business List → Business Details

Organizer Flow:
Main Menu → District Selection → Assembly Selection → Organizer List

Member Flow:
Main Menu → District Selection → Assembly Selection → Member List

News Flow:
Main Menu → District Selection → Assembly Selection → News List → News Details

Add Business Flow:
Main Menu → Add Business (Form with image upload)

Subscription Flow:
Main Menu → Subscription Plans
```

**State Management:**
- AuthContext for user authentication
- AsyncStorage for persistent data
- Component-level state for UI

**Key Features:**
- Multi-language support (English, Hindi, Tamil, Telugu)
- Image picker for gallery uploads
- Location-based filtering
- Subscription management
- Responsive UI design

## Data Flow

### Authentication Flow

1. User selects language
2. User enters name and phone number
3. Backend creates/finds user
4. Backend generates JWT token
5. Frontend stores token in AsyncStorage
6. Token sent with all authenticated requests

### Business Creation Flow

1. User fills business form
2. User selects images from gallery
3. Frontend sends business data to backend
4. Backend creates business record
5. Frontend uploads images to backend
6. Backend uploads to Cloudinary
7. Backend updates business with image URLs

### News/Organizer/Member Flow

1. User selects district
2. User selects assembly
3. Frontend fetches filtered data
4. Backend queries MongoDB with filters
5. Frontend displays results

## API Design

### RESTful Endpoints

**Authentication:**
- POST `/api/auth/login` - Login/Register
- GET `/api/auth/me` - Get current user

**Businesses:**
- GET `/api/businesses` - List with filters
- GET `/api/businesses/:id` - Get details
- POST `/api/businesses` - Create (auth)
- PUT `/api/businesses/:id` - Update (auth)
- POST `/api/businesses/:id/gallery` - Upload images (auth)

**Categories:**
- GET `/api/categories` - List main categories
- GET `/api/categories/:id/subcategories` - List sub-categories

**Organizers:**
- GET `/api/organizers` - List with filters
- POST `/api/organizers` - Create (auth)

**Members:**
- GET `/api/members` - List with filters
- POST `/api/members` - Create (auth)

**News:**
- GET `/api/news` - List with filters
- GET `/api/news/:id` - Get details
- POST `/api/news` - Create (auth)

**Subscriptions:**
- GET `/api/subscriptions/plans` - List plans
- POST `/api/subscriptions` - Create subscription (auth)
- GET `/api/subscriptions/my-subscriptions` - User subscriptions (auth)

## Security

### Backend Security

- JWT authentication for protected routes
- Password-less authentication (phone-based)
- Input validation on all endpoints
- File upload restrictions (size, type)
- CORS configuration
- Environment variables for secrets

### Frontend Security

- Secure token storage (AsyncStorage)
- API token in Authorization header
- No sensitive data in code
- Secure image handling

## Scalability Considerations

### Backend

- Stateless API design
- Database indexing on frequently queried fields
- Cloudinary for image CDN
- Pagination for large datasets
- Caching strategies (future)

### Frontend

- Lazy loading of images
- Pagination in lists
- Optimized re-renders
- Image compression before upload

## Future Enhancements

1. **Push Notifications** - News alerts, subscription reminders
2. **Search Functionality** - Full-text search for businesses
3. **Reviews & Ratings** - User reviews for businesses
4. **Maps Integration** - Show businesses on map
5. **Payment Gateway** - Online subscription payments
6. **Admin Dashboard** - Web-based admin panel
7. **Analytics** - Business insights and statistics
8. **Social Sharing** - Share businesses on social media
9. **Chat Feature** - Direct messaging between users
10. **Advanced Filters** - More filtering options

## Development Guidelines

### Code Style

- Use ES6+ features
- Async/await for promises
- Descriptive variable names
- Comments for complex logic
- Consistent formatting

### Git Workflow

- Feature branches
- Descriptive commit messages
- Pull request reviews
- Semantic versioning

### Testing

- Unit tests for utilities
- Integration tests for API
- E2E tests for critical flows
- Manual testing on devices

## Deployment

### Backend Deployment

**Options:**
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

**Requirements:**
- Node.js runtime
- MongoDB connection
- Environment variables
- HTTPS enabled

### Frontend Deployment

**Development:**
- Expo Go app for testing

**Production:**
- Build standalone apps
- Submit to App Store (iOS)
- Submit to Play Store (Android)
- OTA updates via Expo

## Maintenance

### Regular Tasks

- Update dependencies
- Monitor error logs
- Database backups
- Performance monitoring
- Security patches

### Monitoring

- API response times
- Error rates
- User analytics
- Database performance
- Image storage usage

## Support & Documentation

- README.md - Project overview
- SETUP.md - Setup instructions
- PROJECT_STRUCTURE.md - This file
- API documentation (future)
- User manual (future)

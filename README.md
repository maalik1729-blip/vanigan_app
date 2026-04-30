# 🏢 Vanigan App

> A comprehensive business directory and community management platform for mobile devices

[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/maalik1729-blip/vanigan_app)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Android-brightgreen.svg)](https://expo.dev)
[![Backend](https://img.shields.io/badge/backend-Render-purple.svg)](https://vanigan-app.onrender.com)

---

## 📱 About

Vanigan is a full-stack mobile application designed to connect businesses, members, and communities. It provides a comprehensive platform for business directory management, news distribution, member organization, and partner collaboration.

### ✨ Key Features

- 🏢 **Business Directory** - Browse and manage local businesses by category
- 👥 **Member Management** - Organize community members and organizers
- 📰 **News & Updates** - Stay informed with latest community news
- 🤝 **Partner Network** - Connect with business partners
- 🌍 **Multi-language** - Support for Tamil, English, and Hindi
- 📍 **Location Services** - Find businesses near you
- 📸 **Image Management** - Upload and manage business photos
- 🔐 **Secure Authentication** - JWT-based user authentication

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Expo CLI (for mobile development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maalik1729-blip/vanigan_app.git
   cd vanigan_app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Download Mobile App**
   - [Download Latest APK](https://expo.dev/accounts/ziya1729/projects/vanigan-app/builds)

---

## 📚 Documentation

- **[Architecture Guide](ARCHITECTURE.md)** - Complete system architecture and design
- **[Audit Report](PROJECT_AUDIT_REPORT.md)** - Security, performance, and quality audit
- **[API Documentation](https://vanigan-app.onrender.com)** - Interactive API reference

---

## 🏗️ Project Structure

```
vanigan-app/
├── backend/                 # Node.js/Express API
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   └── server.js           # Entry point
│
├── frontend/               # React Native/Expo app
│   ├── src/
│   │   ├── config/        # App configuration
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── screens/       # App screens
│   │   └── utils/         # Utilities
│   ├── android/           # Android native code
│   └── App.js             # Root component
│
├── ARCHITECTURE.md        # Architecture documentation
├── PROJECT_AUDIT_REPORT.md # Audit report
└── README.md              # This file
```

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + Bcrypt
- **File Storage**: Cloudinary
- **Validation**: Express Validator
- **Logging**: Morgan

### Frontend
- **Framework**: React Native
- **Platform**: Expo
- **Navigation**: React Navigation
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Maps**: React Native Maps
- **Image Picker**: Expo Image Picker

### Infrastructure
- **Backend Hosting**: Render.com
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary
- **Version Control**: GitHub
- **Build Platform**: EAS Build

---

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Credentials
ADMIN_NAME=admin
ADMIN_PHONE=1234567890
ADMIN_PASSWORD=admin@123
```

### Frontend Configuration

Update `frontend/src/config/api.js`:

```javascript
const API_URL = 'https://vanigan-app.onrender.com/api';
```

---

## 📡 API Endpoints

### Base URL
```
https://vanigan-app.onrender.com
```

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Businesses
- `GET /api/businesses` - List all businesses
- `GET /api/businesses/:id` - Get business details
- `POST /api/businesses` - Create business
- `PUT /api/businesses/:id` - Update business
- `DELETE /api/businesses/:id` - Delete business

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Members
- `GET /api/members` - List all members
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### News
- `GET /api/news` - List all news
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)

### Partners
- `GET /api/partners` - List all partners
- `POST /api/partners` - Create partner
- `PUT /api/partners/:id` - Update partner
- `DELETE /api/partners/:id` - Delete partner

### Subscriptions
- `GET /api/subscriptions` - List all subscriptions
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription

---

## 🔐 Security

### Implemented Security Measures
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ HTTPS in production

### Security Recommendations
- ⚠️ Implement rate limiting
- ⚠️ Add Helmet.js for security headers
- ⚠️ Update vulnerable dependencies
- ⚠️ Implement request size limits
- ⚠️ Add API versioning

See [PROJECT_AUDIT_REPORT.md](PROJECT_AUDIT_REPORT.md) for detailed security analysis.

---

## 📊 Performance

### Current Performance
- API Response Time: ~300-800ms
- Database Queries: Indexed
- Image Delivery: CDN (Cloudinary)
- Mobile App Size: ~50MB

### Optimization Recommendations
- Implement Redis caching
- Add response compression
- Implement pagination
- Optimize database queries
- Add lazy loading for images

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm install --save-dev jest supertest
npm test
```

### Frontend Testing
```bash
cd frontend
npm install --save-dev @testing-library/react-native
npm test
```

**Note**: Test suites are not yet implemented. See audit report for recommendations.

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Connect GitHub repository to Render
2. Configure environment variables
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy

### Frontend Deployment (EAS Build)

1. Login to Expo:
   ```bash
   npx expo login
   ```

2. Build APK:
   ```bash
   cd frontend
   eas build -p android --profile production
   ```

3. Download and distribute APK

---

## 📱 Mobile App

### Download
- [Latest APK](https://expo.dev/accounts/ziya1729/projects/vanigan-app/builds)

### Features
- Cross-platform (Android/iOS)
- Offline capability (coming soon)
- Push notifications (coming soon)
- Multi-language support
- Location-based search
- Image upload and management

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer**: Maalik
- **GitHub**: [@maalik1729-blip](https://github.com/maalik1729-blip)
- **Email**: thalapathytk1729@gmail.com

---

## 🙏 Acknowledgments

- React Native community
- Expo team
- MongoDB Atlas
- Cloudinary
- Render.com
- All open-source contributors

---

## 📞 Support

For support, email thalapathytk1729@gmail.com or open an issue on GitHub.

---

## 🗺️ Roadmap

### Version 1.1 (Q2 2026)
- [ ] Push notifications
- [ ] Offline mode
- [ ] Advanced search filters
- [ ] User ratings and reviews
- [ ] Payment integration

### Version 1.2 (Q3 2026)
- [ ] Real-time chat
- [ ] Video content support
- [ ] Advanced analytics
- [ ] Multi-tenant support
- [ ] GraphQL API

### Version 2.0 (Q4 2026)
- [ ] AI-powered recommendations
- [ ] Voice search
- [ ] AR business preview
- [ ] Blockchain integration
- [ ] Microservices architecture

---

## 📈 Project Status

- **Version**: 1.0.1
- **Status**: Production
- **Last Updated**: April 30, 2026
- **Security Score**: 72/100
- **Code Quality**: 82/100
- **Performance**: 80/100
- **Overall Score**: 78/100 ⭐⭐⭐⭐

See [PROJECT_AUDIT_REPORT.md](PROJECT_AUDIT_REPORT.md) for detailed analysis.

---

## 🔗 Links

- **Production API**: https://vanigan-app.onrender.com
- **GitHub Repository**: https://github.com/maalik1729-blip/vanigan_app
- **Expo Project**: https://expo.dev/accounts/ziya1729/projects/vanigan-app
- **Documentation**: [ARCHITECTURE.md](ARCHITECTURE.md)

---

<div align="center">

**Made with ❤️ by the Vanigan Team**

[⬆ Back to Top](#-vanigan-app)

</div>

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Prevent MongoDB injection

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vanigan-app.onrender.com'] 
    : '*',
  credentials: true
}));

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Root endpoint - API documentation
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Vanigan API',
    version: '1.0.1',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        base: '/api/auth',
        routes: [
          { method: 'POST', path: '/api/auth/register', description: 'Register new user' },
          { method: 'POST', path: '/api/auth/login', description: 'Login user' },
          { method: 'GET', path: '/api/auth/me', description: 'Get current user (requires auth)' }
        ]
      },
      businesses: {
        base: '/api/businesses',
        routes: [
          { method: 'GET', path: '/api/businesses', description: 'Get all businesses' },
          { method: 'GET', path: '/api/businesses/:id', description: 'Get business by ID' },
          { method: 'POST', path: '/api/businesses', description: 'Create business (requires auth)' },
          { method: 'PUT', path: '/api/businesses/:id', description: 'Update business (requires auth)' },
          { method: 'DELETE', path: '/api/businesses/:id', description: 'Delete business (requires auth)' }
        ]
      },
      categories: {
        base: '/api/categories',
        routes: [
          { method: 'GET', path: '/api/categories', description: 'Get all categories' },
          { method: 'GET', path: '/api/categories/:id', description: 'Get category by ID' },
          { method: 'POST', path: '/api/categories', description: 'Create category (requires admin)' },
          { method: 'PUT', path: '/api/categories/:id', description: 'Update category (requires admin)' },
          { method: 'DELETE', path: '/api/categories/:id', description: 'Delete category (requires admin)' }
        ]
      },
      organizers: {
        base: '/api/organizers',
        routes: [
          { method: 'GET', path: '/api/organizers', description: 'Get all organizers' },
          { method: 'GET', path: '/api/organizers/:id', description: 'Get organizer by ID' },
          { method: 'POST', path: '/api/organizers', description: 'Create organizer (requires auth)' },
          { method: 'PUT', path: '/api/organizers/:id', description: 'Update organizer (requires auth)' },
          { method: 'DELETE', path: '/api/organizers/:id', description: 'Delete organizer (requires auth)' }
        ]
      },
      members: {
        base: '/api/members',
        routes: [
          { method: 'GET', path: '/api/members', description: 'Get all members' },
          { method: 'GET', path: '/api/members/:id', description: 'Get member by ID' },
          { method: 'POST', path: '/api/members', description: 'Create member (requires auth)' },
          { method: 'PUT', path: '/api/members/:id', description: 'Update member (requires auth)' },
          { method: 'DELETE', path: '/api/members/:id', description: 'Delete member (requires auth)' }
        ]
      },
      news: {
        base: '/api/news',
        routes: [
          { method: 'GET', path: '/api/news', description: 'Get all news' },
          { method: 'GET', path: '/api/news/:id', description: 'Get news by ID' },
          { method: 'POST', path: '/api/news', description: 'Create news (requires admin)' },
          { method: 'PUT', path: '/api/news/:id', description: 'Update news (requires admin)' },
          { method: 'DELETE', path: '/api/news/:id', description: 'Delete news (requires admin)' }
        ]
      },
      subscriptions: {
        base: '/api/subscriptions',
        routes: [
          { method: 'GET', path: '/api/subscriptions', description: 'Get all subscriptions' },
          { method: 'GET', path: '/api/subscriptions/:id', description: 'Get subscription by ID' },
          { method: 'POST', path: '/api/subscriptions', description: 'Create subscription (requires auth)' },
          { method: 'PUT', path: '/api/subscriptions/:id', description: 'Update subscription (requires auth)' },
          { method: 'DELETE', path: '/api/subscriptions/:id', description: 'Delete subscription (requires auth)' }
        ]
      },
      partners: {
        base: '/api/partners',
        routes: [
          { method: 'GET', path: '/api/partners', description: 'Get all partners' },
          { method: 'GET', path: '/api/partners/:id', description: 'Get partner by ID' },
          { method: 'POST', path: '/api/partners', description: 'Create partner (requires auth)' },
          { method: 'PUT', path: '/api/partners/:id', description: 'Update partner (requires auth)' },
          { method: 'DELETE', path: '/api/partners/:id', description: 'Delete partner (requires auth)' }
        ]
      }
    },
    health: {
      endpoint: '/health',
      description: 'Health check endpoint'
    },
    documentation: {
      message: 'For detailed API documentation, please contact the administrator',
      github: 'https://github.com/maalik1729-blip/vanigan_app'
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/organizers', require('./routes/organizers'));
app.use('/api/members', require('./routes/members'));
app.use('/api/news', require('./routes/news'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/partners', require('./routes/partners'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vanigan API is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

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
  res.json({ status: 'OK', message: 'Vanigan API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

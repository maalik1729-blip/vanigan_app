const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String, // bcrypt hashed; optional for legacy users
  },
  language: {
    type: String,
    enum: ['en', 'hi', 'ta', 'te'],
    default: 'en',
  },
  district: String,
  assembly: String,
  role: {
    type: String,
    enum: ['user', 'organizer', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);

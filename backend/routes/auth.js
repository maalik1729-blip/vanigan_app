const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/auth/login  →  { mobileNumber, password }
router.post('/login', async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password) {
      return res.status(400).json({ message: 'Mobile number and password are required' });
    }

    const user = await User.findOne({ phoneNumber: mobileNumber });

    if (!user) {
      return res.status(401).json({ message: 'Invalid mobile number or password' });
    }

    // If user has no password (legacy admin) allow only if password matches env default
    if (!user.password) {
      const adminPass = process.env.ADMIN_PASSWORD;
      if (!adminPass || password !== adminPass) {
        return res.status(401).json({ message: 'Invalid mobile number or password' });
      }
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid mobile number or password' });
      }
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        language: user.language,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-__v -password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (_error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;

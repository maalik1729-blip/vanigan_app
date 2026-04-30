const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Partner = require('../models/Partner');
const User = require('../models/User');

// POST /api/partners/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, mobileNumber, email, address, city, password } = req.body;

    if (!name || !mobileNumber || !password) {
      return res.status(400).json({ message: 'Name, mobile number and password are required' });
    }
    if (mobileNumber.length < 10) {
      return res.status(400).json({ message: 'Enter a valid 10-digit mobile number' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check duplicate mobile
    const existingPartner = await Partner.findOne({ mobileNumber });
    if (existingPartner) {
      return res.status(409).json({ message: 'A partner with this mobile number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save Partner record
    const partner = new Partner({ name, mobileNumber, email, address, city });
    await partner.save();

    // Create/update User record so the partner can log in
    await User.findOneAndUpdate(
      { phoneNumber: mobileNumber },
      {
        phoneNumber: mobileNumber,
        name,
        password: hashedPassword,
        role: 'user',
        language: 'en',
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: 'Partner registered successfully! You can now log in.',
      partner: {
        id: partner._id,
        name: partner.name,
        mobileNumber: partner.mobileNumber,
        status: partner.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/partners — list all partners (admin)
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find().sort({ registeredAt: -1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/partners/:id/status — approve or reject (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

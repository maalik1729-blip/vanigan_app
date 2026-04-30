const express = require('express');
const router = express.Router();
const Organizer = require('../models/Organizer');
const auth = require('../middleware/auth');

// Get organizers with filters
router.get('/', async (req, res) => {
  try {
    const { district, assembly } = req.query;
    const filter = { isActive: true };

    if (district) filter.district = district;
    if (assembly) filter.assembly = assembly;

    const organizers = await Organizer.find(filter)
      .populate('user', 'name phoneNumber')
      .sort({ position: 1 });

    res.json(organizers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get organizer by ID
router.get('/:id', async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id)
      .populate('user', 'name phoneNumber');

    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.json(organizer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create organizer (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const organizer = new Organizer({
      ...req.body,
      user: req.userId,
    });

    await organizer.save();
    res.status(201).json(organizer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

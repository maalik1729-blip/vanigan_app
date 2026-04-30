const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const auth = require('../middleware/auth');

// Get members with filters
router.get('/', async (req, res) => {
  try {
    const { district, assembly } = req.query;
    const filter = { isActive: true };

    if (district) filter.district = district;
    if (assembly) filter.assembly = assembly;

    const members = await Member.find(filter)
      .populate('user', 'name phoneNumber')
      .sort({ name: 1 });

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate('user', 'name phoneNumber');

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create member
router.post('/', auth, async (req, res) => {
  try {
    const member = new Member({
      ...req.body,
      user: req.userId,
    });

    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

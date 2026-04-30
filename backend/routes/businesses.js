const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../config/cloudinary');

// Get all businesses with filters
router.get('/', async (req, res) => {
  try {
    const { category, subCategory, district, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (district) filter['address.district'] = district;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const businesses = await Business.find(filter)
      .populate('category')
      .populate('subCategory')
      .populate('owner', 'name phoneNumber')
      .sort({ createdAt: -1 });

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('category')
      .populate('subCategory')
      .populate('owner', 'name phoneNumber');

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new business
router.post('/', auth, async (req, res) => {
  try {
    const businessData = {
      ...req.body,
      owner: req.userId,
    };

    const business = new Business(businessData);
    await business.save();

    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload business gallery images
router.post('/:id/gallery', auth, upload.array('images', 10), async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const uploadPromises = req.files.map(file => 
      uploadToCloudinary(file, 'vanigan/businesses')
    );

    const uploadedImages = await Promise.all(uploadPromises);
    business.gallery.push(...uploadedImages);
    await business.save();

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update business
router.put('/:id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(business, req.body);
    await business.save();

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete business
router.delete('/:id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await business.deleteOne();
    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

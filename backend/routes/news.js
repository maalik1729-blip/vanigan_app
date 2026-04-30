const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../config/cloudinary');

// Get news with filters
router.get('/', async (req, res) => {
  try {
    const { district, assembly, category } = req.query;
    const filter = { isPublished: true };

    if (district) filter.district = district;
    if (assembly) filter.assembly = assembly;
    if (category) filter.category = category;

    const news = await News.find(filter)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .limit(50);

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'name phoneNumber');

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create news (admin/organizer only)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const newsData = {
      ...req.body,
      author: req.userId,
    };

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => 
        uploadToCloudinary(file, 'vanigan/news')
      );
      newsData.images = await Promise.all(uploadPromises);
    }

    const news = new News(newsData);
    await news.save();

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

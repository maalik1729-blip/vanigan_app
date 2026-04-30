const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Get all main categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isSubCategory: false });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get subcategories by parent category
router.get('/:categoryId/subcategories', async (req, res) => {
  try {
    const subcategories = await Category.find({
      parentCategory: req.params.categoryId,
      isSubCategory: true,
    });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create category (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, nameTranslations, icon, parentCategory } = req.body;

    const category = new Category({
      name,
      nameTranslations,
      icon,
      parentCategory,
      isSubCategory: !!parentCategory,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});

    // Main categories
    const categories = [
      {
        name: 'Restaurants & Food',
        nameTranslations: {
          en: 'Restaurants & Food',
          hi: 'रेस्तरां और भोजन',
          ta: 'உணவகங்கள் & உணவு',
          te: 'రెస్టారెంట్లు & ఆహారం',
        },
        icon: '🍽️',
      },
      {
        name: 'Retail & Shopping',
        nameTranslations: {
          en: 'Retail & Shopping',
          hi: 'खुदरा और खरीदारी',
          ta: 'சில்லறை & ஷாப்பிங்',
          te: 'రిటైల్ & షాపింగ్',
        },
        icon: '🛍️',
      },
      {
        name: 'Healthcare',
        nameTranslations: {
          en: 'Healthcare',
          hi: 'स्वास्थ्य सेवा',
          ta: 'சுகாதாரம்',
          te: 'ఆరోగ్య సంరక్షణ',
        },
        icon: '🏥',
      },
      {
        name: 'Education',
        nameTranslations: {
          en: 'Education',
          hi: 'शिक्षा',
          ta: 'கல்வி',
          te: 'విద్య',
        },
        icon: '📚',
      },
      {
        name: 'Services',
        nameTranslations: {
          en: 'Services',
          hi: 'सेवाएं',
          ta: 'சேவைகள்',
          te: 'సేవలు',
        },
        icon: '🔧',
      },
      {
        name: 'Real Estate',
        nameTranslations: {
          en: 'Real Estate',
          hi: 'रियल एस्टेट',
          ta: 'ரியல் எஸ்டேட்',
          te: 'రియల్ ఎస్టేట్',
        },
        icon: '🏠',
      },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log('Main categories created:', createdCategories.length);

    // Sub-categories for Restaurants & Food
    const restaurantCategory = createdCategories.find(c => c.name === 'Restaurants & Food');
    const restaurantSubCategories = [
      { name: 'Fast Food', parentCategory: restaurantCategory._id, isSubCategory: true },
      { name: 'Fine Dining', parentCategory: restaurantCategory._id, isSubCategory: true },
      { name: 'Cafes & Bakery', parentCategory: restaurantCategory._id, isSubCategory: true },
      { name: 'Street Food', parentCategory: restaurantCategory._id, isSubCategory: true },
    ];

    // Sub-categories for Retail & Shopping
    const retailCategory = createdCategories.find(c => c.name === 'Retail & Shopping');
    const retailSubCategories = [
      { name: 'Clothing & Fashion', parentCategory: retailCategory._id, isSubCategory: true },
      { name: 'Electronics', parentCategory: retailCategory._id, isSubCategory: true },
      { name: 'Grocery Stores', parentCategory: retailCategory._id, isSubCategory: true },
      { name: 'Jewelry', parentCategory: retailCategory._id, isSubCategory: true },
    ];

    // Sub-categories for Healthcare
    const healthcareCategory = createdCategories.find(c => c.name === 'Healthcare');
    const healthcareSubCategories = [
      { name: 'Hospitals', parentCategory: healthcareCategory._id, isSubCategory: true },
      { name: 'Clinics', parentCategory: healthcareCategory._id, isSubCategory: true },
      { name: 'Pharmacies', parentCategory: healthcareCategory._id, isSubCategory: true },
      { name: 'Diagnostic Centers', parentCategory: healthcareCategory._id, isSubCategory: true },
    ];

    // Sub-categories for Services
    const servicesCategory = createdCategories.find(c => c.name === 'Services');
    const servicesSubCategories = [
      { name: 'Plumbing', parentCategory: servicesCategory._id, isSubCategory: true },
      { name: 'Electrical', parentCategory: servicesCategory._id, isSubCategory: true },
      { name: 'Cleaning', parentCategory: servicesCategory._id, isSubCategory: true },
      { name: 'Repair & Maintenance', parentCategory: servicesCategory._id, isSubCategory: true },
    ];

    const allSubCategories = [
      ...restaurantSubCategories,
      ...retailSubCategories,
      ...healthcareSubCategories,
      ...servicesSubCategories,
    ];

    await Category.insertMany(allSubCategories);
    console.log('Sub-categories created:', allSubCategories.length);

    console.log('✅ Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

connectDB().then(() => seedCategories());

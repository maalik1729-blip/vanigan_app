const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Business = require('../models/Business');
const auth = require('../middleware/auth');

// Get subscription plans
router.get('/plans', (req, res) => {
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 299,
      duration: 30,
      features: ['Business Listing', 'Up to 5 Images', 'Contact Details', 'Basic Support'],
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 2999,
      duration: 365,
      features: ['Business Listing', 'Up to 10 Images', 'Contact Details', 'Priority Support', 'Featured Badge'],
      discount: '17% OFF',
    },
    {
      id: 'lifetime',
      name: 'Lifetime Plan',
      price: 9999,
      duration: null,
      features: ['Business Listing', 'Unlimited Images', 'Contact Details', '24/7 Support', 'Featured Badge', 'Analytics Dashboard'],
      discount: 'Best Value',
    },
  ];

  res.json(plans);
});

// Create subscription
router.post('/', auth, async (req, res) => {
  try {
    const { businessId, plan, amount } = req.body;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const startDate = new Date();
    let endDate = null;

    if (plan === 'monthly') {
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 30);
    } else if (plan === 'yearly') {
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscription = new Subscription({
      business: businessId,
      plan,
      amount,
      startDate,
      endDate,
      paymentStatus: 'completed', // In production, integrate with payment gateway
    });

    await subscription.save();

    // Update business subscription
    business.subscription = {
      plan,
      startDate,
      endDate,
      isActive: true,
    };
    await business.save();

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user subscriptions
router.get('/my-subscriptions', auth, async (req, res) => {
  try {
    const businesses = await Business.find({ owner: req.userId });
    const businessIds = businesses.map(b => b._id);

    const subscriptions = await Subscription.find({ business: { $in: businessIds } })
      .populate('business', 'name')
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

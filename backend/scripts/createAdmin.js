require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB Connected');
};

const createAdmin = async () => {
  try {
    await connectDB();

    const adminPhone = process.env.ADMIN_PHONE;
    const adminName  = process.env.ADMIN_NAME;

    if (!adminPhone || !adminName) {
      console.error('❌ ADMIN_PHONE and ADMIN_NAME must be set in .env');
      process.exit(1);
    }

    const adminUser = await User.findOneAndUpdate(
      { phoneNumber: adminPhone },
      {
        phoneNumber: adminPhone,
        name: adminName,
        role: 'admin',
        language: 'en',
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user created/updated successfully!');
    console.log('   Name       :', adminUser.name);
    console.log('   Phone      :', adminUser.phoneNumber);
    console.log('   Role       :', adminUser.role);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();

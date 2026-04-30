# Vanigan App

A comprehensive business directory and community management app with WhatsApp-like flow.

## Project Structure

```
vanigan-app/
├── frontend/          # React Native Expo app
└── backend/           # Node.js Express API
```

## Features

- Multi-language support
- Business directory with categories
- Organizer management
- Member management
- Business registration
- Subscription plans
- News feed by district/assembly
- Image upload with Cloudinary
- MongoDB database

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Tech Stack

**Frontend:**
- React Native
- Expo
- React Navigation
- Axios
- AsyncStorage

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- Cloudinary
- JWT Authentication

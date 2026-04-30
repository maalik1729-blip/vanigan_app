# Vanigan App - Deployment Guide

## Overview

This guide covers deploying the Vanigan app to production environments.

---

## Backend Deployment

### Option 1: Railway (Recommended - Easy & Free)

**Why Railway?**
- Free tier available
- Easy deployment
- Automatic HTTPS
- Environment variables support
- GitHub integration

**Steps:**

1. **Create Railway Account**
   ```
   Visit: https://railway.app
   Sign up with GitHub
   ```

2. **Create New Project**
   ```
   Click "New Project"
   Select "Deploy from GitHub repo"
   Choose your repository
   Select backend folder
   ```

3. **Configure Environment Variables**
   ```
   Go to Variables tab
   Add:
   - MONGODB_URI (use MongoDB Atlas)
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - PORT (Railway sets this automatically)
   ```

4. **Deploy**
   ```
   Railway auto-deploys on push
   Get your deployment URL
   ```

5. **Seed Database**
   ```bash
   # SSH into Railway or run locally with production DB
   node scripts/seedData.js
   ```

---

### Option 2: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create vanigan-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_secret"
   heroku config:set CLOUDINARY_CLOUD_NAME="your_cloud_name"
   heroku config:set CLOUDINARY_API_KEY="your_api_key"
   heroku config:set CLOUDINARY_API_SECRET="your_api_secret"
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Seed Database**
   ```bash
   heroku run node scripts/seedData.js
   ```

---

### Option 3: DigitalOcean App Platform

**Steps:**

1. **Create Account**
   - Visit: https://www.digitalocean.com
   - Sign up and verify

2. **Create App**
   - Click "Create" → "Apps"
   - Connect GitHub repository
   - Select backend folder

3. **Configure**
   - Set build command: `npm install`
   - Set run command: `npm start`
   - Add environment variables

4. **Deploy**
   - Click "Create Resources"
   - Wait for deployment

---

### Option 4: AWS EC2 (Advanced)

**Steps:**

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier)
   - Configure security groups (ports 22, 80, 443, 5000)

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   ```

4. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd vanigan-app/backend
   npm install
   ```

5. **Configure Environment**
   ```bash
   nano .env
   # Add all environment variables
   ```

6. **Start with PM2**
   ```bash
   pm2 start server.js --name vanigan-api
   pm2 startup
   pm2 save
   ```

7. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/vanigan
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/vanigan /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Setup SSL (Optional but Recommended)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## Database Deployment

### MongoDB Atlas (Recommended)

**Steps:**

1. **Create Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster (takes 3-5 minutes)

3. **Configure Access**
   - Database Access: Create user with password
   - Network Access: Add IP (0.0.0.0/0 for all IPs)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace <password> with your password

5. **Update Backend**
   - Add connection string to environment variables
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/vanigan`

---

## Frontend Deployment

### Development Testing

**Expo Go (For Testing)**
```bash
cd frontend
npm start
# Scan QR code with Expo Go app
```

---

### Production Build

#### Option 1: EAS Build (Recommended)

**Setup:**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
cd frontend
eas build:configure
```

**Build for Android:**
```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform android --profile production
```

**Build for iOS:**
```bash
# Requires Apple Developer account ($99/year)
eas build --platform ios --profile production
```

**Submit to Stores:**
```bash
# Android
eas submit --platform android

# iOS
eas submit --platform ios
```

---

#### Option 2: Classic Expo Build

**Android APK:**
```bash
expo build:android -t apk
```

**Android App Bundle (for Play Store):**
```bash
expo build:android -t app-bundle
```

**iOS (Requires Mac):**
```bash
expo build:ios
```

---

### Update API URL for Production

**Before building, update `frontend/src/config/api.js`:**

```javascript
// Production API URL
const API_URL = 'https://your-backend-url.com/api';

// Or use environment-based configuration
const API_URL = __DEV__ 
  ? 'http://localhost:5000/api'  // Development
  : 'https://your-backend-url.com/api';  // Production
```

---

## Cloudinary Setup

**Steps:**

1. **Create Account**
   - Visit: https://cloudinary.com
   - Sign up for free (25GB storage, 25GB bandwidth)

2. **Get Credentials**
   - Go to Dashboard
   - Copy:
     - Cloud Name
     - API Key
     - API Secret

3. **Configure Backend**
   - Add to .env file
   - Restart server

4. **Create Upload Presets (Optional)**
   - Settings → Upload
   - Create preset for automatic transformations

---

## Domain Configuration

### Custom Domain Setup

**For Backend:**

1. **Purchase Domain**
   - Namecheap, GoDaddy, Google Domains, etc.

2. **Configure DNS**
   ```
   Type: A Record
   Name: api (or @)
   Value: Your server IP
   TTL: 3600
   ```

3. **Update Backend URL**
   - Update in frontend API configuration
   - Update in app.json for deep linking

**For Frontend (Deep Linking):**

Update `app.json`:
```json
{
  "expo": {
    "scheme": "vanigan",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": {
            "scheme": "https",
            "host": "vanigan.app"
          }
        }
      ]
    }
  }
}
```

---

## Environment Variables Checklist

### Backend (.env)
```env
✅ PORT=5000
✅ MONGODB_URI=mongodb+srv://...
✅ JWT_SECRET=random_secret_key
✅ CLOUDINARY_CLOUD_NAME=your_cloud_name
✅ CLOUDINARY_API_KEY=your_api_key
✅ CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend
```javascript
✅ API_URL (in src/config/api.js)
```

---

## Post-Deployment Checklist

### Backend
- [ ] Server is running
- [ ] Database is connected
- [ ] Categories are seeded
- [ ] API endpoints are accessible
- [ ] HTTPS is configured
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Logs are being captured

### Frontend
- [ ] App builds successfully
- [ ] API URL is correct
- [ ] Authentication works
- [ ] All screens load
- [ ] Images upload correctly
- [ ] Navigation works
- [ ] App is submitted to stores

### Database
- [ ] MongoDB Atlas is configured
- [ ] Backups are enabled
- [ ] Indexes are created
- [ ] Connection is secure

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (Google Analytics)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Performance monitoring

---

## Continuous Deployment

### GitHub Actions (Backend)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Backend

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Railway
        run: |
          # Railway auto-deploys on push
          echo "Deployed to Railway"
```

### Expo OTA Updates

```bash
# Publish update without rebuilding
eas update --branch production --message "Bug fixes"
```

---

## Monitoring & Maintenance

### Backend Monitoring

**PM2 Monitoring:**
```bash
pm2 monit
pm2 logs vanigan-api
```

**Health Check Endpoint:**
```
GET https://your-api.com/health
```

### Database Monitoring

**MongoDB Atlas:**
- Dashboard → Metrics
- Set up alerts
- Monitor performance

### App Monitoring

**Expo Analytics:**
- View in Expo dashboard
- Track crashes
- Monitor performance

---

## Backup Strategy

### Database Backups

**MongoDB Atlas:**
- Automatic backups enabled
- Point-in-time recovery
- Download backups manually

**Manual Backup:**
```bash
mongodump --uri="mongodb+srv://..." --out=backup-$(date +%Y%m%d)
```

### Code Backups

- GitHub repository
- Regular commits
- Tagged releases

---

## Rollback Strategy

### Backend Rollback

**Railway/Heroku:**
- Use dashboard to rollback to previous deployment

**PM2:**
```bash
pm2 stop vanigan-api
git checkout previous-commit
npm install
pm2 restart vanigan-api
```

### Frontend Rollback

**Expo:**
```bash
# Revert to previous update
eas update --branch production --message "Rollback"
```

---

## Cost Estimation

### Free Tier (Development)
- Railway: Free
- MongoDB Atlas: Free (512MB)
- Cloudinary: Free (25GB)
- Expo: Free
- **Total: $0/month**

### Production (Small Scale)
- Railway: $5/month
- MongoDB Atlas: $9/month (2GB)
- Cloudinary: $0-89/month
- Expo: $29/month (optional)
- Domain: $12/year
- **Total: ~$15-45/month**

### Production (Medium Scale)
- DigitalOcean: $12/month
- MongoDB Atlas: $57/month (10GB)
- Cloudinary: $89/month
- Expo: $29/month
- **Total: ~$187/month**

---

## Security Best Practices

1. **Use HTTPS everywhere**
2. **Keep dependencies updated**
3. **Use strong JWT secrets**
4. **Enable MongoDB authentication**
5. **Restrict CORS origins**
6. **Implement rate limiting**
7. **Regular security audits**
8. **Monitor for vulnerabilities**

---

## Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Heroku Docs**: https://devcenter.heroku.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Expo Docs**: https://docs.expo.dev
- **Cloudinary Docs**: https://cloudinary.com/documentation

---

## Troubleshooting

### Common Issues

**Backend won't start:**
- Check environment variables
- Verify MongoDB connection
- Check logs for errors

**Frontend can't connect:**
- Verify API URL
- Check CORS configuration
- Test API endpoints manually

**Images won't upload:**
- Verify Cloudinary credentials
- Check file size limits
- Test Cloudinary connection

---

## Next Steps After Deployment

1. **Monitor Performance**
   - Set up monitoring tools
   - Track errors and crashes
   - Monitor API response times

2. **Gather Feedback**
   - Beta testing
   - User feedback
   - Analytics review

3. **Iterate**
   - Fix bugs
   - Add features
   - Improve performance

4. **Scale**
   - Upgrade infrastructure as needed
   - Optimize database queries
   - Implement caching

---

**Congratulations on deploying Vanigan! 🚀**

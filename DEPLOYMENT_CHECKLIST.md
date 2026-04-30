# 🚀 Deployment Checklist - Vanigan App v1.1.0

## ✅ Pre-Deployment Checklist

### Code & Configuration
- [x] All code changes committed
- [x] All tests passing locally
- [x] ESLint checks passing
- [x] Dependencies updated
- [x] Security vulnerabilities addressed
- [x] Documentation updated
- [x] Version bumped to 1.1.0

### GitHub Configuration
- [ ] **CRITICAL**: Configure GitHub Secrets
  - [ ] `RENDER_DEPLOY_HOOK_URL`
  - [ ] `EXPO_TOKEN`
  - [ ] `SNYK_TOKEN` (optional)

### Backend Configuration
- [ ] Verify Render environment variables
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `CLOUDINARY_CLOUD_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_API_SECRET`
  - [ ] `NODE_ENV=production`

### Frontend Configuration
- [x] API URL updated to production
- [x] App version updated to 1.1.0
- [x] EAS Build configured

---

## 🔧 GitHub Secrets Setup

### 1. RENDER_DEPLOY_HOOK_URL

**Where to get it:**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your `vanigan-backend` service
3. Go to Settings → Deploy Hook
4. Copy the webhook URL

**How to add:**
```
1. Go to: https://github.com/maalik1729-blip/vanigan_app/settings/secrets/actions
2. Click "New repository secret"
3. Name: RENDER_DEPLOY_HOOK_URL
4. Value: [paste the webhook URL]
5. Click "Add secret"
```

### 2. EXPO_TOKEN

**Where to get it:**
```bash
# Login to Expo
npx expo login
# Username: ziya1729
# Password: Vanigan@1729

# Get token
npx eas whoami --json
# Copy the "accessToken" value
```

**How to add:**
```
1. Go to: https://github.com/maalik1729-blip/vanigan_app/settings/secrets/actions
2. Click "New repository secret"
3. Name: EXPO_TOKEN
4. Value: [paste the access token]
5. Click "Add secret"
```

### 3. SNYK_TOKEN (Optional - for advanced security scanning)

**Where to get it:**
1. Sign up at [Snyk.io](https://snyk.io/)
2. Go to Account Settings → API Token
3. Copy the token

**How to add:**
```
1. Go to: https://github.com/maalik1729-blip/vanigan_app/settings/secrets/actions
2. Click "New repository secret"
3. Name: SNYK_TOKEN
4. Value: [paste the Snyk token]
5. Click "Add secret"
```

---

## 🧪 Testing CI/CD Pipeline

### Test 1: Backend CI/CD
```bash
# Make a small change to backend
echo "// Test CI/CD" >> backend/server.js

# Commit and push
git add backend/server.js
git commit -m "Test: Backend CI/CD pipeline"
git push origin main

# Watch the pipeline:
# https://github.com/maalik1729-blip/vanigan_app/actions
```

**Expected Results:**
- ✅ Lint check passes
- ✅ Tests run successfully
- ✅ Security scan completes
- ✅ Build check passes
- ✅ Deployment triggers to Render

### Test 2: Frontend CI/CD
```bash
# Make a small change to frontend
echo "// Test CI/CD" >> frontend/App.js

# Commit and push
git add frontend/App.js
git commit -m "Test: Frontend CI/CD pipeline"
git push origin main

# Watch the pipeline:
# https://github.com/maalik1729-blip/vanigan_app/actions
```

**Expected Results:**
- ✅ Dependencies install
- ✅ Expo config validates
- ✅ Security scan completes
- ✅ Production APK build triggers

---

## 🔍 Verification Steps

### Backend Verification

1. **Check Deployment Status**
   ```
   Visit: https://vanigan-app.onrender.com
   Expected: API documentation JSON
   ```

2. **Test Health Endpoint**
   ```bash
   curl https://vanigan-app.onrender.com/health
   ```
   Expected response:
   ```json
   {
     "status": "OK",
     "message": "Vanigan API is running",
     "uptime": 12345.67,
     "timestamp": "2026-04-30T..."
   }
   ```

3. **Test Rate Limiting**
   ```bash
   # Make 6 rapid requests to auth endpoint
   for i in {1..6}; do
     curl -X POST https://vanigan-app.onrender.com/api/auth/login \
       -H "Content-Type: application/json" \
       -d '{"phone":"test","password":"test"}'
   done
   ```
   Expected: 6th request should be rate limited

4. **Check Security Headers**
   ```bash
   curl -I https://vanigan-app.onrender.com
   ```
   Expected headers:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `X-XSS-Protection: 0`
   - `Strict-Transport-Security: max-age=...`

### Frontend Verification

1. **Check EAS Build**
   ```
   Visit: https://expo.dev/accounts/ziya1729/projects/vanigan-app/builds
   Expected: Latest build with v1.1.0
   ```

2. **Download and Test APK**
   - Download latest APK
   - Install on Android device
   - Test login functionality
   - Test business listing
   - Verify API connection

---

## 📊 Monitoring Setup

### Backend Monitoring

1. **Render Dashboard**
   - Monitor: https://dashboard.render.com
   - Check: CPU, Memory, Response times
   - Set up: Email alerts for downtime

2. **MongoDB Atlas**
   - Monitor: https://cloud.mongodb.com
   - Check: Connection count, Query performance
   - Set up: Alerts for high usage

3. **Cloudinary**
   - Monitor: https://cloudinary.com/console
   - Check: Storage usage, Bandwidth
   - Set up: Usage alerts

### Optional: Sentry Setup (Recommended)

```bash
# Install Sentry
cd backend
npm install @sentry/node

# Add to server.js
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

---

## 🔄 Rollback Plan

### If Deployment Fails

**Backend Rollback:**
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or manual rollback in Render:
# 1. Go to Render Dashboard
# 2. Select service
# 3. Go to "Deploys"
# 4. Click "Rollback" on previous successful deploy
```

**Frontend Rollback:**
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or use previous APK:
# Download from: https://expo.dev/accounts/ziya1729/projects/vanigan-app/builds
```

---

## 📝 Post-Deployment Tasks

### Immediate (Within 1 hour)
- [ ] Verify backend is accessible
- [ ] Test all API endpoints
- [ ] Check error logs in Render
- [ ] Verify database connections
- [ ] Test mobile app with new backend

### Within 24 hours
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify CI/CD pipeline working
- [ ] Test automated deployments
- [ ] Review security scan results

### Within 1 week
- [ ] Write additional tests (target 80% coverage)
- [ ] Upgrade Expo to SDK 55+
- [ ] Implement Redis caching
- [ ] Set up Sentry monitoring
- [ ] Add Swagger documentation

---

## 🎯 Success Criteria

### Backend
- ✅ API responds within 500ms
- ✅ No 5xx errors
- ✅ Rate limiting working
- ✅ Security headers present
- ✅ Compression enabled
- ✅ CI/CD pipeline passing

### Frontend
- ✅ APK builds successfully
- ✅ App connects to backend
- ✅ All features working
- ✅ No crashes on startup
- ✅ Images loading from Cloudinary

### CI/CD
- ✅ Tests run automatically
- ✅ Linting checks pass
- ✅ Security scans complete
- ✅ Deployments trigger automatically
- ✅ Build notifications working

---

## 🚨 Troubleshooting

### Issue: CI/CD Pipeline Not Running

**Solution:**
1. Check GitHub Actions is enabled
2. Verify workflow files are in `.github/workflows/`
3. Check branch name matches trigger (main/develop)
4. Review GitHub Actions logs

### Issue: Deployment Not Triggering

**Solution:**
1. Verify `RENDER_DEPLOY_HOOK_URL` secret is set
2. Check Render deploy hook is active
3. Review GitHub Actions logs for errors
4. Manually trigger: `curl -X POST $RENDER_DEPLOY_HOOK_URL`

### Issue: APK Build Failing

**Solution:**
1. Verify `EXPO_TOKEN` secret is set
2. Check Expo account has active subscription
3. Review EAS Build logs
4. Verify `eas.json` configuration

### Issue: Rate Limiting Too Strict

**Solution:**
```javascript
// Adjust in backend/server.js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // Increase from 100
  // ...
});
```

---

## 📞 Emergency Contacts

### Services
- **Render Support**: https://render.com/support
- **MongoDB Atlas**: https://support.mongodb.com
- **Expo Support**: https://expo.dev/support
- **Cloudinary Support**: https://support.cloudinary.com

### Documentation
- **GitHub Actions**: https://docs.github.com/en/actions
- **Render Docs**: https://render.com/docs
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Jest Docs**: https://jestjs.io/

---

## ✅ Final Checklist

Before marking deployment as complete:

- [ ] All GitHub secrets configured
- [ ] Backend deployed and accessible
- [ ] Frontend APK built successfully
- [ ] CI/CD pipeline tested and working
- [ ] All API endpoints tested
- [ ] Mobile app tested on device
- [ ] Monitoring set up
- [ ] Documentation updated
- [ ] Team notified of deployment
- [ ] Rollback plan documented

---

## 🎉 Deployment Complete!

Once all items are checked:
1. Mark this deployment as successful
2. Update team on new features
3. Schedule next sprint planning
4. Begin work on remaining tasks

**Next Audit**: July 30, 2026

---

*Deployment checklist for Vanigan App v1.1.0*  
*Last updated: April 30, 2026*

# 📋 DigitalOcean Deployment Checklist

## Pre-Deployment Checklist

### Code Preparation
- [ ] All features tested locally
- [ ] All environment variables documented
- [ ] Build runs successfully (`npm run build`)
- [ ] No console errors in production build
- [ ] All API endpoints tested
- [ ] QR code system tested
- [ ] Attendance marking tested

### Appwrite Setup
- [ ] All collections created in Appwrite
- [ ] All attributes added to collections
- [ ] Collection IDs documented
- [ ] API key generated with correct permissions
- [ ] Storage buckets created (if needed)
- [ ] Database permissions configured

### GitHub Preparation
- [ ] All code committed
- [ ] Code pushed to main/master branch
- [ ] Repository is accessible
- [ ] README.md updated
- [ ] .gitignore configured
- [ ] No sensitive data in repository

### Environment Variables Ready
- [ ] NEXT_PUBLIC_APPWRITE_ENDPOINT
- [ ] NEXT_PUBLIC_APPWRITE_PROJECT_ID
- [ ] APPWRITE_API_KEY
- [ ] NEXT_PUBLIC_APPWRITE_DATABASE_ID
- [ ] All collection IDs
- [ ] JWT_SECRET generated
- [ ] Production URL decided

---

## DigitalOcean App Platform Deployment

### Step 1: Create App
- [ ] Logged into DigitalOcean
- [ ] Created new App
- [ ] Connected GitHub repository
- [ ] Selected correct branch
- [ ] Enabled auto-deploy

### Step 2: Configure App
- [ ] Set build command: `npm install && npm run build`
- [ ] Set run command: `npm start`
- [ ] Set HTTP port: 3000
- [ ] Selected appropriate plan
- [ ] Selected region (Frankfurt recommended)

### Step 3: Environment Variables
- [ ] Added all NEXT_PUBLIC_* variables
- [ ] Added APPWRITE_API_KEY (encrypted)
- [ ] Added JWT_SECRET (encrypted)
- [ ] Added NODE_ENV=production
- [ ] Double-checked all values
- [ ] No typos in variable names

### Step 4: Appwrite Configuration
- [ ] Added production domain to Appwrite platforms
- [ ] Updated CORS settings
- [ ] Tested API connection from production
- [ ] Verified permissions

### Step 5: Deploy
- [ ] Clicked "Create Resources"
- [ ] Monitored build logs
- [ ] Build completed successfully
- [ ] App started successfully
- [ ] No errors in runtime logs

### Step 6: Custom Domain (Optional)
- [ ] Added custom domain in App Platform
- [ ] Updated DNS records (CNAME)
- [ ] Waited for SSL provisioning
- [ ] SSL certificate active
- [ ] Updated NEXT_PUBLIC_APP_URL
- [ ] Updated Appwrite platform hostname

---

## DigitalOcean Droplet Deployment

### Step 1: Create Droplet
- [ ] Created Ubuntu 22.04 droplet
- [ ] Selected appropriate size (2GB+ RAM)
- [ ] Added SSH key
- [ ] Selected region
- [ ] Enabled backups (optional)

### Step 2: Initial Setup
- [ ] SSH access working
- [ ] System updated (`apt update && apt upgrade`)
- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Git installed
- [ ] Nginx installed
- [ ] Certbot installed

### Step 3: Application Setup
- [ ] Repository cloned to /opt/EduScan
- [ ] .env.production file created
- [ ] All environment variables added
- [ ] File permissions correct

### Step 4: Docker Setup
- [ ] Docker image built successfully
- [ ] Container running
- [ ] Application accessible on localhost:3000
- [ ] Logs show no errors

### Step 5: Nginx Configuration
- [ ] Nginx config created
- [ ] Config enabled
- [ ] Nginx restarted successfully
- [ ] Application accessible via domain/IP

### Step 6: SSL Setup
- [ ] DNS pointing to droplet
- [ ] Certbot SSL certificate obtained
- [ ] HTTPS working
- [ ] HTTP redirects to HTTPS
- [ ] Auto-renewal configured

### Step 7: Deployment Script
- [ ] deploy.sh script created
- [ ] Script is executable
- [ ] Script tested successfully
- [ ] Git webhook configured (optional)

---

## Post-Deployment Testing

### Basic Functionality
- [ ] Homepage loads correctly
- [ ] Can navigate to login page
- [ ] Admin can log in
- [ ] Dashboard loads
- [ ] Sidebar navigation works
- [ ] All pages accessible

### Admin Features
- [ ] Can create departments
- [ ] Can create courses
- [ ] Can create users
- [ ] Can update settings
- [ ] Can view analytics
- [ ] Can manage organization

### Session & QR Code System
- [ ] Can create new session
- [ ] QR code generates correctly
- [ ] QR code is downloadable
- [ ] QR code is scannable on mobile
- [ ] Scan redirects to correct URL
- [ ] Attendance form loads

### Attendance System
- [ ] Attendance form submits successfully
- [ ] Duplicate attendance prevented
- [ ] Time validation works (late threshold)
- [ ] Live dashboard shows attendance
- [ ] Auto-refresh works
- [ ] Statistics calculate correctly

### Mobile Testing
- [ ] Site responsive on mobile
- [ ] QR code scannable
- [ ] Attendance form usable on mobile
- [ ] No layout issues
- [ ] Touch interactions work

### Performance
- [ ] Pages load quickly (<3s)
- [ ] Images load properly
- [ ] No console errors
- [ ] API responses quick (<1s)
- [ ] Real-time updates work

---

## Monitoring Setup

### DigitalOcean Monitoring
- [ ] Metrics dashboard accessible
- [ ] Alerts configured
- [ ] Resource usage normal
- [ ] No crashes detected

### Application Monitoring
- [ ] Runtime logs accessible
- [ ] Error tracking works
- [ ] Can view real-time logs
- [ ] Log retention configured

### Appwrite Monitoring
- [ ] API usage within limits
- [ ] Database size monitored
- [ ] No rate limit issues
- [ ] Backups configured

---

## Security Checklist

### Application Security
- [ ] All secrets encrypted
- [ ] No sensitive data in logs
- [ ] HTTPS enforced
- [ ] JWT secret is strong
- [ ] API keys rotated (if needed)

### Server Security (Droplet only)
- [ ] Firewall configured
- [ ] Only required ports open (80, 443, 22)
- [ ] SSH key authentication only
- [ ] Root login disabled (recommended)
- [ ] Automatic security updates enabled

### Appwrite Security
- [ ] API key permissions minimal
- [ ] Collection permissions correct
- [ ] No public write access
- [ ] CORS properly configured

---

## Maintenance Plan

### Regular Tasks
- [ ] Weekly: Check application logs
- [ ] Weekly: Monitor resource usage
- [ ] Weekly: Test QR code system
- [ ] Monthly: Review Appwrite usage
- [ ] Monthly: Check for updates
- [ ] Monthly: Test backups

### Update Procedure
- [ ] Test updates locally first
- [ ] Push to GitHub
- [ ] Monitor deployment
- [ ] Test in production
- [ ] Rollback plan ready

### Backup Strategy
- [ ] Appwrite data backed up
- [ ] Droplet snapshots (if applicable)
- [ ] Database exports scheduled
- [ ] Recovery procedure documented

---

## Emergency Contacts

### Service Providers
- **DigitalOcean Support**: https://www.digitalocean.com/support
- **Appwrite Support**: https://discord.gg/appwrite
- **GitHub Support**: https://support.github.com

### Important URLs
- **Production App**: _________________
- **DigitalOcean Dashboard**: https://cloud.digitalocean.com
- **Appwrite Console**: https://cloud.appwrite.io
- **GitHub Repository**: _________________

---

## Rollback Procedure

### If Deployment Fails:

**App Platform**:
1. Go to app settings
2. Click "Rollback" to previous deployment
3. Monitor logs
4. Fix issues locally
5. Redeploy

**Droplet**:
1. SSH into droplet
2. Checkout previous commit: `git checkout <commit-hash>`
3. Run deployment script: `./deploy.sh`
4. Monitor logs
5. Fix issues and redeploy

---

## Success Criteria

Deployment is successful when:
- ✅ Application accessible via production URL
- ✅ All features working as expected
- ✅ QR code system fully functional on mobile devices
- ✅ No critical errors in logs
- ✅ Performance meets expectations
- ✅ SSL certificate valid
- ✅ Monitoring active
- ✅ Team can access and use the system

---

## Deployment Date: _______________

## Deployed By: _______________

## Production URL: _______________

## Notes:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Congratulations on your deployment!** 🎉

Remember to:
- Monitor logs regularly
- Keep dependencies updated
- Test QR codes on real devices
- Collect user feedback
- Plan for scaling


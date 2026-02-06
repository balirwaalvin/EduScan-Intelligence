# 🚀 DigitalOcean Deployment Guide - EduScan

## Date: February 6, 2026

---

## 📋 Prerequisites

Before deploying to DigitalOcean, ensure you have:

1. ✅ **GitHub Account** with your EduScan repository
2. ✅ **DigitalOcean Account** (sign up at https://digitalocean.com)
3. ✅ **Appwrite Project** fully configured
4. ✅ **All environment variables** ready
5. ✅ **Code pushed to GitHub** on main/master branch

---

## 🎯 Deployment Options

### Option 1: DigitalOcean App Platform (Recommended) ⭐

**Best for**: Quick deployment, automatic scaling, managed infrastructure

**Pros**:
- ✅ Automatic HTTPS/SSL
- ✅ Auto-deploy from GitHub
- ✅ Built-in CDN
- ✅ Easy environment variables
- ✅ Zero-downtime deployments
- ✅ Free tier available ($0-$5/month)

**Cons**:
- ❌ Less control over infrastructure
- ❌ Limited to App Platform features

### Option 2: DigitalOcean Droplet with Docker

**Best for**: Full control, custom configurations

**Pros**:
- ✅ Complete infrastructure control
- ✅ Can run multiple services
- ✅ SSH access
- ✅ Custom server configurations

**Cons**:
- ❌ Manual SSL setup required
- ❌ Manual deployment process
- ❌ More maintenance required
- ❌ Higher cost ($4-$6/month minimum)

---

## 🚀 OPTION 1: App Platform Deployment (RECOMMENDED)

### Step 1: Prepare Your Repository

1. **Ensure all code is pushed to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for DigitalOcean deployment"
   git push origin main
   ```

2. **Verify these files exist in your repository**:
   - ✅ `package.json` with build scripts
   - ✅ `next.config.js` with standalone output
   - ✅ `.env.production.example` (for reference)
   - ✅ `app.yaml` (optional, for configuration)

### Step 2: Create App on DigitalOcean

1. **Log into DigitalOcean**: https://cloud.digitalocean.com

2. **Navigate to App Platform**:
   - Click "Create" → "Apps"
   - Or go to: https://cloud.digitalocean.com/apps

3. **Connect GitHub Repository**:
   - Click "GitHub" as source
   - Authorize DigitalOcean to access your GitHub
   - Select your repository: `YOUR_USERNAME/EduScan`
   - Select branch: `main` (or `master`)
   - Check "Autodeploy" ✅
   - Click "Next"

### Step 3: Configure App Settings

1. **Edit App Resources**:
   - Resource Type: Web Service
   - Name: `eduscan-web`
   - Environment: Node.js
   - Build Command: `npm install && npm run build`
   - Run Command: `npm start`
   - HTTP Port: `3000`
   - HTTP Routes: `/` (root)

2. **Select Plan**:
   - Basic Plan: $5/month (Recommended for testing)
   - Professional: $12/month (For production)
   - Click "Next"

### Step 4: Add Environment Variables

Click "Edit" next to your web service, then go to "Environment Variables":

Add each variable (mark sensitive ones as "Encrypted"):

#### Required Public Variables:
```env
NEXT_PUBLIC_APP_URL=https://your-app-name.ondigitalocean.app
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=6980a2c2001d259c7a2a
NEXT_PUBLIC_APPWRITE_DATABASE_ID=6980bfd2002a2767d926
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users
NEXT_PUBLIC_APPWRITE_ATTENDANCE_COLLECTION_ID=attendance
NEXT_PUBLIC_APPWRITE_ORGANIZATIONS_COLLECTION_ID=organizations
NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID=sessions
NEXT_PUBLIC_APPWRITE_DEPARTMENTS_COLLECTION_ID=departments
NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID=courses
```

#### Required Secret Variables (Mark as Encrypted):
```env
APPWRITE_API_KEY=your-api-key-here
JWT_SECRET=your-jwt-secret-here
```

#### Optional Variables:
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
FREE_TRIAL_DAYS=24
```

**Important**: Replace placeholder values with your actual Appwrite credentials!

### Step 5: Update Appwrite Settings

1. **Add Production Domain to Appwrite**:
   - Go to Appwrite Console: https://cloud.appwrite.io
   - Select your project
   - Go to "Settings" → "Platforms"
   - Click "Add Platform" → "Web App"
   - Name: `EduScan Production`
   - Hostname: `your-app-name.ondigitalocean.app` (or your custom domain)
   - Click "Register"

2. **Update CORS Settings**:
   - Still in Settings
   - Make sure your production domain is allowed
   - Format: `https://your-app-name.ondigitalocean.app`

### Step 6: Deploy Your App

1. **Review Configuration**:
   - Double-check all environment variables
   - Verify build and run commands
   - Confirm region selection (Frankfurt recommended for Europe)

2. **Click "Create Resources"**:
   - DigitalOcean will start building your app
   - This takes 5-10 minutes for first deployment
   - Watch the build logs for any errors

3. **Monitor Deployment**:
   - Go to "Runtime Logs" tab
   - Check for any errors
   - Wait for "Build successful" message

### Step 7: Access Your Application

1. **Get Your URL**:
   - After deployment completes, you'll see your app URL
   - Format: `https://your-app-name.ondigitalocean.app`

2. **Test the Application**:
   - Visit the URL
   - Log in with admin credentials
   - Create a test session
   - Test QR code generation
   - Scan QR code with mobile device
   - Verify attendance marking works

### Step 8: Custom Domain (Optional)

1. **Add Custom Domain**:
   - In App Platform, go to "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain: `eduscan.yourdomain.com`

2. **Update DNS Records**:
   - Add CNAME record in your domain provider:
     ```
     Type: CNAME
     Name: eduscan (or @)
     Value: your-app-name.ondigitalocean.app
     TTL: 3600
     ```

3. **Update Environment Variables**:
   - Change `NEXT_PUBLIC_APP_URL` to your custom domain
   - Update Appwrite platform hostname

4. **Wait for SSL**:
   - DigitalOcean automatically provisions SSL certificate
   - Usually takes 5-15 minutes

---

## 🐳 OPTION 2: Droplet Deployment with Docker

### Step 1: Create Droplet

1. **Log into DigitalOcean**: https://cloud.digitalocean.com

2. **Create New Droplet**:
   - Click "Create" → "Droplets"
   - Choose image: Ubuntu 22.04 LTS
   - Choose plan: Basic $6/month (2GB RAM recommended)
   - Choose datacenter: Frankfurt (or nearest)
   - Authentication: SSH Key (recommended) or Password
   - Hostname: `eduscan-production`
   - Click "Create Droplet"

### Step 2: Connect to Droplet

```bash
# SSH into your droplet
ssh root@your-droplet-ip
```

### Step 3: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Install Git
apt install git -y

# Install Nginx (for reverse proxy)
apt install nginx -y

# Install Certbot (for SSL)
apt install certbot python3-certbot-nginx -y
```

### Step 4: Clone Repository

```bash
# Clone your repository
cd /opt
git clone https://github.com/YOUR_USERNAME/EduScan.git
cd EduScan
```

### Step 5: Configure Environment

```bash
# Create production environment file
nano .env.production

# Add all your environment variables (see Step 4 of Option 1)
# Save with Ctrl+X, then Y, then Enter
```

### Step 6: Build and Run with Docker

```bash
# Build Docker image
docker build -t eduscan:latest .

# Run container
docker run -d \
  --name eduscan \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  eduscan:latest

# Or use Docker Compose
docker-compose up -d
```

### Step 7: Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/eduscan

# Add this configuration:
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/eduscan /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

### Step 8: Setup SSL Certificate

```bash
# Get SSL certificate from Let's Encrypt
certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts and enter your email
# Choose option 2 to redirect HTTP to HTTPS

# Auto-renewal is set up automatically
# Test renewal with:
certbot renew --dry-run
```

### Step 9: Setup Auto-Deploy (Optional)

Create a deployment script:

```bash
nano /opt/deploy-eduscan.sh
```

Add:

```bash
#!/bin/bash
cd /opt/EduScan
git pull origin main
docker-compose down
docker-compose build
docker-compose up -d
echo "Deployment completed at $(date)"
```

Make executable:

```bash
chmod +x /opt/deploy-eduscan.sh
```

---

## 🔍 Troubleshooting

### Build Fails

**Check logs**:
```bash
# App Platform: Check "Runtime Logs" tab
# Droplet: docker logs eduscan
```

**Common issues**:
- ❌ Missing environment variables → Add all required vars
- ❌ Build timeout → Increase resources or simplify build
- ❌ npm install fails → Check package.json dependencies

### App Crashes

**Check**:
- Environment variables are correct
- Appwrite endpoint is reachable
- Database/collections exist
- API keys are valid

### QR Codes Not Working

**Check**:
- `NEXT_PUBLIC_APP_URL` matches your actual domain
- Appwrite platform includes your production domain
- CORS settings in Appwrite include your domain
- Mobile devices can access your domain

### SSL Certificate Issues

**For App Platform**:
- Automatic - wait 5-15 minutes
- Check domain DNS is pointing correctly

**For Droplet**:
- Run: `certbot --nginx -d your-domain.com`
- Check Nginx configuration
- Ensure ports 80 and 443 are open

---

## 📊 Monitoring & Maintenance

### App Platform

**View Metrics**:
- Go to your app → "Insights" tab
- Monitor CPU, Memory, Bandwidth
- Check response times

**View Logs**:
- "Runtime Logs" tab
- Real-time streaming
- Filter by severity

**Scaling**:
- Go to "Settings" → "Resources"
- Upgrade plan or add more instances
- Horizontal scaling supported

### Droplet

**Monitor Resources**:
```bash
# CPU and memory
htop

# Docker stats
docker stats eduscan

# Disk usage
df -h

# Application logs
docker logs -f eduscan
```

**Backups**:
- Enable automatic backups in DigitalOcean (20% extra cost)
- Or set up manual backup script

---

## 💰 Cost Estimates

### App Platform (Recommended)

| Plan | RAM | vCPU | Price/Month | Best For |
|------|-----|------|-------------|----------|
| Basic | 512MB | 1 | $5 | Testing |
| Basic | 1GB | 1 | $12 | Small production |
| Professional | 2GB | 1 | $24 | Medium production |
| Professional | 4GB | 2 | $48 | Large production |

**Additional Costs**:
- Bandwidth: First 1TB free
- Build minutes: Unlimited on paid plans

### Droplet + Docker

| Plan | RAM | vCPU | Storage | Price/Month |
|------|-----|------|---------|-------------|
| Basic | 1GB | 1 | 25GB | $6 |
| Basic | 2GB | 1 | 50GB | $12 |
| Basic | 2GB | 2 | 60GB | $18 |
| Basic | 4GB | 2 | 80GB | $24 |

**Additional Costs**:
- Backups: +20% of droplet cost
- Bandwidth: 1TB-2TB included

---

## 🎯 Post-Deployment Checklist

After successful deployment:

- [ ] ✅ Application accessible via production URL
- [ ] ✅ Admin login works
- [ ] ✅ Can create departments
- [ ] ✅ Can create courses
- [ ] ✅ Can create users
- [ ] ✅ Can create sessions
- [ ] ✅ QR codes generate correctly
- [ ] ✅ QR codes scannable on mobile devices
- [ ] ✅ Attendance form accessible via QR scan
- [ ] ✅ Attendance marking works
- [ ] ✅ Live dashboard updates
- [ ] ✅ Settings page works
- [ ] ✅ All API endpoints responding
- [ ] ✅ SSL certificate active (HTTPS)
- [ ] ✅ Custom domain configured (if applicable)
- [ ] ✅ Monitoring set up
- [ ] ✅ Backup strategy in place

---

## 🚀 Deployment Commands Summary

### Quick Deploy to App Platform
```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to production"
git push origin main

# 2. DigitalOcean auto-deploys from GitHub
# (if auto-deploy enabled)
```

### Quick Deploy to Droplet
```bash
# SSH into droplet
ssh root@your-droplet-ip

# Pull latest changes
cd /opt/EduScan
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d

# Check logs
docker logs -f eduscan
```

---

## 📞 Support

### DigitalOcean Resources
- Documentation: https://docs.digitalocean.com
- Community: https://www.digitalocean.com/community
- Support: https://www.digitalocean.com/support

### Appwrite Resources
- Documentation: https://appwrite.io/docs
- Discord: https://discord.gg/appwrite
- GitHub: https://github.com/appwrite/appwrite

---

## ✨ Status

**Files Created**: ✅ Complete  
**Configuration**: ✅ Ready  
**Documentation**: ✅ Complete  
**Ready to Deploy**: 🚀 YES

---

**Your EduScan application is ready for DigitalOcean deployment!** 🎉

Choose your deployment method and follow the steps above. App Platform (Option 1) is recommended for ease of use! 🚀


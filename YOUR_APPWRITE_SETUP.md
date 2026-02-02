# 🎯 Your EduScan Appwrite Setup - Personalized Guide

## ✅ Configuration Applied

Your Appwrite credentials have been configured:

- **Project ID:** `6980a2c2001d259c7a2a`
- **API Endpoint:** `https://fra.cloud.appwrite.io/v1` (Frankfurt region)
- **Configuration File:** `.env.local` ✅ Created

---

## 🚀 Next Steps - Quick Setup

### Step 1: Get Your API Key ⚠️ IMPORTANT

1. Go to your Appwrite Console: https://fra.cloud.appwrite.io/console
2. Select your project: **EduScan** (ID: 6980a2c2001d259c7a2a)
3. Go to **Settings** → **API Keys**
4. Click **Create API Key**
5. Name it: `EduScan Server Key`
6. Select these scopes:
   ```
   ✓ users.read
   ✓ users.write
   ✓ databases.read
   ✓ databases.write
   ✓ collections.read
   ✓ collections.write
   ✓ attributes.read
   ✓ attributes.write
   ✓ indexes.read
   ✓ indexes.write
   ✓ documents.read
   ✓ documents.write
   ✓ buckets.read
   ✓ buckets.write
   ✓ files.read
   ✓ files.write
   ```
   
   **Note:** If you don't see all these scopes, select these essential ones:
   ```
   ✓ databases.read
   ✓ databases.write
   ✓ users.read
   ✓ users.write
   ```
   
   The API key will inherit access to collections, documents, and files within databases.
7. Copy the API key (you'll only see it once!)
8. Update your `.env.local` file:
   ```env
   APPWRITE_API_KEY="paste-your-api-key-here"
   ```

---

### Step 2: Create Database (5 minutes)

#### A. Create Database

1. Go to **Databases** → **Create Database**
2. **Database ID:** `eduscan-database`
3. **Name:** EduScan Database
4. Click **Create**

#### B. Create Collections (follow this order)

##### Collection 1: Users
```
Collection ID: users
Name: Users

Attributes (click "Add Attribute" for each):
1. name (String, 255, Required)
2. email (Email, Required)
3. role (String, 50, Required)
4. organizationId (String, 255, Required)
5. profileImageId (String, 255, Optional)
6. phoneNumber (String, 20, Optional)
7. department (String, 100, Optional)
8. isActive (Boolean, Required, Default: true)
9. createdAt (DateTime, Required)
10. updatedAt (DateTime, Required)

Indexes (click "Add Index"):
1. email_idx → email (Unique)
2. organization_idx → organizationId
3. role_idx → role

Permissions:
- Create: Users
- Read: Users
- Update: Users
- Delete: Users
```

##### Collection 2: Attendance
```
Collection ID: attendance
Name: Attendance

Attributes:
1. userId (String, 255, Required)
2. organizationId (String, 255, Required)
3. sessionId (String, 255, Required)
4. checkInTime (DateTime, Required)
5. checkOutTime (DateTime, Optional)
6. method (String, 50, Required)
7. deviceId (String, 255, Optional)
8. latitude (Float, Optional)
9. longitude (Float, Optional)
10. status (String, 50, Required)
11. notes (String, 500, Optional)
12. createdAt (DateTime, Required)

Indexes:
1. user_idx → userId
2. organization_idx → organizationId
3. session_idx → sessionId
4. date_idx → checkInTime
5. status_idx → status

Permissions:
- Create: Users
- Read: Users
- Update: Users
- Delete: Users
```

##### Collection 3: Organizations
```
Collection ID: organizations
Name: Organizations

Attributes:
1. name (String, 255, Required)
2. email (Email, Required)
3. adminId (String, 255, Required)
4. plan (String, 50, Required)
5. trialEndsAt (DateTime, Optional)
6. subscriptionStatus (String, 50, Optional)
7. allowedMethods (String, 100, Optional) - Store as JSON string
8. autoCheckout (Boolean, Default: false)
9. lateThresholdMinutes (Integer, Default: 15)
10. timezone (String, 100, Default: "UTC")
11. createdAt (DateTime, Required)
12. updatedAt (DateTime, Required)

Indexes:
1. email_idx → email (Unique)
2. admin_idx → adminId
3. plan_idx → plan

Permissions:
- Create: Users
- Read: Users
- Update: Users
- Delete: Users
```

##### Collection 4: Sessions
```
Collection ID: sessions
Name: Sessions

Attributes:
1. organizationId (String, 255, Required)
2. name (String, 255, Required)
3. description (String, 1000, Optional)
4. startTime (DateTime, Required)
5. endTime (DateTime, Required)
6. location (String, 255, Optional)
7. capacity (Integer, Optional)
8. instructorId (String, 255, Optional)
9. status (String, 50, Required)
10. qrCodeId (String, 255, Optional)
11. requiresLocation (Boolean, Default: false)
12. allowedRadius (Float, Optional)
13. createdAt (DateTime, Required)
14. updatedAt (DateTime, Required)

Indexes:
1. organization_idx → organizationId
2. status_idx → status
3. date_idx → startTime
4. instructor_idx → instructorId

Permissions:
- Create: Users
- Read: Users
- Update: Users
- Delete: Users
```

##### Collection 5: Devices
```
Collection ID: devices
Name: Devices

Attributes:
1. organizationId (String, 255, Required)
2. name (String, 255, Required)
3. type (String, 50, Required)
4. deviceId (String, 255, Required)
5. location (String, 255, Optional)
6. isActive (Boolean, Default: true)
7. lastSeen (DateTime, Optional)
8. settings (String, 5000, Optional)
9. createdAt (DateTime, Required)
10. updatedAt (DateTime, Required)

Indexes:
1. organization_idx → organizationId
2. device_idx → deviceId (Unique)
3. type_idx → type

Permissions:
- Create: Users
- Read: Users
- Update: Users
- Delete: Users
```

---

### Step 3: Create Storage Buckets (2 minutes)

#### Bucket 1: Profile Images
```
1. Go to Storage → Create Bucket
2. Bucket ID: profile-images
3. Name: Profile Images
4. Max File Size: 5 MB
5. Allowed Extensions: jpg, jpeg, png, gif, webp
6. Compression: gzip
7. Encryption: Enabled
8. Antivirus: Enabled

Permissions:
- Create: Users
- Read: Any
- Update: Users
- Delete: Users
```

#### Bucket 2: QR Codes
```
1. Create Bucket
2. Bucket ID: qr-codes
3. Name: QR Codes
4. Max File Size: 2 MB
5. Allowed Extensions: png, jpg, jpeg, svg
6. Compression: gzip

Permissions:
- Create: Users
- Read: Any
- Update: Users
- Delete: Users
```

---

### Step 4: Configure Authentication (1 minute)

1. Go to **Auth** in Appwrite Console
2. Enable **Email/Password** authentication
3. Optional: Enable OAuth providers (Google, GitHub, etc.)

---

### Step 5: Test Your Setup (2 minutes)

Run your development server:
```bash
npm run dev
```

Test authentication with the React hook:
```typescript
import { useAuth } from '@/hooks/useAuth';

// In your component:
const { user, loading, login } = useAuth();

// Test login
await login('test@example.com', 'password');
```

---

## 🎯 Quick Commands Reference

### Test Database Connection
```typescript
import { databaseService } from '@/lib/services/database.service';

// Test creating an attendance record
const result = await databaseService.createAttendance({
  userId: 'test-user',
  organizationId: 'test-org',
  sessionId: 'test-session',
  checkInTime: new Date().toISOString(),
  method: 'qr',
  status: 'present'
});

console.log(result);
```

### Test Authentication
```typescript
import { authService } from '@/lib/services/auth.service';

// Register
await authService.register({
  email: 'admin@eduscan.com',
  password: 'SecurePass123!',
  name: 'Admin User'
});

// Login
await authService.login({
  email: 'admin@eduscan.com',
  password: 'SecurePass123!'
});
```

---

## ✅ Setup Checklist

### Configuration ✅
- [x] Project ID configured: 6980a2c2001d259c7a2a
- [x] API Endpoint set: https://fra.cloud.appwrite.io/v1
- [x] .env.local file created
- [ ] API Key generated and added to .env.local

### Database Setup
- [ ] Database created: eduscan-database
- [ ] Users collection created
- [ ] Attendance collection created
- [ ] Organizations collection created
- [ ] Sessions collection created
- [ ] Devices collection created
- [ ] All indexes created
- [ ] Permissions configured

### Storage Setup
- [ ] profile-images bucket created
- [ ] qr-codes bucket created
- [ ] Permissions configured

### Authentication
- [ ] Email/Password auth enabled
- [ ] OAuth providers enabled (optional)

### Testing
- [ ] Development server running
- [ ] Test user registered
- [ ] Test login working
- [ ] Test database write
- [ ] Test database read
- [ ] Test file upload

---

## 🆘 Troubleshooting

### Issue: "AppwriteException: Invalid API key"
**Solution:** Make sure you copied the entire API key and it has the correct scopes.

### Issue: "Collection not found"
**Solution:** Verify the collection ID in Appwrite Console matches the one in .env.local

### Issue: "Permission denied"
**Solution:** Check collection permissions - Users should have Create, Read, Update, Delete access.

### Issue: "Network request failed"
**Solution:** Your endpoint is https://fra.cloud.appwrite.io/v1 - make sure it's correctly set in .env.local

---

## 📚 Resources

- **Your Appwrite Console:** https://fra.cloud.appwrite.io/console
- **Full Setup Guide:** See `APPWRITE_SETUP_GUIDE.md`
- **Quick Reference:** See `APPWRITE_QUICK_REFERENCE.md`
- **Appwrite Docs:** https://appwrite.io/docs

---

## 🎉 You're Almost There!

1. ⚠️ **Generate API Key** (most important!)
2. Create database and collections (15 min)
3. Create storage buckets (2 min)
4. Test your setup
5. Start building! 🚀

**Need help?** Refer to `APPWRITE_SETUP_GUIDE.md` for detailed instructions with screenshots.

---

**Your Project:** EduScan
**Project ID:** 6980a2c2001d259c7a2a
**Region:** Frankfurt (fra)
**Status:** Ready to configure ✅

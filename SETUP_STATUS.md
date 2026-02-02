# ✅ Appwrite Configuration Complete!

## 🎉 Your Setup Status

### ✅ Configuration Complete
- **Project ID:** `6980a2c2001d259c7a2a`
- **API Endpoint:** `https://fra.cloud.appwrite.io/v1` (Frankfurt)
- **API Key:** ✅ Configured in `.env.local`
- **Environment File:** ✅ `.env.local` created and configured

---

## 📊 Current Configuration

```env
✅ NEXT_PUBLIC_APPWRITE_ENDPOINT="https://fra.cloud.appwrite.io/v1"
✅ NEXT_PUBLIC_APPWRITE_PROJECT_ID="6980a2c2001d259c7a2a"
✅ APPWRITE_API_KEY="standard_9fb48d3e..." (Configured)
✅ NEXT_PUBLIC_APPWRITE_DATABASE_ID="eduscan-database"
✅ Collection IDs configured
✅ Bucket IDs configured
```

---

## 🚀 Next Steps - Database Setup

### Step 1: Test Your Connection (Do This Now!)

```bash
npm run dev
```

The server should start without errors. If you see any Appwrite-related errors, check your API key.

---

### Step 2: Create Database (5 minutes)

Go to: https://fra.cloud.appwrite.io/console

#### A. Create Database
1. Click **Databases** (left sidebar)
2. Click **Create Database**
3. **Database ID:** `eduscan-database` (exactly as shown)
4. **Name:** EduScan Database
5. Click **Create**

---

### Step 3: Create Collections (15 minutes)

After creating the database, you need to create 5 collections. Here's the order:

#### Collection 1: **users**
```
1. Click "Create Collection"
2. Collection ID: users
3. Name: Users
4. Click "Create"

Then add these attributes (click "Add Attribute" for each):

STRING Attributes:
- name (Size: 255, Required ✓)
- email (Type: Email, Required ✓)
- role (Size: 50, Required ✓)
- organizationId (Size: 255, Required ✓)
- profileImageId (Size: 255, Optional)
- phoneNumber (Size: 20, Optional)
- department (Size: 100, Optional)

BOOLEAN Attributes:
- isActive (Required ✓, Default: true)

DATETIME Attributes:
- createdAt (Required ✓)
- updatedAt (Required ✓)

INDEXES (click "Add Index"):
- email_idx → Type: Key, Attribute: email, Order: ASC, Unique ✓
- organization_idx → Type: Key, Attribute: organizationId
- role_idx → Type: Key, Attribute: role

PERMISSIONS (Settings tab):
□ Create: Users
□ Read: Users
□ Update: Users
□ Delete: Users
```

#### Collection 2: **attendance**
```
Collection ID: attendance
Name: Attendance

STRING Attributes:
- userId (Size: 255, Required ✓)
- organizationId (Size: 255, Required ✓)
- sessionId (Size: 255, Required ✓)
- method (Size: 50, Required ✓)
- deviceId (Size: 255, Optional)
- status (Size: 50, Required ✓)
- notes (Size: 500, Optional)

DATETIME Attributes:
- checkInTime (Required ✓)
- checkOutTime (Optional)
- createdAt (Required ✓)

FLOAT Attributes:
- latitude (Optional)
- longitude (Optional)

INDEXES:
- user_idx → userId
- organization_idx → organizationId
- session_idx → sessionId
- date_idx → checkInTime
- status_idx → status

PERMISSIONS: Users (Create, Read, Update, Delete)
```

#### Collection 3: **organizations**
```
Collection ID: organizations
Name: Organizations

STRING Attributes:
- name (Size: 255, Required ✓)
- email (Type: Email, Required ✓)
- adminId (Size: 255, Required ✓)
- plan (Size: 50, Required ✓)
- subscriptionStatus (Size: 50, Optional)
- allowedMethods (Size: 100, Optional)
- timezone (Size: 100, Default: "UTC")

BOOLEAN Attributes:
- autoCheckout (Default: false)

INTEGER Attributes:
- lateThresholdMinutes (Default: 15)

DATETIME Attributes:
- trialEndsAt (Optional)
- createdAt (Required ✓)
- updatedAt (Required ✓)

INDEXES:
- email_idx → email (Unique ✓)
- admin_idx → adminId
- plan_idx → plan

PERMISSIONS: Users (Create, Read, Update, Delete)
```

#### Collection 4: **sessions**
```
Collection ID: sessions
Name: Sessions

STRING Attributes:
- organizationId (Size: 255, Required ✓)
- name (Size: 255, Required ✓)
- description (Size: 1000, Optional)
- location (Size: 255, Optional)
- instructorId (Size: 255, Optional)
- status (Size: 50, Required ✓)
- qrCodeId (Size: 255, Optional)

INTEGER Attributes:
- capacity (Optional)

BOOLEAN Attributes:
- requiresLocation (Default: false)

FLOAT Attributes:
- allowedRadius (Optional)

DATETIME Attributes:
- startTime (Required ✓)
- endTime (Required ✓)
- createdAt (Required ✓)
- updatedAt (Required ✓)

INDEXES:
- organization_idx → organizationId
- status_idx → status
- date_idx → startTime
- instructor_idx → instructorId

PERMISSIONS: Users (Create, Read, Update, Delete)
```

#### Collection 5: **devices**
```
Collection ID: devices
Name: Devices

STRING Attributes:
- organizationId (Size: 255, Required ✓)
- name (Size: 255, Required ✓)
- type (Size: 50, Required ✓)
- deviceId (Size: 255, Required ✓)
- location (Size: 255, Optional)
- settings (Size: 5000, Optional)

BOOLEAN Attributes:
- isActive (Default: true)

DATETIME Attributes:
- lastSeen (Optional)
- createdAt (Required ✓)
- updatedAt (Required ✓)

INDEXES:
- organization_idx → organizationId
- device_idx → deviceId (Unique ✓)
- type_idx → type

PERMISSIONS: Users (Create, Read, Update, Delete)
```

---

### Step 4: Create Storage Buckets (2 minutes)

#### Bucket 1: **profile-images**
```
1. Go to Storage (left sidebar)
2. Click "Create Bucket"
3. Bucket ID: profile-images
4. Name: Profile Images
5. Maximum File Size: 5000000 (5 MB)
6. Enabled: ✓
7. Compression: gzip
8. Encryption: ✓
9. Antivirus: ✓
10. File Extensions: jpg, jpeg, png, gif, webp

PERMISSIONS:
□ Create: Users
□ Read: Any
□ Update: Users
□ Delete: Users
```

#### Bucket 2: **qr-codes**
```
1. Create Bucket
2. Bucket ID: qr-codes
3. Name: QR Codes
4. Maximum File Size: 2000000 (2 MB)
5. File Extensions: png, jpg, jpeg, svg
6. Compression: gzip

PERMISSIONS:
□ Create: Users
□ Read: Any
□ Update: Users
□ Delete: Users
```

---

### Step 5: Test Everything! 🧪

After creating all collections and buckets, test your setup:

```typescript
// Test 1: Authentication
import { authService } from '@/lib/services/auth.service';

const result = await authService.register({
  email: 'admin@eduscan.com',
  password: 'SecurePass123!',
  name: 'Admin User'
});

console.log('Registration:', result);

// Test 2: Database
import { databaseService } from '@/lib/services/database.service';

const org = await databaseService.createOrganization({
  name: 'Test School',
  email: 'school@example.com',
  adminId: 'admin-user-id',
  plan: 'free'
});

console.log('Organization created:', org);

// Test 3: Storage
import { storageService } from '@/lib/services/storage.service';

// Upload a test file
const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
const upload = await storageService.uploadProfileImage(file);

console.log('File uploaded:', upload);
```

---

## ✅ Setup Checklist

### Configuration ✅
- [x] Project ID configured
- [x] API Endpoint configured
- [x] API Key configured
- [x] .env.local file created

### Database Setup ⏳
- [ ] Database created: `eduscan-database`
- [ ] Collection 1: `users` (with 10 attributes + 3 indexes)
- [ ] Collection 2: `attendance` (with 12 attributes + 5 indexes)
- [ ] Collection 3: `organizations` (with 13 attributes + 3 indexes)
- [ ] Collection 4: `sessions` (with 14 attributes + 4 indexes)
- [ ] Collection 5: `devices` (with 10 attributes + 3 indexes)

### Storage Setup ⏳
- [ ] Bucket: `profile-images` (5 MB max)
- [ ] Bucket: `qr-codes` (2 MB max)

### Testing ⏳
- [ ] Dev server running without errors
- [ ] Test user registration
- [ ] Test database write
- [ ] Test file upload

---

## 🎯 Quick Commands

### Start Development Server
```bash
npm run dev
```

### Test Authentication
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, login } = useAuth();
  
  const handleLogin = async () => {
    await login('test@example.com', 'password');
  };
}
```

### Test Database
```typescript
import { databaseService } from '@/lib/services/database.service';

const attendance = await databaseService.createAttendance({
  userId: 'user123',
  organizationId: 'org456',
  sessionId: 'session789',
  checkInTime: new Date().toISOString(),
  method: 'qr',
  status: 'present'
});
```

---

## 🆘 Troubleshooting

### "Invalid API key"
- Check that the key is correctly pasted in `.env.local`
- Restart dev server: `npm run dev`

### "Collection not found"
- Make sure collection IDs match exactly
- Check in Appwrite Console that collections are created

### "Permission denied"
- Go to collection Settings → Permissions
- Enable Create, Read, Update, Delete for "Users"

---

## 📚 Resources

- **Your Console:** https://fra.cloud.appwrite.io/console
- **Project Dashboard:** https://fra.cloud.appwrite.io/console/project-6980a2c2001d259c7a2a
- **Setup Guide:** `YOUR_APPWRITE_SETUP.md`
- **API Key Guide:** `APPWRITE_API_KEY_GUIDE.md`

---

## 🎉 You're Ready!

Your Appwrite configuration is complete! Now:

1. **Create the database and collections** (follow Step 2-3 above)
2. **Create storage buckets** (follow Step 4 above)
3. **Test your setup** (follow Step 5 above)
4. **Start building!** 🚀

---

**Status:** ✅ Configuration Complete - Ready to Create Database!
**Next Action:** Go to your Appwrite Console and create the database
**Time Required:** ~20 minutes for complete setup

---

Good luck! 🎊

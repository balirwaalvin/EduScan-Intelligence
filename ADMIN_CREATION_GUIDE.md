# 🎉 Admin Account Creation - Ready!

## ✅ Everything is Set Up!

Your development server is already running on port 3002.

---

## 🚀 Create Admin Account (2 Methods)

### Method 1: Using Web Interface (Recommended) 🌐

1. **Open your browser** and go to:
   ```
   http://localhost:3002/create-admin.html
   ```

2. **Click the button:** "✨ Create Admin Account"

3. **Wait for confirmation** - You should see:
   - ✅ Success message
   - User ID
   - Organization ID
   - Login link

4. **Login at:** http://localhost:3002/login
   - Email: `admin@edu-scan.app`
   - Password: `admin123`

---

### Method 2: Using API Directly 🔧

Use curl or Postman to call:

```bash
curl -X POST http://localhost:3002/api/setup/create-admin
```

Or use this in your browser console:
```javascript
fetch('/api/setup/create-admin', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📋 Admin Account Details

```
Email:     admin@edu-scan.app
Password:  admin123
Name:      System Administrator
Plan:      Enterprise
Access:    Full system access
```

---

## 🔍 What Happens When You Create the Account

The script will:

1. **Register User** with Appwrite Auth
   - Email: admin@edu-scan.app
   - Password: admin123
   - Name: System Administrator

2. **Login** to get session

3. **Create Organization** in database
   - Name: EduScan Admin
   - Plan: Enterprise
   - Allowed Methods: QR, RFID, Facial Recognition
   - Admin ID: Linked to the user

4. **Return Success** with User ID and Organization ID

---

## ✅ Expected Result

### Success Response:
```json
{
  "success": true,
  "message": "Admin account created successfully!",
  "data": {
    "user": {
      "id": "user-id-here",
      "email": "admin@edu-scan.app",
      "name": "System Administrator"
    },
    "organization": {
      "id": "org-id-here",
      "name": "EduScan Admin",
      "plan": "enterprise"
    }
  }
}
```

---

## 🆘 Troubleshooting

### Issue: "User already exists"
**Solution:** The account has already been created. You can login directly:
- Go to: http://localhost:3002/login
- Use the credentials above

### Issue: "Collection not found"
**Solution:** Make sure you created all collections in Appwrite Console:
- users
- organizations
- attendance
- sessions
- devices

### Issue: "Permission denied"
**Solution:** Check collection permissions in Appwrite Console:
- Go to each collection → Settings → Permissions
- Enable: Create, Read, Update, Delete for "Users"

### Issue: "Invalid API key"
**Solution:** Check your `.env.local` file:
- Verify `APPWRITE_API_KEY` is correct
- Restart dev server: Stop and run `npm run dev` again

---

## 📊 Verify in Appwrite Console

After creating the admin account, you can verify in your Appwrite Console:

1. **Go to:** https://fra.cloud.appwrite.io/console

2. **Check Auth:**
   - Auth → Users
   - You should see: admin@edu-scan.app

3. **Check Database:**
   - Databases → eduscan-database → organizations
   - You should see: EduScan Admin organization

---

## 🎯 Next Steps After Creating Admin

1. **Login to Dashboard**
   - Go to: http://localhost:3002/login
   - Use admin credentials

2. **Test Features:**
   - Create test users
   - Create sessions
   - Test attendance tracking
   - Upload profile images

3. **Add More Users:**
   - Instructors
   - Students
   - Other admins

4. **Configure Organization:**
   - Set up departments
   - Configure attendance methods
   - Add devices

---

## 🔐 Security Note

⚠️ **IMPORTANT:** Change the admin password after first login!

The default password `admin123` is for initial setup only. Change it to a secure password through the dashboard.

---

## 📁 Files Created

- ✅ `/api/setup/create-admin/route.ts` - API endpoint
- ✅ `/public/create-admin.html` - Web interface
- ✅ `create-admin.ts` - CLI script (alternative)

---

## 🎊 You're Ready to Go!

**Server Status:** ✅ Running on port 3002

**Next Action:** Open http://localhost:3002/create-admin.html and click the button!

---

**Happy Testing!** 🚀

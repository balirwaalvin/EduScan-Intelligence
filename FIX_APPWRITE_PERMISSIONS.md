# 🔧 Fix Appwrite Permissions Error

## ⚠️ **Current Error**

```
app.6980a2c2001d259c7a2a@service.fra.cloud.appwrite.io 
(role: applications) missing scopes (["documents.write"])
```

**What this means:** Your API key doesn't have permission to create documents in the database.

---

## ✅ **Solution: Update API Key Scopes**

Follow these steps to grant the required permissions:

### **Step 1: Access Appwrite Console**

1. Go to: **https://cloud.appwrite.io/console**
2. Login to your account
3. Select your project: **EduScan** (ID: `6980a2c2001d259c7a2a`)

---

### **Step 2: Navigate to API Keys**

1. In the left sidebar, click **"Settings"** (gear icon at bottom)
2. Click **"API Keys"** in the settings menu
3. Find your current API key (starts with `standard_9fb48d3e...`)
4. Click on the API key to view/edit it

---

### **Step 3: Update Scopes/Permissions**

You need to enable the following scopes:

#### **Required Scopes for Users Management:**
- ✅ `documents.read` - Read documents
- ✅ `documents.write` - Create/update documents (MISSING - need to add this!)
- ✅ `collections.read` - Read collections
- ✅ `databases.read` - Read databases
- ✅ `users.read` - Read users
- ✅ `users.write` - Create/update users

#### **Recommended Additional Scopes:**
- ✅ `sessions.write` - Manage sessions
- ✅ `sessions.read` - Read sessions
- ✅ `files.read` - Read files (for future features)
- ✅ `files.write` - Upload files (for future features)

---

### **Step 4: Save Changes**

1. Check all the required scopes listed above
2. Scroll down and click **"Update"** or **"Save"**
3. The API key permissions will be updated immediately

---

## 🔄 **Alternative: Create New API Key (Recommended)**

If you can't find the existing key or want a fresh start:

### **Create New API Key with All Permissions:**

1. Go to **Settings → API Keys** in Appwrite Console
2. Click **"Create API Key"** button
3. **Name:** `EduScan Server Key`
4. **Expiration:** Never (or set your preferred expiration)
5. **Select ALL relevant scopes:**

   #### **Essential Scopes to Enable:**
   ```
   ✅ databases.read
   ✅ databases.write
   ✅ collections.read
   ✅ collections.write
   ✅ documents.read
   ✅ documents.write       ← THIS IS THE MISSING ONE!
   ✅ users.read
   ✅ users.write
   ✅ sessions.read
   ✅ sessions.write
   ✅ files.read
   ✅ files.write
   ```

6. Click **"Create"**
7. **COPY THE API KEY** - you won't see it again!

---

## 📝 **Update Your .env.local File**

Once you have the new/updated API key:

1. Open: `E:\JetBrains\EduScan\.env.local`
2. Replace the `APPWRITE_API_KEY` value with your new key:

```env
APPWRITE_API_KEY="your_new_api_key_with_all_scopes"
```

3. **Save the file**
4. **Restart your development server:**
   ```powershell
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

---

## 🧪 **Test the Fix**

After updating the API key and restarting:

1. Go to: `http://localhost:3002/dashboard/admin/users`
2. Click **"Add User"** button
3. Fill in the form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Role: Student
4. Click **"Create User"**
5. ✅ **Success!** - User should be created without errors

---

## 🎯 **Why This Happened**

When you created the API key initially, you might have:
- Not selected all required scopes
- Only selected "Files" and "Documents" scopes (as mentioned earlier)
- Missed the `documents.write` checkbox

The API key needs **explicit permission** for each operation type.

---

## 📋 **Complete Scopes Checklist**

For full EduScan functionality, your API key should have:

### **Database Operations:**
- [x] `databases.read`
- [x] `databases.write`
- [x] `collections.read`
- [x] `collections.write`
- [x] `attributes.read`
- [x] `attributes.write`
- [x] `indexes.read`
- [x] `indexes.write`

### **Document Operations:**
- [x] `documents.read`
- [x] `documents.write` ← **Critical for user creation!**

### **User Management:**
- [x] `users.read`
- [x] `users.write`

### **Sessions:**
- [x] `sessions.read`
- [x] `sessions.write`

### **Storage (Optional for now):**
- [x] `files.read`
- [x] `files.write`
- [x] `buckets.read`
- [x] `buckets.write`

---

## ⚡ **Quick Fix Summary**

1. **Go to Appwrite Console** → Settings → API Keys
2. **Edit your existing key** or create new one
3. **Enable `documents.write` scope** (and all others from checklist)
4. **Copy the key** (if creating new)
5. **Update `.env.local`** with new key
6. **Restart dev server**: `npm run dev`
7. **Test user creation** - should work now!

---

## 🆘 **Still Having Issues?**

If you continue to see the error after following these steps:

### **Check 1: Environment Variable**
```powershell
# Verify the API key is loaded
Write-Host $env:APPWRITE_API_KEY
```

### **Check 2: Server Restart**
Make sure you completely stopped and restarted the dev server.

### **Check 3: API Key Format**
The key should start with `standard_` or similar prefix and be very long.

### **Check 4: Browser Cache**
- Clear browser cache
- Hard refresh: `Ctrl + Shift + R`
- Or use incognito mode

---

## ✅ **Expected Result**

After fixing the permissions, you should be able to:
- ✅ Create users successfully
- ✅ Edit existing users
- ✅ Delete users
- ✅ Create departments
- ✅ Create courses
- ✅ Create sessions
- ✅ View analytics
- ✅ All CRUD operations work

---

**Follow the steps above to grant your API key the required permissions!** 🚀

*Note: The API key permissions can be updated at any time without breaking existing functionality.*

# 🔑 Appwrite API Key Scopes - Visual Guide

## What You Should See in Your Console

When creating an API key in Appwrite Console (https://fra.cloud.appwrite.io/console), here's what to select:

---

## ✅ Required Scopes for EduScan

### Essential Scopes (Select ALL of these)

#### 1. **Users** (for authentication and user management)
```
✓ users.read       - Read user data
✓ users.write      - Create and update users
```

#### 2. **Databases** (for all database operations)
```
✓ databases.read   - Read database information
✓ databases.write  - Create and modify databases
```

#### 3. **Collections** (if available)
```
✓ collections.read  - Read collection information
✓ collections.write - Create and modify collections
```

#### 4. **Attributes** (if available)
```
✓ attributes.read   - Read collection attributes
✓ attributes.write  - Create and modify attributes
```

#### 5. **Indexes** (if available)
```
✓ indexes.read      - Read collection indexes
✓ indexes.write     - Create and modify indexes
```

#### 6. **Documents** (if available)
```
✓ documents.read    - Read documents from collections
✓ documents.write   - Create, update, delete documents
```

#### 7. **Buckets** (for storage)
```
✓ buckets.read      - Read bucket information
✓ buckets.write     - Create and modify buckets
```

#### 8. **Files** (for file uploads)
```
✓ files.read        - Read and download files
✓ files.write       - Upload and delete files
```

---

## 🎯 What If Some Scopes Are Missing?

Depending on your Appwrite version, you might only see these main scopes:

### Minimum Required Scopes:
```
✓ users.read
✓ users.write
✓ databases.read
✓ databases.write
```

**Why these are enough:**
- `databases.read` and `databases.write` automatically grant access to:
  - Collections
  - Documents
  - Attributes
  - Indexes
- Storage (buckets and files) might be separate or included

---

## 🔍 Alternative Scope Names

In some Appwrite versions, you might see these instead:

### Version 1.4+
```
✓ databases.read
✓ databases.write
✓ users.read
✓ users.write
✓ storage.read     (instead of files.read + buckets.read)
✓ storage.write    (instead of files.write + buckets.write)
```

### Version 1.5+
```
All operations might be under:
✓ databases.*      (all database operations)
✓ users.*          (all user operations)
✓ storage.*        (all storage operations)
```

---

## 📸 Visual Checklist

When you're in the Appwrite Console → Settings → API Keys → Create API Key:

### Step-by-Step:
1. **Name your key:** `EduScan Server Key`

2. **Expiration:** Never (or set to a far future date)

3. **Scopes Section - Look for these categories:**

   **👥 Users:**
   - [x] read
   - [x] write

   **🗄️ Databases:**
   - [x] read
   - [x] write

   **📦 Storage (or Buckets + Files):**
   - [x] read
   - [x] write

4. **Generate Key** button

5. **Copy the entire key** (it starts with a long string of characters)

---

## ⚠️ Common Issues & Solutions

### Issue 1: "I only see 'databases.read' and 'databases.write'"
**✅ This is FINE!** These scopes include:
- Collections access
- Documents access
- Attributes management
- Indexes management

### Issue 2: "I don't see 'documents' or 'files' as separate scopes"
**✅ This is NORMAL in newer versions!** They're included in:
- `databases.write` for documents
- `storage.write` or `buckets.write` for files

### Issue 3: "Should I select 'All Scopes'?"
**⚠️ NOT RECOMMENDED for production**, but OK for development:
- Select "All Scopes" or "*" only for testing
- For production, only select what you need

### Issue 4: "The API key isn't working"
**Check these:**
1. Did you copy the entire key? (They're very long)
2. Did you save it in `.env.local` correctly?
3. Did you restart your dev server after updating `.env.local`?
4. Is the key expired?

---

## 🎯 Final Recommended Selection

### For Development (Safe & Complete):
```
✓ users.read
✓ users.write
✓ databases.read
✓ databases.write

If available also select:
✓ collections.read
✓ collections.write
✓ documents.read
✓ documents.write
✓ buckets.read
✓ buckets.write
✓ files.read
✓ files.write
```

### For Production (Minimal):
```
✓ databases.read
✓ databases.write
✓ users.read
✓ users.write
```

---

## 📋 After Creating the Key

1. **Copy the key immediately** - You won't see it again!

2. **Paste it in your `.env.local` file:**
   ```env
   APPWRITE_API_KEY="standard_1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz"
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

4. **Test the connection:**
   ```typescript
   import { authService } from '@/lib/services/auth.service';
   
   // Try registering a test user
   const result = await authService.register({
     email: 'test@example.com',
     password: 'Test123!',
     name: 'Test User'
   });
   
   console.log(result); // Should show success: true
   ```

---

## 🆘 Still Having Issues?

### Check Your Console:
1. Go to: https://fra.cloud.appwrite.io/console
2. Open your project: EduScan (6980a2c2001d259c7a2a)
3. Go to: Settings → API Keys
4. Find your key: "EduScan Server Key"
5. Click on it to see the scopes
6. Verify the scopes are enabled

### Regenerate if Needed:
If your key isn't working:
1. Delete the old key
2. Create a new one with the same scopes
3. Copy the new key
4. Update `.env.local`
5. Restart dev server

---

## ✅ Success Indicators

You'll know your API key is working when:
- ✓ No console errors about "Invalid API key"
- ✓ You can register users
- ✓ You can create documents in collections
- ✓ You can upload files to storage
- ✓ No "Permission denied" errors

---

**Your Project:** EduScan
**Project ID:** 6980a2c2001d259c7a2a
**Console URL:** https://fra.cloud.appwrite.io/console
**Status:** Ready to create API key! 🔑

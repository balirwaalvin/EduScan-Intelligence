# ✅ Courses Collection Setup Guide

## 🎓 **Create Courses Collection in Appwrite**

### **Problem:**
```
Invalid document structure: Missing required attribute "email"
```

**Issue:** The courses API was trying to use the `ORGANIZATIONS` collection (which requires an `email` field), but courses don't have emails. Courses need their own dedicated collection.

---

## 🔧 **Solution Applied**

I've updated the code to use a dedicated `COURSES` collection. Now you need to create it in Appwrite Console.

---

## 📋 **Steps to Create Courses Collection**

### **1. Go to Appwrite Console**
- Visit: **https://cloud.appwrite.io/console**
- Login and select your **EduScan** project
- Navigate to **Databases** → Select your database (`6980bfd2002a2767d926`)

### **2. Create New Collection**
- Click **"Create Collection"**
- **Collection ID:** `courses`
- **Collection Name:** `Courses`
- Click **Create**

### **3. Add Required Attributes**

Click **"Add Attribute"** for each field:

#### **Required Attributes:**
1. **name** (String, 255, Required)
   - Course name (e.g., "Introduction to Computer Science")

2. **code** (String, 50, Required)
   - Course code (e.g., "CS101")

3. **organizationId** (String, 255, Required)
   - Link to organization

4. **createdAt** (DateTime, Required)
   - Creation timestamp

5. **updatedAt** (DateTime, Required)
   - Last update timestamp

#### **Optional Attributes:**
6. **description** (String, 1000, Optional)
   - Course description

7. **departmentId** (String, 255, Optional)
   - Link to department

8. **credits** (Integer, Optional)
   - Course credits (e.g., 3)

9. **teacherId** (String, 255, Optional)
   - Link to teacher/instructor

### **4. Create Indexes**

Click **"Add Index"** for each:

1. **organization_idx**
   - Attribute: `organizationId`
   - Type: Key

2. **department_idx**
   - Attribute: `departmentId`
   - Type: Key

3. **code_idx**
   - Attribute: `code`
   - Type: Key

### **5. Set Permissions**

- **Create:** Users
- **Read:** Users
- **Update:** Users
- **Delete:** Users

---

## ✅ **Code Changes Made**

### **1. Environment Variables (`.env.local`)**
```env
NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID="courses"
```

### **2. Appwrite Config (`src/lib/appwrite.ts`)**
```typescript
export const COLLECTIONS = {
  // ...existing collections...
  COURSES: process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
};
```

### **3. Courses API (`src/app/api/courses/route.ts`)**
- Changed from `COLLECTIONS.ORGANIZATIONS` to `COLLECTIONS.COURSES`
- Added proper field mapping (name, code, description, etc.)
- Added `updatedAt` timestamp on updates
- Clean CRUD operations

---

## 🚀 **After Creating Collection**

1. **Restart dev server:**
   ```powershell
   .\clean-restart.bat
   ```

2. **Navigate to Courses page:**
   ```
   http://localhost:3002/dashboard/admin/courses
   ```

3. **Click "Add Course"**

4. **Fill in:**
   - Course Name: Introduction to Computer Science
   - Course Code: CS101
   - Description: (optional)

5. **Click "Create"**

6. ✅ **Should work!**

---

## 📊 **Data Structure**

When you create a course, this data is stored:

```json
{
  "name": "Introduction to Computer Science",
  "code": "CS101",
  "description": "Learn programming fundamentals",
  "organizationId": "user-org-id",
  "departmentId": "",
  "createdAt": "2026-02-03T10:30:00Z",
  "updatedAt": "2026-02-03T10:30:00Z"
}
```

---

## 🎯 **Benefits**

**Before (Using ORGANIZATIONS):**
- ❌ Courses mixed with organizations
- ❌ Required email field (doesn't make sense for courses)
- ❌ Confusing data structure

**After (Dedicated COURSES collection):**
- ✅ Clean separation of concerns
- ✅ Only relevant fields
- ✅ Proper data modeling
- ✅ Easy to query and manage

---

## 🔍 **Verification**

After creating the collection:

1. Check Appwrite Console → Databases → Your Database → Collections
2. You should see a **"Courses"** collection
3. It should have all the attributes listed above
4. Try creating a course from the dashboard

---

## 💡 **Quick Reference**

| Field | Type | Required | Example |
|-------|------|----------|---------|
| name | String | Yes | "Intro to CS" |
| code | String | Yes | "CS101" |
| description | String | No | "Learn programming..." |
| organizationId | String | Yes | Auto-set |
| departmentId | String | No | Department link |
| createdAt | DateTime | Yes | Auto-set |
| updatedAt | DateTime | Yes | Auto-set |

---

## ✅ **Status**

- ✅ Code updated to use COURSES collection
- ✅ Environment variable added
- ✅ API routes updated
- ✅ Frontend already compatible
- ⏳ **You need to:** Create the collection in Appwrite Console

---

**Once you create the Courses collection in Appwrite, course creation will work perfectly!** 🎓

*All code changes are committed and pushed to GitHub.*  
*Just create the collection and restart the server!*

---

**Date Fixed:** February 3, 2026  
**Status:** ✅ Code Complete - Awaiting Appwrite Collection Creation

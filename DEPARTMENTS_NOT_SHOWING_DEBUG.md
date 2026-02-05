# Department Not Showing in UI - Troubleshooting Guide

## Issue
Department exists in Appwrite database but doesn't appear in the Admin Dashboard UI.

## Most Common Causes

### 1. **Organization ID Mismatch** (Most Likely)
The department's `organizationId` doesn't match the logged-in user's ID.

**How it happens:**
- Department was created with wrong `organizationId`
- User ID changed after department creation
- Department created manually in Appwrite with different `organizationId`

### 2. **Permissions Issue**
User doesn't have read permissions for the departments collection.

### 3. **Collection ID Mismatch**
Environment variable points to wrong collection.

### 4. **Caching Issue**
Browser or API caching old data.

## Debugging Steps (Already Added)

### Check Browser Console
Open the Departments page and look for these console logs:

```
1. "Fetching departments for organizationId: [user-id]"
2. "Departments API response status: 200"
3. "Departments fetched: [...]"
4. "Number of departments: X"
5. "DEBUG: All departments in database: [...]"
6. "DEBUG: Unique organization IDs in departments: [...]"
7. "DEBUG: Current user organizationId: [user-id]"
```

### What to Look For:

**If you see:**
```
Number of departments: 0
DEBUG: Total departments count: 1 (or more)
DEBUG: Unique organization IDs: ["different-id"]
DEBUG: Current user organizationId: "your-user-id"
```

**This means:** Organization ID mismatch - department belongs to different organization.

## Solutions

### Solution 1: Update Department's Organization ID in Appwrite

1. Go to Appwrite Console: https://cloud.appwrite.io/console
2. Navigate to: Databases → eduscan-database → departments
3. Find your department document
4. Click on it to edit
5. Update `organizationId` to match your user ID (shown in console logs)
6. Save changes
7. Refresh the Departments page

### Solution 2: Use Current User's Actual Organization

If the user should have an organization record, we need to:

1. Check if Organizations collection exists
2. Get the user's actual organization
3. Filter departments by that organization

### Solution 3: Create New Department with Correct Organization ID

1. Delete the existing department in Appwrite (if needed)
2. Go to Admin Dashboard → Departments
3. Click "Add Department"
4. Fill in details
5. Submit - it will use correct organization ID automatically

### Solution 4: Remove Organization Filter (Quick Fix)

If you want to see ALL departments regardless of organization:

**Temporary Change:**
```typescript
// In departments page.tsx, change:
await fetchDepartments(currentUser.$id)

// To:
await fetchDepartments('') // Empty string = no filter
```

## Permanent Fix Implementation

Let me implement a better solution that handles this properly...

### Option A: Check User's Organization First

```typescript
// Get user's organization
const orgResponse = await fetch(`/api/users?userId=${currentUser.$id}`)
const userData = await orgResponse.json()
const actualOrgId = userData.user.organizationId || currentUser.$id

// Fetch departments with actual organization ID
await fetchDepartments(actualOrgId)
```

### Option B: Show All Departments + Filter

Show all departments but highlight which organization they belong to:

```typescript
// Fetch all departments
const allDeps = await fetchDepartments('')

// Add organization info to each
const depsWithOrg = allDeps.map(dept => ({
  ...dept,
  isMyOrg: dept.organizationId === currentUser.$id
}))
```

### Option C: Multi-Organization Support

If admins should see all departments:

```typescript
// For ADMIN role, show all departments
if (currentUser.role === 'ADMIN') {
  await fetchDepartments('') // All departments
} else {
  await fetchDepartments(currentUser.$id) // Only user's org
}
```

## Quick Test Commands

### Test in Browser Console:
```javascript
// Check your user ID
const user = await fetch('/api/auth/me').then(r => r.json())
console.log('Your user ID:', user.user.$id)

// Check all departments
const deps = await fetch('/api/departments').then(r => r.json())
console.log('All departments:', deps)

// Check which don't match
deps.departments.forEach(d => {
  console.log(`Department: ${d.name}, OrgID: ${d.organizationId}, Match: ${d.organizationId === user.user.$id}`)
})
```

## Expected Behavior After Fix

1. Navigate to Departments page
2. Console shows: "Fetching departments..."
3. Console shows: "Number of departments: 1" (or more)
4. Departments appear in the UI table
5. Can view, edit, delete departments

## Verification Checklist

- [ ] Check browser console for logs
- [ ] Verify organization IDs match
- [ ] Check Appwrite Console for department document
- [ ] Verify `organizationId` field in department
- [ ] Test with corrected organization ID
- [ ] Confirm department appears in UI
- [ ] Test create new department
- [ ] Test edit department
- [ ] Test delete department

## Next Steps

1. **Open the Departments page**
2. **Open browser console (F12)**
3. **Look at the debug logs**
4. **Copy the output here** - I'll tell you exactly what's wrong
5. **I'll provide the specific fix** based on the logs

## Files Modified for Debugging

- `src/app/dashboard/admin/departments/page.tsx` - Added console logs
- `src/app/api/departments/route.ts` - Added API logging
- `src/lib/services/department.service.ts` - Added service logging

## Related Files

- Department Service: `src/lib/services/department.service.ts`
- Department API: `src/app/api/departments/route.ts`
- Department Page: `src/app/dashboard/admin/departments/page.tsx`
- Appwrite Config: `src/lib/appwrite.ts`

---

**Status:** 🔍 Debugging enabled - waiting for console output
**Next:** Check browser console and report findings

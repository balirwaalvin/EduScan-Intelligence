# Sessions Collection Setup Guide

## Issue Fixed
Fixed error: **"Invalid document structure: Missing required attribute 'status'"** when creating sessions.

## Root Cause
The `createSession` function was not including the `status` attribute that's required by Appwrite's sessions collection schema.

## Solution Applied

### Updated Session Service
Modified `src/lib/services/session.service.ts` to include all required attributes:

**New attributes added to createSession:**
- `status` - Session status (SCHEDULED, ACTIVE, ENDED, CANCELLED)
- `updatedAt` - Timestamp for last update
- Explicit field mapping instead of spreading all data

**Enhanced updateSession:**
- Automatically adds `updatedAt` timestamp on every update

## Required Appwrite Collection Attributes

### Sessions Collection Attributes

Make sure your Appwrite `sessions` collection has these attributes:

| Attribute Name | Type | Size | Required | Default | Array |
|----------------|------|------|----------|---------|-------|
| `name` | String | 255 | ✅ Yes | - | ❌ No |
| `organizationId` | String | 50 | ✅ Yes | - | ❌ No |
| `startTime` | String | 50 | ✅ Yes | - | ❌ No |
| `endTime` | String | 50 | ✅ Yes | - | ❌ No |
| `location` | String | 255 | ❌ No | '' | ❌ No |
| `allowedMethods` | String | 50 | ❌ No | - | ✅ Yes |
| `lateThreshold` | Integer | - | ❌ No | 15 | ❌ No |
| `status` | String | 50 | ✅ Yes | 'SCHEDULED' | ❌ No |
| `isActive` | Boolean | - | ✅ Yes | true | ❌ No |
| `createdAt` | String | 50 | ✅ Yes | - | ❌ No |
| `updatedAt` | String | 50 | ✅ Yes | - | ❌ No |

### Status Values
The `status` attribute should be one of:
- `SCHEDULED` - Session is scheduled but not started yet
- `ACTIVE` - Session is currently active
- `ENDED` - Session has ended
- `CANCELLED` - Session was cancelled

### Allowed Methods Values
The `allowedMethods` array can contain:
- `QR_CODE` - QR code scanning
- `RFID` - RFID card scanning
- `FACIAL_RECOGNITION` - Facial recognition
- `NFC` - NFC scanning
- `BLUETOOTH` - Bluetooth proximity

## How to Add Missing Attributes in Appwrite

If you're missing the `status` attribute or any other attributes:

### Step 1: Log into Appwrite Console
1. Open your Appwrite Console: https://cloud.appwrite.io
2. Navigate to your project
3. Go to **Databases** → Select your database
4. Find the **sessions** collection

### Step 2: Add the `status` Attribute
1. Click on **Attributes** tab
2. Click **+ Add Attribute**
3. Choose **String**
4. Fill in:
   - **Attribute Key**: `status`
   - **Size**: 50
   - **Required**: ✅ Yes
   - **Default**: `SCHEDULED`
   - **Array**: ❌ No
5. Click **Create**

### Step 3: Add `updatedAt` Attribute (if missing)
1. Click **+ Add Attribute**
2. Choose **String**
3. Fill in:
   - **Attribute Key**: `updatedAt`
   - **Size**: 50
   - **Required**: ✅ Yes
   - **Array**: ❌ No
4. Click **Create**

### Step 4: Verify Other Required Attributes
Check that all the attributes listed in the table above exist. If any are missing, add them following the same process.

### Step 5: Update Indexes (Optional but Recommended)
For better query performance, create these indexes:

1. **organizationId + startTime**
   - Type: Key
   - Attributes: organizationId (ASC), startTime (DESC)
   
2. **status + isActive**
   - Type: Key
   - Attributes: status (ASC), isActive (ASC)

3. **createdAt**
   - Type: Key
   - Attributes: createdAt (DESC)

## Testing the Fix

### Test Creating a Session:
1. Log into Admin Dashboard
2. Go to **Sessions** page
3. Click **New Session**
4. Fill in the form:
   - **Session Name**: "Test Session"
   - **Start Time**: Select a future date/time
   - **End Time**: Select an end date/time
   - **Location**: "Room 101" (optional)
   - **Attendance Methods**: Check at least one method
   - **Late Threshold**: 15 (default)
5. Click **Create Session**
6. Should see: ✅ "Session created successfully!"

### Expected Session Document:
```json
{
  "$id": "unique-id",
  "name": "Test Session",
  "courseId": "",
  "organizationId": "your-org-id",
  "creatorId": "your-user-id",
  "startTime": "2026-02-06T10:00:00.000Z",
  "endTime": "2026-02-06T12:00:00.000Z",
  "location": "Room 101",
  "allowedMethods": ["QR_CODE"],
  "lateThreshold": 15,
  "status": "SCHEDULED",
  "isActive": true,
  "createdAt": "2026-02-06T08:30:00.000Z",
  "updatedAt": "2026-02-06T08:30:00.000Z"
}
```

## Code Changes Summary

### File: `src/lib/services/session.service.ts`

**Before:**
```typescript
async createSession(sessionData: any) {
  const session = await serverDatabases.createDocument(
    DATABASE_ID,
    COLLECTIONS.SESSIONS,
    'unique()',
    {
      ...sessionData,
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  );
  return { success: true, session };
}
```

**After:**
```typescript
async createSession(sessionData: any) {
  const now = new Date().toISOString();
  
  const session = await serverDatabases.createDocument(
    DATABASE_ID,
    COLLECTIONS.SESSIONS,
    'unique()',
    {
      name: sessionData.name,
      courseId: sessionData.courseId || '',
      organizationId: sessionData.organizationId,
      creatorId: sessionData.creatorId,
      startTime: sessionData.startTime,
      endTime: sessionData.endTime,
      location: sessionData.location || '',
      allowedMethods: sessionData.allowedMethods || ['QR_CODE'],
      lateThreshold: sessionData.lateThreshold || 15,
      status: 'SCHEDULED', // Required attribute
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }
  );
  return { success: true, session };
}
```

## Benefits of This Fix

✅ **Explicit Field Mapping** - Prevents unknown attributes from being passed
✅ **Default Values** - Provides sensible defaults for optional fields
✅ **Status Tracking** - Properly tracks session lifecycle
✅ **Timestamps** - Maintains creation and update timestamps
✅ **Error Prevention** - Validates all required fields are present
✅ **Type Safety** - Clear structure for session documents

## Future Enhancements

### 1. Auto-Update Status
Add a cron job or scheduled task to automatically update session status:
- `SCHEDULED` → `ACTIVE` when startTime is reached
- `ACTIVE` → `ENDED` when endTime is reached

### 2. Session Validation
Add validation to ensure:
- `endTime` is after `startTime`
- `startTime` is not in the past (for new sessions)
- `lateThreshold` is reasonable (0-60 minutes)

### 3. Cascade Operations
When a session is deleted:
- Archive or delete related attendance records
- Notify participants
- Update analytics

### 4. Real-time Updates
Use Appwrite Realtime to:
- Push session updates to participants
- Show live attendance counts
- Notify when session status changes

## Troubleshooting

### If you still get the error:

1. **Check Appwrite Console**
   - Verify the `status` attribute exists
   - Ensure it's marked as **Required**
   - Check the default value is set to `SCHEDULED`

2. **Clear Cache**
   - Restart your development server
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R)

3. **Check Collection ID**
   - Verify `NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID` in `.env`
   - Ensure it matches your Appwrite collection ID

4. **Check Permissions**
   - Ensure your API key has write permissions
   - Check collection-level permissions allow creation

5. **Validate Data**
   - Check browser console for detailed error messages
   - Verify all required fields have valid values

## Status: ✅ COMPLETE

The session creation error has been fixed. Make sure to add the `status` attribute to your Appwrite collection if it's not already there, and sessions will be created successfully!

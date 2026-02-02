# Appwrite Quick Reference Card

## 🔥 Essential Commands

### Client-Side Authentication
```typescript
import { authService } from '@/lib/services/auth.service';

// Register
await authService.register({ email, password, name });

// Login
await authService.login({ email, password });

// Get current user
const { user } = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### Database Operations
```typescript
import { databaseService } from '@/lib/services/database.service';

// Create attendance
await databaseService.createAttendance({
  userId: 'user123',
  organizationId: 'org456',
  sessionId: 'session789',
  checkInTime: new Date().toISOString(),
  method: 'qr',
  status: 'present'
});

// Get attendance
await databaseService.getAttendanceByUser('user123');
await databaseService.getAttendanceByOrganization('org456');
```

### Storage Operations
```typescript
import { storageService } from '@/lib/services/storage.service';

// Upload file
const result = await storageService.uploadProfileImage(file);

// Get file URL
const url = storageService.getFilePreview(bucketId, fileId);
```

## 📋 Environment Variables

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT_ID="your-project-id"
APPWRITE_API_KEY="your-api-key"
NEXT_PUBLIC_APPWRITE_DATABASE_ID="eduscan-database"
```

## 🎯 React Hook Usage

```typescript
'use client';
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const { user, loading, login, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🔐 Collection IDs

- **Users:** `users`
- **Attendance:** `attendance`
- **Organizations:** `organizations`
- **Sessions:** `sessions`
- **Devices:** `devices`

## 📦 Bucket IDs

- **Profile Images:** `profile-images`
- **QR Codes:** `qr-codes`

## 🚀 API Routes

- `POST /api/appwrite/attendance` - Create attendance
- `GET /api/appwrite/attendance?userId=xxx` - Get by user
- `PATCH /api/appwrite/attendance` - Update attendance

## 🔗 Important Links

- **Appwrite Console:** https://cloud.appwrite.io
- **Documentation:** https://appwrite.io/docs
- **Discord:** https://discord.gg/appwrite
- **Setup Guide:** See `APPWRITE_SETUP_GUIDE.md`

## ⚠️ Common Issues

1. **"User missing scope"** → Check permissions
2. **"Network request failed"** → Check endpoint URL
3. **"Invalid credentials"** → Regenerate API key
4. **"Document not found"** → Verify collection IDs

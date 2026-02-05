# Adding Address, Phone, and Website to Organizations Collection

## Step-by-Step Instructions for Appwrite Console

### 1. Open Appwrite Console
Go to: https://cloud.appwrite.io/console

### 2. Navigate to Your Database
1. Click on **"Databases"** in the left sidebar
2. Select **"eduscan-database"** (or your database name)
3. Click on **"organizations"** collection

### 3. Add New Attributes

Click the **"Add Attribute"** button and add these three attributes:

---

## Attribute 1: Address

**Click "Add Attribute" → Select "String"**

| Field | Value |
|-------|-------|
| **Key** | `address` |
| **Size** | `500` |
| **Required** | ❌ No (leave unchecked) |
| **Array** | ❌ No (leave unchecked) |
| **Default Value** | Leave empty |
| **Encrypted** | ❌ No (leave unchecked) |

**Then click "Create"**

---

## Attribute 2: Phone

**Click "Add Attribute" → Select "String"**

| Field | Value |
|-------|-------|
| **Key** | `phone` |
| **Size** | `20` |
| **Required** | ❌ No (leave unchecked) |
| **Array** | ❌ No (leave unchecked) |
| **Default Value** | Leave empty |
| **Encrypted** | ❌ No (leave unchecked) |

**Then click "Create"**

---

## Attribute 3: Website

**Click "Add Attribute" → Select "String"**

| Field | Value |
|-------|-------|
| **Key** | `website` |
| **Size** | `255` |
| **Required** | ❌ No (leave unchecked) |
| **Array** | ❌ No (leave unchecked) |
| **Default Value** | Leave empty |
| **Encrypted** | ❌ No (leave unchecked) |

**Then click "Create"**

---

## Visual Guide

### When Adding Each Attribute:

```
┌─────────────────────────────────────────┐
│  Add Attribute                          │
├─────────────────────────────────────────┤
│                                         │
│  Type: [String ▼]                       │
│                                         │
│  Key: [address]                         │
│       The attribute key                 │
│                                         │
│  Size: [500]                            │
│        Maximum size of string           │
│                                         │
│  ☐ Required                             │
│  ☐ Array                                │
│  ☐ Encrypted                            │
│                                         │
│  Default Value: [           ]           │
│                 (leave empty)           │
│                                         │
│  [Cancel]              [Create]         │
└─────────────────────────────────────────┘
```

---

## After Adding All Three Attributes

Your Organizations collection should have these attributes:

### Existing Attributes:
1. ✅ name (String, 255, Required)
2. ✅ email (Email, Required)
3. ✅ adminId (String, 255, Required)
4. ✅ plan (String, 50, Required)
5. ✅ trialEndsAt (DateTime, Optional)
6. ✅ subscriptionStatus (String, 50, Optional)
7. ✅ allowedMethods (String, 100, Optional)
8. ✅ autoCheckout (Boolean, Default: false)
9. ✅ lateThresholdMinutes (Integer, Default: 15)
10. ✅ timezone (String, 100, Default: "UTC")
11. ✅ createdAt (DateTime, Required)
12. ✅ updatedAt (DateTime, Required)

### New Attributes (after adding):
13. ✅ **address** (String, 500, Optional)
14. ✅ **phone** (String, 20, Optional)
15. ✅ **website** (String, 255, Optional)

---

## Quick Reference Table

| Attribute | Type | Size | Required | Purpose |
|-----------|------|------|----------|---------|
| address | String | 500 | No | Full organization address |
| phone | String | 20 | No | Organization phone number |
| website | String | 255 | No | Organization website URL |

---

## What Happens After Adding These?

Once you add these three attributes:

1. ✅ **Settings page will automatically save them**
   - Address field → saves to `address`
   - Phone field → saves to `phone`
   - Website field → saves to `website`

2. ✅ **No code changes needed**
   - The API already handles these fields
   - Just needs the attributes to exist

3. ✅ **Warning message will disappear**
   - The yellow warning in Settings → Organization will go away

---

## Testing After Adding Attributes

1. **Add the three attributes in Appwrite**
2. **Refresh your EduScan dashboard**
3. **Go to Settings → Organization**
4. **Fill in:**
   - Organization Name
   - Email
   - Address (now works!)
   - Phone (now works!)
   - Website (now works!)
5. **Click "Save Organization"**
6. **Refresh page** - all data should persist ✅

---

## Verification Checklist

After adding the attributes:

- [ ] Three attributes added in Appwrite Console
- [ ] Organizations collection shows 15 total attributes
- [ ] Dashboard refreshed
- [ ] Settings → Organization page loaded
- [ ] Yellow warning message still shows (will go away after first save)
- [ ] Test save with all fields filled
- [ ] Success message appears
- [ ] Refresh page - all fields persist
- [ ] Check Appwrite Console - organization document has address, phone, website

---

## Screenshot Reference

When adding the "address" attribute, you should see:

```
Attribute Type: String
Key: address
Size: 500
☐ Required
☐ Array  
☐ Encrypted
Default Value: (empty)

[Create Button]
```

---

## Troubleshooting

### If Fields Still Don't Save:

1. **Check attribute keys are exact:**
   - Must be: `address`, `phone`, `website` (lowercase, no spaces)

2. **Verify attribute types:**
   - All three must be **String** type

3. **Check sizes:**
   - address: 500
   - phone: 20
   - website: 255

4. **Hard refresh browser:**
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

---

## Summary

**To enable address, phone, and website in your organization:**

1. Open Appwrite Console
2. Go to: Databases → eduscan-database → organizations
3. Click "Add Attribute" three times
4. Add these exact attributes:
   - `address` (String, 500, Optional)
   - `phone` (String, 20, Optional)
   - `website` (String, 255, Optional)
5. Refresh your dashboard
6. Test in Settings → Organization

**That's it!** No code changes needed - everything is already wired up! 🎉

---

## Quick Copy-Paste Values

For easy reference when adding attributes:

**Attribute 1:**
- Key: `address`
- Type: String
- Size: `500`
- Required: No

**Attribute 2:**
- Key: `phone`
- Type: String
- Size: `20`
- Required: No

**Attribute 3:**
- Key: `website`
- Type: String
- Size: `255`
- Required: No

# NaN Input Error Fix - Sessions Page

## Date: February 6, 2026

## 🔴 Error
```
Received NaN for the `value` attribute. If this is expected, cast the value to a string.
```

**Location**: `src/app/dashboard/admin/sessions/page.tsx:404`

## 🔍 Root Cause
The `onChange` handler for the "Late Threshold" number input was using `parseInt(e.target.value)` which returns `NaN` when:
- The input field is empty
- The input contains invalid characters
- The user deletes all digits

React doesn't accept `NaN` as a valid value for controlled inputs, causing the error.

## ✅ Solution

### Before:
```typescript
<input
  type="number"
  min="0"
  value={formData.lateThreshold}
  onChange={(e) =>
    setFormData({ ...formData, lateThreshold: parseInt(e.target.value) })
  }
/>
```

**Problem**: `parseInt('')` returns `NaN`

### After:
```typescript
<input
  type="number"
  min="0"
  value={formData.lateThreshold}
  onChange={(e) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    setFormData({ ...formData, lateThreshold: isNaN(value) ? 0 : value });
  }}
/>
```

**Solution**: 
- Check if value is empty string → use 0
- Parse the value
- Check if result is NaN → use 0
- Otherwise use the parsed value

## 🎯 Benefits

✅ **No more NaN errors** in the console  
✅ **Graceful handling** of empty inputs  
✅ **Default value** of 0 when input is cleared  
✅ **User-friendly** behavior - field doesn't break when empty  
✅ **Type-safe** - always has a valid number  

## 🧪 Testing

1. **Open** Admin Dashboard → Sessions
2. **Click** "New Session"
3. **Try these actions** in the "Late Threshold" field:
   - Clear the field → Should default to 0
   - Type invalid characters → Should handle gracefully
   - Type a valid number → Should update correctly
   - Use arrow keys to increment/decrement → Should work smoothly
4. **Verify** no console errors appear

## 📊 Expected Behavior

| User Action | Previous Behavior | New Behavior |
|-------------|-------------------|--------------|
| Clear input | ❌ NaN error | ✅ Defaults to 0 |
| Empty field | ❌ NaN error | ✅ Shows 0 |
| Type letters | ❌ NaN error | ✅ Defaults to 0 |
| Type number | ✅ Works | ✅ Works |
| Arrow keys | ✅ Works | ✅ Works |

## 🔧 Technical Details

### parseInt() Behavior
```javascript
parseInt('')        // NaN
parseInt('abc')     // NaN
parseInt('15')      // 15
parseInt('15.5')    // 15 (truncates decimal)
```

### Safe Parsing Pattern
```javascript
const value = e.target.value === '' ? 0 : parseInt(e.target.value);
const safeValue = isNaN(value) ? 0 : value;
```

This ensures we always have a valid number for React's controlled input.

## 📦 Files Modified

1. ✅ `src/app/dashboard/admin/sessions/page.tsx` - Fixed lateThreshold input handler

## ✨ Status: ✅ COMPLETE

The NaN error has been fixed and the Late Threshold input now handles all edge cases gracefully!

## 💡 Best Practice

This pattern should be used for **all number inputs** in forms to prevent NaN errors:

```typescript
onChange={(e) => {
  const value = e.target.value === '' ? defaultValue : parseInt(e.target.value);
  setFormData({ ...formData, fieldName: isNaN(value) ? defaultValue : value });
}}
```

Or create a reusable helper function:

```typescript
const parseNumberInput = (value: string, defaultValue: number = 0): number => {
  if (value === '') return defaultValue;
  const parsed = parseInt(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Usage:
onChange={(e) => 
  setFormData({ ...formData, fieldName: parseNumberInput(e.target.value) })
}
```

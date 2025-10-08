# Firestore Document Size Limit Fix

## Problem
The error `FirebaseError: The value of property "array" is longer than 1048487 bytes` occurs when trying to save service data that exceeds Firestore's 1MB document size limit. This typically happens with large base64-encoded images.

## Root Cause
- Firestore has a maximum document size of 1MB (1,048,487 bytes)
- Base64-encoded images can be very large (often 2-5MB+ for high-resolution images)
- Multiple images (hero, icon, gallery) can easily exceed the limit
- The original compression was not aggressive enough

## Solutions Implemented

### 1. Enhanced Image Compression (`serviceService.ts`)
- **Reduced Quality**: Changed from 0.8 to 0.6 quality for better compression
- **Aggressive Compression**: Added secondary compression if images are still too large
- **Size Limits**: Added 500KB limit per image with automatic further compression
- **All Image Types**: Applied compression to hero, icon, and gallery images

### 2. Document Size Validation (`serviceService.ts`)
- **Pre-save Validation**: Check document size before saving to Firestore
- **Clear Error Messages**: Inform users when data is too large
- **Size Logging**: Log document sizes for debugging

### 3. Image Size Utilities (`imageUtils.ts`)
- **Size Information**: Get detailed image size information
- **Validation Functions**: Check if images are within acceptable limits
- **File Size Formatting**: Display sizes in human-readable format
- **Compression Recommendations**: Suggest optimal compression settings

### 4. Form Validation (`ServiceForm.tsx`)
- **Pre-submit Validation**: Check image sizes before form submission
- **User-Friendly Errors**: Show specific error messages for each image
- **Size Limits**: 
  - Hero image: 500KB max
  - Service icon: 300KB max  
  - Gallery images: 400KB max each

## Technical Details

### Compression Settings
```typescript
// Before (too large)
quality: 0.8, maxWidth: 1200

// After (optimized)
quality: 0.6, maxWidth: 1200
// + secondary compression if still > 500KB
```

### Size Limits
- **Firestore Document**: 1MB total
- **Hero Image**: 500KB max
- **Service Icon**: 300KB max
- **Gallery Images**: 400KB max each
- **Total Images**: Should not exceed ~800KB combined

### Error Handling
1. **Form Level**: Validate images before submission
2. **Service Level**: Check document size before saving
3. **User Feedback**: Clear error messages with specific file sizes

## Usage

### For Developers
```typescript
// Check image size
const sizeInfo = getImageSizeInfo(dataUrl);
console.log(`Image size: ${formatFileSize(sizeInfo.sizeInBytes)}`);

// Validate before saving
if (!validateImageSize(dataUrl, 500)) {
  throw new Error('Image too large');
}
```

### For Users
- **Upload smaller images**: Use images under 500KB
- **Compress before upload**: Use image compression tools
- **Check error messages**: Follow specific size recommendations

## Files Modified
- `lib/serviceService.ts` - Enhanced compression and validation
- `lib/imageUtils.ts` - New utility functions
- `components/services/ServiceForm.tsx` - Form validation
- `FIRESTORE_SIZE_FIX.md` - This documentation

## Testing
1. Try uploading large images (>1MB)
2. Verify compression reduces sizes
3. Check error messages are helpful
4. Confirm services save successfully

## Prevention
- Always compress images before upload
- Use appropriate image dimensions
- Monitor document sizes in development
- Test with realistic image sizes

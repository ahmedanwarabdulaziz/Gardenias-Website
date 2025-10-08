/**
 * Image utility functions for handling image compression and size validation
 */

export interface ImageSizeInfo {
  width: number;
  height: number;
  sizeInBytes: number;
  sizeInMB: number;
  isWithinLimit: boolean;
}

/**
 * Get image size information from a data URL
 */
export const getImageSizeInfo = (dataUrl: string): ImageSizeInfo => {
  const sizeInBytes = new Blob([dataUrl]).size;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  
  // Extract dimensions from data URL (approximate)
  const base64Data = dataUrl.split(',')[1];
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Simple JPEG dimension extraction (this is approximate)
  let width = 0;
  let height = 0;
  
  try {
    // Look for SOF0 marker (0xFF, 0xC0) in JPEG
    for (let i = 0; i < bytes.length - 1; i++) {
      if (bytes[i] === 0xFF && bytes[i + 1] === 0xC0) {
        if (i + 9 < bytes.length) {
          height = (bytes[i + 5] << 8) | bytes[i + 6];
          width = (bytes[i + 7] << 8) | bytes[i + 8];
          break;
        }
      }
    }
  } catch (error) {
    console.warn('Could not extract image dimensions:', error);
  }
  
  return {
    width,
    height,
    sizeInBytes,
    sizeInMB: parseFloat(sizeInMB.toFixed(2)),
    isWithinLimit: sizeInBytes < 500000 // 500KB limit per image
  };
};

/**
 * Validate if an image is within acceptable size limits
 */
export const validateImageSize = (dataUrl: string, maxSizeKB: number = 500): boolean => {
  const sizeInfo = getImageSizeInfo(dataUrl);
  return sizeInfo.sizeInBytes < (maxSizeKB * 1024);
};

/**
 * Get recommended compression settings based on image size
 */
export const getRecommendedCompression = (dataUrl: string): { quality: number; maxWidth: number } => {
  const sizeInfo = getImageSizeInfo(dataUrl);
  
  if (sizeInfo.sizeInMB > 2) {
    return { quality: 0.3, maxWidth: 600 };
  } else if (sizeInfo.sizeInMB > 1) {
    return { quality: 0.4, maxWidth: 800 };
  } else if (sizeInfo.sizeInMB > 0.5) {
    return { quality: 0.5, maxWidth: 1000 };
  } else {
    return { quality: 0.6, maxWidth: 1200 };
  }
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get Firestore document size limit information
 */
export const getFirestoreLimits = () => {
  return {
    maxDocumentSize: 1048487, // 1MB
    maxDocumentSizeMB: 1.0,
    recommendedImageSize: 500000, // 500KB
    recommendedImageSizeKB: 500
  };
};

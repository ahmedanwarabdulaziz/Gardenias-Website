// Cloudflare configuration for image optimization and storage
export const CLOUDFLARE_ACCOUNT_ID = "Pn5aH9t_IMjyKLkdUjS2aW7RxAMbrOPpcWqtLfGx";
export const CLOUDFLARE_API_TOKEN = "Pn5aH9t_IMjyKLkdUjS2aW7RxAMbrOPpcWqtLfGx"; // Your API token

// Cloudflare Image Resizing API
export const getOptimizedImageUrl = (
  imageUrl: string,
  width?: number,
  height?: number,
  quality: number = 80,
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
) => {
  const baseUrl = `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_ID}`;
  
  const params = new URLSearchParams();
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  params.append('quality', quality.toString());
  if (format) params.append('format', format);
  
  const queryString = params.toString();
  return `${baseUrl}/${imageUrl}${queryString ? `?${queryString}` : ''}`;
};

// Image optimization presets for different use cases
export const imagePresets = {
  thumbnail: (url: string) => getOptimizedImageUrl(url, 150, 150, 80, 'webp'),
  card: (url: string) => getOptimizedImageUrl(url, 400, 300, 85, 'webp'),
  hero: (url: string) => getOptimizedImageUrl(url, 1200, 600, 90, 'webp'),
  profile: (url: string) => getOptimizedImageUrl(url, 200, 200, 85, 'webp'),
  gallery: (url: string) => getOptimizedImageUrl(url, 800, 600, 85, 'webp'),
};

// Cloudflare Analytics
export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined') {
    // Cloudflare Web Analytics
    // You can add Cloudflare Web Analytics script here
    console.log('Page view tracked:', page);
  }
};

// Upload image to Cloudflare Images (simplified for development)
export const uploadImageToCloudflare = async (file: File | Blob, filename?: string): Promise<string> => {
  try {
    // For development, we'll use a placeholder approach
    // In production, you would need proper Cloudflare API credentials
    console.log('Cloudflare upload not available - using data URL fallback');
    
    // Convert file to data URL as fallback
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error uploading to Cloudflare:', error);
    throw new Error('Failed to upload image to Cloudflare');
  }
};

// Upload image from data URL to Cloudflare (simplified for development)
export const uploadDataUrlToCloudflare = async (dataUrl: string, filename?: string): Promise<string> => {
  try {
    // For development, we'll return the data URL directly
    // In production, you would upload to Cloudflare Images API
    console.log('Using data URL directly for development');
    return dataUrl;
  } catch (error) {
    console.error('Error uploading data URL to Cloudflare:', error);
    throw new Error('Failed to upload image to Cloudflare');
  }
};

// Cloudflare R2 Storage configuration (if using R2 for file storage)
export const R2_CONFIG = {
  accountId: CLOUDFLARE_ACCOUNT_ID,
  bucketName: 'healthcare-images', // You'll need to create this bucket
  publicUrl: `https://pub-${CLOUDFLARE_ACCOUNT_ID}.r2.dev`,
};

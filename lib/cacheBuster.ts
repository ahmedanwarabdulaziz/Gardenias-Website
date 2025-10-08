/**
 * Cache busting utilities to prevent stale content on hard refresh
 */

// Generate a unique version string based on build time
export const getBuildVersion = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side: use timestamp
    return Date.now().toString();
  }
  // Server-side: use environment variable or fallback
  return process.env.BUILD_VERSION || Date.now().toString();
};

// Generate cache-busting query parameters
export const getCacheBuster = (): string => {
  return `?v=${getBuildVersion()}`;
};

// Add cache-busting to URLs
export const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${getBuildVersion()}`;
};

// Force reload with cache busting
export const forceReload = (): void => {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

// Clear all caches and reload
export const clearCacheAndReload = (): void => {
  if (typeof window !== 'undefined') {
    // Clear service worker cache
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
    
    // Clear browser cache
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    
    // Force reload
    window.location.href = window.location.href + getCacheBuster();
  }
};

// Check if we need to force a cache refresh
export const shouldForceRefresh = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const lastRefresh = localStorage.getItem('lastCacheRefresh');
  const now = Date.now();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  
  if (!lastRefresh || (now - parseInt(lastRefresh)) > oneHour) {
    localStorage.setItem('lastCacheRefresh', now.toString());
    return true;
  }
  
  return false;
};

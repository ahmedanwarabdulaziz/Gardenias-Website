'use client';

import { useEffect } from 'react';
import { shouldForceRefresh, clearCacheAndReload } from '@/lib/cacheBuster';

/**
 * CacheBuster component that automatically handles cache invalidation
 * Use this component in your root layout or main pages to prevent stale content
 */
export default function CacheBuster() {
  useEffect(() => {
    // Check if we need to force a refresh on component mount
    if (shouldForceRefresh()) {
      console.log('Cache refresh needed, clearing cache...');
      clearCacheAndReload();
    }
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * Hook to manually trigger cache clearing
 */
export const useCacheBuster = () => {
  const clearCache = () => {
    clearCacheAndReload();
  };

  const addCacheBuster = (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${Date.now()}`;
  };

  return { clearCache, addCacheBuster };
};

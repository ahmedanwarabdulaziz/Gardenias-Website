# Cache Busting Guide

This document explains the cache busting strategies implemented to prevent stale content on hard refresh.

## Problem
Sometimes when you make a hard refresh (Ctrl+F5 or Cmd+Shift+R), you might see an old layout or cached content instead of the latest changes.

## Solutions Implemented

### 1. Next.js Configuration (`next.config.ts`)
- **Static Assets**: Only cache static assets (JS, CSS, images) with long-term caching
- **Pages & API**: Set `no-cache, no-store, must-revalidate` for all pages and API routes
- **Headers**: Added Pragma and Expires headers to prevent browser caching

### 2. Meta Tags (`app/layout.tsx`)
- Added cache-control meta tags to HTML head
- Dynamic build version using timestamp
- Prevents browser from caching the HTML

### 3. Cache Buster Component (`components/shared/CacheBuster.tsx`)
- Automatically detects when cache refresh is needed
- Clears service worker and browser caches
- Forces reload with cache-busting parameters

### 4. Development Scripts (`package.json`)
- `npm run dev:clean` - Clears cache before starting dev server
- `npm run build:clean` - Clears cache before building
- `npm run clear-cache` - Manual cache clearing

### 5. Cache Clearing Script (`scripts/clear-cache.js`)
- Removes `.next`, `node_modules/.cache`, `.turbo` directories
- Updates build version timestamp
- Can be run manually or automatically

## Usage

### For Development
```bash
# Start with clean cache
npm run dev:clean

# Or clear cache manually
npm run clear-cache
```

### For Production
```bash
# Build with clean cache
npm run build:clean
```

### Manual Cache Clearing
If you still see old content:
1. Run `npm run clear-cache`
2. Hard refresh the browser (Ctrl+F5)
3. Or use the browser's developer tools to clear cache

## How It Works

1. **Build Time**: Each build gets a unique timestamp
2. **Runtime**: CacheBuster component checks if refresh is needed
3. **Headers**: Server sends no-cache headers for pages
4. **Client**: Browser is forced to fetch fresh content

## Troubleshooting

### Still seeing old content?
1. Check if you're using the latest build
2. Clear browser cache manually
3. Try incognito/private browsing mode
4. Check if CDN is caching (if using Vercel/Netlify)

### Development issues?
1. Stop the dev server
2. Run `npm run clear-cache`
3. Start with `npm run dev:clean`

## Files Modified
- `next.config.ts` - Cache headers configuration
- `app/layout.tsx` - Meta tags and CacheBuster component
- `lib/cacheBuster.ts` - Cache busting utilities
- `components/shared/CacheBuster.tsx` - Auto cache clearing component
- `scripts/clear-cache.js` - Manual cache clearing script
- `package.json` - New scripts for cache management

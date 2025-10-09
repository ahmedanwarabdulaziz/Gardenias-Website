'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, Skeleton } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sx?: object;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sx,
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // For now, use placeholder images since we don't have actual images
  // In production, you would use the Cloudflare optimization
  const optimizedSrc = src.startsWith('/') ? src : src;

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  if (error) {
    return (
      <Box
        sx={{
          width: width || '100%',
          height: height || 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          color: 'text.secondary',
          ...sx,
        }}
      >
        Image not available
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {loading && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || 200}
          animation="wave"
        />
      )}
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={className}
        style={{
          display: loading ? 'none' : 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </Box>
  );
}

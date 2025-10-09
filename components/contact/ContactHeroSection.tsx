'use client';

import { Box, Container, Typography } from '@mui/material';

interface ContactHeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  heroImage: string;
}

export default function ContactHeroSection({ title, subtitle, description, heroImage }: ContactHeroSectionProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '400px', md: '500px' },
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: '75% center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: { xs: 'flex-end', md: 'center' },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: {
            xs: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.75) 100%)',
            md: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
          },
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 8 }, pb: { xs: 6, md: 8 } }}>
        {/* Title */}
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', sm: '3.5rem', md: '4rem' },
            color: 'white',
            mb: subtitle ? 0.5 : 3,
            lineHeight: 1.2,
            textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)',
            maxWidth: '900px',
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '3.5rem', md: '4rem' },
              color: 'white',
              mb: 3,
              lineHeight: 1.2,
              textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)',
              maxWidth: '900px',
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Description */}
        <Typography
          sx={{
            fontFamily: '"Source Sans Pro", sans-serif',
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            color: 'white',
            lineHeight: 1.8,
            maxWidth: '800px',
            textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)',
          }}
        >
          {description}
        </Typography>
      </Container>
    </Box>
  );
}


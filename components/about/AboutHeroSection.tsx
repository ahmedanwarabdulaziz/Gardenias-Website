'use client';

import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { House, CaretRight } from 'phosphor-react';

interface AboutHeroSectionProps {
  title: string;
  subtitle?: string;
  heroImage: string;
}

export default function AboutHeroSection({ title, subtitle, heroImage }: AboutHeroSectionProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '500px', md: '600px' },
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: { xs: '77% center', sm: '77% center', md: 'center' },
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'stretch',
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
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          pt: { xs: 2, md: 8 }, 
          pb: { xs: 4, md: 8 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'space-between', md: 'flex-start' },
          gap: { xs: 0, md: 0 }
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<CaretRight size={16} color="rgba(255,255,255,0.9)" />}
          sx={{ mb: { xs: 0, md: 3 } }}
        >
          <Link
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              '&:hover': {
                color: 'white',
                textShadow: '0 2px 12px rgba(0,0,0,1)',
              },
            }}
          >
            <House size={18} weight="fill" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }} />
            <Typography sx={{ fontFamily: '"Source Sans Pro", sans-serif', fontSize: '0.9rem' }}>
              Home
            </Typography>
          </Link>
          <Typography
            sx={{
              color: 'white',
              fontSize: '0.9rem',
              fontFamily: '"Source Sans Pro", sans-serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            {title}
          </Typography>
        </Breadcrumbs>

        {/* Main Content Wrapper */}
        <Box sx={{ mt: { xs: 'auto', md: 0 }, pt: { xs: 31, md: 0 } }}>
          {/* Title */}
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              color: 'white',
              mb: subtitle ? 3 : 0,
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
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'white',
                fontWeight: 400,
                lineHeight: 1.8,
                textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)',
                maxWidth: '900px',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}


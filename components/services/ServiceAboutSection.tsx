'use client';

import { Box, Container, Typography } from '@mui/material';

interface ServiceAboutSectionProps {
  serviceName: string;
  fullDescription: string;
}

export default function ServiceAboutSection({ 
  serviceName, 
  fullDescription 
}: ServiceAboutSectionProps) {
  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 6 } }}>
          {/* Left Column - Title */}
          <Box sx={{ 
            flex: { xs: '1', md: '0 0 33.33%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Playfair Display, serif',
                color: '#008d80',
                fontWeight: 700,
                mb: -2,
                fontSize: { xs: '3rem', sm: '4rem', md: '6rem' },
              }}
            >
              About
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Playfair Display, serif',
                color: '#008d80',
                fontWeight: 600,
              }}
            >
              {serviceName}
            </Typography>
          </Box>

          {/* Right Column - Description */}
          <Box sx={{ flex: { xs: '1', md: '0 0 66.67%' } }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Source Sans Pro, sans-serif',
                color: '#333',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}
            >
              {fullDescription}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


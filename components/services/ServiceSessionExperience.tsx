'use client';

import { Box, Container, Typography } from '@mui/material';

interface ServiceSessionExperienceProps {
  firstVisitOverview: string;
  whatToWear: string[];
  aftercareAdvice: string[];
  image?: string;
}

export default function ServiceSessionExperience({
  firstVisitOverview,
  whatToWear,
  aftercareAdvice,
  image,
}: ServiceSessionExperienceProps) {
  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#fff',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Playfair Display, serif',
            color: '#008d80',
            fontWeight: 700,
            textAlign: 'center',
            mb: 6,
            fontSize: '3rem',
          }}
        >
          Session Experience
        </Typography>

        {/* Two Column Layout */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 6 } }}>
          {/* Left Column - Text Content */}
          <Box sx={{ flex: { xs: '1', md: '0 0 55%' } }}>
            {/* First Visit */}
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#008d80',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Your First Visit
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Source Sans Pro, sans-serif',
                  color: '#333',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {firstVisitOverview}
              </Typography>
            </Box>

            {/* What to Wear */}
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#008d80',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                What to Wear
              </Typography>
              <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                {whatToWear.map((item, idx) => (
                  <Box
                    component="li"
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 1.5,
                      '&::before': {
                        content: '"•"',
                        display: 'inline-block',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: '#008d80',
                        mr: 2,
                        lineHeight: 1.3,
                        flexShrink: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Source Sans Pro, sans-serif',
                        color: '#333',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Aftercare Advice */}
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#008d80',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Aftercare Advice
              </Typography>
              <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                {aftercareAdvice.map((item, idx) => (
                  <Box
                    component="li"
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 1.5,
                      '&::before': {
                        content: '"•"',
                        display: 'inline-block',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: '#008d80',
                        mr: 2,
                        lineHeight: 1.3,
                        flexShrink: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Source Sans Pro, sans-serif',
                        color: '#333',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right Column - Image */}
          <Box sx={{ flex: { xs: '1', md: '0 0 45%' } }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                minHeight: { xs: '300px', md: '500px' },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                background: image ? 'transparent' : 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
              }}
            >
              {image ? (
                <Box
                  component="img"
                  src={image}
                  alt="Session Experience"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#008d80',
                    fontSize: '1.2rem',
                    fontFamily: 'Playfair Display, serif',
                    textAlign: 'center',
                    p: 4,
                  }}
                >
                  Session Experience Image
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


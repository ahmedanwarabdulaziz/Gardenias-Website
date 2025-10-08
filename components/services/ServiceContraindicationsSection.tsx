'use client';

import { Box, Container, Card, CardContent, Typography } from '@mui/material';

interface ServiceContraindicationsSectionProps {
  contraindications: string[];
  whenToSeeDoctor?: string;
}

export default function ServiceContraindicationsSection({
  contraindications,
  whenToSeeDoctor,
}: ServiceContraindicationsSectionProps) {
  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#f8f9fa',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Left Card - Contraindications */}
          <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 50%, #ff6b6b 100%)',
                borderRadius: 3,
                boxShadow: '0 8px 20px rgba(220, 53, 69, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid rgba(220, 53, 69, 0.3)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                  pointerEvents: 'none',
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 28px rgba(220, 53, 69, 0.4)',
                },
              }}
            >
              <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#ffffff',
                    fontWeight: 700,
                    mb: 3,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Contraindications / Who Should Not Book
                </Typography>
                <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                  {contraindications.map((item, idx) => (
                    <Box
                      component="li"
                      key={idx}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 1.5,
                        '&::before': {
                          content: '"✕"',
                          display: 'inline-block',
                          fontWeight: 700,
                          fontSize: '1.2rem',
                          color: '#ffffff',
                          mr: 2,
                          mt: '2px',
                          flexShrink: 0,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Source Sans Pro, sans-serif',
                          color: '#ffffff',
                          fontSize: '1rem',
                          lineHeight: 1.8,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Card - When to See a Doctor */}
          {whenToSeeDoctor && (
            <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #ff8c42 0%, #ff9a56 50%, #ffb380 100%)',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(255, 140, 66, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 140, 66, 0.3)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 28px rgba(255, 140, 66, 0.4)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 3,
                      textAlign: 'center',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    When to See a Doctor
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Source Sans Pro, sans-serif',
                      color: '#ffffff',
                      fontSize: '1rem',
                      lineHeight: 1.8,
                    }}
                  >
                    {whenToSeeDoctor}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}


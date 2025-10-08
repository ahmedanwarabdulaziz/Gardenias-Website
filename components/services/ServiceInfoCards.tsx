'use client';

import { Box, Container, Card, CardContent, Typography } from '@mui/material';

interface ServiceInfoCardsProps {
  whoItsFor: string[];
  commonConditions: string[];
  expectedBenefits: string[];
}

export default function ServiceInfoCards({
  whoItsFor,
  commonConditions,
  expectedBenefits,
}: ServiceInfoCardsProps) {
  const cards = [
    {
      title: "Who It's For",
      items: whoItsFor,
    },
    {
      title: "Common Conditions Addressed",
      items: commonConditions,
    },
    {
      title: "Expected Benefits",
      items: expectedBenefits,
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#f8f9fa',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 0 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 2 } }}>
          {cards.map((card, index) => (
            <Box key={index} sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #008d80 0%, #00b09b 50%, #00d4b0 100%)',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(0, 141, 128, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
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
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 28px rgba(0, 141, 128, 0.4)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                  {/* Title */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 3,
                      textAlign: 'center',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      fontSize: '1.5rem',
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* List Items */}
                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                    {card.items.map((item, idx) => (
                      <Box
                        component="li"
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: 1.5,
                          '&::before': {
                            content: '"✓"',
                            display: 'inline-block',
                            fontWeight: 700,
                            fontSize: '1.1rem',
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
          ))}
        </Box>
      </Container>
    </Box>
  );
}


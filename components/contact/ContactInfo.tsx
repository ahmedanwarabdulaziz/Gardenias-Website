'use client';

import { Box, Typography, Card } from '@mui/material';
import { Phone, EnvelopeSimple, MapPin, Clock } from 'phosphor-react';

export default function ContactInfo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography
        component="h2"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '2.5rem' },
          color: '#008d80',
          mb: 2,
        }}
      >
        Get in Touch
      </Typography>

      {/* Phone */}
      <Card
        sx={{
          p: 3,
          borderRadius: '12px',
          border: '2px solid #008d8020',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#008d80',
            boxShadow: '0 8px 24px rgba(0,141,128,0.15)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              bgcolor: '#008d8015',
              p: 2,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Phone size={28} weight="duotone" color="#008d80" />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#333',
                mb: 0.5,
              }}
            >
              Phone
            </Typography>
              <Typography
                sx={{
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: '1rem',
                  color: '#666',
                }}
              >
                +1 (647) 328-6563
              </Typography>
          </Box>
        </Box>
      </Card>

      {/* Email */}
      <Card
        sx={{
          p: 3,
          borderRadius: '12px',
          border: '2px solid #008d8020',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#008d80',
            boxShadow: '0 8px 24px rgba(0,141,128,0.15)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              bgcolor: '#008d8015',
              p: 2,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <EnvelopeSimple size={28} weight="duotone" color="#008d80" />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#333',
                mb: 0.5,
              }}
            >
              Email
            </Typography>
              <Typography
                sx={{
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: '1rem',
                  color: '#666',
                }}
              >
                Info@gardenias-healthcare.net
              </Typography>
          </Box>
        </Box>
      </Card>

      {/* Address */}
      <Card
        sx={{
          p: 3,
          borderRadius: '12px',
          border: '2px solid #008d8020',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#008d80',
            boxShadow: '0 8px 24px rgba(0,141,128,0.15)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              bgcolor: '#008d8015',
              p: 2,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MapPin size={28} weight="duotone" color="#008d80" />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#333',
                mb: 0.5,
              }}
            >
              Address
            </Typography>
              <Typography
                sx={{
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: 1.6,
                }}
              >
                348 Bronte St South<br />
                Unit #12<br />
                Milton, ON L9T 5B6
              </Typography>
          </Box>
        </Box>
      </Card>

      {/* Hours */}
      <Card
        sx={{
          p: 3,
          borderRadius: '12px',
          border: '2px solid #008d8020',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#008d80',
            boxShadow: '0 8px 24px rgba(0,141,128,0.15)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              bgcolor: '#008d8015',
              p: 2,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={28} weight="duotone" color="#008d80" />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#333',
                mb: 0.5,
              }}
            >
              Hours
            </Typography>
              <Typography
                sx={{
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: 1.6,
                }}
              >
                Monday - Friday: 9:00 AM - 10:00 PM<br />
                Saturday: 9:00 AM - 5:00 PM<br />
                Sunday: 9:00 AM - 8:00 PM
              </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}


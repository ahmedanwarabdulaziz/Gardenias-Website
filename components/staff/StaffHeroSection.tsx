'use client';

import { Box, Container, Typography, Chip, Breadcrumbs, Link, Button } from '@mui/material';
import { House, CaretRight, Calendar, EnvelopeSimple, Phone } from 'phosphor-react';

interface StaffHeroSectionProps {
  name: string;
  title: string;
  credentials?: string;
  picture?: string;
  heroImage?: string;
  shortBio?: string;
  yearsOfExperience?: string;
  spokenLanguages?: string[];
  email?: string;
  phone?: string;
  bookingLink?: string;
}

export default function StaffHeroSection({
  name,
  title,
  credentials,
  picture,
  heroImage,
  shortBio,
  yearsOfExperience,
  spokenLanguages,
  email,
  phone,
  bookingLink,
}: StaffHeroSectionProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '500px', md: '600px' },
        backgroundImage: heroImage
          ? `url(${heroImage})`
          : 'linear-gradient(135deg, #008d80 0%, #007067 100%)',
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
      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 2, 
        pt: { xs: 2, md: 8 }, 
        pb: { xs: 4, md: 8 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'space-between', md: 'flex-start' },
        gap: { xs: 0, md: 0 }
      }}>
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
          <Link
            href="/#team"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: '"Source Sans Pro", sans-serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              '&:hover': {
                color: 'white',
                textShadow: '0 2px 12px rgba(0,0,0,1)',
              },
            }}
          >
            Our Team
          </Link>
          <Typography
            sx={{
              color: 'white',
              fontSize: '0.9rem',
              fontFamily: '"Source Sans Pro", sans-serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            {name}
          </Typography>
        </Breadcrumbs>

        {/* Main Content Wrapper */}
        <Box sx={{ mt: { xs: 'auto', md: 0 }, pt: { xs: 31, md: 0 } }}>
        {/* Professional Badge */}
        {credentials && (
          <Box sx={{ mb: { xs: 1.5, md: 3 } }}>
            <Chip
              label={credentials}
              sx={{
                bgcolor: 'rgba(255,255,255,0.95)',
                color: '#008d80',
                fontWeight: 700,
                fontSize: '0.85rem',
                fontFamily: '"Source Sans Pro", sans-serif',
                border: '2px solid #008d80',
                px: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            />
          </Box>
        )}

        {/* Staff Name */}
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            color: 'white',
            mb: { xs: 1, md: 2 },
            lineHeight: 1.1,
            textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)',
            maxWidth: '800px',
          }}
        >
          {name}
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            fontFamily: '"Source Sans Pro", sans-serif',
            fontSize: { xs: '1.3rem', md: '1.5rem' },
            color: 'white',
            fontWeight: 600,
            mb: { xs: 1.5, md: 3 },
            textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </Typography>

        {/* Short Bio */}
        {shortBio && (
          <Typography
            sx={{
              fontFamily: '"Source Sans Pro", sans-serif',
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'white',
              lineHeight: { xs: 1.5, md: 1.8 },
              mb: { xs: 2, md: 4 },
              maxWidth: '700px',
              textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)',
            }}
          >
            {shortBio}
          </Typography>
        )}

        {/* Main Content and Side Info */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: { xs: 'flex-start', lg: 'flex-end' } }}>
          {/* Left Side - Contact Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {bookingLink && (
              <Button
                component="a"
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Calendar size={20} weight="fill" />}
                sx={{
                  bgcolor: '#008d80',
                  color: 'white',
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(0,141,128,0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#007067',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(0,141,128,0.5)',
                  },
                }}
              >
                Book Appointment
              </Button>
            )}
          </Box>

          {/* Right Side - Quick Info */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: { xs: 'flex-start', lg: 'flex-end' },
            gap: 2,
            minWidth: { xs: 'auto', lg: '300px' }
          }}>
            {/* Years of Experience */}
            {yearsOfExperience && (
              <Box sx={{ textAlign: { xs: 'left', lg: 'right' } }}>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 0.5,
                  }}
                >
                  Experience
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'white',
                    textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)',
                  }}
                >
                  {yearsOfExperience} years
                </Typography>
              </Box>
            )}

            {/* Languages */}
            {spokenLanguages && spokenLanguages.length > 0 && (
              <Box sx={{ textAlign: { xs: 'left', lg: 'right' } }}>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 1,
                  }}
                >
                  Languages
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'flex-start', lg: 'flex-end' } }}>
                  {spokenLanguages.map((lang, index) => (
                    <Chip
                      key={index}
                      label={lang}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(0,141,128,0.2)',
                        color: '#00d4c0',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        fontFamily: '"Source Sans Pro", sans-serif',
                        border: '1px solid rgba(0,141,128,0.3)',
                        '& .MuiChip-label': {
                          px: 1.5,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        </Box>
      </Container>
    </Box>
  );
}


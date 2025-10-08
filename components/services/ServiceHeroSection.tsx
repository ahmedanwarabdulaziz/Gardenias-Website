'use client';

import { Box, Container, Typography, Chip, Breadcrumbs, Link, Button } from '@mui/material';
import { House, CaretRight, Calendar } from 'phosphor-react';

interface ServiceHeroSectionProps {
  title: string;
  shortDescription: string;
  heroImage?: string;
  categoryName?: string;
  sessionDurations?: { duration: number; price: number }[];
  bookingLink?: string;
}

export default function ServiceHeroSection({
  title,
  shortDescription,
  heroImage,
  categoryName,
  sessionDurations,
  bookingLink,
}: ServiceHeroSectionProps) {
  const lowestPrice = sessionDurations && sessionDurations.length > 0
    ? Math.min(...sessionDurations.map(d => d.price))
    : null;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '500px', md: '600px' },
        backgroundImage: heroImage
          ? `url(${heroImage})`
          : 'linear-gradient(135deg, #008d80 0%, #007067 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 8 } }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<CaretRight size={16} color="rgba(255,255,255,0.7)" />}
          sx={{ mb: 3 }}
        >
          <Link
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'rgba(255,255,255,0.9)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            <House size={18} weight="fill" />
            <Typography sx={{ fontFamily: '"Source Sans Pro", sans-serif', fontSize: '0.9rem' }}>
              Home
            </Typography>
          </Link>
          <Link
            href="/services"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: '"Source Sans Pro", sans-serif',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            Services
          </Link>
          {categoryName && (
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                fontFamily: '"Source Sans Pro", sans-serif',
              }}
            >
              {categoryName}
            </Typography>
          )}
        </Breadcrumbs>

        {/* Category Badge */}
        {categoryName && (
          <Box sx={{ mb: 3 }}>
            <Chip
              label={categoryName}
              sx={{
                bgcolor: 'rgba(0,212,192,0.2)',
                color: '#00d4c0',
                fontWeight: 700,
                fontSize: '0.85rem',
                fontFamily: '"Source Sans Pro", sans-serif',
                border: '1px solid rgba(0,212,192,0.5)',
                px: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            />
          </Box>
        )}

        {/* Service Title */}
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            color: 'white',
            mb: 3,
            lineHeight: 1.1,
            textShadow: '0 4px 12px rgba(0,0,0,0.5)',
            maxWidth: '800px',
          }}
        >
          {title}
        </Typography>

        {/* Short Description */}
        <Typography
          sx={{
            fontFamily: '"Source Sans Pro", sans-serif',
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.8,
            mb: 4,
            maxWidth: '700px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {shortDescription}
        </Typography>

        {/* Main Content and Side Info */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: { xs: 'flex-start', lg: 'flex-end' } }}>
          {/* Left Side - Book Now Button */}
          <Box sx={{ flex: 1 }}>
            {bookingLink && (
              <Button
                component="a"
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Calendar size={24} weight="fill" />}
                sx={{
                  bgcolor: '#008d80',
                  color: 'white',
                  px: 6,
                  py: 3,
                  borderRadius: '50px',
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.2rem',
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
                Book Now
              </Button>
            )}
          </Box>

          {/* Right Side - Price and Duration Info */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: { xs: 'flex-start', lg: 'flex-end' },
            gap: 2,
            minWidth: { xs: 'auto', lg: '300px' }
          }}>
            {/* Starting Price Label */}
            {lowestPrice && (
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
                  Starting from
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'white',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  ${lowestPrice}
                </Typography>
              </Box>
            )}

            {/* Available Durations */}
            {sessionDurations && sessionDurations.length > 0 && (
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
                  Available Durations
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'flex-start', lg: 'flex-end' } }}>
                  {sessionDurations.map((duration, index) => (
                    <Chip
                      key={index}
                      label={`${duration.duration} min`}
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
      </Container>
    </Box>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, EnvelopeSimple, MapPin, FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo, YoutubeLogo } from 'phosphor-react';
import { SocialMediaService, SocialMedia } from '@/lib/socialMediaService';

const getIconComponent = (platform: string) => {
  switch (platform) {
    case 'Facebook': return FacebookLogo;
    case 'Instagram': return InstagramLogo;
    case 'Twitter': return TwitterLogo;
    case 'LinkedIn': return LinkedinLogo;
    case 'YouTube': return YoutubeLogo;
    case 'TikTok': return InstagramLogo; // Use Instagram icon as placeholder for TikTok
    default: return FacebookLogo;
  }
};

export default function WebsiteFooter() {
  const currentYear = new Date().getFullYear();
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMedia[]>([]);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const links = await SocialMediaService.getEnabledSocialMedia();
        setSocialMediaLinks(links);
      } catch (error) {
        console.error('Error fetching social media:', error);
      }
    };

    fetchSocialMedia();
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #008d80 0%, #006b5f 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Main Footer Content */}
      <Box sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* About Section */}
            <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Image
                src="/images/logo.png"
                alt="Gardenias Healthcare"
                width={320}
                height={110}
                style={{ 
                  objectFit: 'contain',
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.85)',
                mb: 4,
                maxWidth: '400px',
              }}
            >
              Dedicated to providing exceptional healthcare services with compassion, expertise, and cutting-edge treatments.
            </Typography>
            
            {/* Social Media */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {socialMediaLinks.map((social) => {
                const IconComponent = getIconComponent(social.platform);
                return (
                  <Box
                    key={social.id}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.95)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 20px rgba(255,255,255,0.3)',
                        borderColor: 'white',
                        '& svg': {
                          color: '#008d80',
                        },
                      },
                    }}
                  >
                    <IconComponent size={22} weight="fill" color="white" />
                  </Box>
                );
              })}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: 'white',
                mb: 3,
                position: 'relative',
                paddingBottom: '12px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: '2px',
                },
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/#services' },
                { label: 'Our Team', href: '/#team' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '1rem',
                      color: 'rgba(255,255,255,0.8)',
                      transition: 'all 0.3s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': {
                        color: 'white',
                        paddingLeft: '8px',
                      },
                      '&::before': {
                        content: '"→"',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Business Hours */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: 'white',
                mb: 3,
                position: 'relative',
                paddingBottom: '12px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: '2px',
                },
              }}
            >
              Hours
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '1rem',
                    color: 'white',
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Mon - Fri
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  9:00 AM - 10:00 PM
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '1rem',
                    color: 'white',
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Saturday
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  9:00 AM - 5:00 PM
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '1rem',
                    color: 'white',
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Sunday
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans Pro", sans-serif',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  9:00 AM - 8:00 PM
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: 'white',
                mb: 3,
                position: 'relative',
                paddingBottom: '12px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: '2px',
                },
              }}
            >
              Get in Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Phone */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    minWidth: 40,
                    height: 40,
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={20} weight="fill" color="white" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.6)',
                      mb: 0.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Call Us
                  </Typography>
                  <Typography
                    component="a"
                    href="tel:+16473286563"
                    sx={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '1rem',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    +1 (647) 328-6563
                  </Typography>
                </Box>
              </Box>

              {/* Email */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    minWidth: 40,
                    height: 40,
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EnvelopeSimple size={20} weight="fill" color="white" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.6)',
                      mb: 0.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Email Us
                  </Typography>
                  <Typography
                    component="a"
                    href="mailto:Info@gardenias-healthcare.net"
                    sx={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '0.95rem',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 500,
                      wordBreak: 'break-word',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    Info@gardenias-healthcare.net
                  </Typography>
                </Box>
              </Box>

              {/* Address */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    minWidth: 40,
                    height: 40,
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={20} weight="fill" color="white" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.6)',
                      mb: 0.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Visit Us
                  </Typography>
                  <Typography
                    component="a"
                    href="https://www.google.com/maps/dir/?api=1&destination=348+Bronte+St+South+Unit+12+Milton+ON+L9T+5B6"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '0.95rem',
                      color: 'white',
                      textDecoration: 'none',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    348 Bronte St South, Unit #12<br />
                    Milton, ON L9T 5B6
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          py: 3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Source Sans Pro", sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.7)',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © {currentYear} Gardenias Healthcare Clinic. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Link href="/privacy" style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#f27921',
                  },
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/terms" style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#f27921',
                  },
                }}
              >
                Terms of Service
              </Typography>
            </Link>
          </Box>
        </Box>
        </Container>
      </Box>
    </Box>
  );
}

'use client';

import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';
import Link from 'next/link';
import { PublicCategory, PublicService } from '@/lib/publicCategoryService';

interface StaffServicesSectionProps {
  staffName: string;
  categories: PublicCategory[];
  services: PublicService[];
}

export default function StaffServicesSection({ staffName, categories, services }: StaffServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');

  const filteredServices = services.filter(service => service.categoryId === selectedCategory);
  const currentCategory = categories.find(c => c.id === selectedCategory);

  if (categories.length === 0 || services.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Typography
          component="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#008d80',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Services Offered
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Source Sans Pro", sans-serif',
            fontSize: '1.1rem',
            color: '#666',
            mb: 5,
            textAlign: 'center',
          }}
        >
          Explore the specialized services provided by {staffName.split(' ')[0]}
        </Typography>

        {/* Category Cards */}
        {categories.length > 1 && (
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: `repeat(${Math.min(categories.length, 5)}, 1fr)`,
                },
                gap: { xs: 2, md: 3 },
              }}
            >
              {categories.map((category, index) => {
                const isSelected = selectedCategory === category.id;
                const backgroundImage = category.icon || '';

                return (
                  <Box
                    key={category.id}
                    sx={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes fadeInUp': {
                        from: {
                          opacity: 0,
                          transform: 'translateY(30px)',
                        },
                        to: {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                    }}
                  >
                    <Card
                      onClick={() => {
                        setSelectedCategory(category.id);
                        // Smooth scroll to services list
                        setTimeout(() => {
                          const servicesListElement = document.getElementById('services-list');
                          if (servicesListElement) {
                            servicesListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }}
                      sx={{
                        height: { xs: 140, md: 160 },
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: isSelected ? `3px solid ${category.accentColor}` : '2px solid rgba(255,255,255,0.3)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: isSelected 
                          ? `0 20px 40px ${category.accentColor}50, 0 0 0 3px ${category.accentColor}20, inset 0 1px 0 rgba(255,255,255,0.4)`
                          : '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)',
                        transform: isSelected ? 'translateY(-12px) scale(1.05)' : 'translateY(0) scale(1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: isSelected 
                            ? `linear-gradient(135deg, ${category.accentColor}dd 0%, ${category.accentColor}bb 100%)`
                            : `linear-gradient(135deg, ${category.accentColor}40 0%, ${category.accentColor}60 100%)`,
                          zIndex: 1,
                          transition: 'all 0.3s ease',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
                          zIndex: 3,
                          opacity: isSelected ? 0.4 : 0.25,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          transform: isSelected ? 'translateY(-12px) scale(1.05)' : 'translateY(-8px) scale(1.02)',
                          boxShadow: isSelected
                            ? `0 24px 48px ${category.accentColor}60, 0 0 0 3px ${category.accentColor}30, inset 0 1px 0 rgba(255,255,255,0.5)`
                            : `0 16px 40px ${category.accentColor}40, inset 0 1px 0 rgba(255,255,255,0.4)`,
                          borderColor: isSelected ? category.accentColor : 'rgba(255,255,255,0.5)',
                          '&::before': {
                            background: isSelected 
                              ? `linear-gradient(135deg, ${category.accentColor}ee 0%, ${category.accentColor}cc 100%)`
                              : `linear-gradient(135deg, ${category.accentColor}50 0%, ${category.accentColor}70 100%)`,
                          },
                          '&::after': {
                            opacity: 0.5,
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ 
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        position: 'relative',
                        zIndex: 2,
                        p: { xs: 2, md: 3 },
                      }}>
                        {/* Selection Badge */}
                        {isSelected && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              bgcolor: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              animation: 'scaleIn 0.3s ease-out',
                              boxShadow: `0 4px 12px ${category.accentColor}60`,
                              '@keyframes scaleIn': {
                                from: { transform: 'scale(0)' },
                                to: { transform: 'scale(1)' },
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: category.accentColor,
                              }}
                            />
                          </Box>
                        )}
                        
                        <Typography
                          sx={{
                            fontFamily: '"Source Sans Pro", sans-serif',
                            fontWeight: 700,
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            color: 'white',
                            letterSpacing: '0.02em',
                            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            lineHeight: 1.2,
                          }}
                        >
                          {category.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Services List */}
        <Box
          id="services-list"
          sx={{
            bgcolor: '#f8faf9',
            borderRadius: '16px',
            p: { xs: 3, md: 4 },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            {currentCategory?.icon && (
              <Box 
                component="img" 
                src={currentCategory.icon} 
                alt={currentCategory.name}
                sx={{ width: 40, height: 40, objectFit: 'contain' }}
              />
            )}
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: { xs: '1.5rem', md: '2rem' },
                color: '#333',
              }}
            >
              {currentCategory?.name} Services
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const bannerImage = service.galleryImages?.[0] || service.heroImage;

                return (
                  <Card
                    key={service.id}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '2px solid transparent',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${currentCategory?.accentColor || '#008d80'}30`,
                        borderColor: currentCategory?.accentColor || '#008d80',
                      },
                    }}
                  >
                    {/* Banner Image */}
                    <Box
                      sx={{
                        position: 'relative',
                        height: 180,
                        backgroundImage: bannerImage 
                          ? `url(${bannerImage})`
                          : `linear-gradient(135deg, #e6e7e8 0%, #f5f5f5 100%)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                          zIndex: 1,
                          pointerEvents: 'none',
                        },
                      }}
                    >
                      {/* Service Title - At Bottom of Banner */}
                      <Typography
                        sx={{
                          fontFamily: '"Source Sans Pro", sans-serif',
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          color: 'white',
                          lineHeight: 1.3,
                          position: 'relative',
                          zIndex: 2,
                          p: 2.5,
                          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        {service.name}
                      </Typography>
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ pt: 3, pb: 3, px: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      <Typography
                        sx={{
                          fontFamily: '"Source Sans Pro", sans-serif',
                          fontSize: '0.95rem',
                          color: '#666',
                          lineHeight: 1.6,
                          mb: 2.5,
                          flexGrow: 1,
                        }}
                      >
                        {service.shortDescription}
                      </Typography>

                      {/* Available Durations */}
                      {service.sessionDurations && service.sessionDurations.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            sx={{
                              fontFamily: '"Source Sans Pro", sans-serif',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: '#999',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              mb: 1,
                            }}
                          >
                            Available Durations
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {service.sessionDurations.map((duration, idx) => (
                              <Chip
                                key={idx}
                                label={`${duration.duration} min`}
                                size="small"
                                sx={{
                                  bgcolor: '#008d8010',
                                  color: '#008d80',
                                  fontWeight: 600,
                                  fontSize: '0.8rem',
                                  fontFamily: '"Source Sans Pro", sans-serif',
                                  border: '1px solid #008d8030',
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Starting Price */}
                      {service.sessionDurations && service.sessionDurations.length > 0 && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: '"Source Sans Pro", sans-serif',
                              fontSize: '0.85rem',
                              color: '#999',
                              fontWeight: 500,
                            }}
                          >
                            Starting from
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: '"Source Sans Pro", sans-serif',
                              fontSize: '1.5rem',
                              fontWeight: 700,
                              color: '#008d80',
                            }}
                          >
                            ${Math.min(...service.sessionDurations.map(d => d.price))}
                          </Typography>
                        </Box>
                      )}

                      {/* Action Buttons */}
                      <Box
                        sx={{
                          pt: 2,
                          borderTop: '1px solid #f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 2,
                        }}
                      >
                        {/* Learn More Link */}
                        <Link
                          href={`/services/${service.slug || service.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              color: '#008d80',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              '&:hover': {
                                gap: 1.5,
                              },
                              transition: 'gap 0.3s ease',
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: '"Source Sans Pro", sans-serif',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                              }}
                            >
                              Learn More
                            </Typography>
                            <Box
                              sx={{
                                fontSize: '1.2rem',
                                transition: 'transform 0.3s ease',
                              }}
                            >
                              →
                            </Box>
                          </Box>
                        </Link>

                        {/* Book Now Button */}
                        {service.bookingLink && (
                          <Box
                            component="a"
                            href={service.bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              bgcolor: '#008d80',
                              color: 'white',
                              px: 3,
                              py: 1,
                              borderRadius: '8px',
                              fontFamily: '"Source Sans Pro", sans-serif',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 1,
                              transition: 'all 0.3s ease',
                              boxShadow: '0 2px 8px rgba(0,141,128,0.3)',
                              '&:hover': {
                                bgcolor: '#007067',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,141,128,0.4)',
                              },
                            }}
                          >
                            Book Now
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 8 }}>
                <Typography 
                  sx={{ 
                    fontFamily: '"Source Sans Pro", sans-serif',
                    color: '#999', 
                    fontSize: '1.1rem',
                  }}
                >
                  No services available in this category yet.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


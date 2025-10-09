import { notFound } from 'next/navigation';
import { Box, Container, Typography, Chip, Avatar, Card, CardContent, Grid } from '@mui/material';
import StaffHeroSection from '@/components/staff/StaffHeroSection';
import StaffServicesSection from '@/components/staff/StaffServicesSection';
import { PublicStaffService } from '@/lib/publicStaffService';
import { PublicCategoryService } from '@/lib/publicCategoryService';
import { GraduationCap, Certificate, Briefcase } from 'phosphor-react';

interface StaffPageProps {
  params: {
    slug: string;
  };
}

export default async function StaffPage({ params }: StaffPageProps) {
  const { slug } = params;
  
  // Fetch staff data
  const staff = await PublicStaffService.getStaffBySlug(slug);

  if (!staff) {
    notFound();
  }

  // Fetch services for this staff member
  const services = await PublicCategoryService.getServicesByStaffId(staff.id);
  
  // Fetch all categories
  const allCategories = await PublicCategoryService.getPublicCategories();
  
  // Get unique category IDs from services
  const serviceCategoryIds = [...new Set(services.map(s => s.categoryId))];
  
  // Filter categories to only those that have services from this staff member
  const categories = allCategories.filter(cat => serviceCategoryIds.includes(cat.id));

  return (
    <Box>
      {/* Hero Section */}
      <StaffHeroSection
        name={staff.name}
        title={staff.title}
        credentials={staff.credentials}
        picture={staff.picture}
        heroImage={staff.heroImage}
        shortBio={staff.shortBio}
        yearsOfExperience={staff.yearsOfExperience}
        spokenLanguages={staff.spokenLanguages}
        email={staff.email}
        phone={staff.phone}
        bookingLink={staff.bookingLink}
      />
      
      {/* Full Biography Section - Will be added in next step */}
      {staff.fullBiography && (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8faf9' }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: '#008d80',
                mb: 4,
              }}
            >
              About {staff.name.split(' ')[0]}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontSize: '1.1rem',
                color: '#666',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}
            >
              {staff.fullBiography}
            </Typography>
          </Container>
        </Box>
      )}

      {/* Areas of Specialization */}
      {staff.areasOfSpecialization && staff.areasOfSpecialization.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: '#008d80',
                mb: 4,
                textAlign: 'center',
              }}
            >
              Areas of Specialization
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {staff.areasOfSpecialization.map((area, index) => (
                <Chip
                  key={index}
                  label={area}
                  sx={{
                    bgcolor: '#008d8010',
                    color: '#008d80',
                    fontWeight: 600,
                    fontSize: '1rem',
                    fontFamily: '"Source Sans Pro", sans-serif',
                    border: '2px solid #008d8030',
                    px: 2,
                    py: 3,
                    borderRadius: '12px',
                    '&:hover': {
                      bgcolor: '#008d8020',
                      borderColor: '#008d80',
                    },
                  }}
                />
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Education & Credentials - Will be enhanced in next step */}
      {staff.education && staff.education.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8faf9' }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: '#008d80',
                mb: 4,
                textAlign: 'center',
              }}
            >
              Education & Credentials
            </Typography>
            <Grid container spacing={3}>
              {staff.education.map((edu, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: '12px',
                      border: '2px solid #008d8020',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#008d80',
                        boxShadow: '0 8px 24px rgba(0,141,128,0.15)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#008d80',
                          mb: 1,
                        }}
                      >
                        {edu.program}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Source Sans Pro", sans-serif',
                          fontSize: '1rem',
                          color: '#666',
                          mb: 0.5,
                        }}
                      >
                        {edu.institution}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Source Sans Pro", sans-serif',
                          fontSize: '0.9rem',
                          color: '#999',
                        }}
                      >
                        {edu.year}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Professional Associations - Placeholder for next step */}
      {staff.associations && (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: '#008d80',
                mb: 4,
                textAlign: 'center',
              }}
            >
              Professional Associations
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontSize: '1.1rem',
                color: '#666',
                lineHeight: 1.8,
                textAlign: 'center',
                whiteSpace: 'pre-wrap',
              }}
            >
              {staff.associations}
            </Typography>
          </Container>
        </Box>
      )}

      {/* Services Section */}
      <StaffServicesSection 
        staffName={staff.name}
        categories={categories}
        services={services}
      />
    </Box>
  );
}

// Generate static params for all staff members (optional, for static generation)
export async function generateStaticParams() {
  const staff = await PublicStaffService.getPublicStaff();
  
  return staff.map((member) => ({
    slug: member.slug || member.id,
  }));
}


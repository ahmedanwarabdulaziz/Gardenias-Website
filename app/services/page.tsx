'use client';

import { Box } from '@mui/material';
import ServicesHeroSection from '@/components/services/ServicesHeroSection';
import ServicesSection from '@/components/website/ServicesSection';

export default function ServicesPage() {
  return (
    <Box>
      {/* Hero Section */}
      <ServicesHeroSection
        title="Our Services"
        heroImage="/images/Oyeservices.png"
      />

      {/* Services Section - Same as Home Page */}
      <ServicesSection />
    </Box>
  );
}


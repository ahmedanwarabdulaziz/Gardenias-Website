'use client';

import { Box } from '@mui/material';
import ServicesHeroSection from '@/components/services/ServicesHeroSection';
import StaffSectionInteractive from '@/components/website/StaffSectionInteractive';

export default function StaffPage() {
  return (
    <Box>
      {/* Hero Section */}
      <ServicesHeroSection
        title="Our Staff"
        heroImage="/images/staaaf.png"
      />

      {/* Staff Section - Same as Home Page */}
      <StaffSectionInteractive />
    </Box>
  );
}

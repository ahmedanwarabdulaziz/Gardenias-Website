import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

// Lazy load components for better performance
const HeroSection = dynamic(() => import('@/components/website/HeroSection'), {
  loading: () => <div style={{ height: '600px', backgroundColor: '#f5f5f5' }} />,
});

const ServicesSection = dynamic(() => import('@/components/website/ServicesSection'), {
  loading: () => <div style={{ height: '400px', backgroundColor: '#f8faf9' }} />,
});

const StaffSection = dynamic(() => import('@/components/website/StaffSectionInteractive'), {
  loading: () => <div style={{ height: '400px', backgroundColor: '#f8faf9' }} />,
});

export default function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Staff Section */}
      <StaffSection />
      
      {/* Other sections will be added here */}
    </Box>
  );
}

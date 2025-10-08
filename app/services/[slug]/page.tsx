import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import ServiceHeroSection from '@/components/services/ServiceHeroSection';
import ServiceAboutSection from '@/components/services/ServiceAboutSection';
import ServiceInfoCards from '@/components/services/ServiceInfoCards';
import ServiceContraindicationsSection from '@/components/services/ServiceContraindicationsSection';
import ServiceSessionExperience from '@/components/services/ServiceSessionExperience';
import ServiceBookingNotes from '@/components/services/ServiceBookingNotes';
import { PublicCategoryService } from '@/lib/publicCategoryService';
import { PublicStaffService } from '@/lib/publicStaffService';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = params;
  
  // Fetch service data
  const service = await PublicCategoryService.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Fetch category name
  const categories = await PublicCategoryService.getPublicCategories();
  const category = categories.find(cat => cat.id === service.categoryId);

  // Fetch staff data for practitioners assigned to this service
  const allStaff = await PublicStaffService.getPublicStaff();
  const practitioners = allStaff.filter(staff => 
    service.practitioners?.includes(staff.id)
  );

  return (
    <Box>
      {/* Hero Section */}
      <ServiceHeroSection
        title={service.name}
        shortDescription={service.shortDescription}
        heroImage={service.heroImage}
        categoryName={category?.name}
        sessionDurations={service.sessionDurations}
        bookingLink={service.bookingLink}
      />
      
      {/* About Section */}
      <ServiceAboutSection
        serviceName={service.name}
        fullDescription={service.fullDescription}
      />
      
      {/* Session Experience Section */}
      <ServiceSessionExperience
        firstVisitOverview={service.firstVisitOverview || ''}
        whatToWear={service.whatToWear || []}
        aftercareAdvice={service.aftercareAdvice || []}
        image={service.galleryImages?.[0] || service.heroImage}
      />
      
      {/* Info Cards Section */}
      <ServiceInfoCards
        whoItsFor={service.whoItsFor || []}
        commonConditions={service.commonConditions || []}
        expectedBenefits={service.expectedBenefits || []}
      />
      
      {/* Contraindications Section */}
      <ServiceContraindicationsSection
        contraindications={service.contraindications || []}
        whenToSeeDoctor={service.whenToSeeDoctor}
      />
      
      {/* Booking Notes Section */}
      <ServiceBookingNotes
        preBookingNote={service.preBookingNote}
        postBookingInstructions={service.postBookingInstructions}
        practitioners={practitioners}
      />
      
      {/* Other sections will be added here step by step */}
    </Box>
  );
}

// Generate static params for all services (optional, for static generation)
export async function generateStaticParams() {
  const services = await PublicCategoryService.getPublicServices();
  
  return services.map((service) => ({
    slug: service.slug || service.id,
  }));
}


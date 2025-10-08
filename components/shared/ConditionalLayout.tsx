'use client';

import { usePathname } from 'next/navigation';
import WebsiteHeader from '@/components/website/WebsiteHeader';
import WebsiteFooter from '@/components/website/WebsiteFooter';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ 
  children
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if admin route
  const isAdminRoute = pathname?.startsWith('/admin');
  
  if (isAdminRoute) {
    return <main>{children}</main>;
  }
  
  return (
    <>
      <WebsiteHeader />
      <main>{children}</main>
      <WebsiteFooter />
    </>
  );
}

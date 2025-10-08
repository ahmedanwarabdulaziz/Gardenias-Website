import { Typography, TypographyProps, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface BrandTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant?: 'header' | 'subheader' | 'text' | 'caption';
  children: ReactNode;
  sx?: SxProps;
}

export default function BrandTypography({
  variant = 'text',
  children,
  sx,
  ...props
}: BrandTypographyProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'header':
        return {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 700,
          fontSize: '2.5rem',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: '#2c3e50',
        };
      case 'subheader':
        return {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          fontSize: '1.25rem',
          lineHeight: 1.4,
          color: '#2c3e50',
        };
      case 'text':
        return {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: 1.6,
          color: '#2c3e50',
        };
      case 'caption':
        return {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: 1.5,
          color: '#6c757d',
        };
      default:
        return {};
    }
  };

  return (
    <Typography
      sx={{
        ...getVariantStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

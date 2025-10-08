import { Button, ButtonProps, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface BrandButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  children: ReactNode;
  sx?: SxProps;
}

export default function BrandButton({
  variant = 'primary',
  icon,
  children,
  sx,
  ...props
}: BrandButtonProps) {
  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: '#008d80',
        color: '#ffffff',
        border: '2px solid #008d80',
        '&:hover': {
          backgroundColor: '#006b5f',
          borderColor: '#006b5f',
        },
        '&:active': {
          backgroundColor: '#005a52',
        },
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#008d80',
        border: '2px solid #008d80',
        '&:hover': {
          backgroundColor: '#008d80',
          color: '#ffffff',
          borderColor: '#008d80',
        },
        '&:active': {
          backgroundColor: '#006b5f',
        },
      };
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={icon}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        padding: '12px 24px',
        minHeight: '48px',
        ...getVariantStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

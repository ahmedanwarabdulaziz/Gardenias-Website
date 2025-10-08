'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

// Healthcare system theme with brand colors (white and green #008d80)
const theme = createTheme({
  palette: {
    primary: {
      main: '#008d80', // Brand green
      light: '#00a896',
      dark: '#006b5f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff', // White
      light: '#ffffff',
      dark: '#f5f5f5',
      contrastText: '#008d80',
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#6c757d',
    },
    success: {
      main: '#008d80',
      light: '#00a896',
      dark: '#006b5f',
    },
  },
  typography: {
    // Modern, clean fonts for healthcare
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    // Subheader font - Clean and modern
    subtitle1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    // Text font - Clean and readable
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          fontSize: '1rem',
        },
        // Primary button - Green background, white text
        contained: {
          backgroundColor: '#008d80',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#006b5f',
          },
        },
        // Secondary button - White background, green text
        outlined: {
          borderColor: '#008d80',
          color: '#008d80',
          '&:hover': {
            backgroundColor: '#008d80',
            color: '#ffffff',
            borderColor: '#008d80',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,141,128,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#008d80',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          // Fix aria-hidden focus issues
          '&[aria-hidden="true"] *:focus': {
            outline: '2px solid #008d80',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '2px solid #008d80',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Memoize theme to prevent unnecessary re-renders
  const memoizedTheme = useMemo(() => theme, []);
  
  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

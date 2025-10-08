import { createTheme } from '@mui/material/styles';

// Healthcare system theme with professional colors
export const theme = createTheme({
  palette: {
    primary: {
      main: '#008d80', // Green brand color
      light: '#00d4c0',
      dark: '#007067',
    },
    secondary: {
      main: '#f27921', // Orange for accents
      light: '#F59B4A',
      dark: '#D65A0A',
    },
    background: {
      default: '#f8f9fa', // Light gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#008d80',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#e6e7e8',
        },
        bar: {
          backgroundColor: '#008d80',
        },
      },
    },
  },
});

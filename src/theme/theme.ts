'use client';

import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#00288e',
      light: '#dde1ff',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#515f74',
      light: '#d5e3fc',
      dark: '#3a485b',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#003c36',
      light: '#89f5e7',
      dark: '#00201d',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ba1a1a',
    },
    background: {
      default: '#f7f9fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#191c1e',
      secondary: '#444653',
    },
    // Custom Surface Container Tokens
    surface_container_lowest: '#ffffff',
    surface_container_low: '#f2f4f6',
    surface_container_high: '#e6e8ea',
    surface_container_highest: '#e0e3e5',
  } as any,
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 6, // matching 0.375rem (6px)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 20px 40px rgba(25, 28, 30, 0.06)',
          border: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '24px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          padding: '16px 24px',
        },
        head: {
          fontWeight: 600,
          color: '#515f74',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#f2f4f6',
          },
          '&:hover': {
            backgroundColor: '#eceef0 !important',
          },
        },
      },
    },
  },
});

export default theme;

'use client';

import React from 'react';
import { Box, styled } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const LayoutWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  marginLeft: 280, // Same as sidebar width
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
  },
}));

const LayoutContainer = styled('main')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 1440,
  margin: '0 auto',
  padding: theme.spacing(3, 4, 8, 4),
}));

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutRoot>
      <Sidebar />
      <LayoutWrapper>
        <Header />
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
}

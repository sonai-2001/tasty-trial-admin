'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  styled, 
  Button, 
  Stack, 
  Paper, 
  Avatar, 
  Badge,
  Chip,
  alpha 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainLayout from '@/components/layout/MainLayout';
import DataTable from '@/components/common/DataTable';
import MetricCard from '@/components/common/MetricCard';
import StoreIcon from '@mui/icons-material/Store';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#0D9488',
    color: '#0D9488',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const QueueSidebar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.surface_container_low || '#f2f4f6',
  borderRadius: 24,
  padding: theme.spacing(4, 3),
  height: '100%',
}));

const QueueCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 16,
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 20px rgba(25, 28, 30, 0.03)',
  border: 'none',
  marginBottom: theme.spacing(2),
  transition: theme.transitions.create(['transform', 'box-shadow']),
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(25, 28, 30, 0.06)',
  },
}));

const restaurantsData = [
  { name: 'Osteria Del Corso', owner: 'Marco Rossi', category: 'Italian', revenue: '$12,400', status: 'Status:Active' },
  { name: 'Blue Whale Sushi', owner: 'Kenji Tanaka', category: 'Japanese', revenue: '$8,900', status: 'Status:Active' },
  { name: 'The Burger Lab', owner: 'Sarah Jenkins', category: 'American', revenue: '$15,200', status: 'Status:Active' },
  { name: 'Le Petit Bistro', owner: 'Jean Dupont', category: 'French', revenue: '$6,500', status: 'Status:Maintenance' },
  { name: 'Spice Route', owner: 'Anita Nair', category: 'Indian', revenue: '$9,300', status: 'Status:Active' },
];

const onboardingQueue = [
  { id: 1, name: 'Green Bowl Co.', time: '2H AGO', district: 'Financial District', img: 'G' },
  { id: 2, name: 'Taco Haven', time: '5H AGO', district: 'West End', img: 'T' },
  { id: 3, name: 'Baguette House', time: '1D AGO', district: 'Riverside', img: 'B' },
];

export default function RestaurantManagement() {
  return (
    <MainLayout>
      <PageHeader>
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
            Operations & Curation
          </Typography>
          <Typography variant="h1" sx={{ mb: 1 }}>Restaurant Partners</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: 3,
            px: 4,
            background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
            boxShadow: '0 4px 14px rgba(0, 40, 142, 0.25)' 
          }}
        >
          Add Restaurant
        </Button>
      </PageHeader>

      <Grid container spacing={4}>
        {/* Main Content Area */}
        <Grid size={{ xs: 12, xl: 8 }}>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard 
                title="Total Active" 
                value="142" 
                accentColor="#0D9488"
                icon={<StoreIcon />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard 
                title="Pending Onboarding" 
                value="12" 
                accentColor="#B45309"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard 
                title="Average Rating" 
                value="4.8" 
                accentColor="#6366F1"
              />
            </Grid>
          </Grid>

          <DataTable 
            title="Active Restaurants"
            columns={['Restaurant Name', 'Primary Owner', 'Category', 'Monthly Revenue', 'Status']}
            rows={restaurantsData}
          />
        </Grid>

        {/* Onboarding Queue Sidebar */}
        <Grid size={{ xs: 12, xl: 4 }}>
          <QueueSidebar>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h3">Onboarding Queue</Typography>
                <Chip 
                  label="12 New" 
                  size="small" 
                  sx={{ 
                    backgroundColor: alpha('#0D9488', 0.1), 
                    color: '#0D9488', 
                    fontWeight: 700,
                    fontSize: '0.625rem',
                    height: 20
                  }} 
                />
              </Box>
            </Box>

            <Box>
              {onboardingQueue.map((item) => (
                <QueueCard key={item.id} elevation={0}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                      <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 700, fontSize: '1rem' }}>{item.img}</Avatar>
                    </StyledBadge>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>{item.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{item.time}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                    <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{item.district}</Typography>
                  </Box>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ 
                      borderRadius: 2, 
                      fontWeight: 700,
                      py: 1.2,
                      background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
                      boxShadow: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #001f70 0%, #15308b 100%)',
                      }
                    }}
                  >
                    Review Application
                  </Button>
                </QueueCard>
              ))}
            </Box>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button color="primary" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                View All Applications
              </Button>
            </Box>
          </QueueSidebar>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

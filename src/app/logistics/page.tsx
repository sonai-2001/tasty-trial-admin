'use client';

import React from 'react';
import { Box, Typography, styled, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainLayout from '@/components/layout/MainLayout';
import MetricCard from '@/components/common/MetricCard';
import TimelineIcon from '@mui/icons-material/Timeline';
import SpeedIcon from '@mui/icons-material/Speed';

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Kicker = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}));

const MapPlaceholder = styled(Paper)(({ theme }) => ({
  height: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 16,
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: 'radial-gradient(circle, #e6e8ea 1px, transparent 1px)',
  backgroundSize: '20px 20px',
}));

export default function LogisticsPage() {
  return (
    <MainLayout>
      <PageHeader>
        <Kicker variant="overline">Real-time Data</Kicker>
        <Typography variant="h1">Logistics Monitoring</Typography>
      </PageHeader>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard 
            title="Avg Prep Time" 
            value="14m 20s" 
            trend="up"
            change="+1.2m"
            icon={<SpeedIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard 
            title="Avg Delivery Time" 
            value="28m 45s" 
            trend="down"
            change="-2.5m"
            accentColor="#0D9488"
            icon={<TimelineIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard 
            title="Delayed Orders" 
            value="5" 
            accentColor="#ba1a1a"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard 
            title="Hot Zones Active" 
            value="3" 
            accentColor="#B45309"
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>Active Fleet Distribution</Typography>
        <MapPlaceholder>
          <Box sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
            <Typography variant="h3" color="primary" sx={{ mb: 2 }}>Interactive Grid Layout</Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time monitoring of delivery nodes and restaurant prep states. 
              The boundary is defined solely through background color shifts, not rigid lines.
            </Typography>
          </Box>
        </MapPlaceholder>
      </Box>
    </MainLayout>
  );
}

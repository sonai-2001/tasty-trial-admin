'use client';

import React from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainLayout from '@/components/layout/MainLayout';
import DataTable from '@/components/common/DataTable';
import MetricCard from '@/components/common/MetricCard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import MapIcon from '@mui/icons-material/Map';

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}));

const Kicker = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}));

export default function DriversPage() {
  const columns = ['Driver Name', 'Vehicle', 'City', 'Status', 'Active Deliveries'];
  const rows = [
    { name: 'Alex Johnson', vehicle: 'Bike', city: 'Manhattan', status: 'Status:Active', active: '2' },
    { name: 'Maria Garcia', vehicle: 'Car', city: 'Brooklyn', status: 'Status:Active', active: '1' },
    { name: 'Dmitri Petrov', vehicle: 'E-Scooter', city: 'Queens', status: 'Status:Offline', active: '0' },
    { name: 'Sarah Wilson', vehicle: 'Bike', city: 'Manhattan', status: 'Status:Active', active: '3' },
    { name: 'Kevin Hart', vehicle: 'Car', city: 'Bronx', status: 'Status:Active', active: '1' },
  ];

  return (
    <MainLayout>
      <PageHeader>
        <Box>
          <Kicker variant="overline">Logistics</Kicker>
          <Typography variant="h1">Driver Fleet</Typography>
        </Box>
        <Button variant="contained" startIcon={<MapIcon />}>
          Live Tracking Map
        </Button>
      </PageHeader>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard 
            title="Total Fleet" 
            value="342" 
            icon={<DeliveryDiningIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard 
            title="On Duty" 
            value="89" 
            accentColor="#0D9488"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard 
            title="Delivery Success" 
            value="99.4%" 
            accentColor="#6366F1"
          />
        </Grid>
      </Grid>

      <DataTable 
        columns={columns}
        rows={rows}
      />
    </MainLayout>
  );
}

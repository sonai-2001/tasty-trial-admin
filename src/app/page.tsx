'use client';

import React from 'react';
import { Box, Typography, Paper, styled, alpha } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainLayout from '@/components/layout/MainLayout';
import MetricCard from '@/components/common/MetricCard';
import DataTable from '@/components/common/DataTable';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StoreIcon from '@mui/icons-material/Store';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Kicker = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}));

const ChartPlaceholder = styled(Paper)(({ theme }) => ({
  height: 400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 16,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(to top, rgba(0, 40, 142, 0.05), transparent)',
  }
}));

export default function Home() {
  const tableColumns = ['Order ID', 'Restaurant', 'Customer', 'Amount', 'Status'];
  const tableRows = [
    { id: '#ORD-7210', restaurant: 'The Burger Joint', customer: 'John Doe', amount: '$42.50', status: 'Status:Active' },
    { id: '#ORD-7211', restaurant: 'Pizza Palace', customer: 'Jane Smith', amount: '$18.20', status: 'Status:Pending' },
    { id: '#ORD-7212', restaurant: 'Sushi Zen', customer: 'Robert Brown', amount: '$64.00', status: 'Status:Active' },
    { id: '#ORD-7213', restaurant: 'Taco Town', customer: 'Emily White', amount: '$21.10', status: 'Status:Completed' },
    { id: '#ORD-7214', restaurant: 'Pasta Pronto', customer: 'Chris Green', amount: '$35.00', status: 'Status:Active' },
  ];

  return (
    <MainLayout>
      <PageHeader>
        <Kicker variant="overline">Systems Review</Kicker>
        <Typography variant="h1">Analytics Overview</Typography>
      </PageHeader>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard 
            title="Total Revenue" 
            value="$128,430" 
            change="+12.5%" 
            trend="up"
            icon={<MonetizationOnIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard 
            title="Total Orders" 
            value="3,421" 
            change="+8.2%" 
            trend="up"
            accentColor="#0D9488"
            icon={<ShoppingBagIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard 
            title="Active Restaurants" 
            value="142" 
            change="-2.4%" 
            trend="down"
            accentColor="#B45309"
            icon={<StoreIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard 
            title="Deliveries" 
            value="1,840" 
            change="+15.0%" 
            trend="up"
            accentColor="#6366F1"
            icon={<DeliveryDiningIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Typography variant="h2" sx={{ mb: 3 }}>Platform Performance</Typography>
          <ChartPlaceholder>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary" sx={{ mb: 1.5 }}>Performance Graphic</Typography>
              <Typography variant="body2" color="text.secondary">
                Data treated with the same reverence as a gallery exhibit.
              </Typography>
            </Box>
          </ChartPlaceholder>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography variant="h2" sx={{ mb: 3 }}>Market Snapshot</Typography>
          <Paper sx={{ p: 4, height: 400, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { label: 'New York', value: '42%', color: '#00288e' },
              { label: 'London', value: '28%', color: '#1e40af' },
              { label: 'Tokyo', value: '18%', color: '#6366F1' },
              { label: 'Berlin', value: '12%', color: '#dde1ff' },
            ].map((market) => (
              <Box key={market.label}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{market.label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{market.value}</Typography>
                </Box>
                <Box sx={{ height: 4, width: '100%', backgroundColor: 'surface_container_low', borderRadius: 2 }}>
                  <Box sx={{ height: '100%', width: market.value, backgroundColor: market.color, borderRadius: 2 }} />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <DataTable 
        title="Recent Logistics Activity"
        columns={tableColumns}
        rows={tableRows}
      />
    </MainLayout>
  );
}

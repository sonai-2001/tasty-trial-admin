'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  styled, 
  Paper, 
  Switch, 
  Button, 
  Stack, 
  IconButton,
  Chip,
  alpha 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainLayout from '@/components/layout/MainLayout';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import MapIcon from '@mui/icons-material/Map';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 24,
  padding: theme.spacing(4),
  boxShadow: '0 8px 30px rgba(25, 28, 30, 0.02)',
  border: 'none',
  height: '100%',
}));

const ParameterInput = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.surface_container_high || '#e6e8ea',
  borderRadius: 12,
  padding: theme.spacing(1.5, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: theme.transitions.create(['box-shadow', 'background-color']),
  '&:focus-within': {
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    backgroundColor: theme.palette.surface_container_highest || '#e0e3e5',
  },
}));

const StyledInput = styled('input')(({ theme }) => ({
  border: 'none',
  background: 'transparent',
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  width: '100%',
  outline: 'none',
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.5,
  },
}));

const CuisineItem = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  borderBottom: `1px dashed ${alpha(theme.palette.divider, 0.1)}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const AlertCard = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.05),
  borderRadius: 16,
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.error.main}`,
}));

export default function MasterDataPage() {
  return (
    <MainLayout>
      <PageHeader>
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
            Enterprise Curator
          </Typography>
          <Typography variant="h1" sx={{ mb: 1 }}>Configuration Parameters</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="text" color="inherit">Audit Log</Button>
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: 3,
              px: 4,
              background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
              boxShadow: '0 4px 14px rgba(0, 40, 142, 0.25)' 
            }}
          >
            Commit Changes
          </Button>
        </Stack>
      </PageHeader>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Stack spacing={4}>
            {/* Cuisines Library */}
            <SectionCard>
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" sx={{ mb: 0.5 }}>Cuisines Library</Typography>
                  <Typography variant="body2" color="text.secondary">Manage global availability of culinary classifications.</Typography>
                </Box>
                <Button 
                  startIcon={<AddIcon />} 
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                >
                  New Cuisine
                </Button>
              </Box>

              <Box>
                {[
                  { name: 'Italian & Mediterranean', count: 24, status: true },
                  { name: 'Pan-Asian & Sushi', count: 18, status: true },
                  { name: 'Artisan Burgers & Grills', count: 32, status: true },
                  { name: 'Patisserie & Desserts', count: 9, status: false },
                ].map((cuisine) => (
                  <CuisineItem key={cuisine.name}>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{cuisine.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{cuisine.count} Active Vendors</Typography>
                    </Box>
                    <Switch defaultChecked={cuisine.status} size="small" sx={{ mx: 2 }} />
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </CuisineItem>
                ))}
              </Box>
              <Button sx={{ mt: 3, fontWeight: 600 }} color="primary">View All 42 Classifications</Button>
            </SectionCard>

            {/* Onboarding Topologies */}
            <SectionCard>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ mb: 0.5 }}>Onboarding Topologies</Typography>
                <Typography variant="body2" color="text.secondary">High-level semantic tags for user discovery.</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {['Comfort Food', 'Healthy & Vegan', 'Late Night Delivery', 'Breakfast & Brunch', 'Top Rated'].map((tag) => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    onDelete={() => {}} 
                    sx={{ 
                      borderRadius: 100, 
                      px: 1, 
                      py: 2.5,
                      fontWeight: 600,
                      backgroundColor: 'surface_container_low',
                      '&:hover': { backgroundColor: 'surface_container_high' }
                    }} 
                  />
                ))}
                <Chip 
                  label="Add Topology" 
                  icon={<AddIcon sx={{ fontSize: '1rem !important' }} />} 
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ 
                    borderRadius: 100, 
                    px: 1, 
                    py: 2.5,
                    fontWeight: 600,
                    borderStyle: 'dashed' 
                  }} 
                />
              </Box>
            </SectionCard>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, xl: 4 }}>
          <Stack spacing={4}>
            {/* Global Parameters */}
            <SectionCard sx={{ borderTop: '4px solid', borderTopColor: 'primary.main' }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ mb: 0.5 }}>Global Parameters</Typography>
                <Typography variant="body2" color="text.secondary">Core algorithmic thresholds.</Typography>
              </Box>

              <Stack spacing={3}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }} color="text.secondary">
                      Default Delivery Radius
                    </Typography>
                    <Chip label="kilometers" size="small" sx={{ height: 16, fontSize: '0.625rem', borderRadius: 1 }} />
                  </Box>
                  <ParameterInput>
                    <StyledInput defaultValue="5.0" />
                    <MapIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </ParameterInput>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }} color="text.secondary">
                      Base Service Fee
                    </Typography>
                    <Chip label="percentage" size="small" sx={{ height: 16, fontSize: '0.625rem', borderRadius: 1 }} />
                  </Box>
                  <ParameterInput>
                    <StyledInput defaultValue="12.5" />
                    <PercentIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </ParameterInput>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }} color="text.secondary">
                      Minimum Order Value
                    </Typography>
                    <Chip label="fiat/usd" size="small" sx={{ height: 16, fontSize: '0.625rem', borderRadius: 1 }} />
                  </Box>
                  <ParameterInput>
                    <Box sx={{ mr: 1, color: 'text.secondary', fontWeight: 600 }}>$</Box>
                    <StyledInput defaultValue="15.00" />
                  </ParameterInput>
                </Box>

                <AlertCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'error.main' }}>
                    <WarningAmberIcon fontSize="small" />
                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                      Max Surge Multiplier
                    </Typography>
                  </Box>
                  <Box sx={{ backgroundColor: 'white', borderRadius: 1, px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledInput defaultValue="2.5" sx={{ width: 'auto' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>x</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, lineHeight: 1.2 }}>
                    Hard cap limit during extreme weather or demand.
                  </Typography>
                </AlertCard>
              </Stack>
            </SectionCard>

            {/* Platform Sync */}
            <Box 
              sx={{ 
                backgroundColor: 'surface_container_low', 
                borderRadius: 4, 
                p: 3, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2 
              }}
            >
              <Box 
                sx={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%', 
                  backgroundColor: alpha('#0D9488', 0.1), 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#0D9488'
                }}
              >
                <CloudDoneIcon />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary' }}>
                  Platform Sync
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>All regions optimal</Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

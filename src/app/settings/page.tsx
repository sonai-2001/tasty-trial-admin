'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  alpha,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainLayout from '@/components/layout/MainLayout';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import MapIcon from '@mui/icons-material/Map';
import PercentIcon from '@mui/icons-material/Percent';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '@/lib/api';
import { imageConcat } from '@/lib/imageConcat';

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
  backgroundColor: '#f2f4f6',
  borderRadius: 12,
  padding: theme.spacing(1.5, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: theme.transitions.create(['box-shadow', 'background-color']),
  '&:focus-within': {
    boxShadow: `0 0 0 2px ${alpha('#00288e', 0.2)}`,
    backgroundColor: '#e6e8ea',
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
  gridTemplateColumns: '1fr auto auto auto',
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

// --- SPECIFIC MODAL STYLING (FROM IMAGE) ---

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 32,
    padding: theme.spacing(1),
    maxWidth: 520,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4, 1, 4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const ModalLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  letterSpacing: '0.05em',
  marginBottom: theme.spacing(1),
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f1f5f9',
  borderRadius: 12,
  padding: theme.spacing(1.5, 2),
  '& .MuiInputBase-root': {
    padding: 0,
    '&::before, &::after': { display: 'none' },
  },
  '& input, & textarea': {
    fontSize: '0.925rem',
    color: theme.palette.text.primary,
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
  },
}));

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${alpha(theme.palette.divider, 0.4)}`,
  borderRadius: 16,
  padding: theme.spacing(4, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: alpha(theme.palette.divider, 0.02),
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
}));

interface Cuisine {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  vendorCount?: number;
}

export default function MasterDataPage() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCuisine, setEditingCuisine] = useState<Cuisine | null>(null);
  
  // Form State
  const [cuisineName, setCuisineName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCuisines = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/cuisines');
      setCuisines(response.data.data);
    } catch (error) {
      console.error('Error fetching cuisines:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCuisines();
  }, [fetchCuisines]);

  const handleOpenDialog = (cuisine?: Cuisine) => {
    if (cuisine) {
      setEditingCuisine(cuisine);
      setCuisineName(cuisine.name);
      setDescription(cuisine.description || '');
      setIsActive(cuisine.isActive);
      setImagePreview(imageConcat(cuisine.image || ''));
    } else {
      setEditingCuisine(null);
      setCuisineName('');
      setDescription('');
      setIsActive(true);
      setImagePreview(null);
    }
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCuisine(null);
    setCuisineName('');
    setDescription('');
    setIsActive(true);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCuisine = async () => {
    if (!cuisineName.trim()) return;
    
    setIsSaving(true);
    try {
      let imageUrl = imagePreview;

      // Handle file upload if there's a new file
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        // formData.append('path', 'cuisines');
        const uploadRes = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('image res ',uploadRes)
        imageUrl = uploadRes?.data?.data?.imageUrl || '';
      }

      const payload = { 
        name: cuisineName, 
        description, 
        isActive, 
        image: imageUrl 
      };

      if (editingCuisine) {
        await api.patch(`/cuisines/${editingCuisine._id}`, payload);
      } else {
        await api.post('/cuisines', payload);
      }
      
      await fetchCuisines();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving cuisine:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (cuisine: Cuisine) => {
    try {
      await api.patch(`/cuisines/${cuisine._id}`, { isActive: !cuisine.isActive });
      setCuisines(cuisines.map(c => c._id === cuisine._id ? { ...c, isActive: !c.isActive } : c));
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleDeleteCuisine = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this cuisine?')) return;
    
    try {
      await api.delete(`/cuisines/${id}`);
      setCuisines(cuisines.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting cuisine:', error);
    }
  };

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
          <Button variant="text" color="inherit" onClick={fetchCuisines}>Refresh Sync</Button>
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
                  onClick={() => handleOpenDialog()}
                >
                  New Cuisine
                </Button>
              </Box>

              <Box>
                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress size={32} />
                  </Box>
                ) : (
                  cuisines.map((cuisine) => (
                    <CuisineItem key={cuisine._id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {cuisine.image ? (
                          <Box 
                            component="img" 
                            src={imageConcat(cuisine.image)} 
                            sx={{ width: 40, height: 40, borderRadius: 2, objectFit: 'cover' }} 
                            onError={(e: any) => e.target.src = 'https://placehold.co/40x40?text=?'}
                          />
                        ) : (
                          <Box sx={{ width: 40, height: 40, bgcolor: 'divider', borderRadius: 2, display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                            <Typography variant="caption" sx={{ width: '100%', textAlign: 'center' }}>{cuisine.name[0]}</Typography>
                          </Box>
                        )}
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{cuisine.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {cuisine.vendorCount || 0} Active Vendors
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        <Typography variant="caption" color={cuisine.isActive ? 'primary' : 'text.secondary'} sx={{ mr: 1, fontWeight: 700 }}>
                          {cuisine.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </Typography>
                        <Switch 
                          checked={cuisine.isActive} 
                          onChange={() => handleToggleStatus(cuisine)}
                          size="small" 
                          sx={{ mx: 1 }} 
                        />
                      </Box>
                      <IconButton size="small" onClick={() => handleOpenDialog(cuisine)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteCuisine(cuisine._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </CuisineItem>
                  ))
                )}
                {!isLoading && cuisines.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                    No cuisines configured yet.
                  </Typography>
                )}
              </Box>
              <Button sx={{ mt: 3, fontWeight: 600 }} color="primary">View All {cuisines.length} Classifications</Button>
            </SectionCard>

            {/* Placeholder for topologies */}
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
                    sx={{ 
                      borderRadius: 100, 
                      px: 1, 
                      py: 2.5,
                      fontWeight: 600,
                      backgroundColor: '#f2f4f6',
                      '&:hover': { backgroundColor: '#e6e8ea' }
                    }} 
                  />
                ))}
              </Box>
            </SectionCard>
          </Stack>
        </Grid>

        {/* Sidebar parameters */}
        <Grid size={{ xs: 12, xl: 4 }}>
          <Stack spacing={4}>
            <SectionCard sx={{ borderTop: '4px solid', borderTopColor: '#00288e' }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ mb: 0.5 }}>Global Parameters</Typography>
                <Typography variant="body2" color="text.secondary">Core algorithmic thresholds.</Typography>
              </Box>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>DEFAULT DELIVERY RADIUS</Typography>
                  <ParameterInput>
                    <StyledInput defaultValue="5.0" />
                    <MapIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </ParameterInput>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>BASE SERVICE FEE</Typography>
                  <ParameterInput>
                    <StyledInput defaultValue="12.5" />
                    <PercentIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </ParameterInput>
                </Box>
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
      </Grid>

      {/* REDESIGNED MODAL (MATCHING IMAGE) */}
      <StyledDialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
        <ModalHeader>
          <Box>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 800, mb: 0.5 }}>
              {editingCuisine ? 'Update Cuisine' : 'Add New Cuisine'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Define a new culinary category for the platform.
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDialog} sx={{ mt: -1, mr: -1 }}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>

        <DialogContent sx={{ p: 4, pt: 1 }}>
          <Stack spacing={3}>
            {/* Cuisine Name */}
            <Box>
              <ModalLabel>CUISINE NAME</ModalLabel>
              <InputWrapper>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="e.g., Japanese, Italian, Vegan"
                  value={cuisineName}
                  onChange={(e) => setCuisineName(e.target.value)}
                />
              </InputWrapper>
            </Box>

            {/* Description */}
            <Box>
              <ModalLabel>DESCRIPTION</ModalLabel>
              <InputWrapper>
                <TextField
                  fullWidth
                  variant="standard"
                  multiline
                  rows={3}
                  placeholder="Briefly describe this cuisine category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputWrapper>
            </Box>

            <Grid container spacing={3}>
              {/* Platform Status */}
              <Grid size={{ xs: 6 }}>
                <ModalLabel>PLATFORM STATUS</ModalLabel>
                <Box sx={{ mt: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Switch 
                      checked={isActive} 
                      onChange={(e) => setIsActive(e.target.checked)}
                      color="primary"
                    />
                    <Typography sx={{ fontWeight: 700, color: isActive ? 'primary.main' : 'text.secondary' }}>
                      {isActive ? 'Active' : 'Inactive'}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, lineHeight: 1.3 }}>
                    If inactive, this cuisine will not be available for new restaurant associations.
                  </Typography>
                </Box>
              </Grid>

              {/* Category Icon */}
              <Grid size={{ xs: 6 }}>
                <ModalLabel>CATEGORY ICON</ModalLabel>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/png,image/svg+xml,image/jpeg,image/jpg,image/webp,image/avif"
                  onChange={handleFileChange}
                />
                <UploadBox onClick={() => fileInputRef.current?.click()}>
                  {imagePreview ? (
                    <Box 
                      component="img" 
                      src={imagePreview} 
                      sx={{ width: '100%', height: 64, objectFit: 'contain', borderRadius: 2 }} 
                    />
                  ) : (
                    <>
                      <CloudUploadIcon sx={{ color: 'primary.main', mb: 1, fontSize: 24, opacity: 0.6 }} />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        Upload a file
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        PNG, SVG up to 2MB
                      </Typography>
                    </>
                  )}
                </UploadBox>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 4, pt: 0, justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="text" 
            color="inherit" 
            sx={{ fontWeight: 600, textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveCuisine} 
            variant="contained" 
            disabled={isSaving || !cuisineName.trim()}
            startIcon={<SaveIcon />}
            sx={{ 
              borderRadius: 3, 
              px: 4, 
              py: 1.25,
              fontWeight: 700,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
              boxShadow: '0 8px 20px rgba(0, 40, 142, 0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #001f6e 0%, #1a3a96 100%)',
              }
            }}
          >
            {isSaving ? 'Saving...' : 'Save Cuisine'}
          </Button>
        </DialogActions>
      </StyledDialog>
    </MainLayout>
  );
}

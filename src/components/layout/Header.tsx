'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton, 
  InputBase,
  styled,
  alpha 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderContainer = styled('header')(({ theme }) => ({
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 4),
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  backdropFilter: 'blur(12px)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  width: '100%',
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.surface_container_high || '#e6e8ea',
  borderRadius: 12,
  padding: theme.spacing(0.5, 2),
  width: 300,
  transition: theme.transitions.create('width'),
  '&:focus-within': {
    width: 400,
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

export default function Header() {
  return (
    <HeaderContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ display: { lg: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Dashboard / Overview
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <SearchWrapper>
          <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
          <InputBase
            placeholder="Search metrics, reports..."
            sx={{ fontSize: '0.875rem', width: '100%' }}
          />
        </SearchWrapper>

        <IconButton size="small">
          <NotificationsIcon sx={{ color: 'text.secondary' }} />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1 }}>
          <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              Apurba Bhadra
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Super Admin
            </Typography>
          </Box>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: 'primary.light',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '0.875rem'
            }}
          >
            AB
          </Avatar>
        </Box>
      </Box>
    </HeaderContainer>
  );
}

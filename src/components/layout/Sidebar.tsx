'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  alpha,
  styled
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AnalyticsIcon from '@mui/icons-material/BarChart';

const SidebarContainer = styled('nav')(({ theme }) => ({
  width: 280,
  height: '100vh',
  backgroundColor: theme.palette.surface_container_low || '#f2f4f6',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 1200,
  padding: theme.spacing(4, 2),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 6, 2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const NavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: 12,
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(1.5, 2),
  transition: theme.transitions.create(['background-color', 'color']),
  ...(active ? {
    background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
    color: '#ffffff',
    '& .MuiListItemIcon-root': {
      color: '#ffffff',
    },
    '&:hover': {
      background: 'linear-gradient(135deg, #00288e 10%, #1e40af 90%)',
    },
  } : {
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.surface_container_high || '#e6e8ea',
      color: theme.palette.text.primary,
    },
  }),
}));

const NavSectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: '0.6875rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: theme.palette.text.secondary,
  padding: theme.spacing(3, 2, 1, 2),
  opacity: 0.7,
}));

const menuItems = [
  { text: 'Overview', icon: <DashboardIcon />, path: '/' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
];

const managementItems = [
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Restaurants', icon: <RestaurantIcon />, path: '/restaurants' },
  { text: 'Drivers', icon: <LocalShippingIcon />, path: '/drivers' },
  { text: 'Logistics', icon: <LocalShippingIcon />, path: '/logistics' },
];

const systemItems = [
  { text: 'Master Data', icon: <SettingsSuggestIcon />, path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const renderList = (items: typeof menuItems) => (
    <List disablePadding>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <NavItem 
            active={pathname === item.path} 
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontSize: '0.875rem', 
                fontWeight: pathname === item.path ? 600 : 500 
              }} 
            />
          </NavItem>
        </ListItem>
      ))}
    </List>
  );

  return (
    <SidebarContainer>
      <LogoContainer>
        <Box 
          sx={{ 
            width: 32, 
            height: 32, 
            borderRadius: 1, 
            background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '1rem'
          }}
        >
          T
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'primary.main' }}>
          TastyTrial
        </Typography>
      </LogoContainer>

      <NavSectionHeader>Main Menu</NavSectionHeader>
      {renderList(menuItems)}

      <NavSectionHeader>Management</NavSectionHeader>
      {renderList(managementItems)}

      <Box sx={{ mt: 'auto' }}>
        <NavSectionHeader>System</NavSectionHeader>
        {renderList(systemItems)}
      </Box>
    </SidebarContainer>
  );
}

'use client';

import React from 'react';
import { Box, Card, Typography, styled } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor?: string }>(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '15%',
    bottom: '15%',
    width: 3,
    backgroundColor: accentColor || theme.palette.primary.main,
    borderRadius: '0 4px 4px 0',
  },
}));

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  accentColor?: string;
  icon?: React.ReactNode;
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  accentColor,
  icon 
}: MetricCardProps) {
  return (
    <StyledCard accentColor={accentColor}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="overline" color="text.secondary">
          {title}
        </Typography>
        <Box 
          sx={{ 
            p: 1, 
            borderRadius: 2, 
            backgroundColor: 'surface_container_low',
            color: accentColor || 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
      </Box>

      <Typography variant="h1" sx={{ mb: 1 }}>
        {value}
      </Typography>

      {change && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ fontSize: 16, color: 'tertiary.main' }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
          )}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              color: trend === 'up' ? 'tertiary.main' : 'error.main' 
            }}
          >
            {change}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Since last month
          </Typography>
        </Box>
      )}
    </StyledCard>
  );
}

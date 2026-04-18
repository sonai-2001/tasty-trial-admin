'use client';

import React from 'react';
import { Box, Typography, styled, Button, Stack } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import DataTable from '@/components/common/DataTable';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

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

export default function UsersPage() {
  const columns = ['User', 'Email', 'Role', 'Status', 'Last Login'];
  const rows = [
    { user: 'Apurba Bhadra', email: 'apurba@tastytrial.com', role: 'Super Admin', status: 'Status:Active', last: '2 mins ago' },
    { user: 'John Smith', email: 'john.s@gmail.com', role: 'Partner', status: 'Status:Offline', last: '1 day ago' },
    { user: 'Sarah Connor', email: 'sarah.c@tech.com', role: 'Dispatcher', status: 'Status:Active', last: 'Directly active' },
    { user: 'Michael Scott', email: 'michael@dunder.com', role: 'Manager', status: 'Status:Active', last: '1 hour ago' },
    { user: 'Pam Beesly', email: 'pam@dunder.com', role: 'Staff', status: 'Status:Offline', last: '3 days ago' },
  ];

  return (
    <MainLayout>
      <PageHeader>
        <Box>
          <Kicker variant="overline">Directory</Kicker>
          <Typography variant="h1">User Management</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="text" startIcon={<FilterListIcon />} sx={{ color: 'text.secondary' }}>
            Filter
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create New User
          </Button>
        </Stack>
      </PageHeader>

      <DataTable 
        columns={columns}
        rows={rows}
      />
    </MainLayout>
  );
}

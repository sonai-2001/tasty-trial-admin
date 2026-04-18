'use client';

import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box,
  Typography,
  styled 
} from '@mui/material';

const StyledTableContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(25, 28, 30, 0.06)',
  border: 'none',
}));

interface DataTableProps {
  columns: string[];
  rows: any[];
  title?: string;
}

export default function DataTable({ columns, rows, title }: DataTableProps) {
  return (
    <Box>
      {title && (
        <Typography variant="h2" sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}
      <StyledTableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value: any, i) => (
                  <TableCell key={i}>
                    {typeof value === 'string' && value.startsWith('Status:') ? (
                      <Box 
                        sx={{ 
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: value.includes('Active') ? 'tertiary.light' : 'surface_container_high',
                          color: value.includes('Active') ? 'tertiary.dark' : 'text.secondary'
                        }}
                      >
                        {value.replace('Status:', '')}
                      </Box>
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  InputAdornment, 
  IconButton,
  Alert,
  alpha,
  styled
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

const LoginRoot = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '1000px',
    height: '1000px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 40, 142, 0.03) 0%, transparent 70%)',
    top: '-300px',
    right: '-300px',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(30, 64, 175, 0.03) 0%, transparent 70%)',
    bottom: '-200px',
    left: '-200px',
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 32,
  width: '100%',
  maxWidth: 480,
  boxShadow: '0 25px 50px -12px rgba(0, 40, 142, 0.08)',
  position: 'relative',
  zIndex: 1,
  backgroundColor: alpha('#ffffff', 0.9),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 14,
  background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 800,
  fontSize: '1.5rem',
  marginBottom: theme.spacing(3),
  boxShadow: '0 8px 16px rgba(0, 40, 142, 0.2)',
}));

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password
      });

      const { accessToken, user } = response.data.data;

      // Check if user is admin
      if (!user.roles.includes('admin')) {
        setError('Access denied. Admin privileges required.');
        setIsLoading(false);
        return;
      }

      // Store token in cookie for middleware and localStorage for client
      setCookie('admin_token', accessToken, { maxAge: 60 * 60 * 24 }); // 1 day
      localStorage.setItem('admin_token', accessToken);
      localStorage.setItem('admin_user', JSON.stringify(user));

      router.push('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials or server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginRoot>
      <StyledPaper>
        <Stack spacing={1} alignItems="center" sx={{ mb: 4 }}>
          <LogoIcon>T</LogoIcon>
          <Typography variant="h2" sx={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your credentials to access the admin portal
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <TextField
              label="Email Address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ 
                py: 1.5,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)',
                boxShadow: '0 8px 20px rgba(0, 40, 142, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #001f6e 0%, #1a3a96 100%)',
                }
              }}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Authorized Personnel Only • IP Logged
          </Typography>
        </Box>
      </StyledPaper>
    </LoginRoot>
  );
}

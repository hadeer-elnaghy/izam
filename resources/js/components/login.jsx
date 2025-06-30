import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Container,
  useMediaQuery,
  Alert,
  CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PromoBar from './common/PromoBar';
import Navbar from './common/Navbar';
import MobileNavbar from './common/MobileNavbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const isMobile = useMediaQuery('(max-width:600px)');

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 422) {
          // Validation errors
          setErrors(data.errors || {});
        } else {
          // Other errors
          setError(data.message || 'Login failed');
        }
        return;
      }
      
      // Success - store token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to products or home page
      window.location.href = '/'; // or wherever you want to redirect
      
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'secondary.main' }}>
      <PromoBar />
      <Box sx={{ display: { xs: 'block', md: 'block',lg:'none',sm:'block' } }}>
        <MobileNavbar />
      </Box>
    
      <Box sx={{ display: { xs: 'none',sm: 'none', md: 'none',lg:'block' } }}>
        <Navbar />
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '80vh',
          justifyContent: 'center',
          px: isMobile ? 1 : 0
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 600,
            p: isMobile ? 2 : 3,
            mx: isMobile ? 10 : 0,
            borderRadius: 3,
            boxShadow: 3,
            mt: isMobile ? 4 : 0
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight={700} align="center" gutterBottom fontSize={isMobile ? 17 : 20}>
              Welcome back
            </Typography>
            <Typography color="text.secondary" align="center" mb={3} fontSize={isMobile ? 12 : 13}>
              Please enter your details to sign in
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2, fontSize: isMobile ? 12 : 14 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <Box mb={1}>
                <Typography fontSize={isMobile ? 13 : 14} fontWeight={500} mb={0.5}>
                  Email
                </Typography>
                <TextField
                  type="email"
                  fullWidth
                  margin="dense"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  size={'medium'}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Box>
              <Box mb={2}>
                <Typography fontSize={isMobile ? 13 : 14} fontWeight={500} mb={0.5}>
                  Password
                </Typography>
                <TextField
                  type={show ? 'text' : 'password'}
                  fullWidth
                  margin="dense"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  size={'medium'}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShow(!show)}
                          edge="end"
                        >
                          {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  mt: 1,
                  borderRadius: 2,
                  py: 1,
                  fontWeight: 600,
                  fontSize: isMobile ? 13 : 15,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#222' },
                  '&:disabled': { bgcolor: '#ccc' }
                }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
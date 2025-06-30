import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  // Check if user is logged in (adjust logic as needed)
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Optionally: clear user context, etc.
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', px: isMobile ? 0.5 : 10 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: isMobile ? 0.5 : 2, minHeight: isMobile ? 48 : 56 }}>
        <Box display="flex" alignItems="center" gap={isMobile ? 0.5 : 2}>
          {isMobile && (
            <>
              <IconButton size="small" onClick={() => setDrawerOpen(true)}>
                <MenuIcon fontSize="small" />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <List>
                  <ListItem button onClick={() => { navigate('/'); setDrawerOpen(false); }}>
                    <ListItemText primary="Products" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Sell Your Product" />
                  </ListItem>
                </List>
              </Drawer>
            </>
          )}
          {/* Logo image */}
          <img
            src="public/images/izam_logo.png"
            alt="Logo"
            style={{ height: isMobile ? 28 : 32, width: 'auto', display: 'block', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          {!isMobile && (
            <>
              <Button
                color='primary'
                size="small"
                sx={{ fontSize: 14, minWidth: 0, px: 2, fontWeight: 600, textTransform: 'none' }}
                onClick={() => navigate('/')}
              >
                Products
              </Button>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  fontSize: 14,
                  minWidth: 0,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#222' }
                }}
              >
                Sell Your Product
              </Button>
            </>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
         
          {!isLoggedIn ? (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{
                bgcolor: 'black',
                color: 'white',
                borderRadius: 2,
                px: isMobile ? 1.5 : 2,
                py: 0.5,
                fontSize: 13,
                minWidth: 0,
                textTransform: 'none',
                '&:hover': { bgcolor: '#222' }
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          ) : (
            <>
              <IconButton size="small" onClick={() => navigate('/cart')}>
            <ShoppingCartIcon fontSize="small" color='primary' />
          </IconButton>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{
                bgcolor: 'black',
                color: 'white',
                borderRadius: 2,
                px: isMobile ? 1.5 : 2,
                py: 0.5,
                fontSize: 13,
                minWidth: 0,
                textTransform: 'none',
                '&:hover': { bgcolor: '#222' }
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            </>
          
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 
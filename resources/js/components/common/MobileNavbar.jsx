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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function MobileNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in (adjust logic as needed)
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Optionally: clear user context, etc.
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', px: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 1, minHeight: 48 }}>
        {/* Left: Menu icon and logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={() => setDrawerOpen(true)}
            sx={{ p: 0.5 }}
          >
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
          <img
            src="public/images/izam_logo.png"
            alt="Logo"
            style={{ height: 28, width: 'auto', display: 'block', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        </Box>
        {/* Right: Search, cart, login/logout */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton size="small">
            <SearchIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => navigate('/cart')}>
            <ShoppingCartIcon fontSize="small" color='primary' />
          </IconButton>
          {!isLoggedIn ? (
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
                fontSize: 13,
                minWidth: 0,
                textTransform: 'none',
                '&:hover': { bgcolor: '#222' }
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 
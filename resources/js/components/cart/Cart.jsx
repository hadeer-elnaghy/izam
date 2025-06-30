import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Divider, Button, IconButton, Badge, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useCart } from '../../providers/CartProvider';
import PromoBar from '../common/PromoBar';
import Navbar from '../common/Navbar';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './CartProductCard';
import QuantitySelector from '../common/QuantitySelector';
import MobileNavbar from '../common/MobileNavbar';
import CircularProgress from '@mui/material/CircularProgress';

export default function Cart() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  if (!token) {
    return (
      <Box sx={{ bgcolor: 'secondary.main', minHeight: '100vh' }}>
        <PromoBar />
        <Box sx={{ display: { xs: 'block', md: 'block',lg:'none',sm:'block' } }}>
         <MobileNavbar />
        </Box>
      
        <Box sx={{ display: { xs: 'none',sm: 'none', md: 'none',lg:'block' } }}>
          <Navbar />
        </Box>
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" color="error" fontWeight={700} mb={2}>
            Not authorized
          </Typography>
          <Typography color="text.secondary" mb={3}>
            You need to login to view your cart.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: 'black',
              color: 'white',
              borderRadius: 2,
              px: 4,
              py: 1,
              fontWeight: 600,
              fontSize: 15,
              textTransform: 'none',
              '&:hover': { bgcolor: '#222' }
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Box>
    );
  }

  const cartItems = Object.values(cart);
  const productsPayload = cartItems.map(item => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal > 0 ? 12.5 : 0;
  const total = subtotal + shipping + tax;

  const orderDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ products: productsPayload }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setOrderNumber(data.order_id);
        setCart({});
      } else {
        alert(data.error || 'Order could not be placed.');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Network error. Please try again.');
    }
  };

  return (
    <Box sx={{ bgcolor: 'secondary.main', minHeight: '100vh' }}>

    <PromoBar />

    <Box sx={{ display: { xs: 'block', md: 'block',lg:'none',sm:'block' } }}>
         <MobileNavbar />
        </Box>
      
        <Box sx={{ display: { xs: 'none',sm: 'none', md: 'none',lg:'block' } }}>
          <Navbar />
        </Box>

    <Box sx={{ bgcolor: 'secondary.main', minHeight: '100vh', py: 2, px: isMobile ? 0.5 : 10  }}>
     
      <Box sx={{ width: '100%', mb: 2, display: { xs: 'none', md: 'block' } }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Typography color="text.primary">Casual</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" fontWeight={700} mb={3}>Your cart</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'column',lg:'row' },
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
    
        <Paper
          sx={{
            flex: 2,
            p: 3,
            borderRadius: 3,
            width: '100%',
            mb: { xs: 2, md: 0 },
            minHeight: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {cartItems.length === 0 ? (
            <Typography color="text.secondary" fontSize={16}>
              No products in cart.
            </Typography>
          ) : (
            cartItems.map(item => (
              <CartProductCard
                key={item.id}
                item={item}
                orderPlaced={!!orderNumber}
                onCartChange={(itemId, newQuantity) => {
                  if (newQuantity <= 0) {
                    setCart(prev => {
                      const newCart = { ...prev };
                      delete newCart[itemId];
                      return newCart;
                    });
                  } else {
                    setCart(prev => ({
                      ...prev,
                      [itemId]: { ...item, quantity: newQuantity }
                    }));
                  }
                }}
                onRemoveItem={(itemId) => {
                  setCart(prev => {
                    const newCart = { ...prev };
                    delete newCart[itemId];
                    return newCart;
                  });
                }}
              >
              </CartProductCard>
            ))
          )}
        </Paper>

        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography fontWeight={700}>
              Order Summary
              {orderNumber && (
                <span style={{ fontWeight: 400, marginLeft: 8 }}>
                  (#{orderNumber})
                </span>
              )}
            </Typography>
            <Typography color="#1976d2" fontSize={14}>{orderDate}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography fontSize={14}>Subtotal</Typography>
            <Typography fontWeight={600}>${subtotal}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography fontSize={14}>Shipping</Typography>
            <Typography fontWeight={600}>${shipping}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography fontSize={14}>Tax</Typography>
            <Typography fontWeight={600}>${tax}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography fontWeight={700}>Total</Typography>
            <Typography fontWeight={700}>${total}</Typography>
          </Box>
          {!orderNumber && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ bgcolor: 'black', color: 'white', borderRadius: 2, py: 1.2, fontWeight: 600, fontSize: 15, textTransform: 'none', '&:hover': { bgcolor: '#222' } }}
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Place the order'}
            </Button>
          )}
          {orderNumber && (
            <Typography color="success.main" fontWeight={600} mt={2} textAlign="center">
              Order placed successfully!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
    </Box>
  );
}

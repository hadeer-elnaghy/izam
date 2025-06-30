import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, TextField, InputAdornment, Badge, Paper, Divider, Drawer, Breadcrumbs, Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PromoBar from '../common/PromoBar';
import MobileNavbar from '../common/MobileNavbar';
import Navbar from '../common/Navbar';
import { TuneTwoTone } from '@mui/icons-material';
import CategoryFilter from './CategoryFilter';
import ProductDetailsDrawer from './ProductDetailsDrawer';
import ProductCard from './ProductCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../providers/CartProvider';
import QuantitySelector from '../common/QuantitySelector';
import { useMediaQuery } from '@mui/material';


export default function Shop() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsQuantity, setDetailsQuantity] = useState(0);
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setLoading(true);
    let url = `/api/products?name=${encodeURIComponent(search)}&per_page=6&page=${page}`;
    if (selectedCategory && selectedCategory !== 'All') {
      url += `&category=${encodeURIComponent(selectedCategory)}`;
    }
    if (priceRange) {
      url += `&min_price=${priceRange[0]}&max_price=${priceRange[1]}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setTotalPages(data.last_page || 1);
        setLoading(false);
      });
  }, [search, page, selectedCategory, priceRange]);

  const handleCartChange = (product, quantity) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (quantity > 0) {
        newCart[product.id] = { ...product, quantity };
      } else {
        delete newCart[product.id];
      }
      return newCart;
    });
  };

  const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal > 0 ? 12.5 : 0;
  const total = subtotal + shipping + tax;

  const handleApplyFilter = () => {
    setSelectedCategory(tempCategory);
    setPriceRange(tempPriceRange);
    setDrawerOpen(false);
    setPage(1);
  };

  const handleClearFilter = () => {
    setTempCategory('All');
    setTempPriceRange([0, 300]);
    setSelectedCategory('All');
    setPriceRange([0, 300]);
    setPage(1);
    setDrawerOpen(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDetailsQuantity(cart[product.id]?.quantity || 0);
    setDetailsOpen(true);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login first!');
      return;
    }
    if (selectedProduct && detailsQuantity > 0) {
      handleCartChange(selectedProduct, detailsQuantity);
      setDetailsOpen(false);
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProduct(null);
  };

 
  return (
    <Box sx={{ bgcolor: 'secondary.main', minHeight: '100vh' }}>
      <PromoBar />

      {/* Mobile Navbar: visible on xs/sm, hidden on md+ */}
      <Box sx={{ display: { xs: 'block', md: 'block',lg:'none',sm:'block' } }}>
        <MobileNavbar />
      </Box>
      {/* Desktop Navbar: hidden on xs/sm, visible on md+ */}
      <Box sx={{ display: { xs: 'none',sm: 'none', md: 'none',lg:'block' } }}>
        <Navbar />
      </Box>

      <Box sx={{ width: '100%', mt: 2, display: { xs: 'none', sm: 'none', md: 'none',lg:'block' } }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ px: 10 }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">
              {selectedCategory === 'All' ? 'Casual' : selectedCategory}
            </Typography>
          </Breadcrumbs>
      </Box>

      <Box
        sx={{
           display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'column',lg:'row' },
          gap: 2,
          px: { xs: 1, md: 2 },
          py: 2,
        }}
      >
        {/* Filter Icon - hidden on mobile */}
       <Box
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none',lg:'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 70,
            maxWidth: 70,
            height: 70,
            bgcolor: 'white',
            borderRadius: 3,
            mr: { md: 2 },
          }}
        >
          <IconButton onClick={() => setDrawerOpen(true)}>
            <TuneTwoTone color="primary" fontSize={'large'} />
          </IconButton>
        </Box>
        
        {/* Products Section - always visible */}
        <Box
          sx={{
            flex: 3,
            minWidth: 0,
            bgcolor: 'white',
            borderRadius: 3,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 500,
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              gap: 1,
            }}
          >
            <TextField
              placeholder="Search by product name"
              size="small"
              value={search}
              onChange={e => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ width: '100%', bgcolor: 'white', borderRadius: 2 }}
            />

            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { display: { xs: 'flex', md: 'flex',lg:'none',sm:'flex' }},
                bgcolor: 'white',
                border: '1px solid #eee',
                borderRadius: 2,
                mr: 1,
                p: 1.2,
              }}
            >
              <TuneTwoTone color="primary" />
            </IconButton>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>{selectedCategory === 'All' ? 'Casual' : selectedCategory}</Typography>

            {products.length > 0 ? <Typography color="text.secondary" fontSize={13} mb={2}>
              Showing 1-{products.length} of {products.length} Products
            </Typography> :null}

            <Grid container spacing={2} justifyContent="center" sx={{ flexWrap: 'wrap' }} columns={12}>
              {products.map(product => (
                <Grid
                  key={product.id}
                  size={{ xs: 6, sm: 6, md: 6,lg:4 }}
                  sx={{ display: 'flex' }}
                >
                  <ProductCard
                    product={product}
                    cart={cart}
                    onCartChange={handleCartChange}
                    onProductClick={handleProductClick}
                  >
                    <QuantitySelector
                      quantity={cart[product.id]?.quantity || 0}
                      onQuantityChange={(newQuantity) => {
                        if (newQuantity <= 0) {
                          handleCartChange(product, 0);
                        } else {
                          handleCartChange(product, newQuantity);
                        }
                      }}
                      maxStock={product.stock}
                      buttonSpacing={0}
                      containerWidth={150}
                    />
                  </ProductCard>
                </Grid>
              ))}
            </Grid>

            {products.length > 0 ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 2 }}>
              <Button
                size="small"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                sx={{ minWidth: 80, textTransform: 'none' }}
              >
                &lt; Previous
              </Button>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'black',
                  color: 'white',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                {page}
              </Box>
              <Button
                size="small"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                sx={{ minWidth: 80, textTransform: 'none' }}
              >
                Next &gt;
              </Button>
            </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 2 }}>
              <Typography color="text.secondary" fontSize={14}>No products found.</Typography>
            </Box>}
          </Box>
        </Box>

        {/* Order Summary - hidden on mobile */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none',lg:'block' },
            flex: 1,
            minWidth: 280,
            bgcolor: 'white',
            borderRadius: 3,
            p: 3,
            minHeight: 500,
            boxShadow: 2,
            ml: { md: 2 },
          }}
        >
          <Typography fontWeight={700} mb={2}>Order Summary</Typography>
          <Divider sx={{ mb: 2 }} />
          {Object.values(cart).length === 0 ? (
            <Typography color="text.secondary" fontSize={14}>No items in cart.</Typography>
          ) : (
            Object.values(cart).map(item => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  minHeight: 48,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: 'contain',
                    borderRadius: 8,
                    marginRight: 12,
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontSize={14} fontWeight={600} noWrap>
                      {item.name}
                    </Typography>
                    <IconButton
                      onClick={() => handleCartChange(item, 0)}
                      sx={{ color: 'error.main', ml: 1 }}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <QuantitySelector
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) => {
                        if (newQuantity <= 0) {
                          handleCartChange(item, 0);
                        } else {
                          handleCartChange(item, newQuantity);
                        }
                      }}
                      maxStock={item.stock}
                      buttonSpacing={1}
                      containerWidth={150}
                      showBorder={true}
                      backgroundColor="secondary.main"
                    />
                    <Typography fontWeight={700} sx={{ ml: 2, minWidth: 48 }}>
                      ${item.price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          )}
          <Divider sx={{ my: 2 }} />
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
            <Typography fontWeight={700}>${total.toFixed(2)}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ bgcolor: 'black', color: 'white', borderRadius: 2, py: 1.2, fontWeight: 600, fontSize: 15, textTransform: 'none', '&:hover': { bgcolor: '#222' } }}
            disabled={Object.values(cart).length === 0}
            onClick={() => navigate('/cart')}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>

      <CategoryFilter
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedCategory={tempCategory}
        onCategoryChange={setTempCategory}
        priceRange={tempPriceRange}
        onPriceChange={setTempPriceRange}
        onApply={handleApplyFilter}
        onClear={handleClearFilter}
      />

      <ProductDetailsDrawer
        open={detailsOpen}
        onClose={handleCloseDetails}
        product={selectedProduct}
        quantity={detailsQuantity}
        onQuantityChange={setDetailsQuantity}
        onAddToCart={handleAddToCart}
      />

    </Box>
  );
}
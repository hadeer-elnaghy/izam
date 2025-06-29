import React from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ProductDetailsDrawer({
  open,
  onClose,
  product,
  quantity,
  onQuantityChange,
  onAddToCart
}) {
  if (!product) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
            Product Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Image */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: 220, objectFit: 'contain', borderRadius: 8 }}
          />
        </Box>
        {/* Name and Category */}
        <Typography fontWeight={700} fontSize={18} mb={0.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {product.name}
          {product.category && (
            <Box
              component="span"
              sx={{
                bgcolor: '#f3f3f3',
                color: '#888',
                fontSize: 12,
                px: 1,
                py: 0.2,
                borderRadius: 1,
                ml: 1,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {product.category}
            </Box>
          )}
        </Typography>
        <Typography fontWeight={700} fontSize={22} mb={2}>${product.price}</Typography>
        <Divider sx={{ mb: 2 }} />
        {/* Details */}
        <Typography fontWeight={600} fontSize={15} mb={1}>Product Details</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography color="text.secondary" fontSize={14}>Category:</Typography>
          <Typography fontSize={14}>{product.category}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography color="text.secondary" fontSize={14}>Stock:</Typography>
          <Typography fontSize={14}>{product.stock} items</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {/* Quantity Selector - inline with label */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
          <Typography fontWeight={600} fontSize={15} mr={2}>Quantity</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
            }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              disabled={quantity <= 0}
              sx={{
                minWidth: 28,
                borderRadius: 1,
                fontWeight: 700,
                fontSize: 16,
                p: 0,
                mr: 2,
                bgcolor: '#f5f5f5',
                borderColor: '#e0e0e0',
              }}
            >-</Button>
            <Box
              sx={{
                width: 24,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 15,
                color: '#222',
                bgcolor: 'transparent',
                border: 'none',
                outline: 'none',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {quantity}
            </Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onQuantityChange(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              sx={{
                minWidth: 28,
                borderRadius: 1,
                fontWeight: 700,
                fontSize: 16,
                p: 0,
                ml: 2,
                bgcolor: '#f5f5f5',
                borderColor: '#e0e0e0',
              }}
            >+</Button>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ bgcolor: 'black', color: 'white', borderRadius: 1, py: 1.2, fontWeight: 600, fontSize: 15, textTransform: 'none', '&:hover': { bgcolor: '#222' }, mb: 1 }}
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </Box>
    </Drawer>
  );
}

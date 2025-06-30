import React from 'react';
import {
  Card, CardContent, CardMedia, Typography, Button, Box, Badge, IconButton
} from '@mui/material';
import QuantitySelector from '../common/QuantitySelector';

export default function ProductCard({ product, cart, onCartChange, onProductClick }) {
  return (
    <Card
      sx={{
        p: 1,
        borderRadius: 3,
        boxShadow: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
      onClick={() => onProductClick(product)}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              width: 'auto',
              height: '100%',
              maxHeight: 250,
              objectFit: 'contain',
              m: '0 auto',
              p: 0,
              borderRadius: 0,
              bgcolor: 'transparent',
              display: 'block'
            }}
          />
          {cart[product.id]?.quantity > 0 && (
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              color="primary"
              badgeContent={cart[product.id].quantity}
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                pointerEvents: 'none',
                '& .MuiBadge-badge': {
                  bgcolor: '#1976d2',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 14,
                  minWidth: 24,
                  height: 24,
                  borderRadius: '50%',
                  boxShadow: 1,
                  zIndex: 2,
                  transform: 'none',
                },
              }}
            />
          )}
        </Box>
      </Box>
      <CardContent sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        p: 1,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography
            fontWeight={700}
            fontSize={17}
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 200,
            }}
          >
            {product.name}
          </Typography>
          {product.category && (
            <Box
              sx={{
                bgcolor: '#f3f3f3',
                color: '#888',
                fontSize: 11,
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
        </Box>
         <Box sx={{ display: 'flex',justifyContent: 'space-between', mb: 1 }}>
         <Typography fontWeight={700} fontSize={17} mb={0.5}>
          ${product.price}
        </Typography>
       
          <Typography color="text.secondary" fontSize={12}>
            Stock: {product.stock}
          </Typography>
        </Box>
        
        <QuantitySelector
          quantity={cart[product.id]?.quantity || 0}
          onQuantityChange={(newQuantity, e) => {
            e?.stopPropagation?.(); 
            if (newQuantity <= 0) {
              onCartChange(product, 0);
            } else {
              onCartChange(product, newQuantity);
            }
          }}
          maxStock={product.stock}
          buttonSpacing={0}
          containerWidth={100}
        />
      </CardContent>
    </Card>
  );
}

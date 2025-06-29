import React from 'react';
import {
  Paper, Box, Typography, Button, IconButton, Badge
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import QuantitySelector from '../common/QuantitySelector';

export default function CartProductCard({ item, orderPlaced, onCartChange, onRemoveItem }) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: '1px solid #eee',
        bgcolor: 'white',
        position: 'relative',
        width: '100%',
      }}
    >
     
      <Box sx={{ position: 'relative', mr: 4, minWidth: 90 }}>
        <Badge
          color="primary"
          badgeContent={item.quantity}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            '& .MuiBadge-badge': {
              bgcolor: '#1976d2',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              minWidth: 24,
              height: 24,
              borderRadius: '50%',
            },
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: 90,
              height: 90,
              objectFit: 'contain',
              borderRadius: 8,
              background: 'secondary.main',
            }}
          />
        </Badge>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Typography fontWeight={700}>{item.name}</Typography>
            <Box
              sx={{
                bgcolor: '#f3f3f3',
                color: '#888',
                fontSize: 12,
                px: 1,
                py: 0.2,
                borderRadius: 1,
                fontWeight: 500,
                ml: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {item.category}
            </Box>
          </Box>
          
          <IconButton
            onClick={() => onRemoveItem(item.id)}
            sx={{ color: 'error.main', ml: 1 }}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography fontWeight={700} mt={0.5}>${item.price}</Typography>
        <Typography color="text.secondary" fontSize={13} mb={1}>
          Stock: {item.stock}
        </Typography>
       
        {!orderPlaced && (
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={(newQuantity) => {
              if (newQuantity <= 0) {
                onRemoveItem(item.id);
              } else {
                onCartChange(item.id, newQuantity);
              }
            }}
            maxStock={item.stock}
            buttonSpacing={1}
            containerWidth={140}
            showBorder={true}
            backgroundColor="transparent"
          />
        )}
      </Box>
    </Paper>
  );
}

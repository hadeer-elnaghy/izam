import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export default function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  maxStock, 
  disabled = false,
  buttonSpacing = 1, // Default spacing between buttons
  buttonSize = 'small',
  containerWidth = 100
  
}) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: buttonSpacing, 
        borderRadius: 2, 
        overflow: 'hidden',
        width: containerWidth, 
        bgcolor: 'white', 
        border: '1px solid #e0e0e0'
      }}
    >
      <Button
        size={buttonSize}
        onClick={e => onQuantityChange(quantity - 1, e)}
        disabled={disabled || quantity <= 1}
        sx={{ 
          minWidth: buttonSize === 'small' ? 28 : 32, 
          px: 0,
          borderRadius: 0,
          borderRight: '1px solid #e0e0e0',
          fontWeight: 700,
          fontSize: buttonSize === 'small' ? 16 : 18,
          p: 0,
          bgcolor: 'secondary.main',
        }}
      >
        -
      </Button>
      <Typography 
        fontWeight={600} 
        sx={{ 
            width: '100%',
          minWidth: buttonSize === 'small' ? 20 : 24, 
          textAlign: 'center',
          fontSize: buttonSize === 'small' ? 14 : 16,
          color: '#222',
          userSelect: 'none',
        }}
      >
        {quantity}
      </Typography>
      <Button
        size={buttonSize}
        onClick={e => onQuantityChange(quantity + 1, e)}
        disabled={disabled || quantity >= maxStock}
        sx={{ 
          minWidth: buttonSize === 'small' ? 28 : 32, 
          px: 0,
          borderRadius: 0,
          borderLeft:  '1px solid #e0e0e0',
          fontWeight: 700,
          fontSize: buttonSize === 'small' ? 16 : 18,
          p: 0,
          bgcolor: 'secondary.main',
        }}
      >
        +
      </Button>
    </Box>
  );
}

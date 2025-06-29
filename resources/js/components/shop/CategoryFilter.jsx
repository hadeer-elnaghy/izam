import React, { useState } from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider, Slider,
  FormGroup, FormControlLabel, Checkbox, Button, Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CATEGORIES = ['All', 'T-shirts', 'Polo', 'Jeans', 'Shirts'];

export default function CategoryFilterDrawer({
  open,
  onClose,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onApply,
  onClear,
  minPrice = 0,
  maxPrice = 300,
}) {
  // For single-select, use radio; for multi-select, use checkboxes.
  // Here, we'll use single-select for simplicity.
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Price Range */}
        <Typography fontWeight={600} mb={1}>Price</Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => onPriceChange(newValue)}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography fontSize={13}>${minPrice}</Typography>
          <Typography fontSize={13}>${maxPrice}</Typography>
        </Box>

        {/* Category */}
        <Typography fontWeight={600} mb={1}>Category</Typography>
        <FormGroup>
          {CATEGORIES.map(cat => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={selectedCategory === cat}
                  onChange={() => onCategoryChange(cat)}
                  color="primary"
                />
              }
              label={cat}
            />
          ))}
        </FormGroup>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Apply and Clear */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ bgcolor: 'black', color: 'white', borderRadius: 1, py: 1.2, fontWeight: 600, fontSize: 15, textTransform: 'none', '&:hover': { bgcolor: '#222' }, mb: 1 }}
          onClick={onApply}
        >
          Apply Filter
        </Button>
        <Link
          component="button"
          underline="none"
          color="inherit"
          sx={{ textAlign: 'center', fontSize: 14, opacity: 0.7 }}
          onClick={onClear}
        >
          Clear all filters
        </Link>
      </Box>
    </Drawer>
  );
}
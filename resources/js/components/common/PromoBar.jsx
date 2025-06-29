import React from 'react';
import { Box, Link } from '@mui/material';

export default function PromoBar() {
  return (
    <Box bgcolor="black" color="white" textAlign="center" py={1} fontSize={14}>
      Signup and get 20% off your first order:
      <Link href="#" underline="always" color="inherit" fontWeight={700} ml={1}>
        Sign Up Now
      </Link>
    </Box>
  );
} 
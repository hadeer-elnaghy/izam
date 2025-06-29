import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';
import Shop from './components/shop/Shop';
import Cart from './components/cart/Cart';
import { CartProvider } from './providers/CartProvider';


const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fafafa',
      contrastText: '#fff',
    },
  },
});

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <ThemeProvider theme={theme}>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </ThemeProvider>
);

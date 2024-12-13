import React from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#0F1778' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          My Application Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

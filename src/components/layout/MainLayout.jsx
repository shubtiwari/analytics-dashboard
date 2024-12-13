import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../common/Sidebar'; // Assuming Sidebar is a separate component
import { Outlet } from 'react-router-dom'; // This will render the nested routes

const MainLayout = ( ) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, alignItems:"center", textAlign:"center", display:"flex", justifyContent:"center" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;

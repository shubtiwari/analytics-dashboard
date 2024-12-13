import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('/dashboard');

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
  ];

  const handleMenuClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <Box sx={{
      width: 240,
      backgroundColor: '#141414',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: 2,
    }}>
      <Box sx={{ marginBottom: 3 }}>
      </Box>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              onClick={() => handleMenuClick(item.path)}
              sx={{
                color: activeItem === item.path ? 'red' : 'white',
                '&:hover': { color: 'red' },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
            <Divider sx={{ backgroundColor: 'gray' }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

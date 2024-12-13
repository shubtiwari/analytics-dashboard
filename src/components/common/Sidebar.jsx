import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JodoIcon from "../../assets/JodoLogo";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('/analytics');

  const menuItems = [
    { text: 'Analytics', path: '/analytics', Icon: QueryStatsIcon },
    { text: 'Collections', path: '/collections', Icon: CurrencyRupeeIcon },
    { text: 'Charges', path: '/charges', Icon: CreditCardIcon },
  ];

  const handleMenuClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        maxWidth: 200,
        backgroundColor: '#0F1778',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <JodoIcon
          sx={{
            fontSize: 100,
            color: '#FFC20E',
          }}
        />
      </Box>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              onClick={() => handleMenuClick(item.path)}
              sx={{
                color: activeItem === item.path ? '#FFC20E' : 'white',
                '&:hover': { color: '#FFC20E' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                <item.Icon sx={{ color: activeItem === item.path ? '#FFC20E' : 'white' }} />
              </Box>
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

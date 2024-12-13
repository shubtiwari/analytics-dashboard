import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JodoIcon from "../../assets/JodoLogo";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  sidebar: {
    minWidth: 200,
    maxWidth: 200,
    backgroundColor: '#0F1778',
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },
  listItem: {
    '&:hover': {
      color: '#FFC20E',
    },
  },
  activeItem: {
    color: '#FFC20E',
  },
  divider: {
    backgroundColor: 'gray',
  },
}));

const Sidebar = () => {
  const classes = useStyles();
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
    <Box className={classes.sidebar}>
      <Box className={classes.logo}>
        <JodoIcon sx={{ fontSize: 100, color: '#FFC20E' }} />
      </Box>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              onClick={() => handleMenuClick(item.path)}
              className={`${classes.listItem} ${activeItem === item.path ? classes.activeItem : ''}`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                <item.Icon sx={{ color: activeItem === item.path ? '#FFC20E' : 'white' }} />
              </Box>
              <ListItemText primary={item.text} />
            </ListItem>
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
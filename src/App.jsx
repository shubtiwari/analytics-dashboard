import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import { Provider } from 'react-redux';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App = () => {
  const user = {
    name: 'John Doe',
    avatar: 'https://www.example.com/avatar.jpg',
    role: 'user'
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout user={user} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
    </Provider>
  );
};

export default App;

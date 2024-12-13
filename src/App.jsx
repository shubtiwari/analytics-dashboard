import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import { Provider } from 'react-redux';
import MainLayout from './components/layout/MainLayout';
import UserDashboard from './components/dashboard/UserDashboard';



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
        {/* MainLayout wraps the sidebar and dynamic content */}

        <Route path="/" element={<MainLayout user={user} />}>
          <Route index element={user.role === "user" ? <UserDashboard /> : <UserDashboard />} />
          <Route path="dashboard" element={user.role === "user" ? <UserDashboard /> : <UserDashboard />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
    </Provider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import MainLayout from './components/layout/MainLayout';
import Analytics from './components/dashboard/Analytics';
import Summary from './components/dashboard/Summary';
import Settlements from './components/dashboard/Settlements';

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
          <Route path="analytics" element={<Analytics />} />
              <Route path="summary" element={<Summary />} />
              <Route path="settlements" element={<Settlements />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
    </Provider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import MainLayout from './components/layout/MainLayout';
import Analytics from './components/dashboard/Analytics';
import Collections from './components/dashboard/Summary';
import Charges from './components/dashboard/Settlements';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="analytics" element={<Analytics />} />
              <Route path="collections" element={<Collections />} />
              <Route path="charges" element={<Charges />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
    </Provider>
  );
};

export default App;

// Import React to enable JSX and component functionality
import React from 'react';

// Import React Router components for routing and navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Material-UI Theme components for styling
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import layout component that provides the sidebar and header structure
import DashboardLayout from './layout/DashboardLayout';

// Import all page components that will be rendered in the dashboard
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Reservations from './pages/Reservations';
import Members from './pages/Members';
import Publishers from './pages/Publishers';
import Authors from './pages/Authors';
import Books from './pages/Books';
import Logs from './pages/Logs';

// Custom Material-UI Theme Configuration
const theme = createTheme({
  palette: {
    primary: { main: '#3b82f6' },
    background: { default: '#f7f9fc' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
  },
});

// Main Application Component
function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/members" element={<Members />} />
              <Route path="/publishers" element={<Publishers />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/books" element={<Books />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

// Export the App component as the default export
export default App;
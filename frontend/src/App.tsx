import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { EmployeeList } from './pages/EmployeeList';
import { EmployeeForm } from './pages/EmployeeForm';
import { AdminList } from './pages/AdminList';
import { AdminForm } from './pages/AdminForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1', // Deep Blue
      light: '#5472d3',
      dark: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976d2', // Lighter Blue
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f4f8', // Very light blue-grey
      paper: '#ffffff',
    },
    text: {
      primary: '#1a2027',
      secondary: '#3e5060',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #0d47a1 30%, #1976d2 90%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#0d47a1',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/employees" replace />} />

            {/* Employee routes - protected */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <EmployeeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/new"
              element={
                <ProtectedRoute>
                  <EmployeeForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/:id/edit"
              element={
                <ProtectedRoute>
                  <EmployeeForm />
                </ProtectedRoute>
              }
            />

            {/* Admin routes - protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/new"
              element={
                <ProtectedRoute>
                  <AdminForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/:id/edit"
              element={
                <ProtectedRoute>
                  <AdminForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

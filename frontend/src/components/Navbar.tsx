import { AppBar, Toolbar, Typography, Button, Box, Avatar, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { admin, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <AppBar 
            position="static" 
            sx={{ 
                mb: 4,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0px 4px 20px rgba(99, 102, 241, 0.3)',
            }}
        >
            <Toolbar sx={{ py: 1 }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        flexGrow: 1,
                        animation: 'slideInLeft 0.6s ease-out',
                    }}
                >
                    <Avatar 
                        sx={{ 
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            width: 48,
                            height: 48,
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'rotate(360deg) scale(1.1)',
                            },
                        }}
                    >
                        <BusinessIcon sx={{ fontSize: 28 }} />
                    </Avatar>
                    <Box>
                        <Typography 
                            variant="h5" 
                            component="div" 
                            sx={{ 
                                fontWeight: 700,
                                letterSpacing: '-0.5px',
                                background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            EmpManager Pro
                        </Typography>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontWeight: 500,
                            }}
                        >
                            Sistema de Gerenciamento
                        </Typography>
                    </Box>
                </Box>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        alignItems: 'center',
                        animation: 'slideInRight 0.6s ease-out',
                    }}
                >
                    <Button
                        color="inherit"
                        onClick={() => navigate('/employees')}
                        startIcon={<PersonIcon />}
                        sx={{
                            fontWeight: 600,
                            px: 2.5,
                            py: 1,
                            borderRadius: '10px',
                            backgroundColor: location.pathname.startsWith('/employees') 
                                ? 'rgba(255, 255, 255, 0.2)' 
                                : 'transparent',
                            backdropFilter: location.pathname.startsWith('/employees') 
                                ? 'blur(10px)' 
                                : 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Funcionários
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/admin')}
                        startIcon={<AdminPanelSettingsIcon />}
                        sx={{
                            fontWeight: 600,
                            px: 2.5,
                            py: 1,
                            borderRadius: '10px',
                            backgroundColor: location.pathname.startsWith('/admin') 
                                ? 'rgba(255, 255, 255, 0.2)' 
                                : 'transparent',
                            backdropFilter: location.pathname.startsWith('/admin') 
                                ? 'blur(10px)' 
                                : 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Administradores
                    </Button>
                    <Chip 
                        label={admin?.name}
                        avatar={
                            <Avatar sx={{ bgcolor: '#8b5cf6' }}>
                                {admin?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        sx={{ 
                            ml: 2,
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            fontWeight: 600,
                            '& .MuiChip-avatar': {
                                color: 'white',
                            },
                        }}
                    />
                    <Button 
                        color="inherit" 
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                        sx={{ 
                            fontWeight: 600,
                            px: 2.5,
                            py: 1,
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                borderColor: 'rgba(239, 68, 68, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Sair
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};


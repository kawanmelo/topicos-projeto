import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Gerenciamento de Funcionários
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/employees')}
                        sx={{
                            textDecoration: location.pathname.startsWith('/employees') ? 'underline' : 'none'
                        }}
                    >
                        Funcionários
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/admin')}
                        sx={{
                            textDecoration: location.pathname.startsWith('/admin') ? 'underline' : 'none'
                        }}
                    >
                        Administradores
                    </Button>
                    <Typography sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                        {admin?.name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Sair
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

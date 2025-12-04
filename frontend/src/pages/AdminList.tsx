import { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, IconButton, Typography, Box, Container
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import type { Admin } from '../types/admin';

export const AdminList = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadAdmins();
    }, []);

    const loadAdmins = async () => {
        try {
            const data = await adminService.getAll();
            setAdmins(data);
        } catch (error) {
            console.error('Error loading admins:', error);
            alert('Erro ao carregar administradores');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este administrador?')) {
            try {
                await adminService.delete(id);
                loadAdmins();
            } catch (error) {
                console.error('Error deleting admin:', error);
                alert('Erro ao excluir administrador');
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    Administradores
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/new')}
                >
                    Novo Administrador
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => navigate(`/admin/${admin.id}/edit`)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(admin.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {admins.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Nenhum administrador cadastrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

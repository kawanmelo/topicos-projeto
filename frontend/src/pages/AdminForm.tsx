import { useEffect, useState } from 'react';
import {
    TextField, Button, Box, Typography, Container, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../services/adminService';

export const AdminForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (isEdit) {
            loadAdmin();
        }
    }, [id]);

    const loadAdmin = async () => {
        try {
            const admin = await adminService.getById(id!);
            setFormData({
                name: admin.name,
                email: admin.email,
                password: '', // Password not returned from API
            });
        } catch (error) {
            console.error('Error loading admin:', error);
            alert('Erro ao carregar dados do administrador');
            navigate('/admin');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEdit) {
                // For update, only send name and email
                await adminService.update(id!, {
                    name: formData.name,
                    email: formData.email,
                });
            } else {
                // For create, send all fields including password
                await adminService.create(formData);
            }

            navigate('/admin');
        } catch (error: any) {
            console.error('Error saving admin:', error);
            alert('Erro ao salvar administrador: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" mb={3}>
                    {isEdit ? 'Editar Administrador' : 'Novo Administrador'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {!isEdit && (
                            <TextField
                                fullWidth
                                label="Senha"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        )}
                        <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                            <Button variant="outlined" onClick={() => navigate('/admin')}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

import { useEffect, useState } from 'react';
import {
    TextField, Button, Box, Typography, Container, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { z } from 'zod';

const EmployeeSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    position: z.string().min(1, "Cargo é obrigatório"),
    salary: z.number().min(0, "Salário deve ser maior ou igual a zero"),
});

export const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        salary: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isEdit) {
            loadEmployee();
        }
    }, [id]);

    const loadEmployee = async () => {
        try {
            const response = await api.get(`/employees/${id}`);
            const { name, email, position, salary } = response.data;
            setFormData({ name, email, position, salary: String(salary) });
        } catch (error) {
            console.error('Error loading employee:', error);
            alert('Erro ao carregar dados do funcionário');
            navigate('/employees');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const dataToSubmit = {
                ...formData,
                salary: Number(formData.salary),
            };

            EmployeeSchema.parse(dataToSubmit);
            setErrors({});

            if (isEdit) {
                await api.put(`/employees/${id}`, dataToSubmit);
            } else {
                await api.post('/employees', dataToSubmit);
            }

            navigate('/employees');
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.issues.forEach((err: any) => {
                    if (err.path[0]) newErrors[err.path[0] as string] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.error('Error saving employee:', error);
                alert('Erro ao salvar funcionário: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" mb={3}>
                    {isEdit ? 'Editar Funcionário' : 'Novo Funcionário'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            fullWidth
                            label="Cargo"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            error={!!errors.position}
                            helperText={errors.position}
                        />
                        <TextField
                            fullWidth
                            label="Salário"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            error={!!errors.salary}
                            helperText={errors.salary}
                        />
                        <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                            <Button variant="outlined" onClick={() => navigate('/employees')}>
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

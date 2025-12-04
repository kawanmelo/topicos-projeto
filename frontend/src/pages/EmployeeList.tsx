import { useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Typography,
    Box,
    Container,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ToggleButtonGroup,
    ToggleButton,
    Divider,
    type SelectChangeEvent,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Employee, EmployeeFilters, EmployeeStats } from '../types/employee';

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const defaultFilters = {
    search: '',
    position: '',
    minSalary: '',
    maxSalary: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
};

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filters, setFilters] = useState(defaultFilters);
    const [stats, setStats] = useState<EmployeeStats | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
        loadStats();
    }, []);

    const loadEmployees = async (customFilters = filters) => {
        try {
            const params: EmployeeFilters = {};

            if (customFilters.search.trim()) params.search = customFilters.search.trim();
            if (customFilters.position.trim()) params.position = customFilters.position.trim();
            if (customFilters.minSalary !== '') params.minSalary = Number(customFilters.minSalary);
            if (customFilters.maxSalary !== '') params.maxSalary = Number(customFilters.maxSalary);
            if (customFilters.sortBy) params.sortBy = customFilters.sortBy as EmployeeFilters['sortBy'];
            if (customFilters.sortOrder) params.sortOrder = customFilters.sortOrder as EmployeeFilters['sortOrder'];

            const response = await api.get('/employees', { params });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error loading employees:', error);
            alert('Erro ao carregar funcionários');
        }
    };

    const loadStats = async () => {
        try {
            const response = await api.get('/employees/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este funcionário?')) {
            try {
                await api.delete(`/employees/${id}`);
                loadEmployees();
                loadStats();
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Erro ao excluir funcionário');
            }
        }
    };

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setFilters((prev) => ({ ...prev, sortBy: value }));
    };

    const handleOrderChange = (_: MouseEvent<HTMLElement>, value: string) => {
        if (value) {
            setFilters((prev) => ({ ...prev, sortOrder: value }));
        }
    };

    const handleApplyFilters = () => {
        loadEmployees();
    };

    const handleClearFilters = () => {
        setFilters(defaultFilters);
        loadEmployees(defaultFilters);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    Funcionários
                </Typography>
                <Box display="flex" gap={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<RefreshIcon />}
                        onClick={() => {
                            loadEmployees();
                            loadStats();
                        }}
                    >
                        Atualizar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/employees/new')}
                    >
                        Novo Funcionário
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Buscar (nome, email, cargo)"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Filtrar por cargo"
                        name="position"
                        value={filters.position}
                        onChange={handleFilterChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="Salário mínimo"
                        name="minSalary"
                        type="number"
                        value={filters.minSalary}
                        onChange={handleFilterChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="Salário máximo"
                        name="maxSalary"
                        type="number"
                        value={filters.maxSalary}
                        onChange={handleFilterChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="sortBy-label">Ordenar por</InputLabel>
                        <Select
                            labelId="sortBy-label"
                            label="Ordenar por"
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleSortChange}
                        >
                            <MenuItem value="createdAt">Data de criação</MenuItem>
                            <MenuItem value="name">Nome</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                            <MenuItem value="position">Cargo</MenuItem>
                            <MenuItem value="salary">Salário</MenuItem>
                            <MenuItem value="updatedAt">Última atualização</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center" gap={2}>
                    <ToggleButtonGroup
                        color="primary"
                        value={filters.sortOrder}
                        exclusive
                        onChange={handleOrderChange}
                        size="small"
                    >
                        <ToggleButton value="asc">Asc</ToggleButton>
                        <ToggleButton value="desc">Desc</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={handleClearFilters}>
                        Limpar
                    </Button>
                    <Button variant="contained" onClick={handleApplyFilters}>
                        Aplicar filtros
                    </Button>
                </Grid>
            </Grid>

            {stats && (
                <Grid container spacing={2} mb={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Funcionários ativos
                            </Typography>
                            <Typography variant="h5">{stats.totalEmployees}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Média salarial
                            </Typography>
                            <Typography variant="h5">{formatCurrency(stats.averageSalary)}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Folha total
                            </Typography>
                            <Typography variant="h5">{formatCurrency(stats.totalPayroll)}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Maior salário
                            </Typography>
                            {stats.highestSalary ? (
                                <>
                                    <Typography variant="h6">{formatCurrency(stats.highestSalary.salary)}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stats.highestSalary.name} - {stats.highestSalary.position}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="body2">Sem dados</Typography>
                            )}
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle2" color="text.secondary">
                                Menor salário
                            </Typography>
                            {stats.lowestSalary ? (
                                <>
                                    <Typography variant="h6">{formatCurrency(stats.lowestSalary.salary)}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stats.lowestSalary.name} - {stats.lowestSalary.position}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="body2">Sem dados</Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Cargo</TableCell>
                            <TableCell>Salário</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{formatCurrency(employee.salary)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => navigate(`/employees/${employee.id}/edit`)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(employee.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {employees.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Nenhum funcionário encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

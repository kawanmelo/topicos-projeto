import { api } from './api';
import type { Admin, AdminCreate, AdminUpdate, LoginCredentials } from '../types/admin';

export const adminService = {
    login: async (credentials: LoginCredentials): Promise<Admin> => {
        const response = await api.post('/login', credentials);
        return response.data;
    },

    create: async (data: AdminCreate): Promise<Admin> => {
        const response = await api.post('/admin', data);
        return response.data;
    },

    getAll: async (): Promise<Admin[]> => {
        const response = await api.get('/admin');
        return response.data;
    },

    getById: async (id: string): Promise<Admin> => {
        const response = await api.get(`/admin/${id}`);
        return response.data;
    },

    update: async (id: string, data: AdminUpdate): Promise<Admin> => {
        const response = await api.put(`/admin/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/admin/${id}`);
    },
};

import { Request, Response } from 'express';
import * as employeeService from '../services/employeeService';
import { EmployeeQuerySchema, EmployeeSchema } from '../schemas/employee.schema';

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const validatedData = EmployeeSchema.parse(req.body);
        const employee = await employeeService.create(validatedData);
        return res.status(201).json(employee);
    } catch (error: any) {
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        if (error.name === 'ZodError') return res.status(400).json({ message: error.errors });
        return res.status(500).json({ message: error.message });
    }
};

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const filters = EmployeeQuerySchema.parse(req.query);
        const employees = await employeeService.getAll(filters);
        return res.json(employees);
    } catch (error: any) {
        if (error.name === 'ZodError') return res.status(400).json({ message: error.errors });
        return res.status(500).json({ message: error.message });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.getById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Funcionário não encontrado.' });
        return res.json(employee);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const validatedData = EmployeeSchema.parse(req.body);
        const employee = await employeeService.update(req.params.id, validatedData);
        return res.json(employee);
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Funcionário não encontrado.' });
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        if (error.name === 'ZodError') return res.status(400).json({ message: error.errors });
        return res.status(500).json({ message: error.message });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        await employeeService.remove(req.params.id);
        return res.status(204).send();
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Funcionário não encontrado.' });
        return res.status(500).json({ message: error.message });
    }
};

export const getEmployeeStats = async (_req: Request, res: Response) => {
    try {
        const stats = await employeeService.getStats();
        return res.json(stats);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

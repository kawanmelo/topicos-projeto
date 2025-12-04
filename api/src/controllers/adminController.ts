import { Request, Response } from 'express';
import * as adminService from '../services/adminService';

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await adminService.create(req.body);
        return res.status(201).json(admin);
    } catch (error: any) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Email já está em uso." });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await adminService.getAll();
        return res.json(admins);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const admin = await adminService.getById(req.params.id);
        if (!admin)
            return res
                .status(404)
                .json({ message: "Administrador não encontrado." });
        return res.json(admin);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await adminService.update(req.params.id, req.body);
        return res.json(admin);
    } catch (error: any) {
        if (error.code === "P2025")
            return res
                .status(404)
                .json({ message: "Administrador não encontrado." });
        if (error.code === "P2002")
            return res.status(409).json({ message: "Email já está em uso." });
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        await adminService.remove(req.params.id);
        return res.status(204).send();
    } catch (error: any) {
        if (error.code === "P2025")
            return res
                .status(404)
                .json({ message: "Administrador não encontrado." });
        return res.status(500).json({ message: error.message });
    }
};

export const getAdminByLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const admin = await adminService.getByLogin(email, password);
        if (!admin)
            return res.status(404).json({ message: "Credenciais inválidas" });
        return res.json(admin);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

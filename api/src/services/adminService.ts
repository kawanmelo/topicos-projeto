import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";

interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

type AdminCreateData = Omit<Admin, "id" | "createdAt" | "updatedAt">;
type AdminUpdateData = Partial<Omit<Admin, "id" | "createdAt" | "updatedAt" | "password">>;

export const create = async (
    data: AdminCreateData
): Promise<Omit<Admin, "password">> => {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const admin = await prisma.admin.create({
        data: { ...data, password: hashPassword },
    });
    const { password, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
};

export const getAll = async (): Promise<Omit<Admin, "password">[]> => {
    return prisma.admin.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getById = async (
    id: string
): Promise<Omit<Admin, "password"> | null> => {
    return prisma.admin.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const update = async (
    id: string,
    data: AdminUpdateData
): Promise<Omit<Admin, "password">> => {
    return prisma.admin.update({
        where: { id },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const remove = async (id: string): Promise<Admin> => {
    return prisma.admin.delete({ where: { id } });
};

export const getByLogin = async (
    email: string,
    password: string
): Promise<Omit<Admin, "password"> | null> => {
    const admin = await prisma.admin.findFirst({
        where: { email },
    });

    if (!admin) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        return null;
    }

    const { password: _, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
};

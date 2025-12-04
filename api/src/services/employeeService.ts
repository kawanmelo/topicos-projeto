import { prisma } from "../database/prisma";
import { EmployeeInput } from "../schemas/employee.schema";

export const create = async (data: EmployeeInput) => {
    return await prisma.employee.create({ data });
};

export const getAll = async () => {
    return await prisma.employee.findMany();
};

export const getById = async (id: string) => {
    return await prisma.employee.findUnique({ where: { id } });
};

export const update = async (id: string, data: EmployeeInput) => {
    return await prisma.employee.update({ where: { id }, data });
};

export const remove = async (id: string) => {
    return await prisma.employee.delete({ where: { id } });
};

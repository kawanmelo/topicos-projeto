import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { EmployeeInput, EmployeeQueryParams } from "../schemas/employee.schema";

export const create = async (data: EmployeeInput) => {
    return await prisma.employee.create({ data });
};

export const getAll = async (filters: EmployeeQueryParams) => {
    const { search, position, minSalary, maxSalary, sortBy = "createdAt", sortOrder = "desc" } = filters;

    const where: Prisma.EmployeeWhereInput = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { position: { contains: search, mode: "insensitive" } },
        ];
    }

    if (position) {
        where.position = { contains: position, mode: "insensitive" };
    }

    if (minSalary !== undefined || maxSalary !== undefined) {
        const salaryFilter: Prisma.FloatFilter = {};
        if (minSalary !== undefined) {
            salaryFilter.gte = minSalary;
        }
        if (maxSalary !== undefined) {
            salaryFilter.lte = maxSalary;
        }
        where.salary = salaryFilter;
    }

    const orderBy: Prisma.EmployeeOrderByWithRelationInput | undefined = sortBy
        ? ({ [sortBy]: sortOrder } as Prisma.EmployeeOrderByWithRelationInput)
        : undefined;

    return await prisma.employee.findMany({
        where,
        orderBy,
    });
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

export const getStats = async () => {
    const [aggregation, highest, lowest] = await Promise.all([
        prisma.employee.aggregate({
            _count: { _all: true },
            _avg: { salary: true },
            _sum: { salary: true },
        }),
        prisma.employee.findFirst({
            orderBy: { salary: "desc" },
            select: { id: true, name: true, salary: true, position: true },
        }),
        prisma.employee.findFirst({
            orderBy: { salary: "asc" },
            select: { id: true, name: true, salary: true, position: true },
        }),
    ]);

    return {
        totalEmployees: aggregation._count._all,
        averageSalary: aggregation._avg.salary ?? 0,
        totalPayroll: aggregation._sum.salary ?? 0,
        highestSalary: highest ?? null,
        lowestSalary: lowest ?? null,
    };
};

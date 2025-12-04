import { z } from "zod";

export const EmployeeSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    position: z.string().min(1, "Cargo é obrigatório"),
    salary: z.number().min(0, "Salário deve ser maior ou igual a zero"),
});

export const EmployeeQuerySchema = z
    .object({
        search: z.string().min(1).optional(),
        position: z.string().min(1).optional(),
        minSalary: z
            .preprocess((value) => (value === "" || value === undefined ? undefined : value), z.number().min(0))
            .optional(),
        maxSalary: z
            .preprocess((value) => (value === "" || value === undefined ? undefined : value), z.number().min(0))
            .optional(),
        sortBy: z.enum(["name", "email", "position", "salary", "createdAt", "updatedAt"]).optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
    })
    .refine(
        (data) => {
            if (data.minSalary !== undefined && data.maxSalary !== undefined) {
                return data.minSalary <= data.maxSalary;
            }
            return true;
        },
        { message: "minSalary não pode ser maior que maxSalary", path: ["minSalary"] }
    );

export type EmployeeInput = z.infer<typeof EmployeeSchema>;
export type EmployeeQueryParams = z.infer<typeof EmployeeQuerySchema>;

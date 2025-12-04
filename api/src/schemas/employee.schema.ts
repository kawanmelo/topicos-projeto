import { z } from "zod";

export const EmployeeSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    position: z.string().min(1, "Cargo é obrigatório"),
    salary: z.number().min(0, "Salário deve ser maior ou igual a zero"),
});

export type EmployeeInput = z.infer<typeof EmployeeSchema>;

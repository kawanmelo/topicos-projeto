import { z } from "zod";

// Schema para Admin
export const createAdminSchema = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres"),
    email: z
        .string()
        .email({ message: "Email deve ter um formato válido" })
        .max(255, "Email deve ter no máximo 255 caracteres"),
    password: z
        .string()
        .min(6, "Senha deve ter pelo menos 6 caracteres")
        .max(100, "Senha deve ter no máximo 100 caracteres"),
});

export const loginAdminSchema = z.object({
    email: z
        .string()
        .email({ message: "Email deve ter um formato válido" })
        .max(255, "Email deve ter no máximo 255 caracteres"),
    password: z
        .string()
        .min(4, "Senha deve ter pelo menos 4 caracteres")
        .max(100, "Senha deve ter no máximo 100 caracteres"),
});

export const updateAdminSchema = createAdminSchema.partial();

// Tipos TypeScript derivados dos schemas
export type CreateAdminData = z.infer<typeof createAdminSchema>;
export type UpdateAdminData = z.infer<typeof updateAdminSchema>;
export type LoginAdminData = z.infer<typeof loginAdminSchema>;

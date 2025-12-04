"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminSchema = exports.loginAdminSchema = exports.createAdminSchema = void 0;
const zod_1 = require("zod");
// Schema para Admin
exports.createAdminSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres"),
    email: zod_1.z
        .string()
        .email({ message: "Email deve ter um formato válido" })
        .max(255, "Email deve ter no máximo 255 caracteres"),
    password: zod_1.z
        .string()
        .min(6, "Senha deve ter pelo menos 6 caracteres")
        .max(100, "Senha deve ter no máximo 100 caracteres"),
});
exports.loginAdminSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Email deve ter um formato válido" })
        .max(255, "Email deve ter no máximo 255 caracteres"),
    password: zod_1.z
        .string()
        .min(4, "Senha deve ter pelo menos 4 caracteres")
        .max(100, "Senha deve ter no máximo 100 caracteres"),
});
exports.updateAdminSchema = exports.createAdminSchema.partial();

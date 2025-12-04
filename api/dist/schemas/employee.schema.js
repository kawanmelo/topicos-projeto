"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSchema = void 0;
const zod_1 = require("zod");
exports.EmployeeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    position: zod_1.z.string().min(1, "Cargo é obrigatório"),
    salary: zod_1.z.number().min(0, "Salário deve ser maior ou igual a zero"),
});

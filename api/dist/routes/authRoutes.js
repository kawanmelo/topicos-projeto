"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const validation_1 = require("../middlewares/validation");
const validation_2 = require("../schemas/validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Autenticação de administradores
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um administrador
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", (0, validation_1.validateBody)(validation_2.loginAdminSchema), adminController_1.getAdminByLogin);
exports.default = router;

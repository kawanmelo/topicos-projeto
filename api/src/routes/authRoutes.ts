import { Router } from "express";
import { getAdminByLogin } from "../controllers/adminController";
import { validateBody } from "../middlewares/validation";
import { loginAdminSchema } from "../schemas/validation";

const router = Router();

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

router.post(
    "/login",
    validateBody(loginAdminSchema),
    getAdminByLogin
);

export default router;

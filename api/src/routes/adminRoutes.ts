import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { validateBody } from '../middlewares/validation';
import { createAdminSchema, updateAdminSchema } from '../schemas/validation';

const router = Router();

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCreate'
 *     responses:
 *       201:
 *         description: The admin was successfully created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */
router.post('/admin', validateBody(createAdminSchema), adminController.createAdmin);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Returns the list of all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: The list of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 */
router.get('/admin', adminController.getAllAdmins);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get an admin by ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: The admin description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found
 */
router.get('/admin/:id', adminController.getAdminById);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Update an admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUpdate'
 *     responses:
 *       200:
 *         description: The admin was updated
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.put('/admin/:id', validateBody(updateAdminSchema), adminController.updateAdmin);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Remove an admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       204:
 *         description: The admin was deleted
 *       404:
 *         description: Admin not found
 */
router.delete('/admin/:id', adminController.deleteAdmin);

export default router;

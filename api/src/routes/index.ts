import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

// Authentication routes
router.use('', authRoutes);

// Admin routes
router.use('', adminRoutes);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: The employee was successfully created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/employees', employeeController.createEmployee);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Returns the list of all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: The list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/employees', employeeController.getAllEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: The employee description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get('/employees/:id', employeeController.getEmployeeById);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The employee was updated
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.put('/employees/:id', employeeController.updateEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Remove an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee ID
 *     responses:
 *       204:
 *         description: The employee was deleted
 *       404:
 *         description: Employee not found
 */
router.delete('/employees/:id', employeeController.deleteEmployee);

export default router;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController = __importStar(require("../controllers/adminController"));
const validation_1 = require("../middlewares/validation");
const validation_2 = require("../schemas/validation");
const router = (0, express_1.Router)();
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
router.post('/admin', (0, validation_1.validateBody)(validation_2.createAdminSchema), adminController.createAdmin);
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
router.put('/admin/:id', (0, validation_1.validateBody)(validation_2.updateAdminSchema), adminController.updateAdmin);
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
exports.default = router;

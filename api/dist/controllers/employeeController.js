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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployees = exports.createEmployee = void 0;
const employeeService = __importStar(require("../services/employeeService"));
const employee_schema_1 = require("../schemas/employee.schema");
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = employee_schema_1.EmployeeSchema.parse(req.body);
        const employee = yield employeeService.create(validatedData);
        return res.status(201).json(employee);
    }
    catch (error) {
        if (error.code === 'P2002')
            return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        if (error.name === 'ZodError')
            return res.status(400).json({ message: error.errors });
        return res.status(500).json({ message: error.message });
    }
});
exports.createEmployee = createEmployee;
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employeeService.getAll();
        return res.json(employees);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield employeeService.getById(req.params.id);
        if (!employee)
            return res.status(404).json({ message: 'Funcionário não encontrado.' });
        return res.json(employee);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = employee_schema_1.EmployeeSchema.parse(req.body);
        const employee = yield employeeService.update(req.params.id, validatedData);
        return res.json(employee);
    }
    catch (error) {
        if (error.code === 'P2025')
            return res.status(404).json({ message: 'Funcionário não encontrado.' });
        if (error.code === 'P2002')
            return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        if (error.name === 'ZodError')
            return res.status(400).json({ message: error.errors });
        return res.status(500).json({ message: error.message });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield employeeService.remove(req.params.id);
        return res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025')
            return res.status(404).json({ message: 'Funcionário não encontrado.' });
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteEmployee = deleteEmployee;

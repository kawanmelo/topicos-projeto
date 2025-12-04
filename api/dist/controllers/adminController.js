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
exports.getAdminByLogin = exports.deleteAdmin = exports.updateAdmin = exports.getAdminById = exports.getAllAdmins = exports.createAdmin = void 0;
const adminService = __importStar(require("../services/adminService"));
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminService.create(req.body);
        return res.status(201).json(admin);
    }
    catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Email já está em uso." });
        }
        return res.status(500).json({ message: error.message });
    }
});
exports.createAdmin = createAdmin;
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield adminService.getAll();
        return res.json(admins);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllAdmins = getAllAdmins;
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminService.getById(req.params.id);
        if (!admin)
            return res
                .status(404)
                .json({ message: "Administrador não encontrado." });
        return res.json(admin);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAdminById = getAdminById;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminService.update(req.params.id, req.body);
        return res.json(admin);
    }
    catch (error) {
        if (error.code === "P2025")
            return res
                .status(404)
                .json({ message: "Administrador não encontrado." });
        if (error.code === "P2002")
            return res.status(409).json({ message: "Email já está em uso." });
        return res.status(500).json({ message: error.message });
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield adminService.remove(req.params.id);
        return res.status(204).send();
    }
    catch (error) {
        if (error.code === "P2025")
            return res
                .status(404)
                .json({ message: "Administrador não encontrado." });
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteAdmin = deleteAdmin;
const getAdminByLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield adminService.getByLogin(email, password);
        if (!admin)
            return res.status(404).json({ message: "Credenciais inválidas" });
        return res.json(admin);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAdminByLogin = getAdminByLogin;

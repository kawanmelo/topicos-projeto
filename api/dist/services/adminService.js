"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByLogin = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const prisma_1 = require("../database/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcryptjs_1.default.hash(data.password, 10);
    const admin = yield prisma_1.prisma.admin.create({
        data: Object.assign(Object.assign({}, data), { password: hashPassword }),
    });
    const { password } = admin, adminWithoutPassword = __rest(admin, ["password"]);
    return adminWithoutPassword;
});
exports.create = create;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.admin.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.admin.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
exports.getById = getById;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.admin.update({
        where: { id },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.admin.delete({ where: { id } });
});
exports.remove = remove;
const getByLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma_1.prisma.admin.findFirst({
        where: { email },
    });
    if (!admin) {
        return null;
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, admin.password);
    if (!isPasswordValid) {
        return null;
    }
    const { password: _ } = admin, adminWithoutPassword = __rest(admin, ["password"]);
    return adminWithoutPassword;
});
exports.getByLogin = getByLogin;

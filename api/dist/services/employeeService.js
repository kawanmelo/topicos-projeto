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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const prisma_1 = require("../database/prisma");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.employee.create({ data });
});
exports.create = create;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.employee.findMany();
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.employee.findUnique({ where: { id } });
});
exports.getById = getById;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.employee.update({ where: { id }, data });
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.employee.delete({ where: { id } });
});
exports.remove = remove;

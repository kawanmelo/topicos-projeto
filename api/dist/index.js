"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use((0, cors_1.default)({
    origin: CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.use("", routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📡 CORS enabled for: ${CORS_ORIGIN}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

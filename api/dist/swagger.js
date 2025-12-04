"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const getServerUrl = () => {
    if (process.env.NODE_ENV === "production") {
        return process.env.API_URL || "http://localhost:3000";
    }
    return "http://localhost:3000";
};
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Employee Management API",
            version: "1.0.0",
            description: "API for managing employees",
        },
        servers: [
            {
                url: getServerUrl(),
            },
        ],
        components: {
            schemas: {
                Employee: {
                    type: "object",
                    required: ["name", "email", "position", "salary"],
                    properties: {
                        id: {
                            type: "string",
                            description: "The auto-generated id of the employee",
                        },
                        name: {
                            type: "string",
                            description: "The name of the employee",
                        },
                        email: {
                            type: "string",
                            description: "The email of the employee",
                        },
                        position: {
                            type: "string",
                            description: "The position of the employee",
                        },
                        salary: {
                            type: "number",
                            description: "The salary of the employee",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "The date the employee was added",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "The date the employee was last updated",
                        },
                    },
                },
                Admin: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "The auto-generated id of the admin",
                        },
                        name: {
                            type: "string",
                            description: "The name of the admin",
                        },
                        email: {
                            type: "string",
                            description: "The email of the admin",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "The date the admin was added",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "The date the admin was last updated",
                        },
                    },
                },
                AdminCreate: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the admin",
                        },
                        email: {
                            type: "string",
                            description: "The email of the admin",
                        },
                        password: {
                            type: "string",
                            description: "The password of the admin",
                        },
                    },
                },
                AdminUpdate: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the admin",
                        },
                        email: {
                            type: "string",
                            description: "The email of the admin",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.setupSwagger = setupSwagger;

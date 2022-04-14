"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = async () => {
    return await (0, promise_1.createPool)({
        host: process.env.HOST || "localhost",
        user: process.env.USER || "root",
        database: process.env.DATABASE || "test",
    });
};
exports.config = config;
//# sourceMappingURL=config.js.map
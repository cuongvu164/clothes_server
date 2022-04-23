"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserService = exports.getSingleUserService = exports.getAllUsersService = void 0;
const config_1 = require("../config");
const argon2_1 = __importDefault(require("argon2"));
const getAllUsersService = async () => {
    try {
        const pool = await (0, config_1.config)();
        const [rows] = await pool.query("SELECT * FROM users");
        const connection = await pool.getConnection();
        connection.release();
        if (rows) {
            return rows;
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.getAllUsersService = getAllUsersService;
const getSingleUserService = async (username) => {
    try {
        const pool = await (0, config_1.config)();
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
            username,
        ]);
        const connection = await pool.getConnection();
        connection.release();
        if (rows) {
            return rows;
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.getSingleUserService = getSingleUserService;
const registerUserService = async (param) => {
    const hashedPassword = await argon2_1.default.hash(param.password);
    const newUser = {
        username: param.username,
        password: hashedPassword,
    };
    try {
        const existingUser = await (0, exports.getSingleUserService)(param.username);
        if (Array.isArray(existingUser) && existingUser.length > 0) {
            return "User already exists";
        }
        else {
            const pool = await (0, config_1.config)();
            const [rows] = await pool.query("INSERT INTO users (username, password) VALUES (?,?)", [newUser.username, newUser.password]);
            const connection = await pool.getConnection();
            connection.release();
            if (rows) {
                return "done";
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.registerUserService = registerUserService;
//# sourceMappingURL=usersService.js.map
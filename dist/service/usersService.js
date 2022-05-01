"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = exports.getSingleUserService = exports.getAllUsersService = void 0;
const config_1 = require("../config");
const argon2_1 = __importDefault(require("argon2"));
const auth_1 = require("../utils/auth");
const getAllUsersService = async () => {
    try {
        const pool = await (0, config_1.config)();
        const [rows] = await pool.query("SELECT * FROM users");
        const connection = await pool.getConnection();
        connection.release();
        if (rows) {
            return {
                success: true,
                errorMessage: "",
                users: rows,
            };
        }
    }
    catch (err) {
        return {
            success: false,
            errorMessage: err.message,
            users: [],
        };
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
            return {
                success: true,
                errorMessage: "",
                users: rows,
            };
        }
    }
    catch (err) {
        return {
            success: false,
            errorMessage: err.message,
            users: [],
        };
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
        if (existingUser) {
            if (Array.isArray(existingUser.users) && existingUser.users.length > 0) {
                return {
                    success: false,
                    errorMessage: "User already exists",
                };
            }
            else {
                const pool = await (0, config_1.config)();
                const [rows] = await pool.query("INSERT INTO users (username, password) VALUES (?,?)", [newUser.username, newUser.password]);
                const connection = await pool.getConnection();
                connection.release();
                if (rows) {
                    return {
                        success: true,
                        errorMessage: "Done",
                    };
                }
            }
        }
    }
    catch (err) {
        return {
            success: false,
            errorMessage: err.message,
            users: [],
        };
    }
};
exports.registerUserService = registerUserService;
const loginUserService = async (param) => {
    const userInfo = {
        username: param.username,
        password: param.password,
    };
    try {
        const existingUser = await (0, exports.getSingleUserService)(userInfo.username);
        if (existingUser) {
            if (Array.isArray(existingUser.users) &&
                existingUser.users.length === 0) {
                return {
                    success: false,
                    errorMessage: "User not found",
                };
            }
            else {
                if (Array.isArray(existingUser.users)) {
                    const existingUserData = existingUser.users[0];
                    const isPasswordValid = await argon2_1.default.verify(existingUserData.password, userInfo.password);
                    if (!isPasswordValid) {
                        return {
                            success: false,
                            errorMessage: "Password is incorrect",
                        };
                    }
                }
                if (Array.isArray(existingUser.users)) {
                    return {
                        success: true,
                        errorMessage: "Login successful",
                        users: existingUser.users,
                        accessToken: (0, auth_1.createToken)(existingUser.users[0]),
                    };
                }
            }
        }
    }
    catch (err) {
        return {
            success: false,
            errorMessage: err.message,
            users: [],
        };
    }
};
exports.loginUserService = loginUserService;
//# sourceMappingURL=usersService.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getSingleUser = exports.getAllUsers = void 0;
const usersService_1 = require("./../service/usersService");
const usersService_2 = require("../service/usersService");
const getAllUsers = async (_req, res) => {
    try {
        const users = await (0, usersService_2.getAllUsersService)();
        res.status(200).json({
            data: users,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.getAllUsers = getAllUsers;
const getSingleUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await (0, usersService_1.getSingleUserService)(username);
        res.status(200).json({
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.getSingleUser = getSingleUser;
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await (0, usersService_2.registerUserService)({ username, password });
        res.status(200).json({
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await (0, usersService_2.loginUserService)({ username, password });
        res.status(200).json({
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=usersController.js.map
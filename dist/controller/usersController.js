"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getAllUsers = void 0;
const usersService_1 = require("../service/usersService");
const getAllUsers = async (_req, res) => {
    const users = await (0, usersService_1.getAllUsersService)();
    res.status(200).json({
        errorMessage: "",
        users,
    });
};
exports.getAllUsers = getAllUsers;
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await (0, usersService_1.registerUserService)({ username, password });
        res.status(200).json({
            success: true,
            errorMessage: "",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=usersController.js.map
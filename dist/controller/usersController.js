"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const usersService_1 = require("../service/usersService");
const getAllUsers = async (_req, res) => {
    const users = await (0, usersService_1.getAllUsersService)();
    res.status(200).json({
        errorMessage: "",
        users,
    });
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=usersController.js.map
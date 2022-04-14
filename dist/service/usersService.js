"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersService = void 0;
const config_1 = require("../config");
const getAllUsersService = async () => {
    try {
        const connection = await (0, config_1.config)();
        const [rows] = await connection.query("SELECT * FROM users");
        if (rows) {
            return rows;
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.getAllUsersService = getAllUsersService;
//# sourceMappingURL=usersService.js.map
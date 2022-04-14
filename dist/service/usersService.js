"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersService = void 0;
const config_1 = require("../config");
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
//# sourceMappingURL=usersService.js.map
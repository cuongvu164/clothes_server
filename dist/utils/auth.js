"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (user) => {
    return (0, jsonwebtoken_1.sign)({
        userId: user.username,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};
exports.createToken = createToken;
//# sourceMappingURL=auth.js.map
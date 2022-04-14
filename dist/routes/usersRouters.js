"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouters = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usersController_1 = require("../controller/usersController");
const usersRouters = (app) => {
    router.get("/api/getAllUsers", usersController_1.getAllUsers);
    return app.use("/", router);
};
exports.usersRouters = usersRouters;
//# sourceMappingURL=usersRouters.js.map
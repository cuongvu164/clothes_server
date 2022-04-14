"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get("/", async (_req, res) => {
    const connection = await (0, config_1.config)();
    const [rows, _fields] = await connection.query("SELECT * FROM users");
    res.send(rows);
});
app.post("/post", async (req, res) => {
    const { username, password } = req.body;
    const connection = await (0, config_1.config)();
    await connection.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password]);
    res.send({
        message: "success",
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map
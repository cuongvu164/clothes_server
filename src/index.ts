import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import { createConnection } from "./config/connect";
import { userRouters } from "./routes/user";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createConnection();
userRouters(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

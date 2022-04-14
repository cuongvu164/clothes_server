import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import { usersRouters } from "./routes/usersRouters";

const app: Express = express();
const port = process.env.PORT || 8000;
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

usersRouters(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

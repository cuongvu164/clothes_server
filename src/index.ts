import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
// import morgan from "morgan";
import { config } from "./config";
import dotenv from "dotenv";
const app: Express = express();
const port = process.env.PORT || 8000;
dotenv.config();

// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (_req: Request, res: Response) => {
  const connection = await config();
  const [rows, _fields] = await connection.query("SELECT * FROM users");
  res.send(rows);
});

app.post("/post", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const connection = await config();
  await connection.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, password]
  );
  res.send({
    message: "success",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

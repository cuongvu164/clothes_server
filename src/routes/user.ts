import express, { Express } from "express";
import { loginUser, registerUser } from "../controller/user";
const router = express.Router();

export const userRouters = (app: Express) => {

  router.post("/registerUser", registerUser);

  router.post("/loginUser", loginUser);

  return app.use("/api", router);
};
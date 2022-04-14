import express, { Express } from "express";
const router = express.Router();
import { getAllUsers } from "../controller/usersController";
export const usersRouters = (app: Express) => {
  router.get("/api/getAllUsers", getAllUsers);
  return app.use("/", router);
};

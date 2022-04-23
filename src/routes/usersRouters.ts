import express, { Express } from "express";
const router = express.Router();
import { getAllUsers, registerUser } from "../controller/usersController";
export const usersRouters = (app: Express) => {

  router.get("/api/getAllUsers", getAllUsers);
  
  router.post("/api/registerUser", registerUser);

  return app.use("/", router);
};

import express, { Express } from "express";
const router = express.Router();
import {
  getAllUsers,
  registerUser,
  getSingleUser,
  loginUser,
} from "../controller/usersController";
export const usersRouters = (app: Express) => {
  router.get("/api/getAllUsers", getAllUsers);

  router.get("/api/getSingleUser", getSingleUser);

  router.post("/api/registerUser", registerUser);

  router.post("/api/loginUser", loginUser);

  return app.use("/", router);
};

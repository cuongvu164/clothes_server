import { Request, Response } from "express";
import {
  getAllUsersService,
  registerUserService,
} from "../service/usersService";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsersService();
  res.status(200).json({
    errorMessage: "",
    users,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const result = await registerUserService({ username, password });
    res.status(200).json({
      success: true,
      errorMessage: "",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

import { getSingleUserService } from "./../service/usersService";
import { Request, Response } from "express";
import {
  getAllUsersService,
  registerUserService,
  loginUserService,
} from "../service/usersService";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await getSingleUserService(username);
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const result = await registerUserService({ username, password });
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const result = await loginUserService({ username, password });
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

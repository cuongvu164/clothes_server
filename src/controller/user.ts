import { Request, Response } from "express";
import { userType } from "../types/user";
import { loginUserService, registerUserService } from "../service/user";

export const registerUser = async (req: Request, res: Response) => {
  const {
    username,
    password,
    email,
    address,
    gender,
    phone,
    date_of_birth,
    role,
  }: userType = req.body;
  const result = await registerUserService({
    username,
    password,
    email,
    address,
    gender,
    phone,
    date_of_birth,
    role,
  });
  try {
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      data: result,
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await loginUserService({ username, password, res });
  try {
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      data: result,
    });
  }
};

import { Request, Response } from "express";
import { getAllUsersService } from "../service/usersService";
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsersService();
  res.status(200).json({
    errorMessage: "",
    users,
  });
};

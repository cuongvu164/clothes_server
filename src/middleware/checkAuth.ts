import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret, verify } from "jsonwebtoken";

export interface iRequest extends Request {
    user? : JwtPayload | string
}
export const checkAuth = (
  req: iRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        code: 401,
        status: false,
        message: "Unauthorized",
      });
    } else {
      const decodeUser = verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret
      ) 
      console.log(decodeUser)
      req.user = decodeUser;
      next();
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: false,
      message: err.message,
    });
  }
};
export const checkAuthAdmin = () => {
  
}
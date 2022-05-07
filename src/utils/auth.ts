import { Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { userType } from "./../types/user";
export const createToken = (
  type: "accessToken" | "refreshToken",
  user: userType
) => {
  return sign(
    { user },
    type === "accessToken"
      ? (process.env.ACCESS_TOKEN_SECRET as Secret)
      : (process.env.REFREESH_TOKEN_SECRET as Secret),
    {
      expiresIn: type === "accessToken" ? "10s" : "60m",
    }
  );
};
export const sendRefreshToken = (res: Response, user: userType) => {
  res.cookie(
    process.env.REFRESH_TOKEN_COOKIE_NAME as string,
    createToken("refreshToken", user),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    }
  );
};

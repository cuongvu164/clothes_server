import { config } from "../config";
import argon2 from "argon2";
import { UsersResponse } from "../types/usersResponse";
import { Users } from "../types/users";
import { Response } from "../types/response";
import { createToken } from "../utils/auth";

export const getAllUsersService = async (): Promise<
  UsersResponse | undefined
> => {
  try {
    const pool = await config();
    const [rows] = await pool.query("SELECT * FROM users");
    const connection = await pool.getConnection();
    connection.release();
    if (rows) {
      return {
        success: true,
        errorMessage: "",
        users: rows,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err.message,
      users: [],
    };
  }
};
export const getSingleUserService = async (
  username: string
): Promise<UsersResponse | undefined> => {
  try {
    const pool = await config();
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const connection = await pool.getConnection();
    connection.release();

    if (rows) {
      return {
        success: true,
        errorMessage: "",
        users: rows,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err.message,
      users: [],
    };
  }
};
export const registerUserService = async (
  param: Users
): Promise<Response | UsersResponse | undefined> => {
  const hashedPassword = await argon2.hash(param.password);
  const newUser: Users = {
    username: param.username,
    password: hashedPassword,
  };
  try {
    const existingUser = await getSingleUserService(param.username);
    if (existingUser) {
      if (Array.isArray(existingUser.users) && existingUser.users.length > 0) {
        return {
          success: false,
          errorMessage: "User already exists",
        };
      } else {
        const pool = await config();
        const [rows] = await pool.query(
          "INSERT INTO users (username, password) VALUES (?,?)",
          [newUser.username, newUser.password]
        );
        const connection = await pool.getConnection();
        connection.release();
        if (rows) {
          return {
            success: true,
            errorMessage: "Done",
          };
        }
      }
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err.message,
      users: [],
    };
  }
};
export const loginUserService = async (
  param: Users
): Promise<Response | UsersResponse | undefined> => {
  const userInfo: Users = {
    username: param.username,
    password: param.password,
  };
  try {
    const existingUser = await getSingleUserService(userInfo.username);
    if (existingUser) {
      if (
        Array.isArray(existingUser.users) &&
        existingUser.users.length === 0
      ) {
        return {
          success: false,
          errorMessage: "User not found",
        };
      } else {
        if (Array.isArray(existingUser.users)) {
          const existingUserData = existingUser.users[0] as Users;
          const isPasswordValid = await argon2.verify(
            existingUserData.password,
            userInfo.password
          );
          if (!isPasswordValid) {
            return {
              success: false,
              errorMessage: "Password is incorrect",
            };
          }
        }
        if (Array.isArray(existingUser.users)) {
          return {
            success: true,
            errorMessage: "Login successful",
            users: existingUser.users,
            accessToken: createToken(existingUser.users[0] as Users),
          };
        }
      }
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err.message,
      users: [],
    };
  }
};

import { config } from "../config";
import argon2 from "argon2";
import { RegisterInput } from "../types/users";

export const getAllUsersService = async () => {
  try {
    const pool = await config();
    const [rows] = await pool.query("SELECT * FROM users");
    const connection = await pool.getConnection();
    connection.release();
    if (rows) {
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};
export const getSingleUserService = async (username: string) => {
  try {
    const pool = await config();
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const connection = await pool.getConnection();
    connection.release();

    if (rows) {
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};
export const registerUserService = async (param: RegisterInput) => {
  const hashedPassword = await argon2.hash(param.password);
  const newUser: RegisterInput = {
    username: param.username,
    password: hashedPassword,
  };
  try {
    const existingUser = await getSingleUserService(param.username);
    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return "User already exists";
    } else {
      const pool = await config();
      const [rows] = await pool.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [newUser.username, newUser.password]
      );
      const connection = await pool.getConnection();
      connection.release();
      if (rows) {
        return "done";
      }
    }
  } catch (err) {
    console.log(err);
  }
};

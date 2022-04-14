import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
export const config = async () => {
  return await createPool({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    database: process.env.DATABASE || "test",
  });
};

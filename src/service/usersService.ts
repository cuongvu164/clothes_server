import { config } from "../config";
export const getAllUsersService = async () => {
  try {
    const connection = await config();
    const [rows] = await connection.query("SELECT * FROM users");
    if (rows) {
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};

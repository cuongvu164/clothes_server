import { config } from "../config";
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

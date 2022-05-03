import { configdb } from "./config";
export const createConnection = async () => {
  try {
    await configdb.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

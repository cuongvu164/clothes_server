import { Sequelize } from "sequelize";
export const configdb = new Sequelize("english_software_for_high_school","root", undefined, {
  host: "localhost",
  dialect: "mysql",
});

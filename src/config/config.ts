import { Sequelize } from "sequelize";
export const configdb = new Sequelize(
  "english_software_for_high_school",
  "root",
  undefined,
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

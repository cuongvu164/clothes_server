import { Sequelize } from "sequelize";
export const configdb = new Sequelize(
  "clothes",
  "admin",
  "admin",
  
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

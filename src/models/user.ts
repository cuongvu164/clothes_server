import { DataTypes } from "sequelize";
import { configdb } from "../config/config";

export const User = configdb.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    gender: {
      type: DataTypes.BOOLEAN,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.INTEGER,
    }
  },
  {
    // Other model options go here
  }
);

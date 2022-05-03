import { DataTypes, Model } from "sequelize";
import { configdb } from "../config/config";

export class Users extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare email: string;
  declare address: string;
  declare gender: number;
  declare phone: number;
  declare date_of_birth: Date;
}
Users.init(
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
      type: DataTypes.TINYINT,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: configdb,
    modelName: "Users",
    createdAt: false,
    updatedAt: false,
  }
);

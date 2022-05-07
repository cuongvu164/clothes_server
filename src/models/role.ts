import { DataTypes, Model } from "sequelize";
import { configdb } from "../config/config";

export class Role extends Model {
  declare id: number;
  declare name: string;
}
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(250),
      allowNull: false,
    }
  },
  {
    sequelize: configdb,
    modelName: "Role",
  }
);

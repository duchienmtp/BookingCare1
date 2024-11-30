"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Roles.hasMany(models.Users, {
        foreignKey: "roleId",
        as: "users",
      });
    }
  }

  Roles.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
      tableName: "Roles",
    }
  );
  return Roles;
};

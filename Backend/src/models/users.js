"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Users.hasMany(models.Doctors, {
        foreignKey: "userId",
        as: "doctors",
      });

      Users.belongsTo(models.Roles, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }

  Users.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      fullName: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      gender: DataTypes.CHAR,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
    }
  );
  return Users;
};

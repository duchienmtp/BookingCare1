"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class PackageType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      PackageType.hasMany(models.Doctors, {
        foreignKey: "packageTypeId",
        as: "doctors",
      });
    }
  }

  PackageType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      name: STRING,
    },
    {
      sequelize,
      modelName: "PackageType",
      tableName: "Package_Type",
    }
  );
  return PackageType;
};

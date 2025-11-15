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

      PackageType.hasMany(models.Clinics_PackageTypes, {
        foreignKey: "packageTypeId",
      });

      PackageType.hasMany(models.Health_Check_Packages, {
        foreignKey: "packageTypeId",
      });
    }
  }

  PackageType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PackageType",
      tableName: "Package_Types",
    }
  );
  return PackageType;
};

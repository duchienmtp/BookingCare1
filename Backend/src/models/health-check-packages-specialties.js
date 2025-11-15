"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class HealthCheckPackages_Specialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      HealthCheckPackages_Specialties.belongsTo(models.Health_Check_Packages, {
        foreignKey: "packageId",
      });

      HealthCheckPackages_Specialties.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
      });
    }
  }

  HealthCheckPackages_Specialties.init(
    {
      packageId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      specialtyId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "HealthCheckPackages_Specialties",
      tableName: "HealthCheckPackages_Specialties",
    }
  );
  return HealthCheckPackages_Specialties;
};

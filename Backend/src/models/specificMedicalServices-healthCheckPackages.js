"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class SpecificMedicalServices_HealthCheckPackages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      SpecificMedicalServices_HealthCheckPackages.belongsTo(
        models.SpecificMedicalServices,
        {
          foreignKey: "specificMedicalServiceId",
        }
      );

      SpecificMedicalServices_HealthCheckPackages.belongsTo(
        models.Health_Check_Packages,
        {
          foreignKey: "packageId",
        }
      );
    }
  }

  SpecificMedicalServices_HealthCheckPackages.init(
    {
      specificMedicalServiceId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      packageId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SpecificMedicalServices_HealthCheckPackages",
      tableName: "SpecificMedicalServices_HealthCheckPackages",
    }
  );
  return SpecificMedicalServices_HealthCheckPackages;
};

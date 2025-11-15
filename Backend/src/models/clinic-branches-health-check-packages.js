"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ClinicBranches_HealthCheckPackages extends Model {
    static associate(models) {
      // define association here

      ClinicBranches_HealthCheckPackages.belongsTo(models.ClinicBranches, {
        foreignKey: "clinicBranchId",
      });

      ClinicBranches_HealthCheckPackages.belongsTo(
        models.Health_Check_Packages,
        {
          foreignKey: "packageId",
        }
      );
    }
  }

  ClinicBranches_HealthCheckPackages.init(
    {
      clinicBranchId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      packageId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "ClinicBranches_HealthCheckPackages",
      tableName: "Clinic_Branches_HealthCheckPackages",
    }
  );
  return ClinicBranches_HealthCheckPackages;
};

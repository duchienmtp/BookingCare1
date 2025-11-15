"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ClinicBranches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ClinicBranches.belongsTo(models.Clinics, {
        foreignKey: "clinicId",
        as: "clinics",
      });

      ClinicBranches.hasMany(models.ClinicBranches_Doctors, {
        foreignKey: "clinicBranchId",
        as: "doctorsAssigned",
      });

      ClinicBranches.hasMany(models.ClinicBranches_HealthCheckPackages, {
        foreignKey: "clinicBranchId",
      });
    }
  }

  ClinicBranches.init(
    {
      clinicBranchId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      clinicBranchName: DataTypes.STRING,
      clinicBranchAddress: DataTypes.STRING,
      clinicId: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ClinicBranches",
      tableName: "Clinic_Branches",
    }
  );
  return ClinicBranches;
};

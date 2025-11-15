"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ClinicBranches_Doctors extends Model {
    static associate(models) {
      // define association here

      ClinicBranches_Doctors.belongsTo(models.ClinicBranches, {
        foreignKey: "clinicBranchId",
        as: "branches",
      });

      ClinicBranches_Doctors.belongsTo(models.Doctors, {
        foreignKey: "doctorId",
        as: "assignedClinicBranches",
      });
    }
  }

  ClinicBranches_Doctors.init(
    {
      clinicBranchId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      doctorId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "ClinicBranches_Doctors",
      tableName: "Clinic_Branches_Doctors",
    }
  );
  return ClinicBranches_Doctors;
};

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
        as: "clinicId",
      });
    }
  }

  ClinicBranches.init(
    {
      clinicId: DataTypes.STRING,
      clinicName: DataTypes.STRING,
      clinicAddress: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Clinic_Branches",
      tableName: "Clinic_Branches",
    }
  );
  return ClinicBranches;
};

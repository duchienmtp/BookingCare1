"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Doctors.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });

      Doctors.hasMany(models.SpecificMedicalServices_HealthCheckPackages, {
        foreignKey: "packageId",
      });

      Doctors.hasMany(models.Doctors_Specialties, {
        foreignKey: "doctorId",
        as: "doctors_Specialties",
      });

      Doctors.hasMany(models.ClinicBranches_Doctors, {
        foreignKey: "doctorId",
        as: "clinicsWorkingAt",
      });

      Doctors.hasMany(models.Health_Check_Packages, {
        foreignKey: "managingDoctorId",
      });
    }
  }

  Doctors.init(
    {
      doctorId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      doctorDetailInfo: DataTypes.TEXT("long"),
      shortDoctorInfo: DataTypes.TEXT("long"),
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctors",
      tableName: "Doctors",
    }
  );
  return Doctors;
};

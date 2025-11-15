"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Health_Check_Packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Health_Check_Packages.hasMany(models.BookingPackagesDetail, {
        foreignKey: "packageId",
      });

      Health_Check_Packages.hasMany(models.ClinicBranches_HealthCheckPackages, {
        foreignKey: "packageId",
      });

      Health_Check_Packages.belongsTo(models.PackageType, {
        foreignKey: "packageTypeId",
      });

      Health_Check_Packages.belongsTo(models.Doctors, {
        foreignKey: "managingDoctorId",
      });

      Health_Check_Packages.hasMany(models.HealthCheckPackage_Schedules, {
        foreignKey: "packageId",
      });

      Health_Check_Packages.hasMany(models.HealthCheckPackages_Specialties, {
        foreignKey: "packageId",
      });

      Health_Check_Packages.hasMany(
        models.SpecificMedicalServices_HealthCheckPackages,
        {
          foreignKey: "packageId",
        }
      );
    }
  }

  Health_Check_Packages.init(
    {
      packageId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      packageName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isManagedByDoctor: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      managingDoctorId: DataTypes.STRING,
      packageTypeId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      packageDetailInfo: DataTypes.TEXT("long"),
      shortPackageInfo: DataTypes.TEXT("long"),
      image: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Health_Check_Packages",
      tableName: "Health_Check_Packages",
    }
  );
  return Health_Check_Packages;
};

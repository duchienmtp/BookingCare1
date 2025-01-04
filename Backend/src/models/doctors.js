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

      Doctors.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
        as: "specialty",
      });

      Doctors.belongsTo(models.Clinics, {
        foreignKey: "clinicId",
        as: "clinic",
      });

      Doctors.belongsTo(models.PackageType, {
        foreignKey: "packageTypeId",
        as: "packageType",
      });

      Doctors.hasMany(models.DoctorSchedules, {
        foreignKey: "doctorId",
        as: "doctorSchedules",
      });

      Doctors.hasMany(models.DoctorBookingPackages, {
        foreignKey: "doctorId",
        as: "doctorBookingPackages",
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
      packageName: DataTypes.TEXT,
      specialtyId: DataTypes.STRING,
      clinicId: DataTypes.STRING,
      packageTypeId: DataTypes.INTEGER,
      doctorDetailInfo: DataTypes.TEXT("long"),
      shortDoctorInfo: DataTypes.TEXT("long"),
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Doctors",
      tableName: "Doctors",
    }
  );
  return Doctors;
};

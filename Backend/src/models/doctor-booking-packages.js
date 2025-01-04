"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class DoctorBookingPackages extends Model {
    static associate(models) {
      // define association here

      DoctorBookingPackages.belongsTo(models.Doctors, {
        foreignKey: "doctorId",
        as: "doctor",
      });

      DoctorBookingPackages.belongsTo(models.BookingPackages, {
        foreignKey: "bookingPackageId",
        as: "bookingPackage",
      });
    }
  }

  DoctorBookingPackages.init(
    {
      doctorId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      bookingPackageId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      price: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "DoctorBookingPackages",
      tableName: "Doctor_Booking_Packages",
    }
  );
  return DoctorBookingPackages;
};

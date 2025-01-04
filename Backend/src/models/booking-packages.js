"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class BookingPackages extends Model {
    static associate(models) {
      // define association here

      BookingPackages.hasMany(models.DoctorBookingPackages, {
        foreignKey: "bookingPackageId",
        as: "doctorBookingPackages",
      });
    }
  }

  BookingPackages.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BookingPackages",
      tableName: "Booking_Packages",
    }
  );
  return BookingPackages;
};

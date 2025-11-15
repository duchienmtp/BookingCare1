"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class BookingPackages extends Model {
    static associate(models) {
      // define association here

      BookingPackages.hasMany(models.BookingPackagesDetail, {
        foreignKey: "bookingPackageId",
      });

      BookingPackages.hasMany(models.HealthCheckPackageScheduleBookingDetail, {
        foreignKey: "bookingPackageId",
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
      description: DataTypes.TEXT("long"),
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BookingPackages",
      tableName: "Booking_Packages",
    }
  );
  return BookingPackages;
};

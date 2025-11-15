"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class BookingPackagesDetail extends Model {
    static associate(models) {
      // define association here

      BookingPackagesDetail.belongsTo(models.Health_Check_Packages, {
        foreignKey: "packageId",
      });

      BookingPackagesDetail.belongsTo(models.BookingPackages, {
        foreignKey: "bookingPackageId",
      });
    }
  }

  BookingPackagesDetail.init(
    {
      packageId: {
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
      modelName: "BookingPackagesDetail",
      tableName: "Booking_Packages_Detail",
    }
  );
  return BookingPackagesDetail;
};

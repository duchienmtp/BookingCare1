"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class BookingStatus extends Model {
    static associate(models) {
      // define association here

      BookingStatus.hasMany(models.HealthCheckPackageScheduleBookingDetail, {
        foreignKey: "bookingStatus",
      });
    }
  }

  BookingStatus.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BookingStatus",
      tableName: "Booking_Status",
    }
  );
  return BookingStatus;
};

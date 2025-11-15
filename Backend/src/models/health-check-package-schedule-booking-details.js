"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class HealthCheckPackageScheduleBookingDetail extends Model {
    static associate(models) {
      // define association here

      HealthCheckPackageScheduleBookingDetail.belongsTo(
        models.HealthCheckPackage_Schedules,
        {
          foreignKey: "packageScheduleId",
        }
      );

      HealthCheckPackageScheduleBookingDetail.belongsTo(
        models.BookingPackages,
        {
          foreignKey: "bookingPackageId",
        }
      );

      HealthCheckPackageScheduleBookingDetail.belongsTo(models.BookingStatus, {
        foreignKey: "bookingStatus",
      });

      HealthCheckPackageScheduleBookingDetail.belongsTo(models.Patients, {
        foreignKey: "patientId",
        as: "patient",
      });
    }
  }

  HealthCheckPackageScheduleBookingDetail.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      patientRelativesName: DataTypes.STRING,
      patientRelativesPhoneNumber: DataTypes.STRING,
      patientId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      packageScheduleId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bookingPackageId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bookingReason: DataTypes.TEXT("long"),
      purchaseMethodId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      clinic: DataTypes.STRING,
      bookingStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HealthCheckPackageScheduleBookingDetail",
      tableName: "Health_Check_Package_Schedule_Booking_Details",
    }
  );
  return HealthCheckPackageScheduleBookingDetail;
};

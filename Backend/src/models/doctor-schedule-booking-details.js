"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class DoctorScheduleBookingDetails extends Model {
    static associate(models) {
      // define association here
    }
  }

  DoctorScheduleBookingDetails.init(
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
      doctorScheduleId: {
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
    },
    {
      sequelize,
      modelName: "DoctorScheduleBookingDetails",
      tableName: "Doctor_Schedule_Booking_Details",
    }
  );
  return DoctorScheduleBookingDetails;
};

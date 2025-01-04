"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class DoctorSchedules extends Model {
    static associate(models) {
      // define association here

      DoctorSchedules.belongsTo(models.Doctors, {
        foreignKey: "doctorId",
        as: "doctor",
      });

      DoctorSchedules.belongsTo(models.Schedules, {
        foreignKey: "scheduleId",
        as: "schedule",
      });
    }
  }

  DoctorSchedules.init(
    {
      doctorScheduleId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      doctorId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      scheduleId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      scheduleDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "DoctorSchedules",
      tableName: "Doctor_Schedules",
      hooks: {
        beforeCreate: (doctorSchedule) => {
          // Generate the `doctorScheduleId` hash using SHA256
          doctorSchedule.doctorScheduleId = crypto
            .createHash("sha256") // Use SHA256
            .update(
              `${doctorSchedule.doctorId.slice(-3)}${doctorSchedule.scheduleId
                .slice(-6)
                .replace("_", "")}${doctorSchedule.scheduleDate.replace(
                /-/g,
                ""
              )}`
            )
            .digest("hex") // Convert to hexadecimal format
            .slice(0, 16); // Optional: Truncate to 16 characters for brevity
        },
      },
    }
  );
  return DoctorSchedules;
};

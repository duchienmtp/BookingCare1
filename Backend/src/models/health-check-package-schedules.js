"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class HealthCheckPackage_Schedules extends Model {
    static associate(models) {
      // define association here

      HealthCheckPackage_Schedules.hasMany(
        models.HealthCheckPackageScheduleBookingDetail,
        {
          foreignKey: "packageScheduleId",
        }
      );

      HealthCheckPackage_Schedules.belongsTo(models.Health_Check_Packages, {
        foreignKey: "packageId",
      });

      HealthCheckPackage_Schedules.belongsTo(models.Schedules, {
        foreignKey: "scheduleId",
      });
    }
  }

  HealthCheckPackage_Schedules.init(
    {
      packageScheduleId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      packageId: {
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
      modelName: "HealthCheckPackage_Schedules",
      tableName: "Health_Check_Package_Schedules",
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
  return HealthCheckPackage_Schedules;
};

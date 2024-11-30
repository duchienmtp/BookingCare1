"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Schedules extends Model {
    static associate(models) {
      // define association here

      Schedules.hasMany(models.DoctorSchedules, {
        foreignKey: "scheduleId",
        as: "doctorSchedules",
      });

      Schedules.belongsTo(models.Days, {
        foreignKey: "dayId",
        as: "day",
      });
    }
  }

  Schedules.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      time: DataTypes.STRING,
      dayId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Schedules",
      tableName: "Schedules",
    }
  );
  return Schedules;
};

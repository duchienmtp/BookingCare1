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
      doctorId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      scheduleId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      scheduleDate: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "DoctorSchedules",
      tableName: "Doctor_Schedules",
    }
  );
  return DoctorSchedules;
};

"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Patients extends Model {
    static associate(models) {
      // define association here

      Patients.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });

      Patients.hasMany(models.HealthCheckPackageScheduleBookingDetail, {
        foreignKey: "patientId",
        as: "orders",
      });
    }
  }

  Patients.init(
    {
      patientId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Patients",
      tableName: "Patients",
    }
  );
  return Patients;
};

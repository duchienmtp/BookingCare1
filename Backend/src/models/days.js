"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Days extends Model {
    static associate(models) {
      // define association here

      Days.hasMany(models.Schedules, {
        foreignKey: "dayId",
        as: "schedules",
      });
    }
  }

  Days.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Days",
      tableName: "Days",
    }
  );
  return Days;
};

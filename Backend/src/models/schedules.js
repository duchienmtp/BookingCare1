"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    },
    {
      sequelize,
      modelName: "Schedules",
      tableName: "Schedules",
    }
  );
  return Schedules;
};

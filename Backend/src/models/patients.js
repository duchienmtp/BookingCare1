"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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

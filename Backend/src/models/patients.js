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
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      fullName: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      email: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patients",
      tableName: "Patients",
    }
  );
  return Patients;
};

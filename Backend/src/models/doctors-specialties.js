"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Doctors_Specialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Doctors_Specialties.belongsTo(models.Doctors, {
        foreignKey: "doctorId",
        as: "doctors",
      });

      Doctors_Specialties.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
        as: "specialties",
      });
    }
  }

  Doctors_Specialties.init(
    {
      doctorId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      specialtyId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Doctors_Specialties",
      tableName: "Doctors_Specialties",
    }
  );
  return Doctors_Specialties;
};

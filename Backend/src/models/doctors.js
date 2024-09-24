"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Doctors.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
        as: "specialtyId",
      });

      Doctors.belongsTo(models.Clinics, {
        foreignKey: "clinicId",
        as: "clinicId",
      });
    }
  }

  Doctors.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      fullName: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      specialtyId: DataTypes.STRING,
      clinicId: DataTypes.STRING,
      doctorDetailInfo: DataTypes.TEXT("long"),
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctors",
      tableName: "Doctors",
    }
  );
  return Doctors;
};

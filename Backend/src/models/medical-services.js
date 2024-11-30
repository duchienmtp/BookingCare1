"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class MedicalServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      MedicalServices.hasMany(models.SpecificMedicalService_MedicalServiceId, {
        foreignKey: "medicalServiceId",
        as: "SpecificMedicalService_MedicalServiceId",
      });
    }
  }

  MedicalServices.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MedicalServices",
      tableName: "Medical_Services",
    }
  );
  return MedicalServices;
};

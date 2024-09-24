"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class SpecificMedicalServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      SpecificMedicalServices.belongsTo(models.MedicalServices, {
        foreignKey: "id",
        as: "medicalServiceId",
      });

      SpecificMedicalServices.belongsTo(models.Specialties, {
        foreignKey: "id",
        as: "specialtyId",
      });
    }
  }

  SpecificMedicalServices.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      medicalServiceId: STRING,
      specialtyId: STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SpecificMedicalServices",
      tableName: "Specific_Medical_Services",
    }
  );
  return SpecificMedicalServices;
};

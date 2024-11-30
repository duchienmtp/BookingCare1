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

      SpecificMedicalServices.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
        as: "specialty",
      });

      SpecificMedicalServices.hasMany(
        models.SpecificMedicalService_MedicalServiceId,
        {
          sourceKey: "name",
          foreignKey: "name",
          as: "medicalServiceName",
        }
      );
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
      image: DataTypes.STRING,
      specialtyId: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "SpecificMedicalServices",
      tableName: "Specific_Medical_Services",
    }
  );
  return SpecificMedicalServices;
};

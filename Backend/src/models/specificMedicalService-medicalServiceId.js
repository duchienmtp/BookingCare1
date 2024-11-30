"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class SpecificMedicalService_MedicalServiceId extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      SpecificMedicalService_MedicalServiceId.belongsTo(
        models.MedicalServices,
        {
          foreignKey: "medicalServiceId",
          as: "medicalService",
        }
      );

      SpecificMedicalService_MedicalServiceId.belongsTo(
        models.SpecificMedicalServices,
        {
          foreignKey: "name",
          as: "specificMedicalService",
        }
      );
    }
  }

  SpecificMedicalService_MedicalServiceId.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      medicalServiceId: STRING,
    },
    {
      sequelize,
      modelName: "SpecificMedicalService_MedicalServiceId",
      tableName: "SpecificMedicalService_MedicalServiceId",
    }
  );
  return SpecificMedicalService_MedicalServiceId;
};

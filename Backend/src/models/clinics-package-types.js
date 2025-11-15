"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Clinics_PackageTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Clinics_PackageTypes.belongsTo(models.Clinics, {
        foreignKey: "clinicId",
        as: "clinics",
      });

      Clinics_PackageTypes.belongsTo(models.PackageType, {
        foreignKey: "packageTypeId",
      });
    }
  }

  Clinics_PackageTypes.init(
    {
      clinicId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      packageTypeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Clinics_PackageTypes",
      tableName: "Clinics_Package_Types",
    }
  );
  return Clinics_PackageTypes;
};

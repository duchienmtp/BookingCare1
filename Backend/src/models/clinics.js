"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Clinics.hasMany(models.ClinicBranches);
      Clinics.hasMany(models.Doctors);
    }
  }

  Clinics.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      fullname: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      clinicDetailInfo: DataTypes.TEXT("long"),
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Clinics",
      tableName: "Clinics",
    }
  );
  return Clinics;
};

"use strict";
import { INTEGER, Model, STRING } from "sequelize";

export default (sequelize, DataTypes) => {
  class Specialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Specialties.hasMany(models.Doctors_Specialties, {
        foreignKey: "specialtyId",
        as: "doctors_Specialties",
      });

      Specialties.hasMany(models.BlogPosts, {
        foreignKey: "specialtyId",
        as: "blogPosts",
      });

      Specialties.hasMany(models.HealthCheckPackages_Specialties, {
        foreignKey: "specialtyId",
      });
    }
  }

  Specialties.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      specialtyDetailInfo: DataTypes.TEXT("long"),
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Specialties",
      tableName: "Specialties",
    }
  );
  return Specialties;
};

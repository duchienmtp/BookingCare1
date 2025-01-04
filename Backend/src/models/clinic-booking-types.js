"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ClinicBookingTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // ClinicBranches.belongsTo(models.Clinics, {
      //   foreignKey: "clinicId",
      //   as: "clinicId",
      // });
    }
  }

  ClinicBookingTypes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ClinicBookingTypes",
      tableName: "Clinic_Booking_Types",
    }
  );
  return ClinicBookingTypes;
};

"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class PurchaseMethods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  PurchaseMethods.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PurchaseMethods",
      tableName: "Purchase_Methods",
    }
  );
  return PurchaseMethods;
};

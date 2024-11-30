"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class PageCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // PageCategories.hasMany(models.PageCategories);
      // PageCategories.belongsTo(models.PageCategories, {
      //   foreignKey: "ownerId",
      //   as: "ownerId",
      // });
    }
  }

  PageCategories.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      fromPage: DataTypes.STRING,
      level: DataTypes.STRING,
      ownerId: DataTypes.STRING,
      slug: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PageCategories",
      tableName: "Page_Categories",
    }
  );
  return PageCategories;
};

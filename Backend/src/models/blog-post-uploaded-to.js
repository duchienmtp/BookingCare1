"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class BlogPost_UploadedTo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      BlogPost_UploadedTo.hasMany(models.BlogPosts, {
        foreignKey: "uploadedTo",
        as: "blogPosts",
      });
    }
  }

  BlogPost_UploadedTo.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BlogPost_UploadedTo",
      tableName: "BlogPost_UploadedTo",
    }
  );
  return BlogPost_UploadedTo;
};

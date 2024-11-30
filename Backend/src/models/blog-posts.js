"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class BlogPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      BlogPosts.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
        as: "specialty",
      });

      BlogPosts.belongsTo(models.BlogPost_UploadedTo, {
        foreignKey: "uploadedTo",
        as: "blogPostsUploadedTo",
      });
    }
  }

  BlogPosts.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      reviewerId: DataTypes.STRING,
      image: DataTypes.STRING,
      specialtyId: DataTypes.STRING,
      uploadedTo: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BlogPosts",
      tableName: "Blog_Posts",
    }
  );
  return BlogPosts;
};

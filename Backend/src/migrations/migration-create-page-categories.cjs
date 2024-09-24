"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Page_Categories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fromPage: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      level: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ownerId: {
        type: Sequelize.STRING,
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      icon: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Page_Categories");
  },
};

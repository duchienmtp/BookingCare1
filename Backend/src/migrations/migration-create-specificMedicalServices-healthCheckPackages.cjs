"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "SpecificMedicalServices_HealthCheckPackages",
      {
        specificMedicalServiceId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        packageId: {
          allowNull: false,
          primaryKey: true,
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
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "SpecificMedicalServices_HealthCheckPackages"
    );
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "SpecificMedicalService_MedicalServiceId",
      {
        specificMedicalServiceId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        medicalServiceId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        isSpecificMedicalServiceMainBelongTo: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("SpecificMedicalService_MedicalServiceId");
  },
};

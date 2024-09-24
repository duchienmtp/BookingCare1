"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clinic_Branches", {
      clinicId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      clinicName: {
        type: Sequelize.STRING,
      },
      clinicAddress: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Clinic_Branches");
  },
};

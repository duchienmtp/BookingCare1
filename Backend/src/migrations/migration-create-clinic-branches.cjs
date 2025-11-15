"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clinic_Branches", {
      clinicBranchId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      clinicBranchName: Sequelize.STRING,
      clinicBranchAddress: Sequelize.STRING,
      clinicId: Sequelize.STRING,
      isDeleted: Sequelize.BOOLEAN,
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

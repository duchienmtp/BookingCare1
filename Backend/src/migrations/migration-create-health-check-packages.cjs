"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Health_Check_Packages", {
      packageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      packageName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isManagedByDoctor: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      managingDoctorId: Sequelize.STRING,
      packageTypeId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      packageDetailInfo: Sequelize.TEXT("long"),
      shortPackageInfo: Sequelize.TEXT("long"),
      image: Sequelize.STRING,
      isDeleted: Sequelize.BOOLEAN,
      slug: Sequelize.STRING,
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
    await queryInterface.dropTable("Health_Check_Packages");
  },
};

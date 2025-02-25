"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Doctors", {
      doctorId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      packageName: {
        type: Sequelize.TEXT,
      },
      specialtyId: {
        type: Sequelize.STRING,
      },
      clinicId: {
        type: Sequelize.STRING,
      },
      shortDoctorInfo: {
        type: Sequelize.TEXT("long"),
      },
      doctorDetailInfo: {
        type: Sequelize.TEXT("long"),
      },
      packageTypeId: {
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("Doctors");
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Health_Check_Package_Schedules", {
      packageScheduleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      packageId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      scheduleId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      scheduleDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("Health_Check_Package_Schedules");
  },
};

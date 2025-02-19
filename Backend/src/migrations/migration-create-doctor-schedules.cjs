"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Doctor_Schedules", {
      doctorScheduleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      doctorId: {
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
    await queryInterface.dropTable("Doctor_Schedules");
  },
};

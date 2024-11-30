"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Doctor_Schedules", {
      doctorId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      scheduleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      scheduleDate: {
        allowNull: false,
        primaryKey: true,
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

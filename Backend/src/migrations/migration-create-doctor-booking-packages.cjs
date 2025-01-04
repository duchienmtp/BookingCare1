"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Doctor_Booking_Packages", {
      doctorId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      bookingPackageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      price: Sequelize.STRING,
      description: Sequelize.TEXT("long"),
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
    await queryInterface.dropTable("Doctor_Booking_Packages");
  },
};

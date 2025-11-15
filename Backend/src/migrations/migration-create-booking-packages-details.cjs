"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Booking_Packages_Detail", {
      packageId: {
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
    await queryInterface.dropTable("Booking_Packages_Detail");
  },
};

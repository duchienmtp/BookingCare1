"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Health_Check_Package_Schedule_Booking_Details",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        patientRelativesName: Sequelize.STRING,
        patientRelativesPhoneNumber: Sequelize.STRING,
        patientId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        packageScheduleId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        bookingPackageId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        bookingReason: Sequelize.TEXT("long"),
        purchaseMethodId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        clinic: Sequelize.STRING,
        bookingStatus: Sequelize.STRING,
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
    await queryInterface.dropTable(
      "Health_Check_Package_Schedule_Booking_Details"
    );
  },
};

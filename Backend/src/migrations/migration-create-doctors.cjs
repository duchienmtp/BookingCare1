"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Doctors", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      birthDate: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.BOOLEAN,
      },
      slug: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      specialtyId: {
        type: Sequelize.STRING,
      },
      clinicId: {
        type: Sequelize.STRING,
      },
      doctorDetailInfo: {
        type: Sequelize.TEXT("long"),
      },
      type: {
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
    await queryInterface.dropTable("Doctors");
  },
};

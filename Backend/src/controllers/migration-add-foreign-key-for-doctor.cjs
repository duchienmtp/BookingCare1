// "use strict";
// /** @type {import('sequelize-cli').Migration} */

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addConstraint("Doctors", {
//       fields: ["clinic"],
//       type: "foreign key",
//       name: "fk_doctors_clinic", // optional: provide a custom name for the constraint
//       references: {
//         table: "Clinics",
//         field: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     });

//     await queryInterface.addConstraint("Doctors", {
//       fields: ["specialty"],
//       type: "foreign key",
//       name: "fk_doctors_specialty", // optional: provide a custom name for the constraint
//       references: {
//         table: "Specialties",
//         field: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.removeConstraint("Doctors", "fk_doctors_clinic");
//     await queryInterface.removeConstraint("Doctors", "fk_doctors_specialty");
//   },
// };

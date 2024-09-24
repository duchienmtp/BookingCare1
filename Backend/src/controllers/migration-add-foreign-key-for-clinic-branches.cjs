// "use strict";
// /** @type {import('sequelize-cli').Migration} */

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addConstraint("Clinic_Branches", {
//       fields: ["clinicId"],
//       type: "foreign key",
//       name: "fk_clinic_branches_clinicId", // optional: provide a custom name for the constraint
//       references: {
//         table: "Clinics",
//         field: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.removeConstraint("Clinic_Branches", "fk_clinic_branches_clinicId");
//   },
// };
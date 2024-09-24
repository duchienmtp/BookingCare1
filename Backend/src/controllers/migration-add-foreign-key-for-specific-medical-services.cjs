// "use strict";
// /** @type {import('sequelize-cli').Migration} */

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addConstraint("Specific_Medical_Services", {
//       fields: ["medicalServiceId"],
//       type: "foreign key",
//       name: "fk_specific_medical_services_medicalServiceId", // optional: provide a custom name for the constraint
//       references: {
//         table: "Medical_Services",
//         field: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     });

//     await queryInterface.addConstraint("Specific_Medical_Services", {
//       fields: ["specialtyId"],
//       type: "foreign key",
//       name: "fk_specific_medical_services_specialtyId", // optional: provide a custom name for the constraint
//       references: {
//         table: "Specialties",
//         field: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.removeConstraint(
//       "Specific_Medical_Services",
//       "fk_specific_medical_services_medicalServiceId"
//     );

//     await queryInterface.removeConstraint(
//       "Specific_Medical_Services",
//       "fk_specific_medical_services_specialtyId"
//     );
//   },
// };

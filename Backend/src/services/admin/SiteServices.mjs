import db from "../../models/index.js";
import { Op } from "sequelize";

const getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.PageCategories.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: categories,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllMedicalServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let medicalServices = await db.MedicalServices.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: medicalServices,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSpecialties = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let specialties = await db.Specialties.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: specialties,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllClinics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinics = await db.Clinics.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: clinics,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getClinicBySlug = (clinicSlug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinics.findOne({
        where: {
          slug: clinicSlug,
        },
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: clinic,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSpecificMedicalServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const specificMedicalServices = await db.SpecificMedicalServices.findAll({
        include: [
          {
            model: db.Specialties,
            as: "specialty",
            attributes: ["name"],
            required: true,
          },
          {
            model: db.SpecificMedicalService_MedicalServiceId,
            as: "medicalServiceName",
            attributes: ["name", "medicalServiceId"],
            include: [
              {
                model: db.MedicalServices,
                as: "medicalService",
                attributes: ["slug", "name"],
              },
            ],
          },
        ],
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: specificMedicalServices,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBlogs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = await db.BlogPosts.findAll({
        attributes: {
          exclude: ["specialtyId", "uploadedTo"],
        },
        include: [
          {
            model: db.Specialties,
            as: "specialty",
            attributes: ["name"],
          },
          {
            model: db.BlogPost_UploadedTo,
            as: "blogPostsUploadedTo",
            attributes: ["name"],
            required: true,
          },
        ],
      });
      resolve({
        errCode: 0,
        message: "OK",
        data: blogs,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// const getAllGuides = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let guides = await db.BlogPosts.findAll({
//         attributes: {
//           exclude: ["specialtyId", "uploadedTo"],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["name"],
//           },
//           {
//             model: db.BlogPost_UploadedTo,
//             as: "blogPostsUploadedTo",
//             attributes: ["name"],
//             required: true,
//             where: {
//               id: 1,
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: guides,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getAllLivingHealthyBlogPost = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let livingHealthyBlogPost = await db.BlogPosts.findAll({
//         attributes: {
//           exclude: ["specialtyId", "uploadedTo"],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["name"],
//           },
//           {
//             model: db.BlogPost_UploadedTo,
//             as: "blogPostsUploadedTo",
//             attributes: ["name"],
//             required: true,
//             where: {
//               id: 2,
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: livingHealthyBlogPost,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getAllForDoctorAndHealthFacilityBlogPost = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let forDoctorAndHealthFacilityBlogPost = await db.BlogPosts.findAll({
//         attributes: {
//           exclude: ["specialtyId", "uploadedTo"],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["name"],
//           },
//           {
//             model: db.BlogPost_UploadedTo,
//             as: "blogPostsUploadedTo",
//             attributes: ["name"],
//             required: true,
//             where: {
//               id: 3,
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: forDoctorAndHealthFacilityBlogPost,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const getAllBlogUploadedTo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogUploadedTo = await db.BlogPost_UploadedTo.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: blogUploadedTo,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBlogsByUploadedTo = (uploadedToId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = await db.BlogPosts.findAll({
        attributes: {
          exclude: ["specialtyId", "uploadedTo"],
        },
        include: [
          {
            model: db.Specialties,
            as: "specialty",
            attributes: ["name"],
          },
          {
            model: db.BlogPost_UploadedTo,
            as: "blogPostsUploadedTo",
            attributes: ["name"],
            required: true,
            where: {
              id: uploadedToId,
            },
          },
        ],
      });
      resolve({
        errCode: 0,
        message: "OK",
        data: blogs,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// const getAllEndoscopicSurgeryPackages = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let endoscopicSurgeryPackages = await db.Doctors.findAll({
//         attributes: {
//           exclude: [
//             "userId",
//             "specialtyId",
//             "clinicId",
//             "createdAt",
//             "updatedAt",
//           ],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["id", "name"],
//           },
//           {
//             model: db.Clinics,
//             as: "clinic",
//             attributes: ["id", "fullname", "name", "address"],
//           },
//           {
//             model: db.Users,
//             as: "user",
//             attributes: {
//               exclude: ["birthDate", "phoneNumber", "email", "address"],
//             },
//             include: [
//               {
//                 model: db.Roles,
//                 as: "role",
//                 attributes: ["name"],
//               },
//             ],
//           },
//           {
//             model: db.PackageType,
//             as: "packageType",
//             attributes: ["name"],
//             where: {
//               id: 4,
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: endoscopicSurgeryPackages,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getAllMedicalImagingDiagnosticPackages = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let medicalImagingDiagnosticPackages = await db.Doctors.findAll({
//         attributes: {
//           exclude: [
//             "userId",
//             "specialtyId",
//             "clinicId",
//             "createdAt",
//             "updatedAt",
//           ],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["id", "name"],
//           },
//           {
//             model: db.Clinics,
//             as: "clinic",
//             attributes: ["id", "fullname", "name", "address"],
//           },
//           {
//             model: db.Users,
//             as: "user",
//             attributes: {
//               exclude: ["birthDate", "phoneNumber", "email", "address"],
//             },
//             include: [
//               {
//                 model: db.Roles,
//                 as: "role",
//                 attributes: ["name"],
//               },
//             ],
//           },
//           {
//             model: db.PackageType,
//             as: "packageType",
//             attributes: ["name"],
//             where: {
//               id: 3,
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: medicalImagingDiagnosticPackages,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getAllOperationPackages = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let medicalExaminationPackages = await db.Doctors.findAll({
//         attributes: {
//           exclude: [
//             "userId",
//             "specialtyId",
//             "clinicId",
//             "createdAt",
//             "updatedAt",
//           ],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["id", "name"],
//           },
//           {
//             model: db.Clinics,
//             as: "clinic",
//             attributes: ["id", "fullname", "name", "address"],
//           },
//           {
//             model: db.Users,
//             as: "user",
//             attributes: {
//               exclude: ["birthDate", "phoneNumber", "email", "address"],
//             },
//             include: [
//               {
//                 model: db.Roles,
//                 as: "role",
//                 attributes: ["name"],
//               },
//             ],
//           },
//           {
//             model: db.PackageType,
//             as: "packageType",
//             attributes: ["name"],
//             where: {
//               id: 5,
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: medicalExaminationPackages,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getAllMedicalExaminationPackages = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let medicalExaminationPackages = await db.Doctors.findAll({
//         attributes: {
//           exclude: [
//             "userId",
//             "specialtyId",
//             "clinicId",
//             "createdAt",
//             "updatedAt",
//           ],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["id", "name"],
//           },
//           {
//             model: db.Clinics,
//             as: "clinic",
//             attributes: ["id", "fullname", "name", "address"],
//           },
//           {
//             model: db.Users,
//             as: "user",
//             attributes: {
//               exclude: ["birthDate", "phoneNumber", "email", "address"],
//             },
//             include: [
//               {
//                 model: db.Roles,
//                 as: "role",
//                 attributes: ["name"],
//               },
//             ],
//           },
//           {
//             model: db.PackageType,
//             as: "packageType",
//             attributes: ["name"],
//             where: {
//               id: 2,
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: medicalExaminationPackages,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getAllDiagnosticPackages = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let diagnosticPackages = await db.Doctors.findAll({
//         attributes: {
//           exclude: [
//             "userId",
//             "specialtyId",
//             "clinicId",
//             "createdAt",
//             "updatedAt",
//           ],
//         },
//         include: [
//           {
//             model: db.Specialties,
//             as: "specialty",
//             attributes: ["id", "name"],
//           },
//           {
//             model: db.Clinics,
//             as: "clinic",
//             attributes: ["id", "fullname", "name", "address"],
//           },
//           {
//             model: db.Users,
//             as: "user",
//             attributes: {
//               exclude: ["birthDate", "phoneNumber", "email", "address"],
//             },
//             include: [
//               {
//                 model: db.Roles,
//                 as: "role",
//                 attributes: ["name"],
//               },
//             ],
//           },
//           {
//             model: db.PackageType,
//             as: "packageType",
//             attributes: ["name"],
//             where: {
//               id: {
//                 [Op.in]: [1, 6],
//               },
//             },
//           },
//         ],
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//         data: diagnosticPackages,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const getAllPackages = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let packages = await db.Doctors.findAll({
        attributes: {
          exclude: [
            "userId",
            "specialtyId",
            "clinicId",
            "createdAt",
            "updatedAt",
          ],
        },
        include: [
          {
            model: db.Specialties,
            as: "specialty",
            attributes: ["id", "name"],
          },
          {
            model: db.Clinics,
            as: "clinic",
            attributes: ["id", "fullname", "name", "address"],
          },
          {
            model: db.Users,
            as: "user",
            attributes: {
              exclude: ["birthDate", "phoneNumber", "email", "address"],
            },
            include: [
              {
                model: db.Roles,
                as: "role",
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.PackageType,
            as: "packageType",
            attributes: ["name"],
          },
        ],
        offset: 1,
      });
      resolve({
        errCode: 0,
        message: "OK",
        data: packages,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPackageTypes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let packageTypes = await db.PackageType.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: packageTypes,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDataByPackageType = (packageTypeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Doctors.findAll({
        attributes: {
          exclude: [
            "userId",
            "specialtyId",
            "clinicId",
            "createdAt",
            "updatedAt",
          ],
        },
        include: [
          {
            model: db.Specialties,
            as: "specialty",
            attributes: ["id", "name"],
          },
          {
            model: db.Clinics,
            as: "clinic",
            attributes: ["id", "fullname", "name", "address"],
          },
          {
            model: db.Users,
            as: "user",
            attributes: {
              exclude: ["birthDate", "phoneNumber", "email", "address"],
            },
            include: [
              {
                model: db.Roles,
                as: "role",
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.PackageType,
            as: "packageType",
            attributes: ["name"],
            where: {
              id: {
                [Op.in]: [...packageTypeId],
              },
            },
          },
        ],
      });
      resolve({
        errCode: 0,
        message: "OK",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorScheduleDatesInWeek = (doctorSlug, today, oneWeekLater) => {
  return new Promise(async (resolve, reject) => {
    let doctorScheduleDates = await db.DoctorSchedules.findAll({
      include: [
        {
          model: db.Doctors,
          as: "doctor",
          attributes: ["userId"],
          include: [
            {
              model: db.Users,
              as: "user",
              attributes: ["slug"],
            },
          ],
        },
      ],
      where: {
        "$doctor.user.slug$": doctorSlug,
        scheduleDate: {
          [Op.between]: [today, oneWeekLater],
        },
      },
      order: [["scheduleDate", "ASC"]],
    });

    let uniqueScheduleDates = new Set();
    doctorScheduleDates.forEach((schedule) => {
      uniqueScheduleDates.add(schedule.scheduleDate);
    });

    resolve({
      errCode: 0,
      message: "OK",
      data: Array.from(uniqueScheduleDates),
    });
  });
};

const getDoctorSchedules = (doctorSlug, today, oneWeekLater) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctorSchedules = await db.DoctorSchedules.findAll({
        include: [
          {
            model: db.Doctors,
            as: "doctor",
            attributes: ["userId", "packageName"],
            include: [
              {
                model: db.Users,
                as: "user",
                attributes: ["fullName", "image", "slug"],
              },
            ],
          },
          {
            model: db.Schedules,
            as: "schedule",
            attributes: ["time"],
          },
        ],
        where: {
          "$doctor.user.slug$": doctorSlug,
          scheduleDate: {
            [Op.between]: [today, oneWeekLater],
          },
        },
        order: [["scheduleDate", "ASC"]],
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: doctorSchedules,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorBySlug = (doctorSlug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.Doctors.findOne({
        include: [
          {
            model: db.Users,
            as: "user",
          },
          {
            model: db.Specialties,
            as: "specialty",
            attributes: ["name"],
          },
          {
            model: db.Clinics,
            as: "clinic",
            attributes: ["fullname", "address"],
          },
          {
            model: db.PackageType,
            as: "packageType",
            attributes: ["name"],
          },
        ],
        where: {
          "$user.slug$": doctorSlug,
        },
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: doctor,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllClinicBookingTypes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinicBookingTypes = await db.ClinicBookingTypes.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: clinicBookingTypes,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  getAllCategories,
  getAllMedicalServices,
  getAllSpecialties,
  getAllClinics,
  getClinicBySlug,
  getAllSpecificMedicalServices,
  getAllBlogs,
  // getAllGuides,
  // getAllLivingHealthyBlogPost,
  // getAllForDoctorAndHealthFacilityBlogPost,
  getAllBlogUploadedTo,
  getAllBlogsByUploadedTo,
  // getAllEndoscopicSurgeryPackages,
  // getAllMedicalImagingDiagnosticPackages,
  // getAllOperationPackages,
  // getAllMedicalExaminationPackages,
  // getAllDiagnosticPackages,
  getAllPackages,
  getAllPackageTypes,
  getAllDataByPackageType,
  getDoctorScheduleDatesInWeek,
  getDoctorSchedules,
  getDoctorBySlug,
  getAllClinicBookingTypes,
};

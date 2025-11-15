import db, { sequelize } from "../../models/index.js";
import { Op, or, where } from "sequelize";
import crypto from "crypto";
import emailQueue from "../../utils/email.js";
import { generatePDF } from "../../utils/pdf.js";
import _ from "lodash";
import slugify from "slugify";
import { destroy, uploadToCloudinary } from "../../utils/cloudinary.js";
import redis from "../../utils/redis.js";

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
      let clinics = await db.Clinics.findAll({
        include: [
          {
            model: db.ClinicBranches,
            as: "branches",
            attributes: [
              "clinicBranchId",
              "clinicBranchName",
              "clinicBranchAddress",
            ],
          },
        ],
      });
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
            model: db.SpecificMedicalService_MedicalServiceId,
            as: "specificMedicalService_MedicalServiceId",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
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

const getAllSpecificMedicalServicesBySlug = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const specificMedicalServices = await db.SpecificMedicalServices.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.SpecificMedicalService_MedicalServiceId,
            as: "specificMedicalService_MedicalServiceId",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.MedicalServices,
                as: "medicalService",
                attributes: ["slug", "name"],
              },
            ],
          },
        ],
        where: {
          "$specificMedicalService_MedicalServiceId.medicalService.slug$": slug,
        },
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
      let packages = await db.Health_Check_Packages.findAll({
        attributes: {
          exclude: ["packageDetailInfo", "shortPackageInfo"],
        },
        include: [
          {
            model: db.PackageType,
            attributes: ["id", "name"],
          },
          {
            model: db.Doctors,
            attributes: ["doctorId", "userId"],
            include: {
              model: db.Users,
              as: "user",
              attributes: ["fullName", "phoneNumber", "email"],
            },
          },
          {
            model: db.ClinicBranches_HealthCheckPackages,
            include: {
              model: db.ClinicBranches,
              include: {
                model: db.Clinics,
                as: "clinics",
              },
            },
          },
          {
            model: db.HealthCheckPackages_Specialties,
            include: {
              model: db.Specialties,
              attributes: ["id", "name", "slug"],
            },
          },
          {
            model: db.SpecificMedicalServices_HealthCheckPackages,
            include: {
              model: db.SpecificMedicalServices,
              attributes: ["id", "name", "slug"],
              include: {
                model: db.SpecificMedicalService_MedicalServiceId,
                as: "specificMedicalService_MedicalServiceId",
                include: {
                  model: db.MedicalServices,
                  as: "medicalService",
                  attributes: ["id", "slug", "name"],
                },
              },
            },
          },
        ],
        order: [["packageId", "ASC"]],
      });

      if (!_.isEmpty(packages)) {
        packages = packages.map((item) => {
          // Initialize workingInfo with default empty arrays
          const workingInfo = {
            clinics: formatClinics(item),
            specialties: formatSpecialties(item),
            medicalServices: formatMedicalServices(item),
          };

          let doctorInfo = null;
          if (!_.isNull(item.Doctor)) {
            doctorInfo = {
              doctorId: item.Doctor.doctorId,
              userId: item.Doctor.userId,
              fullName: item.Doctor.user.fullName,
              phoneNumber: item.Doctor.user.phoneNumber,
              email: item.Doctor.user.email,
            };
          }

          // Generate the slug based on the processed data
          const slug = generateSlug(item, workingInfo);

          // Combine all data into formattedData
          return {
            packageId: item.packageId,
            packageName: item.packageName,
            packageTypeId: item.packageTypeId,
            packageTypeName: item.PackageType.name,
            packageDetailInfo: item.packageDetailInfo,
            shortPackageInfo: item.shortPackageInfo,
            isDeleted: item.isDeleted,
            slug: slug,
            isManagedByDoctor: item.isManagedByDoctor,
            managingDoctor: doctorInfo,
            image: item.image,
            workingInfo: {
              clinics: workingInfo.clinics,
              specialties: workingInfo.specialties,
              medicalServices: workingInfo.medicalServices,
            },
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        });
      }

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

// Function to process clinics information
const formatClinics = (item) => {
  if (
    item.ClinicBranches_HealthCheckPackages &&
    !_.isArray(item.ClinicBranches_HealthCheckPackages)
  ) {
    return [];
  }

  const clinics = item.ClinicBranches_HealthCheckPackages.reduce(
    (acc, branch) => {
      const clinicId = branch.ClinicBranch.clinics.id;
      if (!acc[clinicId]) {
        acc[clinicId] = {
          clinicId: branch.ClinicBranch.clinics.id,
          clinicName: branch.ClinicBranch.clinics.name,
          clinicFullName: branch.ClinicBranch.clinics.fullname,
          clinicAddress: branch.ClinicBranch.clinics.address,
          slug: branch.ClinicBranch.clinics.slug,
          ClinicBranches: [],
        };
      }
      acc[clinicId].ClinicBranches.push({
        clinicBranchId: branch.ClinicBranch.clinicBranchId,
        clinicBranchName: branch.ClinicBranch.clinicBranchName,
        clinicBranchAddress: branch.ClinicBranch.clinicBranchAddress,
      });
      return acc;
    },
    {}
  );

  return Object.values(clinics);
};

// Function to process specialties information
const formatSpecialties = (item) => {
  if (!_.isArray(item.HealthCheckPackages_Specialties)) {
    return [];
  }

  const specialties = item.HealthCheckPackages_Specialties.reduce(
    (acc, spec) => {
      const specialtyId = spec.Specialty?.id;
      if (specialtyId && !acc[specialtyId]) {
        acc[specialtyId] = {
          id: specialtyId,
          name: spec.Specialty.name,
          slug: spec.Specialty.slug,
        };
      }
      return acc;
    },
    {}
  );

  return Object.values(specialties);
};

// Function to process medical services information
const formatMedicalServices = (item) => {
  if (!_.isArray(item.SpecificMedicalServices_HealthCheckPackages)) {
    return [];
  }

  const medicalServices =
    item.SpecificMedicalServices_HealthCheckPackages.reduce((acc, service) => {
      const specificMedicalServiceId = service.specificMedicalServiceId;

      // Extract medical services belonging to the current specific medical service
      const medicalServicesBelongingToSpecificMedicalServiceId =
        service.SpecificMedicalService.specificMedicalService_MedicalServiceId.map(
          (medicalServiceLink) => {
            return {
              medicalServiceId: medicalServiceLink.medicalService.id,
              medicalServiceName: medicalServiceLink.medicalService.name,
              medicalServiceSlug: medicalServiceLink.medicalService.slug,
              isSpecificMedicalServiceMainBelongTo:
                medicalServiceLink.isSpecificMedicalServiceMainBelongTo,
            };
          }
        );

      // Check if we have already processed this specific medical service
      if (!acc[specificMedicalServiceId]) {
        acc[specificMedicalServiceId] = {
          specificMedicalServiceId,
          specificMedicalServiceName: service.SpecificMedicalService.name,
          specificMedicalServiceSlug: service.SpecificMedicalService.slug,
          medicalServices: medicalServicesBelongingToSpecificMedicalServiceId,
        };
      }

      return acc;
    }, {});

  return Object.values(medicalServices);
};

// Function to generate the slug based on the processed data
const generateSlug = (item, workingInfo) => {
  let slug = "";

  if (!_.isEmpty(workingInfo.specialties)) {
    slug = `kham-chuyen-khoa/${item.slug}`;
  } else {
    // Find the main medical service
    let mainMedicalServiceBelongTo = null;
    workingInfo.medicalServices.forEach((service) => {
      mainMedicalServiceBelongTo = service.medicalServices.find(
        (medicalService) => medicalService.isSpecificMedicalServiceMainBelongTo
      );
    });

    if (mainMedicalServiceBelongTo) {
      slug = `${mainMedicalServiceBelongTo.medicalServiceSlug}/${item.slug}`;
    }
  }

  return slug;
};

const getAllDataByPackageType = (packageTypeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Health_Check_Packages.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.PackageType,
            attributes: ["id", "name"],
            where: {
              id: {
                [Op.in]: [...packageTypeId],
              },
            },
          },
          {
            model: db.ClinicBranches_HealthCheckPackages,
            include: {
              model: db.ClinicBranches,
              include: {
                model: db.Clinics,
                as: "clinics",
              },
            },
          },
          {
            model: db.HealthCheckPackages_Specialties,
            include: {
              model: db.Specialties,
              attributes: ["id", "name", "slug"],
            },
          },
          {
            model: db.SpecificMedicalServices_HealthCheckPackages,
            include: {
              model: db.SpecificMedicalServices,
              attributes: ["id", "name", "slug"],
              include: {
                model: db.SpecificMedicalService_MedicalServiceId,
                as: "specificMedicalService_MedicalServiceId",
                include: {
                  model: db.MedicalServices,
                  as: "medicalService",
                  attributes: ["id", "slug", "name"],
                },
              },
            },
          },
        ],
      });

      data = data.map((item) => {
        // Initialize workingInfo with default empty arrays
        const workingInfo = {
          clinics: formatClinics(item),
          specialties: formatSpecialties(item),
          medicalServices: formatMedicalServices(item),
        };

        // Generate the slug based on the processed data
        const slug = generateSlug(item, workingInfo);

        // Combine all data into formattedData
        return {
          packageId: item.packageId,
          packageName: item.packageName,
          packageTypeId: item.packageTypeId,
          packageTypeName: item.PackageType.name,
          packageDetailInfo: item.packageDetailInfo,
          shortPackageInfo: item.shortPackageInfo,
          isDeleted: item.isDeleted,
          slug: slug,
          isManagedByDoctor: item.isManagedByDoctor,
          managingDoctorId: item.managingDoctorId,
          image: item.image,
          workingInfo: {
            clinics: workingInfo.clinics,
            specialties: workingInfo.specialties,
            medicalServices: workingInfo.medicalServices,
          },
        };
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getHealthCheckPackageScheduleDatesInWeek = (
  packageSlug,
  today,
  oneWeekLater
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let healthCheckPackageScheduleDates =
        await db.HealthCheckPackage_Schedules.findAll({
          include: [
            {
              model: db.Health_Check_Packages,
              attributes: ["packageId", "packageName", "slug"],
            },
          ],
          where: {
            "$Health_Check_Package.slug$": packageSlug,
            scheduleDate: {
              [Op.between]: [today, oneWeekLater],
            },
          },
          order: [["scheduleDate", "ASC"]],
        });

      let uniqueScheduleDates = new Set();
      healthCheckPackageScheduleDates.forEach((schedule) => {
        uniqueScheduleDates.add(schedule.scheduleDate);
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: Array.from(uniqueScheduleDates),
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getHealthCheckPackageSchedules = (doctorSlug, today, oneWeekLater) => {
  return new Promise(async (resolve, reject) => {
    try {
      let healthCheckPackageSchedules =
        await db.HealthCheckPackage_Schedules.findAll({
          include: [
            {
              model: db.Health_Check_Packages,
              attributes: ["packageId", "packageName", "slug"],
            },
            {
              model: db.Schedules,
              attributes: ["time"],
            },
          ],
          where: {
            "$Health_Check_Package.slug$": doctorSlug,
            scheduleDate: {
              [Op.between]: [today, oneWeekLater],
            },
          },
          order: [["scheduleDate", "ASC"]],
        });

      resolve({
        errCode: 0,
        message: "OK",
        data: healthCheckPackageSchedules,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getHealthCheckPackageSchedulesByDate = (packageSlug, scheduleDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let healthCheckPackageSchedules =
        await db.HealthCheckPackage_Schedules.findAll({
          include: [
            {
              model: db.Health_Check_Packages,
              attributes: ["packageId", "packageName", "slug"],
            },
            {
              model: db.Schedules,
              attributes: ["time"],
            },
          ],
          where: {
            "$Health_Check_Package.slug$": packageSlug,
            scheduleDate: scheduleDate,
          },
          order: [["scheduleId", "ASC"]],
        });

      resolve({
        errCode: 0,
        message: "OK",
        data: healthCheckPackageSchedules,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorBySlug = (doctorSlug) => {
  let userSlug, packageSlug;
  if (doctorSlug.includes("--")) {
    userSlug = doctorSlug.split("--")[0];
    packageSlug = doctorSlug.split("--")[1];
  }

  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.Doctors.findOne({
        include: [
          {
            model: db.Users,
            as: "user",
            required: true, // Ensures the join is made
          },
          {
            model: db.Doctors_Specialties,
            as: "doctors_Specialties",
            attributes: {
              exclude: ["doctorId", "specialtyId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Specialties,
                as: "specialties",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: db.ClinicBranches_Doctors,
            as: "clinicsWorkingAt",
            include: [
              {
                model: db.ClinicBranches,
                as: "branches",
                attributes: [
                  "clinicBranchId",
                  "clinicBranchName",
                  "clinicBranchAddress",
                ],
                include: [
                  {
                    model: db.Clinics,
                    as: "clinics",
                    attributes: ["id", "fullname", "name", "address", "slug"],
                  },
                ],
              },
            ],
          },
          {
            model: db.PackageType,
            as: "packageType",
            attributes: ["name"],
          },
        ],
        where: {
          [Op.or]: [
            { "$user.slug$": doctorSlug },
            { "$user.slug$": userSlug || "", slug: packageSlug || "" },
          ],
        },
      });

      const workingInfo = { clinics: [] };
      workingInfo.clinics =
        _.isArray(doctor.clinicsWorkingAt) &&
        doctor.clinicsWorkingAt.reduce((acc, item) => {
          if (!acc[item.branches.clinics.id]) {
            acc[item.branches.clinics.id] = {
              clinicId: item.branches.clinics.id,
              clinicName: item.branches.clinics.name,
              clinicFullName: item.branches.clinics.fullname,
              clinicAddress: item.branches.clinics.address,
              slug: item.branches.clinics.slug,
              clinicBranches: [],
            };
          }

          acc[item.branches.clinics.id].clinicBranches.push({
            clinicBranchId: item.branches.clinicBranchId,
            clinicBranchName: item.branches.clinicBranchName,
            clinicBranchAddress: item.branches.clinicBranchAddress,
          });

          return acc;
        }, []);

      const formattedData = {
        doctorInfo: {
          doctorId: doctor.doctorId,
          packageName: doctor.packageName,
          packageTypeId: doctor.packageTypeId,
          packageTypeName: doctor.packageType.name,
          doctorDetailInfo: doctor.doctorDetailInfo,
          shortDoctorInfo: doctor.shortDoctorInfo,
          isDeleted: doctor.isDeleted,
          slug: doctor.user.slug + (doctor.slug ? "--" + doctor.slug : ""),
        },
        userInfo: {
          userId: doctor.user.id,
          fullName: doctor.user.fullName,
          birthDate: doctor.user.birthDate,
          gender: doctor.user.gender,
          phoneNumber: doctor.user.phoneNumber,
          email: doctor.user.email,
          address: doctor.user.address,
          image: doctor.user.image,
        },
        workingInfo: {
          clinics: [],
        },
      };

      if (workingInfo?.clinics) {
        for (const key in workingInfo.clinics) {
          if (workingInfo.clinics.hasOwnProperty(key)) {
            const item = workingInfo.clinics[key];
            formattedData.workingInfo.clinics.push({
              clinicId: item.clinicId,
              clinicName: item.clinicName,
              clinicFullName: item.clinicFullName,
              clinicAddress: item.clinicAddress,
              slug: item.slug,
              clinicBranches: item.clinicBranches,
            });
          }
        }
      }

      resolve({
        errCode: 0,
        message: "OK",
        data: formattedData,
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

const getHealthCheckPackageBookingTypes = (packageSlug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let healthCheckPackageBookingTypes =
        await db.BookingPackagesDetail.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Health_Check_Packages,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: db.BookingPackages,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          where: {
            "$Health_Check_Package.slug$": packageSlug,
          },
        });

      let formattedData = healthCheckPackageBookingTypes.map((item) => ({
        bookingPackageId: item.BookingPackage.id,
        bookingPackageName: item.BookingPackage.name,
        price: item.price,
        description: item.BookingPackage.description,
      }));

      resolve({
        errCode: 0,
        message: "OK",
        data: formattedData,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getBookingScheduleByDoctorScheduleID = (packageScheduleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingSchedule = await db.HealthCheckPackage_Schedules.findOne({
        attributes: {
          exclude: ["packageId", "scheduleId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Schedules,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: db.Health_Check_Packages,
            attributes: {
              exclude: [
                "packageTypeId",
                "packageDetailInfo",
                "shortPackageInfo",
                "isDeleted",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: db.ClinicBranches_HealthCheckPackages,
                include: [
                  {
                    model: db.ClinicBranches,
                    attributes: [
                      "clinicBranchId",
                      "clinicBranchName",
                      "clinicBranchAddress",
                    ],
                    include: [
                      {
                        model: db.Clinics,
                        as: "clinics",
                        attributes: [
                          "id",
                          "fullname",
                          "name",
                          "address",
                          "slug",
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                model: db.PackageType,
                attributes: ["id", "name"],
              },
              {
                model: db.BookingPackagesDetail,
                attributes: ["bookingPackageId", "price", "description"],
                include: [
                  {
                    model: db.BookingPackages,
                    attributes: ["name", "description"],
                  },
                ],
              },
            ],
          },
        ],
        where: {
          packageScheduleId,
        },
      });

      const workingInfo = { clinics: [] };
      workingInfo.clinics =
        _.isArray(
          bookingSchedule.Health_Check_Package
            .ClinicBranches_HealthCheckPackages
        ) &&
        bookingSchedule.Health_Check_Package.ClinicBranches_HealthCheckPackages.reduce(
          (acc, item) => {
            if (!acc[item.ClinicBranch.clinics.id]) {
              acc[item.ClinicBranch.clinics.id] = {
                clinicId: item.ClinicBranch.clinics.id,
                clinicName: item.ClinicBranch.clinics.name,
                clinicFullName: item.ClinicBranch.clinics.fullname,
                clinicAddress: item.ClinicBranch.clinics.address,
                slug: item.ClinicBranch.clinics.slug,
                clinicBranches: [],
              };
            }

            acc[item.ClinicBranch.clinics.id].clinicBranches.push({
              clinicBranchId: item.ClinicBranch.clinicBranchId,
              clinicBranchName: item.ClinicBranch.clinicBranchName,
              clinicBranchAddress: item.ClinicBranch.clinicBranchAddress,
            });

            return acc;
          },
          []
        );

      const days = {
        MON: "Thứ 2",
        TUE: "Thứ 3",
        WED: "Thứ 4",
        THU: "Thứ 5",
        FRI: "Thứ 6",
        SAT: "Thứ 7",
        SUN: "Chủ Nhật",
      };

      bookingSchedule = {
        packageId: bookingSchedule.Health_Check_Package.packageId,
        packageName: bookingSchedule.Health_Check_Package.packageName,
        packageTypeName: bookingSchedule.Health_Check_Package.PackageType.name,
        slug: bookingSchedule.Health_Check_Package.slug,
        image: bookingSchedule.Health_Check_Package.image,
        schedule: {
          ...bookingSchedule.Schedule.dataValues,
          scheduleDate: new Date(
            bookingSchedule.scheduleDate
          ).toLocaleDateString("en-GB"),
          packageScheduleId: bookingSchedule.packageScheduleId,
          dayId: days[bookingSchedule.Schedule.dayId],
          bookingPackagesDetail:
            bookingSchedule.Health_Check_Package.BookingPackagesDetails.map(
              (item) => ({
                bookingPackageId: item.bookingPackageId,
                bookingPackageName: item.BookingPackage.name,
                price: item.price,
                bookingPackageDescription: item.BookingPackage.description,
              })
            ),
        },
        workingInfo: {
          clinics: [],
        },
      };

      if (workingInfo?.clinics) {
        for (const key in workingInfo.clinics) {
          if (workingInfo.clinics.hasOwnProperty(key)) {
            const item = workingInfo.clinics[key];
            bookingSchedule.workingInfo.clinics.push({
              clinicId: item.clinicId,
              clinicName: item.clinicName,
              clinicFullName: item.clinicFullName,
              clinicAddress: item.clinicAddress,
              slug: item.slug,
              clinicBranches: item.clinicBranches,
            });
          }
        }
      }

      resolve({
        errCode: 0,
        message: "OK",
        data: bookingSchedule,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const postCreateNewPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const patient = await db.Patients.findOne({
        include: [
          {
            model: db.Users,
            as: "user",
            attributes: {
              exclude: ["birthDate", "gender", "createdAt", "updatedAt"],
            },
          },
        ],
        where: {
          "$user.phoneNumber$": data.patientPhoneNumber,
        },
      });

      let newPatient = null;
      if (!patient) {
        const hash = crypto
          .createHash("sha256")
          .update(data.patientName)
          .digest("hex");
        const slug = hash.substring(0, 16);

        const users = await db.Users.findAll();
        let nextUserId = "";
        if (users.length === 0) {
          nextUserId = "USR001";
        } else {
          const lastUserId = users[users.length - 1].dataValues.id;
          nextUserId =
            "USR" +
            (parseInt(lastUserId.slice(3)) + 1).toString().padStart(3, "0");
        }

        newPatient = await db.Users.create({
          id: nextUserId,
          fullName: data.patientName,
          birthDate: data.dateOfBirth,
          gender: data.patientGender,
          phoneNumber: data.patientPhoneNumber,
          email: data.email,
          address: data.patientAddress,
          roleId: "R003",
          slug,
        });

        const patients = await db.Patients.findAll();
        let nextPatientId = "";
        if (patients.length === 0) {
          nextPatientId = "PA001";
        } else {
          const lastPatientId =
            patients[patients.length - 1].dataValues.patientId;
          nextPatientId = "PA" + parseInt(lastPatientId.slice(2)) + 1;
        }

        newPatient = await db.Patients.create({
          patientId: nextPatientId,
          userId: newPatient.id,
        });
      }

      resolve({
        errCode: 0,
        message: "Patient created successfully",
        data: patient ? patient : newPatient,
      });
    } catch (error) {
      console.error("Error creating new patient:", error); // Log the detailed error on the server
      reject({
        errCode: -1,
        message:
          "An error occurred while creating the patient. Please try again later.",
      });
    }
  });
};

const postSubmitBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPatient = await postCreateNewPatient(data);

      if (newPatient.errCode === 0) {
        if (!newPatient.data.patientId) {
          throw new Error("Patient ID is null or undefined");
        }

        let newBookingId = data.doctorScheduleId + newPatient.data.patientId;

        const hash = crypto
          .createHash("sha256")
          .update(newBookingId)
          .digest("hex");
        newBookingId = hash.substring(0, 16);

        // Create new booking
        const newBooking =
          await db.HealthCheckPackageScheduleBookingDetail.create({
            id: newBookingId,
            patientRelativesName: data.patientRelativesName
              ? data.patientRelativesName
              : null,
            patientRelativesPhoneNumber: data.patientRelativesPhoneNumber
              ? data.patientRelativesPhoneNumber
              : null,
            patientId: newPatient.data.patientId,
            packageScheduleId: data.packageScheduleId,
            bookingPackageId: data.price.split("-")[0],
            bookingReason: data.bookingReason,
            purchaseMethodId: data.purchaseMethod,
            clinic: data.clinic.clinicBranchId,
            bookingStatus: "BKS001",
          });

        // // Send email to the patient
        // const text = `<!DOCTYPE html>
        // <html lang="vi">
        // <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <style>
        //         body {
        //             font-family: Arial, sans-serif;
        //             line-height: 1.6;
        //             margin: 0;
        //             padding: 20px;
        //             background-color: #f4f4f4;
        //         }
        //         .container {
        //             max-width: 600px;
        //             margin: auto;
        //             background: white;
        //             padding: 20px;
        //             border-radius: 8px;
        //             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        //         }
        //         h1 {
        //             color: #333;
        //         }
        //         p {
        //             color: #555;
        //         }
        //         .footer {
        //             margin-top: 20px;
        //             font-size: 0.8em;
        //             color: #777;
        //         }
        //         .note {
        //             background-color: #e7f3fe;
        //             border-left: 6px solid #2196F3;
        //             margin: 20px 0;
        //             padding: 10px;
        //         }
        //     </style>
        // </head>
        // <body>
        //     <div class="container">
        //         <h1>Kính gửi ${data.patientName},</h1>
        //         <>Chúng tôi rất vui mừng thông báo rằng bạn đã đặt lịch khám bệnh thành công tại <strong>[Tên bệnh viện/Phòng khám]</strong> qua trang web BookingCare.\u2013;
        //         Lịch khám hiện tại của bạn đang trong trạng thái chờ xác nhận. Chúng tôi sẽ phản hồi lại cho bạn trong thời gian sớm nhất.\u2013
        //         Xin vui lòng kiểm tra email thường xuyên để cập nhật thông tin mới nhất về lịch hẹn của bạn.
        //         </>

        //         <h2>Thông tin đặt lịch:</h2>
        //         <p>Mã lịch khám: <strong>${data.doctorScheduleId}</strong><br>
        //           Ngày đặt lịch: <strong>${data.dateBooking}</strong><br>
        //           Ngày khám: <strong>${data.scheduleDay} - ${
        //   data.scheduleDate
        // }</strong><br>
        //           Thời gian khám: <strong>${data.scheduleTime}</strong><br>
        //           Tên gói khám: <strong>${data.medicalPackageName}</strong><br>
        //           Số điện thoại bác sĩ: <strong>[Số điện thoại bác sĩ]</strong><br>
        //           Giá gói khám: <strong>${data.price.split("-")[1]}</strong><br>

        //         <h2>Thông tin bệnh nhân:</h2>
        //         <p>Họ và tên: <strong>${data.patientName}</strong><br>
        //           Giới tính: <strong>${data.patientGender}</strong><br>
        //           Ngày sinh: <strong>${data.dateOfBirth.split("-")[2]}/${
        //   data.dateOfBirth.split("-")[1]
        // }/${data.dateOfBirth.split("-")[0]}</strong><br>
        //           Số điện thoại: <strong>${data.patientPhoneNumber}</strong><br>
        //           Email: <strong>${data.email}</strong><br>
        //           Địa chỉ: <strong>${data.patientAddress}</strong></p>

        //         <h2>Thông tin người nhà bệnh nhân:</h2>
        //         <p>Tên người nhà: <strong>${
        //           data.relativeName ? data.relativeName : "(Không có)"
        //         }</strong><br>
        //           Số điện thoại người nhà: <strong>${
        //             data.relativePhoneNumber
        //               ? data.relativePhoneNumber
        //               : "(Không có)"
        //           }</strong></p>

        //         <div class="note">
        //             <strong>Lưu ý:</strong><br>
        //             Để đảm bảo quá trình khám bệnh diễn ra thuận lợi, chúng tôi khuyến nghị bạn đến trước <strong>[15-30]</strong> phút để hoàn tất thủ tục đăng ký và các bước chuẩn bị cần thiết.<br>
        //             Vui lòng mang theo <strong>[CMND/Passport/Giấy khám bệnh cũ (nếu có)]</strong> để đối chiếu thông tin.<br>
        //             Nếu có bất kỳ thay đổi nào về lịch hẹn, vui lòng liên hệ với chúng tôi theo số điện thoại <strong>[Số điện thoại]</strong> hoặc email <strong>[Email]</strong> trước <strong>[Số ngày]</strong> ngày khám.
        //         </div>
        //         <br/>
        //         <br/>
        //         <br/>
        //         <p>Chúng tôi chúc bạn một buổi khám bệnh thật tốt đẹp!</p>

        //         <div class="footer">
        //             Trân trọng,<br>
        //             <strong>Kagami</strong><br>
        //             Nhân viên<br>
        //             [Tên bệnh viện/Phòng khám]<br>
        //             BookingCare<br>
        //             <img src="[Logo]" alt="Logo" style="max-width: 100%; height: auto;">
        //         </div>
        //     </div>
        // </body>
        // </html>`;

        // // Generate PDF from HTML content
        // const pdfBuffer = await generatePDF(text);

        // // Add email job to the queue
        // emailQueue.add({
        //   data,
        //   subject: "Xác nhận đăt lịch khám bệnh",
        //   text: "Chúng tôi xin gửi đến quý khách thông tin về lịch khám bệnh!",
        //   attachments: {
        //     filename: "booking-confirmation.pdf",
        //     content: pdfBuffer,
        //   },
        // });

        resolve({
          errCode: 0,
          message: "Booking submitted successfully",
        });
      } else {
        reject(newPatient);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBookingOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingOrders =
        await db.HealthCheckPackageScheduleBookingDetail.findAll({
          include: [
            {
              model: db.Patients,
              as: "patient",
              attributes: ["patientId"],
              include: [
                {
                  model: db.Users,
                  as: "user",
                  attributes: [
                    "id",
                    "fullName",
                    "phoneNumber",
                    "email",
                    "address",
                  ],
                },
              ],
            },
            {
              model: db.HealthCheckPackage_Schedules,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.Health_Check_Packages,
                  attributes: {
                    exclude: [
                      "isManagedByDoctor",
                      "managingDoctorId",
                      "packageTypeId",
                      "packageDetailInfo",
                      "shortPackageInfo",
                      "image",
                    ],
                  },
                  include: [
                    {
                      model: db.ClinicBranches_HealthCheckPackages,
                      include: {
                        model: db.ClinicBranches,
                        attributes: [
                          "clinicBranchId",
                          "clinicBranchName",
                          "clinicBranchAddress",
                        ],
                        include: [
                          {
                            model: db.Clinics,
                            as: "clinics",
                            attributes: [
                              "id",
                              "fullname",
                              "name",
                              "address",
                              "slug",
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
            {
              model: db.BookingStatus,
              attributes: ["id", "name"],
            },
          ],
          where: {
            "$HealthCheckPackage_Schedule.Health_Check_Package.ClinicBranches_HealthCheckPackages.clinicBranchId$":
              {
                [Op.col]: "HealthCheckPackageScheduleBookingDetail.clinic",
              },
          },
        });

      bookingOrders = bookingOrders.map((order) => {
        let clinics = formatClinics(
          order.HealthCheckPackage_Schedule.Health_Check_Package
        );

        clinics = clinics.length === 1 ? clinics[0] : clinics;
        return {
          ...order.dataValues,
          clinics,
        };
      });

      bookingOrders = bookingOrders.map((order) => {
        const formattedData = {
          bookingId: order.id,
          patientRelativesName: order.patientRelativesName,
          patientRelativesPhoneNumber: order.patientRelativesPhoneNumber,
          bookingReason: order.bookingReason,
          purchaseMethodId: order.purchaseMethodId,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          clinicInfo: {
            clinicId: order.clinics.clinicId,
            clinicName: order.clinics.clinicName,
            clinicFullName: order.clinics.clinicFullName,
            clinicAddress: order.clinics.clinicAddress,
          },
          patientInfo: {
            patientId: order.patient.patientId,
            ...order.patient.user.dataValues,
          },
          scheduleInfo: {
            medicalHealthCheckPackageId:
              order.HealthCheckPackage_Schedule.Health_Check_Package.packageId,
            medicalHealthCheckPackageName:
              order.HealthCheckPackage_Schedule.Health_Check_Package
                .packageName,
            bookingStatus: order.BookingStatus,
          },
        };

        return formattedData;
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: bookingOrders,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPatients = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = await db.Patients.findAll({
        include: [
          {
            model: db.Users,
            as: "user",
          },
        ],
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: patients,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Function to extract clinic information
const extractClinicInfo = (clinicsInfo) => {
  if (!_.isArray(clinicsInfo)) {
    return [];
  }

  const clinics = clinicsInfo.reduce((acc, item) => {
    const clinicId = item.branches.clinics.id;
    if (!acc[clinicId]) {
      acc[clinicId] = {
        clinicId: item.branches.clinics.id,
        clinicName: item.branches.clinics.name,
        clinicFullName: item.branches.clinics.fullname,
        clinicAddress: item.branches.clinics.address,
        slug: item.branches.clinics.slug,
        ClinicBranches: [],
      };
    }
    acc[clinicId].ClinicBranches.push({
      clinicBranchId: item.branches.clinicBranchId,
      clinicBranchName: item.branches.clinicBranchName,
      clinicBranchAddress: item.branches.clinicBranchAddress,
    });
    return acc;
  }, {});

  return Object.values(clinics);
};

const extractSpecialtyInfo = (specialtiesInfo) => {
  if (!_.isArray(specialtiesInfo)) {
    return [];
  }

  const specialties = specialtiesInfo.reduce((acc, item) => {
    const specialtyId = item.Doctors_Specialties?.specialties.id;
    if (specialtyId && !acc[specialtyId]) {
      acc[specialtyId] = {
        id: specialtyId,
        name: item.Doctors_Specialties?.specialties.name,
        slug: item.Doctors_Specialties?.specialties.slug,
      };
    }
    return acc;
  }, {});

  return Object.values(specialties);
};

const getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.Doctors.findAll({
        attributes: {
          exclude: ["userId", "slug", "doctorDetailInfo", "shortDoctorInfo"],
        },
        include: [
          {
            model: db.Users,
            as: "user",
            attributes: {
              exclude: ["roleId", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Doctors_Specialties,
            as: "doctors_Specialties",
            include: [
              {
                model: db.Specialties,
                as: "specialties",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: db.ClinicBranches_Doctors,
            as: "clinicsWorkingAt",
            include: [
              {
                model: db.ClinicBranches,
                as: "branches",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.Clinics,
                    as: "clinics",
                    attributes: ["id", "fullname", "name", "address", "slug"],
                  },
                ],
              },
            ],
          },
          {
            model: db.Health_Check_Packages,
            attributes: {
              exclude: [
                "packageTypeId",
                "packageDetailInfo",
                "shortPackageInfo",
                "isDeleted",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: db.PackageType,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });

      doctors = doctors.map((doctor) => {
        const clinics = extractClinicInfo(doctor.clinicsWorkingAt);
        const specialties = extractSpecialtyInfo(doctor.doctors_Specialties);

        return {
          doctorId: doctor.doctorId,
          fullName: doctor.user.fullName,
          birthDate: doctor.user.birthDate,
          gender: doctor.user.gender,
          phoneNumber: doctor.user.phoneNumber,
          email: doctor.user.email,
          address: doctor.user.address,
          image: doctor.user.image,
          workingAt: clinics,
          specialty: specialties,
          createdAt: doctor.createdAt,
          updatedAt: doctor.updatedAt,
          status: doctor.user.isDeleted,
          medicalHealthCheckPackages: doctor.Health_Check_Packages
            ? doctor.Health_Check_Packages.map((pkg) => {
                return {
                  packageId: pkg.packageId,
                  packageName: pkg.packageName,
                  packageType: pkg.PackageType.name,
                  isManagedByDoctor: pkg.isManagedByDoctor,
                  managingDoctorId: pkg.managingDoctorId,
                };
              })
            : [],
        };
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const roles = await db.Roles.findAll();
      resolve({
        errCode: 0,
        message: "OK",
        data: roles,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getUserIsDoctorByID = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.Doctors.findOne({
        where: { doctorId },
        include: [
          {
            model: db.Users,
            as: "user",
            attributes: { exclude: ["roleId"] },
            include: [
              {
                model: db.Roles,
                as: "role",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });

      let doctorPackages = await db.Health_Check_Packages.findAll({
        attributes: ["packageId", "packageName", "isDeleted"],
        include: [
          {
            model: db.PackageType,
            attributes: ["id", "name"],
          },
          {
            model: db.Doctors,
            attributes: ["doctorId", "userId"],
          },
        ],
        where: {
          managingDoctorId: doctorId,
        },
      });

      if (!doctor) {
        return resolve({
          errCode: 1,
          message: "Doctor not found",
          data: null,
        });
      }

      let formattedData = {
        ...doctor.get({ plain: true }),
        doctorPackages,
      };

      resolve({
        errCode: 0,
        message: "OK",
        data: formattedData,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUserIsPatientByID = (patientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await db.Patients.findOne({
        where: { patientId },
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Users,
            as: "user",
            attributes: { exclude: ["roleId"] },
            include: [
              {
                model: db.Roles,
                as: "role",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });

      let packages = null;
      if (patient) {
        packages = await db.HealthCheckPackageScheduleBookingDetail.findAll({
          attributes: ["id"],
          include: [
            {
              model: db.HealthCheckPackage_Schedules,
              attributes: ["packageScheduleId", "scheduleDate", "updatedAt"],
              include: [
                {
                  model: db.Health_Check_Packages,
                  attributes: {
                    exclude: [
                      "isManagedByDoctor",
                      "managingDoctorId",
                      "packageTypeId",
                      "slug",
                      "packageDetailInfo",
                      "shortPackageInfo",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                  include: [
                    {
                      model: db.PackageType,
                      attributes: ["id", "name"],
                    },
                  ],
                },
              ],
            },
            {
              model: db.BookingStatus,
              attributes: ["id", "name"],
            },
          ],
          where: {
            patientId: patient.patientId,
          },
        });
      }

      let formattedPackages = packages.map((item) => ({
        orderId: item.id,
        packageScheduleId: item.HealthCheckPackage_Schedule.packageScheduleId,
        scheduleDate: item.HealthCheckPackage_Schedule.scheduleDate,
        updatedAt: item.HealthCheckPackage_Schedule.updatedAt,
        packageId:
          item.HealthCheckPackage_Schedule.Health_Check_Package.packageId,
        packageName:
          item.HealthCheckPackage_Schedule.Health_Check_Package.packageName,
        isDeleted:
          item.HealthCheckPackage_Schedule.Health_Check_Package.isDeleted,
        packageTypeName:
          item.HealthCheckPackage_Schedule.Health_Check_Package.PackageType
            .name,
        userId: patient.user.id,
        fullName: patient.user.fullName,
        bookingStatus: item.BookingStatus.name,
      }));

      patient = {
        ...patient.get({ plain: true }),
        packages: formattedPackages,
      };

      resolve({
        errCode: 0,
        message: "OK",
        data: patient,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getMedicalHealthCheckPackageByID = (packageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalHealthCheckPackage = await db.Health_Check_Packages.findOne({
        attributes: {
          exclude: ["packageTypeId", "slug"],
        },
        include: [
          {
            model: db.PackageType,
            attributes: ["id", "name"],
          },
          {
            model: db.ClinicBranches_HealthCheckPackages,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.ClinicBranches,
                attributes: [
                  "clinicBranchId",
                  "clinicBranchName",
                  "clinicBranchAddress",
                ],
                include: {
                  model: db.Clinics,
                  as: "clinics",
                  attributes: ["id", "name", "fullname"],
                },
              },
            ],
          },
          {
            model: db.BookingPackagesDetail,
            attributes: {
              exclude: ["description", "createdAt", "updatedAt"],
            },
            include: {
              model: db.BookingPackages,
              attributes: ["id", "name", "description"],
            },
          },
          {
            model: db.HealthCheckPackages_Specialties,
            attributes: ["packageId", "specialtyId"],
            include: {
              model: db.Specialties,
              attributes: ["id", "name"],
            },
          },
          {
            model: db.SpecificMedicalServices_HealthCheckPackages,
            attributes: ["packageId", "specificMedicalServiceId"],
            include: {
              model: db.SpecificMedicalServices,
              attributes: ["id", "name"],
            },
          },
        ],
        where: {
          packageId: packageId,
        },
      });

      let formattedData = {
        packageId: medicalHealthCheckPackage?.packageId,
        packageName: medicalHealthCheckPackage?.packageName,
        packageTypeId: medicalHealthCheckPackage?.PackageType?.id,
        packageType: medicalHealthCheckPackage?.PackageType?.name,
        image: medicalHealthCheckPackage?.image,
        packageDetailInfo: medicalHealthCheckPackage?.packageDetailInfo,
        shortPackageInfo: medicalHealthCheckPackage?.shortPackageInfo,
        managingDoctorId: medicalHealthCheckPackage?.managingDoctorId,
        isDeleted: medicalHealthCheckPackage?.isDeleted,
        createdAt: medicalHealthCheckPackage?.createdAt,
        updatedAt: medicalHealthCheckPackage?.updatedAt,
        clinicsWorkingAt:
          medicalHealthCheckPackage?.ClinicBranches_HealthCheckPackages?.map(
            (item) => ({
              clinicBranchId: item.ClinicBranch.clinicBranchId,
              clinicBranchName: item.ClinicBranch.clinicBranchName,
              clinicBranchAddress: item.ClinicBranch.clinicBranchAddress,
              clinicId: item.ClinicBranch.clinics.id,
              clinicName: item.ClinicBranch.clinics.name,
              clinicFullName: item.ClinicBranch.clinics.fullname,
            })
          ),
        bookingPackages: medicalHealthCheckPackage?.BookingPackagesDetails?.map(
          (item) => ({
            bookingPackageId: item.BookingPackage.id,
            bookingPackageName: item.BookingPackage.name,
            bookingPackagePrice: item.price,
            bookingPackageDescription: item.BookingPackage.description,
          })
        ),
        specialties:
          medicalHealthCheckPackage?.HealthCheckPackages_Specialties?.map(
            (item) => ({
              id: item.Specialty.id,
              name: item.Specialty.name,
            })
          ),
        specificMedicalServices:
          medicalHealthCheckPackage?.SpecificMedicalServices_HealthCheckPackages?.map(
            (item) => ({
              id: item.SpecificMedicalService.id,
              name: item.SpecificMedicalService.name,
            })
          ),
      };

      resolve({
        errCode: 0,
        message: "OK",
        data: formattedData,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getSpecificMedicalServiceByID = (serviceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const specificMedicalService = await db.SpecificMedicalServices.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.SpecificMedicalService_MedicalServiceId,
            as: "specificMedicalService_MedicalServiceId",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.MedicalServices,
                as: "medicalService",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: db.SpecificMedicalServices_HealthCheckPackages,
            include: [
              {
                model: db.Health_Check_Packages,
                attributes: [
                  "packageId",
                  "packageName",
                  "isDeleted",
                  "createdAt",
                  "updatedAt",
                ],
              },
            ],
          },
        ],
        where: {
          id: serviceId,
        },
      });

      // Destructure the input data
      const {
        id,
        name,
        image,
        slug,
        description,
        specificMedicalService_MedicalServiceId,
        SpecificMedicalServices_HealthCheckPackages,
      } = specificMedicalService;

      // Extract medical service package details
      const medicalServicePackage = specificMedicalService_MedicalServiceId.map(
        (item) => ({
          id: item.medicalService.id,
          name: item.medicalService.name,
        })
      );

      const healthCheckPackages =
        SpecificMedicalServices_HealthCheckPackages.map((item) => ({
          id: item.Health_Check_Package?.packageId,
          name: item.Health_Check_Package?.packageName,
          isDeleted: item.Health_Check_Package?.isDeleted,
        }));

      // Construct the reconstructed data
      let formattedData = {
        specificMedicalServiceDetails: {
          id,
          name,
          image,
          slug,
          description: description || "",
        },
        associatedMedicalServicePackage: medicalServicePackage,
        associatedHealthCheckPackages: healthCheckPackages,
      };

      resolve({
        status: 200,
        message: "OK",
        data: formattedData,
        data2: specificMedicalService,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllUndeployPackages = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `WITH temporaryTable AS (SELECT packageId from health_check_packages AS DR 
EXCEPT SELECT packageId from specificmedicalservices_healthcheckpackages 
EXCEPT SELECT packageId from healthcheckpackages_specialties)

SELECT HCKPG.packageId, HCKPG.packageName FROM temporaryTable AS TEMP
INNER JOIN health_check_packages AS HCKPG ON TEMP.packageId = HCKPG.packageId`
      );

      // Check if the results are empty
      if (
        results.length === 0 ||
        (results.length === 1 && !results[0].doctorId)
      ) {
        resolve({
          errCode: 0,
          message: "No undeployed packages found",
          data: [],
        });
      } else {
        resolve({
          errCode: 0,
          message: "OK",
          data: results,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const getMedicalServicesByID = (serviceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalService = await db.MedicalServices.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.SpecificMedicalService_MedicalServiceId,
            as: "specificMedicalService_MedicalServiceId",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.SpecificMedicalServices,
                as: "specificMedicalService",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        where: {
          id: serviceId,
        },
      });

      let formattedData = {
        id: medicalService.id,
        name: medicalService.name,
        image: medicalService.image,
        slug: medicalService.slug,
        specificMedicalServices:
          medicalService.specificMedicalService_MedicalServiceId.map(
            (item) => ({
              id: item.specificMedicalService.id,
              name: item.specificMedicalService.name,
              isDeleted: false,
            })
          ),
      };

      resolve({
        errCode: 0,
        message: "OK",
        data: formattedData,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getClinicByID = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const clinic = await db.Clinics.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.ClinicBranches,
            as: "branches",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.ClinicBranches_Doctors,
                as: "doctorsAssigned",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        where: {
          id: clinicId,
        },
      });

      const doctors = await db.ClinicBranches_Doctors.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Doctors,
            as: "assignedClinicBranches",
            attributes: {
              exclude: [
                "userId",
                "packageTypeId",
                "doctorDetailInfo",
                "shortDoctorInfo",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: db.Users,
                as: "user",
                attributes: ["id", "fullName", "roleId"],
              },
            ],
          },
          {
            model: db.ClinicBranches,
            as: "branches",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        where: {
          "$branches.clinicId$": clinicId,
          "$assignedClinicBranches.user.roleId$": "R002",
        },
      });

      const healthCheckPackages =
        await db.ClinicBranches_HealthCheckPackages.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Health_Check_Packages,
              attributes: {
                exclude: [
                  "isManagedByDoctor",
                  "managingDoctorId",
                  "packageTypeId",
                  "doctorDetailInfo",
                  "shortDoctorInfo",
                  "image",
                  "slug",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
            {
              model: db.ClinicBranches,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          where: {
            "$ClinicBranch.clinicId$": clinicId, // corrected alias
          },
        });

      const branches = clinic.branches?.map((branch) => ({
        id: branch.clinicBranchId,
        name: branch.clinicBranchName,
        address: branch.clinicBranchAddress,
      }));

      const assignedDoctors =
        doctors?.map((doctor) => ({
          userId: doctor.assignedClinicBranches.user.id,
          doctorId: doctor.doctorId,
          fullName: doctor.assignedClinicBranches.user.fullName,
          isDeleted: doctor.assignedClinicBranches.isDeleted,
        })) || [];

      const assignedPackages =
        healthCheckPackages?.map((pck) => ({
          packageId: pck.Health_Check_Package.packageId,
          packageName: pck.Health_Check_Package.packageName,
          isDeleted: pck.Health_Check_Package.isDeleted,
        })) || [];

      let formattedData = {
        ...clinic.dataValues,
        branches,
        assignedDoctors,
        assignedPackages,
      };

      resolve({
        errCode: 0,
        message: "OK",
        data: formattedData,
        // data2: doctors,
        // data3: healthCheckPackages,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getHealthCheckPackageBySlug = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const healthCheckPackage = await db.Health_Check_Packages.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Doctors,
            attributes: {
              exclude: ["userId", "packageTypeId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Users,
                as: "user",
                attributes: ["id", "fullName"],
              },
            ],
          },
          {
            model: db.ClinicBranches_HealthCheckPackages,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: {
              model: db.ClinicBranches,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              include: {
                model: db.Clinics,
                as: "clinics",
                attributes: ["id", "fullname", "name", "address", "slug"],
              },
            },
          },
          {
            model: db.PackageType,
            attributes: ["id", "name"],
          },
          {
            model: db.HealthCheckPackages_Specialties,
            include: {
              model: db.Specialties,
              attributes: ["id", "name", "slug"],
            },
          },
          {
            model: db.SpecificMedicalServices_HealthCheckPackages,
            include: {
              model: db.SpecificMedicalServices,
              attributes: ["id", "name", "slug"],
              include: {
                model: db.SpecificMedicalService_MedicalServiceId,
                as: "specificMedicalService_MedicalServiceId",
                include: {
                  model: db.MedicalServices,
                  as: "medicalService",
                  attributes: ["id", "slug", "name"],
                },
              },
            },
          },
        ],
        where: {
          slug,
        },
      });

      const workingInfo = {
        clinics: healthCheckPackage?.ClinicBranches_HealthCheckPackages
          ? formatClinics(healthCheckPackage)
          : [],
        specialties: healthCheckPackage?.HealthCheckPackages_Specialties
          ? formatSpecialties(healthCheckPackage)
          : [],
        medicalServices:
          healthCheckPackage?.SpecificMedicalServices_HealthCheckPackages
            ? formatMedicalServices(healthCheckPackage)
            : [],
      };

      const newSlug = generateSlug(healthCheckPackage, workingInfo);

      // workingInfo.clinics =
      //   _.isArray(healthCheckPackage.ClinicBranches_HealthCheckPackages) &&
      //   healthCheckPackage.ClinicBranches_HealthCheckPackages.reduce(
      //     (acc, item) => {
      //       if (!acc[item.ClinicBranch.clinics.id]) {
      //         acc[item.ClinicBranch.clinics.id] = {
      //           clinicId: item.ClinicBranch.clinics.id,
      //           clinicName: item.ClinicBranch.clinics.name,
      //           clinicFullName: item.ClinicBranch.clinics.fullname,
      //           clinicAddress: item.ClinicBranch.clinics.address,
      //           slug: item.ClinicBranch.clinics.slug,
      //           clinicBranches: [],
      //         };
      //       }

      //       acc[item.ClinicBranch.clinics.id].clinicBranches.push({
      //         clinicBranchId: item.ClinicBranch.clinicBranchId,
      //         clinicBranchName: item.ClinicBranch.clinicBranchName,
      //         clinicBranchAddress: item.ClinicBranch.clinicBranchAddress,
      //       });

      //       return acc;
      //     },
      //     []
      //   );

      const formattedData = {
        packageId: healthCheckPackage?.packageId,
        doctorId: healthCheckPackage?.Doctor
          ? healthCheckPackage.Doctor.doctorId
          : "",
        packageName: healthCheckPackage?.packageName,
        packageTypeId: healthCheckPackage?.packageTypeId,
        packageTypeName: healthCheckPackage?.PackageType?.name,
        packageDetailInfo: healthCheckPackage?.packageDetailInfo,
        shortPackageInfo: healthCheckPackage?.shortPackageInfo,
        doctorDetailInfo: healthCheckPackage?.Doctor
          ? healthCheckPackage.Doctor.doctorDetailInfo
          : "",
        shortDoctorInfo: healthCheckPackage?.Doctor
          ? healthCheckPackage.Doctor.shortDoctorInfo
          : "",
        isDeleted: healthCheckPackage?.isDeleted,
        image: healthCheckPackage?.image,
        slug: newSlug,
        isManagedByDoctor: healthCheckPackage?.isManagedByDoctor,
        workingInfo: {
          clinics: workingInfo.clinics,
        },
      };

      resolve({
        errCode: 0,
        message: "OK",
        data: formattedData,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getBookingDetailsByDoctorScheduleID = (doctorScheduleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      try {
        let bookingOrders =
          await db.HealthCheckPackageScheduleBookingDetail.findOne({
            include: [
              {
                model: db.Patients,
                as: "patient",
                attributes: ["patientId"],
                include: [
                  {
                    model: db.Users,
                    as: "user",
                    attributes: [
                      "id",
                      "fullName",
                      "phoneNumber",
                      "email",
                      "address",
                    ],
                  },
                ],
              },
              {
                model: db.HealthCheckPackage_Schedules,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.Schedules,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                  {
                    model: db.Health_Check_Packages,
                    attributes: {
                      exclude: [
                        "packageTypeId",
                        "packageDetailInfo",
                        "shortPackageInfo",
                        "image",
                      ],
                    },
                    include: [
                      {
                        model: db.PackageType,
                        attributes: {
                          exclude: ["createdAt", "updatedAt"],
                        },
                      },
                      {
                        model: db.ClinicBranches_HealthCheckPackages,
                        include: {
                          model: db.ClinicBranches,
                          attributes: [
                            "clinicBranchId",
                            "clinicBranchName",
                            "clinicBranchAddress",
                          ],
                          include: [
                            {
                              model: db.Clinics,
                              as: "clinics",
                              attributes: [
                                "id",
                                "fullname",
                                "name",
                                "address",
                                "slug",
                              ],
                            },
                          ],
                        },
                      },
                      {
                        model: db.Doctors,
                        attributes: {
                          exclude: [
                            "packageTypeId",
                            "slug",
                            "doctorDetailInfo",
                            "shortDoctorInfo",
                            "createdAt",
                            "updatedAt",
                          ],
                        },
                        include: [
                          {
                            model: db.Users,
                            as: "user",
                            attributes: ["id", "fullName"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                model: db.BookingPackages,
                attributes: ["id", "name"],
                include: {
                  model: db.BookingPackagesDetail,
                },
              },
              {
                model: db.BookingStatus,
                attributes: ["id", "name"],
              },
            ],
            where: {
              id: doctorScheduleId,
              "$HealthCheckPackage_Schedule.Health_Check_Package.ClinicBranches_HealthCheckPackages.clinicBranchId$":
                {
                  [Op.col]: "HealthCheckPackageScheduleBookingDetail.clinic",
                },
            },
          });

        let clinics = formatClinics(
          bookingOrders.HealthCheckPackage_Schedule.Health_Check_Package
        );

        clinics = clinics.length === 1 ? clinics[0] : clinics;

        const formattedData = {
          bookingId: bookingOrders.id,
          patientRelativesName: bookingOrders.patientRelativesName,
          patientRelativesPhoneNumber:
            bookingOrders.patientRelativesPhoneNumber,
          bookingReason: bookingOrders.bookingReason,
          purchaseMethodId: bookingOrders.purchaseMethodId,
          createdAt: bookingOrders.createdAt,
          updatedAt: bookingOrders.updatedAt,
          clinicInfo: {
            clinicId: clinics.clinicId,
            clinicName: clinics.clinicName,
            clinicFullName: clinics.clinicFullName,
            clinicAddress: clinics.clinicAddress,
            slug: clinics.slug,
            clinicBranchId: clinics.ClinicBranches[0].clinicBranchId,
            clinicBranchName: clinics.ClinicBranches[0].clinicBranchName,
            clinicBranchAddress: clinics.ClinicBranches[0].clinicBranchAddress,
          },
          patientInfo: {
            patientId: bookingOrders.patient.patientId,
            ...bookingOrders.patient.user.dataValues,
          },
          scheduleInfo: {
            packageScheduleId:
              bookingOrders.HealthCheckPackage_Schedule.packageScheduleId,
            scheduleDate:
              bookingOrders.HealthCheckPackage_Schedule.scheduleDate,
            scheduleTime:
              bookingOrders.HealthCheckPackage_Schedule.Schedule.time,
            medicalHealthCheckPackageId:
              bookingOrders.HealthCheckPackage_Schedule.Health_Check_Package
                .packageId,
            medicalHealthCheckPackageName:
              bookingOrders.HealthCheckPackage_Schedule.Health_Check_Package
                .packageName,
            bookingPackageInfo: {
              id: bookingOrders.BookingPackage.id,
              name: bookingOrders.BookingPackage.name,
              price:
                bookingOrders.BookingPackage.BookingPackagesDetails[0].price,
            },
            bookingStatus: bookingOrders.BookingStatus,
            doctorInfo: !_.isNull(
              bookingOrders.HealthCheckPackage_Schedule.Health_Check_Package
                .Doctor
            )
              ? {
                  doctorId:
                    bookingOrders.HealthCheckPackage_Schedule
                      .Health_Check_Package.Doctor.doctorId,
                  doctorName:
                    bookingOrders.HealthCheckPackage_Schedule
                      .Health_Check_Package.Doctor.user.fullName,
                }
              : null,
          },
        };

        resolve({
          errCode: 0,
          message: "OK",
          data: formattedData,
        });
      } catch (error) {
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
};

const getLatestHealthCheckPackage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.Health_Check_Packages.findOne({
        attributes: {
          exclude: [
            "packageTypeId",
            "packageDetailInfo",
            "shortPackageInfo",
            "image",
            "isManagedByDoctor",
            "managingDoctorId",
          ],
        },
        order: [["packageId", "DESC"]],
      });
      resolve({
        errCode: 0,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getClinicBranchesByClinicId = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.ClinicBranches.findAll({
        include: [
          {
            model: db.Clinics,
            as: "clinics",
            attributes: ["id", "fullname", "name"],
          },
        ],
        where: {
          clinicId,
        },
      });
      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getLatestSpecificMedicalService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.SpecificMedicalServices.findOne({
        order: [["id", "DESC"]],
      });
      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getLatestDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const latestDoctor = await db.Doctors.findOne({
        order: [["doctorId", "DESC"]],
      });
      const latestUser = await db.Users.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
      });

      const result = {
        userId: latestUser.id,
        doctorId: latestDoctor.doctorId,
      };

      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getLatestPatient = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const latestPatient = await db.Patients.findOne({
        order: [["createdAt", "DESC"]],
      });
      const latestUser = await db.Users.findOne({
        attributes: ["id"],
        order: [["createdAt", "DESC"]],
      });
      const result = {
        userId: latestUser.id,
        patientId: latestPatient.patientId,
      };

      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getLatestClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.Clinics.findOne({
        attributes: ["id", "fullname", "name", "slug"],
        order: [["id", "DESC"]],
      });
      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getSpecialtyByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.Specialties.findOne({
        where: {
          id: id,
        },
      });
      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getSpecialtyBySlug = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.Specialties.findOne({
        where: {
          slug: slug,
        },
      });
      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllHealthCheckPackagesBySpecialtySlug = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Slug received:", slug);
      const specialty = await getSpecialtyBySlug(slug);

      if (!specialty.data)
        return resolve({
          status: 200,
          message: "OK",
          data: [],
        });

      const healthCheckPackages =
        await db.HealthCheckPackages_Specialties.findAll({
          attributes: ["packageId", "specialtyId"],
          where: {
            specialtyId: specialty.data.id,
          },
          include: [
            {
              model: db.Health_Check_Packages,
              attributes: [
                "packageId",
                "packageName",
                "image",
                "shortPackageInfo",
                "slug",
                "isDeleted",
              ],
              include: [
                {
                  model: db.BookingPackagesDetail,
                  attributes: ["bookingPackageId", "price", "description"],
                  include: [
                    {
                      model: db.BookingPackages,
                      attributes: ["id", "name"],
                    },
                  ],
                },
                {
                  model: db.ClinicBranches_HealthCheckPackages,
                  include: [
                    {
                      model: db.ClinicBranches,
                      attributes: [
                        "clinicBranchId",
                        "clinicBranchName",
                        "clinicBranchAddress",
                      ],
                      include: [
                        {
                          model: db.Clinics,
                          as: "clinics",
                          attributes: ["id", "fullname", "name", "address"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });

      const today = new Date();
      const formattedToday = today.toISOString().slice(0, 10); // "YYYY-MM-DD"

      const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const formattedWeekLater = weekLater.toISOString().slice(0, 10);

      const healthCheckPackagesSchedules =
        await db.HealthCheckPackage_Schedules.findAll({
          where: {
            packageId: healthCheckPackages.map((item) => item.packageId),
            scheduleDate: {
              [Op.between]: [formattedToday, formattedWeekLater],
            },
          },
          include: [
            {
              model: db.Schedules,
              attributes: ["id", "time", "dayId"],
              include: [
                {
                  model: db.Days,
                  as: "day",
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
          order: [
            ["packageId", "ASC"],
            ["scheduleDate", "ASC"],
            ["scheduleId", "ASC"],
          ],
        });

      const result = healthCheckPackages
        .map((item) => ({
          packageId: item.Health_Check_Package.packageId,
          packageName: item.Health_Check_Package.packageName,
          image: item.Health_Check_Package.image,
          shortPackageInfo: item.Health_Check_Package.shortPackageInfo,
          slug: item.Health_Check_Package.slug,
          isDeleted: item.Health_Check_Package.isDeleted,
          bookingPackagesDetails:
            item.Health_Check_Package.BookingPackagesDetails?.map((detail) => ({
              bookingPackageId: detail.bookingPackageId,
              bookingPackageName: detail.BookingPackage?.name,
              price: detail.price,
              description: detail.description,
            })) || [],
          clinics:
            item.Health_Check_Package.ClinicBranches_HealthCheckPackages?.map(
              (clinic) => ({
                clinicBranchId: clinic.ClinicBranch?.clinicBranchId,
                clinicBranchName: clinic.ClinicBranch?.clinicBranchName,
                clinicBranchAddress: clinic.ClinicBranch?.clinicBranchAddress,
                clinicId: clinic.ClinicBranch?.clinicId,
                clinicName: clinic.ClinicBranch?.clinics?.name,
                clinicFullName: clinic.ClinicBranch?.clinics?.fullname,
                clinicAddress: clinic.ClinicBranch?.clinics?.address,
              })
            ) || [],
          schedules: healthCheckPackagesSchedules
            .filter((schedule) => schedule.packageId === item.packageId)
            .map((schedule) => ({
              packageScheduleId: schedule.packageScheduleId,
              scheduleId: schedule.scheduleId,
              scheduleDate: schedule.scheduleDate,
              scheduleTime: schedule.Schedule?.time,
              scheduleDayId: schedule.Schedule?.day?.id,
              scheduleDayName: schedule.Schedule?.day?.name,
            })),
          scheduleDates: Array.from(
            new Set(
              healthCheckPackagesSchedules
                .filter((schedule) => schedule.packageId === item.packageId)
                .map((schedule) => schedule.scheduleDate)
            )
          ),
        }))
        .filter((item) => item.schedules.length > 0);

      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getSpecificMedicalServiceBySlug = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const specificMedicalService = await db.SpecificMedicalServices.findOne({
        where: {
          slug: slug,
        },
      });
      resolve({
        status: 200,
        message: "OK",
        data: specificMedicalService,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllHealthCheckPackagesBySpecificMedicalServiceSlug = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const specificMedicalService = await getSpecificMedicalServiceBySlug(
        slug
      );

      if (!specificMedicalService.data)
        return resolve({
          status: 200,
          message: "OK",
          data: [],
        });

      const healthCheckPackages =
        await db.SpecificMedicalServices_HealthCheckPackages.findAll({
          attributes: ["packageId", "specificMedicalServiceId"],
          where: {
            specificMedicalServiceId: specificMedicalService.data.id,
          },
          include: [
            {
              model: db.Health_Check_Packages,
              attributes: [
                "packageId",
                "packageName",
                "image",
                "shortPackageInfo",
                "slug",
                "isDeleted",
              ],
              include: [
                {
                  model: db.BookingPackagesDetail,
                  attributes: ["bookingPackageId", "price", "description"],
                  include: [
                    {
                      model: db.BookingPackages,
                      attributes: ["id", "name"],
                    },
                  ],
                },
                {
                  model: db.ClinicBranches_HealthCheckPackages,
                  include: [
                    {
                      model: db.ClinicBranches,
                      attributes: [
                        "clinicBranchId",
                        "clinicBranchName",
                        "clinicBranchAddress",
                      ],
                      include: [
                        {
                          model: db.Clinics,
                          as: "clinics",
                          attributes: ["id", "fullname", "name", "address"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });

      const today = new Date();
      const formattedToday = today.toISOString().slice(0, 10); // "YYYY-MM-DD"

      const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const formattedWeekLater = weekLater.toISOString().slice(0, 10);

      const healthCheckPackagesSchedules =
        await db.HealthCheckPackage_Schedules.findAll({
          where: {
            packageId: healthCheckPackages.map((item) => item.packageId),
            scheduleDate: {
              [Op.between]: [formattedToday, formattedWeekLater],
            },
          },
          include: [
            {
              model: db.Schedules,
              attributes: ["id", "time", "dayId"],
              include: [
                {
                  model: db.Days,
                  as: "day",
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
          order: [
            ["packageId", "ASC"],
            ["scheduleDate", "ASC"],
            ["scheduleId", "ASC"],
          ],
        });

      const result = healthCheckPackages
        .map((item) => ({
          packageId: item.Health_Check_Package?.packageId,
          packageName: item.Health_Check_Package?.packageName,
          image: item.Health_Check_Package?.image,
          shortPackageInfo: item.Health_Check_Package?.shortPackageInfo,
          slug: item.Health_Check_Package?.slug,
          isDeleted: item.Health_Check_Package?.isDeleted,
          bookingPackagesDetails:
            item.Health_Check_Package?.BookingPackagesDetails.map((item) => ({
              bookingPackageId: item.bookingPackageId,
              bookingPackageName: item.BookingPackage.name,
              price: item.price,
              description: item.description,
            })),
          clinics:
            item.Health_Check_Package?.ClinicBranches_HealthCheckPackages.map(
              (item) => ({
                clinicBranchId: item.ClinicBranch.clinicBranchId,
                clinicBranchName: item.ClinicBranch.clinicBranchName,
                clinicBranchAddress: item.ClinicBranch.clinicBranchAddress,
                clinicId: item.ClinicBranch.clinicId,
                clinicName: item.ClinicBranch.clinics.name,
                clinicFullName: item.ClinicBranch.clinics.fullname,
                clinicAddress: item.ClinicBranch.clinics.address,
              })
            ),
          schedules: healthCheckPackagesSchedules
            .filter((schedule) => schedule.packageId === item.packageId)
            .map((item) => ({
              packageScheduleId: item.packageScheduleId,
              scheduleId: item.scheduleId,
              scheduleDate: item.scheduleDate,
              scheduleTime: item.Schedule.time,
              scheduleDayId: item.Schedule.day.id,
              scheduleDayName: item.Schedule.day.name,
            })),
          scheduleDates: Array.from(
            new Set(
              healthCheckPackagesSchedules
                .filter((schedule) => schedule.packageId === item.packageId)
                .map((item) => item.scheduleDate)
            )
          ),
        }))
        .filter((item) => item.schedules.length > 0);

      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const generateNewSlug = (delimiter, slugBase, latestItemSlug) => {
  const lastSuffix = latestItemSlug
    ? parseInt(latestItemSlug.split(delimiter)[1])
    : 0;
  const newSuffix = `${delimiter}${lastSuffix + 1}`;
  return `${slugBase}${newSuffix}`;
};

const createNewDoctor = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      // If there's a file, upload it to Cloudinary
      let imageUrl = null;
      if (payload.image) {
        try {
          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Doctor"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      const user = await db.Users.create({
        id: payload.userId,
        fullName: payload.fullName,
        birthDate: payload.birthDate,
        gender: payload.gender,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        address: payload.address,
        image: imageUrl,
        roleId: payload.role.roleCode,
        isDeleted: false,
      });

      const latestDoctor = await db.Doctors.findOne({
        order: [["doctorId", "DESC"]],
      });

      const doctor = await db.Doctors.create({
        doctorId: payload.doctorId,
        userId: payload.userId,
        doctorDetailInfo: payload.doctorDetailInfo,
        shortDoctorInfo: payload.shortDoctorInfo,
        slug: generateNewSlug(
          "-i",
          slugify(payload.fullName),
          latestDoctor?.slug
        ),
      });
      resolve({
        status: 200,
        message: "OK",
        data: {
          user,
          doctor,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateDoctor = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUser = await db.Users.findOne({
        where: {
          id: payload.userId,
        },
      });

      if (!currentUser) {
        return resolve({
          status: 404,
          message: "User not found",
        });
      }

      const currentDoctor = await db.Doctors.findOne({
        where: {
          doctorId: payload.doctorId,
          userId: payload.userId,
        },
      });

      if (!currentDoctor) {
        return resolve({
          status: 404,
          message: "Doctor not found",
        });
      }

      // If there's a file, upload it to Cloudinary
      let imageUrl = null;
      if (payload.image) {
        try {
          const old_avatar_public_id = currentUser.image
            .split("/")
            [currentUser.image.split("/").length - 1].split(".")[0];
          await destroy("BookingCare/Image/Doctor", old_avatar_public_id);

          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Doctor"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      const user = await db.Users.update(
        {
          fullName: payload.fullName,
          birthDate: payload.birthDate,
          gender: payload.gender,
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          address: payload.address,
          image: imageUrl || currentUser.image,
        },
        {
          where: {
            id: payload.userId,
          },
        }
      );

      const doctor = await db.Doctors.update(
        {
          doctorDetailInfo: payload.doctorDetailInfo,
          shortDoctorInfo: payload.shortDoctorInfo,
        },
        {
          where: {
            doctorId: payload.doctorId,
            userId: payload.userId,
          },
        }
      );
      resolve({
        status: 200,
        message: "OK",
        data: {
          user,
          doctor,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

const createNewSpecificMedicalService = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const latestSpecificMedicalService =
        await db.SpecificMedicalServices.findOne({
          order: [["id", "DESC"]],
        });

      // If there's a file, upload it to Cloudinary
      let imageUrl = null;
      if (payload.image) {
        try {
          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Specific-Medical-Service"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      const specificMedicalService = await db.SpecificMedicalServices.create({
        id: payload.id,
        name: payload.name,
        slug: generateNewSlug(
          "-s",
          slugify(payload.name),
          latestSpecificMedicalService?.slug
        ),
        description: payload.description,
        image: imageUrl,
        isDeleted: false,
      });

      const payloadMedicalServices = JSON.parse(payload.medicalServices);
      if (payloadMedicalServices.length > 0) {
        for (let i = 0; i < payloadMedicalServices.length; i++) {
          const medicalService = await db.MedicalServices.findOne({
            where: {
              id: payloadMedicalServices[i].value,
            },
          });
          if (!medicalService) {
            return resolve({
              status: 404,
              message: "Medical Service not found",
            });
          }
        }

        for (let i = 0; i < payloadMedicalServices.length; i++) {
          await db.SpecificMedicalService_MedicalServiceId.create({
            specificMedicalServiceId: specificMedicalService.id,
            medicalServiceId: payloadMedicalServices[i].value,
          });
        }
      }

      const payloadHealthCheckPackages = JSON.parse(payload.deployedPackages);
      if (payloadHealthCheckPackages.length > 0) {
        for (let i = 0; i < payloadHealthCheckPackages.length; i++) {
          const healthCheckPackage = await db.HealthCheckPackages.findOne({
            where: {
              id: payloadHealthCheckPackages[i].value,
            },
          });
          if (!healthCheckPackage) {
            return resolve({
              status: 404,
              message: "Health Check Package not found",
            });
          }
        }

        for (let i = 0; i < payloadHealthCheckPackages.length; i++) {
          await db.SpecificMedicalServices_HealthCheckPackages.create({
            specificMedicalServiceId: specificMedicalService.id,
            packageId: payloadHealthCheckPackages[i].value,
          });
        }
      }

      resolve({
        status: 200,
        message: "OK",
        data: specificMedicalService,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateSpecificMedicalService = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentService = await db.SpecificMedicalServices.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!currentService) {
        return resolve({
          status: 404,
          message: "Specific Medical Service not found",
        });
      }

      const payloadMedicalServices = JSON.parse(payload.medicalServices);
      const payloadHealthCheckPackages = JSON.parse(payload.deployedPackages);

      for (let i = 0; i < payloadMedicalServices.length; i++) {
        const medicalService = await db.MedicalServices.findOne({
          where: {
            id: payloadMedicalServices[i].value,
          },
        });
        if (!medicalService) {
          return resolve({
            status: 404,
            message: "Medical Service not found",
          });
        }
      }

      const currentMedicalServicesConnection =
        await db.SpecificMedicalService_MedicalServiceId.findAll({
          where: {
            specificMedicalServiceId: payload.id,
          },
        });
      if (currentMedicalServicesConnection.length > 0) {
        await db.SpecificMedicalService_MedicalServiceId.destroy({
          where: {
            specificMedicalServiceId: payload.id,
          },
        });
      }

      for (let i = 0; i < payloadMedicalServices.length; i++) {
        await db.SpecificMedicalService_MedicalServiceId.create({
          specificMedicalServiceId: payload.id,
          medicalServiceId: payloadMedicalServices[i].value,
        });
      }

      for (let i = 0; i < payloadHealthCheckPackages.length; i++) {
        const healthCheckPackage = await db.HealthCheckPackages.findOne({
          where: {
            id: payloadHealthCheckPackages[i].value,
          },
        });
        if (!healthCheckPackage) {
          return resolve({
            status: 404,
            message: "Health Check Package not found",
          });
        }
      }

      const currentHealthCheckPackagesConnection =
        await db.SpecificMedicalServices_HealthCheckPackages.findAll({
          where: {
            specificMedicalServiceId: payload.id,
          },
        });
      if (currentHealthCheckPackagesConnection.length > 0) {
        await db.SpecificMedicalServices_HealthCheckPackages.destroy({
          where: {
            specificMedicalServiceId: payload.id,
          },
        });
      }

      for (let i = 0; i < payloadHealthCheckPackages.length; i++) {
        await db.SpecificMedicalServices_HealthCheckPackages.create({
          specificMedicalServiceId: payload.id,
          packageId: payloadHealthCheckPackages[i].value,
        });
      }

      // If there's a file, upload it to Cloudinary
      let imageUrl = null;
      if (payload.image) {
        try {
          const old_avatar_public_id = currentService.image
            .split("/")
            [currentService.image.split("/").length - 1].split(".")[0];
          await destroy(
            "BookingCare/Image/Specific-Medical-Service",
            old_avatar_public_id
          );

          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Specific-Medical-Service"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      const service = await db.SpecificMedicalServices.update(
        {
          name: payload.name,
          slug: generateNewSlug(
            "-s",
            slugify(payload.name),
            currentService.slug
          ),
          description: payload.description,
          image: imageUrl || currentService.image,
        },
        {
          where: {
            id: payload.id,
          },
        }
      );

      resolve({
        status: 200,
        message: "OK",
        data: service,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const generateNewBookingPriceId = async () => {
  const latestBookingPrice = await db.BookingPackages.findOne({
    order: [["id", "DESC"]],
  });

  const parts = latestBookingPrice.id.split("BKP");
  const newId = `BKP${String(parseInt(parts[1]) + 1).padStart(3, "0")}`;
  return newId;
};

const createNewHealthCheckPackage = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const latestHealthCheckPackage = await db.Health_Check_Packages.findOne({
        order: [["packageId", "DESC"]],
      });

      // If there's a file, upload it to Cloudinary
      let imageUrl = null;
      if (payload.image) {
        try {
          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Health-Check-Package"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      const healthCheckPackage = await db.Health_Check_Packages.create({
        packageId: payload.packageId,
        packageName: payload.packageName,
        isManagedByDoctor: payload.isManagedByDoctor,
        managingDoctorId: payload.managingDoctorId,
        packageTypeId: payload.packageType.value,
        packageDetailInfo: payload.packageDetailInfo,
        shortPackageInfo: payload.shortPackageInfo,
        image: imageUrl,
        isDeleted: false,
        slug: generateNewSlug(
          "-i",
          slugify(payload.packageName),
          latestHealthCheckPackage?.slug
        ),
      });

      if (payload.isSpecialty) {
        if (payload.specialties.length > 0) {
          for (let i = 0; i < payload.specialties.length; i++) {
            const specialty = await db.Specialties.findOne({
              where: {
                id: payload.specialties[i].value,
              },
            });
            if (!specialty) {
              return resolve({
                status: 404,
                message: "Specialty not found",
              });
            }
          }

          for (let i = 0; i < payload.specialties.length; i++) {
            await db.HealthCheckPackages_Specialties.create({
              packageId: healthCheckPackage.packageId,
              specialtyId: payload.specialties[i].value,
            });
          }
        }
      } else {
        if (payload.services.length > 0) {
          for (let i = 0; i < payload.services.length; i++) {
            const medicalService = await db.SpecificMedicalServices.findOne({
              where: {
                id: payload.services[i].value,
              },
            });
            if (!medicalService) {
              return resolve({
                status: 404,
                message: "Medical Service not found",
              });
            }
          }

          for (let i = 0; i < payload.services.length; i++) {
            await db.SpecificMedicalServices_HealthCheckPackages.create({
              packageId: healthCheckPackage.packageId,
              specificMedicalServiceId: payload.services[i].value,
            });
          }
        }
      }

      if (payload.branches.length > 0) {
        for (let i = 0; i < payload.branches.length; i++) {
          const clinicBranch = await db.ClinicBranches.findOne({
            where: {
              clinicBranchId: payload.branches[i].value,
              clinicId: payload.clinic.value,
            },
          });
          if (!clinicBranch) {
            return resolve({
              status: 404,
              message: "Health Check Package not found",
            });
          }
        }

        for (let i = 0; i < payload.branches.length; i++) {
          await db.ClinicBranches_HealthCheckPackages.create({
            clinicBranchId: payload.branches[i].value,
            packageId: healthCheckPackage.packageId,
          });
        }
      }

      if (payload.packagePrices.length > 0) {
        const newPackagePrices = payload.packagePrices.filter(
          (price) => price.id === ""
        );
        const oldPackagePrices = payload.packagePrices.filter(
          (price) => price.id !== ""
        );

        const newPackagePricesId = await generateNewBookingPriceId();
        for (let i = 0; i < newPackagePrices.length; i++) {
          const parts = newPackagePricesId.split("BKP");
          const numberPart = parseInt(parts[1]) + i;
          newPackagePrices[i].id = `BKP${String(numberPart).padStart(3, "0")}`;

          await db.BookingPackages.create({
            id: newPackagePrices[i].id,
            name: newPackagePrices[i].name,
            description: newPackagePrices[i].description,
            isDeleted: false,
          });
        }

        const completedPackagePrices = [
          ...oldPackagePrices,
          ...newPackagePrices,
        ].sort((a, b) => a.id.localeCompare(b.id));

        for (let i = 0; i < completedPackagePrices.length; i++) {
          await db.BookingPackagesDetail.create({
            packageId: healthCheckPackage.packageId,
            bookingPackageId: completedPackagePrices[i].id,
            price: completedPackagePrices[i].price,
            description: completedPackagePrices[i].description,
          });
        }
      }

      resolve({
        status: 200,
        message: "OK",
        data: healthCheckPackage,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateHealthCheckPackage = (payload) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction();
    try {
      // 1. Input validation
      if (!payload.packageId) {
        await t.rollback();
        return resolve({
          status: 400,
          message: "Package ID is required",
        });
      }

      // 2. Check if package exists
      const currentHealthCheckPackage = await db.Health_Check_Packages.findOne({
        where: { packageId: payload.packageId },
        transaction: t, // Transaction is not needed here
      });

      if (!currentHealthCheckPackage) {
        await t.rollback();
        return resolve({
          status: 404,
          message: "Health check package not found",
        });
      }

      // 3. Validate specialties if isSpecialty is true
      if (payload.isSpecialty && payload.specialties?.length > 0) {
        const specialtyIds = payload.specialties.map((s) => s.value);
        const specialties = await db.Specialties.findAll({
          where: { id: specialtyIds },
          transaction: t, // Transaction is not needed here
        });

        if (specialties.length !== payload.specialties.length) {
          await t.rollback();
          return resolve({
            status: 404,
            message: "One or more specialties not found",
          });
        }
      }

      // 4. Validate services if isSpecialty is false
      if (!payload.isSpecialty && payload.services?.length > 0) {
        const serviceIds = payload.services.map((s) => s.value);
        const services = await db.SpecificMedicalServices.findAll({
          where: { id: serviceIds },
          transaction: t, // Transaction is not needed here
        });

        if (services.length !== payload.services.length) {
          await t.rollback();
          return resolve({
            status: 404,
            message: "One or more medical services not found",
          });
        }
      }

      // 5. Validate branches
      if (payload.branches?.length > 0) {
        const branchIds = payload.branches.map((b) => b.value);
        const branches = await db.ClinicBranches.findAll({
          where: {
            clinicBranchId: branchIds,
            clinicId: payload.clinic?.value,
          },
          transaction: t, // Transaction is not needed here
        });

        if (branches.length !== payload.branches.length) {
          await t.rollback();
          return resolve({
            status: 404,
            message:
              "One or more clinic branches not found or don't belong to the specified clinic",
          });
        }
      }

      // 6. Handle image upload if exists
      let imageUrl = currentHealthCheckPackage.image;
      if (payload.image) {
        try {
          const old_avatar_public_id = currentHealthCheckPackage.image
            .split("/")
            .pop()
            .split(".")[0];

          await destroy(
            "BookingCare/Image/Health-Check-Package",
            old_avatar_public_id
          );
          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Health-Check-Package"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          await t.rollback();
          console.error("Error uploading to Cloudinary:", uploadError);
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      // 7. Update health check package
      const [affectedCount, updatedRows] =
        await db.Health_Check_Packages.update(
          {
            packageName: payload.packageName,
            isManagedByDoctor: payload.isManagedByDoctor,
            managingDoctorId: payload.managingDoctorId,
            packageTypeId: payload.packageType?.value,
            packageDetailInfo: payload.packageDetailInfo,
            shortPackageInfo: payload.shortPackageInfo,
            image: imageUrl,
          },
          {
            where: { packageId: payload.packageId },
            returning: true,
            transaction: t,
          }
        );

      const updatedPackage = updatedRows[0]; // Get the first (and should be only) updated row

      // 8. Handle specialties or services
      // Always clean up both specialties and services to handle switching between them
      await Promise.all([
        db.HealthCheckPackages_Specialties.destroy({
          where: { packageId: payload.packageId },
          transaction: t,
        }),
        db.SpecificMedicalServices_HealthCheckPackages.destroy({
          where: { packageId: payload.packageId },
          transaction: t,
        }),
      ]);

      // Then handle creation based on the current type
      if (payload.isSpecialty && payload.specialties?.length > 0) {
        const specialtiesData = payload.specialties.map((specialty) => ({
          packageId: payload.packageId,
          specialtyId: specialty.value,
        }));
        console.log("specialtiesData: ", specialtiesData);
        await db.HealthCheckPackages_Specialties.bulkCreate(specialtiesData, {
          transaction: t,
        });
      } else if (!payload.isSpecialty && payload.services?.length > 0) {
        const servicesData = payload.services.map((service) => ({
          packageId: payload.packageId,
          specificMedicalServiceId: service.value,
        }));
        console.log("servicesData: ", servicesData);
        await db.SpecificMedicalServices_HealthCheckPackages.bulkCreate(
          servicesData,
          { transaction: t }
        );
      }

      // 9. Handle branches
      await db.ClinicBranches_HealthCheckPackages.destroy({
        where: { packageId: payload.packageId },
        transaction: t,
      });

      if (payload.branches?.length > 0) {
        const branchesData = payload.branches.map((branch) => ({
          clinicBranchId: branch.value,
          packageId: payload.packageId,
        }));
        await db.ClinicBranches_HealthCheckPackages.bulkCreate(branchesData, {
          transaction: t,
        });
      }

      // 10. Handle package prices
      await db.BookingPackagesDetail.destroy({
        where: { packageId: payload.packageId },
        transaction: t,
      });

      if (payload.packagePrices.length > 0) {
        const newPackagePrices = payload.packagePrices.filter(
          (price) => price.id === ""
        );
        const oldPackagePrices = payload.packagePrices.filter(
          (price) => price.id !== ""
        );

        const newPackagePricesId = await generateNewBookingPriceId();
        for (let i = 0; i < newPackagePrices.length; i++) {
          const parts = newPackagePricesId.split("BKP");
          const numberPart = parseInt(parts[1]) + i;
          newPackagePrices[i].id = `BKP${String(numberPart).padStart(3, "0")}`;
        }

        const newPackagePricesData = newPackagePrices.map((price) => ({
          id: price.id,
          price: price.price,
          description: price.description,
        }));

        await db.BookingPackages.bulkCreate(newPackagePricesData, {
          transaction: t,
        });

        const completedPackagePrices = [
          ...oldPackagePrices,
          ...newPackagePrices,
        ].sort((a, b) => a.id.localeCompare(b.id));

        await db.BookingPackagesDetail.bulkCreate(
          completedPackagePrices.map((price) => ({
            packageId: payload.packageId,
            bookingPackageId: price.id,
            price: price.price,
            description: price.description,
          })),
          { transaction: t }
        );
      }

      // Commit the transaction
      await t.commit();

      resolve({
        status: 200,
        message: "OK",
        data: updatedPackage,
      });
    } catch (error) {
      await t.rollback();
      reject(error);
    }
  });
};

const getAllBookingPrices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookingPrices = await db.BookingPackages.findAll({
        attributes: {
          exclude: ["isDeleted", "createdAt", "updatedAt"],
        },
        where: {
          isDeleted: false,
        },
        order: [["id", "ASC"]],
      });
      resolve({
        status: 200,
        message: "OK",
        data: bookingPrices,
      });
    } catch (error) {
      reject(error);
    }
  });
};

function extractBookingKeywords(fullText) {
  if (!fullText) {
    return [];
  }
  const lines = fullText.split("\n"); // Split the input into individual lines
  let inBookingSection = false;
  let foundSeparator = false;
  let keywords = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === "đặt lịch khám") {
      inBookingSection = true;
      continue; // Move to the next line to get the content
    }

    // Check for separator line after header
    if (inBookingSection && !foundSeparator) {
      if (/^[-]+$/.test(trimmedLine)) {
        foundSeparator = true;
      } else if (trimmedLine) {
        // Reset if non-dash content appears after header
        inBookingSection = false;
      }
      continue;
    }

    // Process token line after separator
    if (inBookingSection && foundSeparator && trimmedLine) {
      const regex = /\\\[\w+\\\](?:\s*\"\+\"\s*\\\[\w+\\\])*/;
      const matches = trimmedLine.match(regex) || [];
      for (const match of matches) {
        // Extract text inside brackets (without brackets)
        let parts = match.split(' "+" ');
        parts = parts.map((part) => {
          return part.replaceAll("\\", "");
        });
        keywords.push(...parts);
      }
      break; // Stop after first token line is processed
    }
  }

  return keywords; // Return null if no booking keywords are found
}

const createNewClinic = (payload) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction();
    try {
      if (!payload.id) {
        await t.rollback();
        return resolve({
          status: 400,
          message: "Clinic ID is required",
        });
      }

      if (!payload.branches || payload.branches.length === 0) {
        await t.rollback();
        return resolve({
          status: 400,
          message: "Branches is required",
        });
      }

      const clinicPackageTypes = extractBookingKeywords(payload.detailInfo);
      const packageTypes = await db.PackageType.findAll({
        where: {
          slug: clinicPackageTypes,
        },
      });

      if (packageTypes.length !== clinicPackageTypes.length) {
        await t.rollback();
        return resolve({
          status: 404,
          message: "Package types not found",
        });
      }

      const lastestClinic = await db.Clinics.findOne({
        order: [["id", "DESC"]],
      });

      // If there's a file, upload it to Cloudinary
      let imageUrl = null;
      if (payload.image) {
        try {
          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Clinic"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          await t.rollback();
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      const clinic = await db.Clinics.create(
        {
          id: payload.id,
          fullname: payload.fullName,
          name: payload.shortName,
          address: payload.address,
          clinicDetailInfo: payload.detailInfo,
          image: imageUrl,
          slug: generateNewSlug(
            "-p",
            slugify(payload.fullName),
            lastestClinic?.slug
          ),
          isDeleted: false,
        },
        { transaction: t }
      );

      await db.ClinicBranches.bulkCreate(
        payload.branches.map((branch) => ({
          clinicBranchId: branch.id,
          clinicBranchName: branch.name,
          clinicBranchAddress: branch.address,
          clinicId: payload.id,
          isDeleted: false,
        })),
        { transaction: t }
      );

      await db.Clinics_PackageTypes.bulkCreate(
        packageTypes.map((packageType) => ({
          clinicId: payload.id,
          packageTypeId: packageType.id,
        })),
        { transaction: t }
      );

      await t.commit();

      resolve({
        status: 200,
        message: "OK",
        data: clinic,
      });
    } catch (err) {
      await t.rollback();
      reject(err);
    }
  });
};

const updateClinic = (payload) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction();
    try {
      if (!payload.id) {
        await t.rollback();
        return resolve({
          status: 400,
          message: "Clinic ID is required",
        });
      }

      const clinicPackageTypes = extractBookingKeywords(payload.detailInfo);
      const packageTypes = await db.PackageType.findAll({
        where: {
          slug: clinicPackageTypes,
        },
      });

      if (packageTypes.length !== clinicPackageTypes.length) {
        await t.rollback();
        return resolve({
          status: 404,
          message: "Package types not found",
        });
      }

      if (!payload.branches || payload.branches.length === 0) {
        await t.rollback();
        return resolve({
          status: 400,
          message: "Branches is required",
        });
      }

      const currentClinic = await db.Clinics.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!currentClinic) {
        await t.rollback();
        return resolve({
          status: 404,
          message: "Clinic not found",
        });
      }

      let imageUrl = currentClinic.image;
      if (payload.image) {
        try {
          const old_avatar_public_id = currentClinic.image
            .split("/")
            .pop()
            .split(".")[0];

          await destroy("BookingCare/Image/Clinic", old_avatar_public_id);
          const result = await uploadToCloudinary(
            payload.image,
            "BookingCare/Image/Clinic"
          );
          imageUrl = result.secure_url;
        } catch (uploadError) {
          await t.rollback();
          console.error("Error uploading to Cloudinary:", uploadError);
          return resolve({
            status: 500,
            message: "Error uploading image",
            error: uploadError.message,
          });
        }
      }

      const clinic = await db.Clinics.update(
        {
          fullname: payload.fullName,
          name: payload.shortName,
          address: payload.address,
          clinicDetailInfo: payload.detailInfo,
          image: imageUrl,
        },
        {
          where: {
            id: payload.id,
          },
          transaction: t,
        }
      );

      await db.ClinicBranches.destroy({
        where: {
          clinicId: payload.id,
        },
        transaction: t,
      });

      await db.ClinicBranches.bulkCreate(
        payload.branches.map((branch) => ({
          clinicBranchId: branch.id,
          clinicBranchName: branch.name,
          clinicBranchAddress: branch.address,
          clinicId: payload.id,
          isDeleted: false,
        })),
        { transaction: t }
      );

      await db.Clinics_PackageTypes.destroy({
        where: {
          clinicId: payload.id,
        },
        transaction: t,
      });

      await db.Clinics_PackageTypes.bulkCreate(
        packageTypes.map((packageType) => ({
          clinicId: payload.id,
          packageTypeId: packageType.id,
        })),
        { transaction: t }
      );

      await t.commit();

      resolve({
        status: 200,
        message: "OK",
        data: clinic,
      });
    } catch (error) {
      await t.rollback();
      reject(error);
    }
  });
};

const getAllHealthCheckPackagesNotCurrentlyHaveSchedule = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const healthCheckPackagesCurrentlyHaveSchedule =
        await db.HealthCheckPackage_Schedules.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          where: {
            scheduleDate: {
              [Op.between]: [getWeekRange().monday, getWeekRange().sunday],
            },
          },
          order: [["scheduleDate", "ASC"]],
          include: [
            {
              model: db.Schedules,
              attributes: ["id", "time"],
            },
          ],
        });

      const healthCheckPackagesNotCurrentlyHaveSchedule =
        await db.Health_Check_Packages.findAll({
          attributes: {
            exclude: [
              "packageDetailInfo",
              "shortPackageInfo",
              "createdAt",
              "updatedAt",
            ],
          },
          where: {
            packageId: {
              [Op.notIn]: healthCheckPackagesCurrentlyHaveSchedule.map(
                (schedule) => schedule.packageId
              ),
            },
            isDeleted: false,
          },
          order: [["packageId", "ASC"]],
          include: [
            {
              model: db.PackageType,
              attributes: ["id", "name"],
            },
            {
              model: db.ClinicBranches_HealthCheckPackages,
              attributes: ["clinicBranchId", "packageId"],
              include: [
                {
                  model: db.ClinicBranches,
                  attributes: [
                    "clinicBranchId",
                    "clinicBranchName",
                    "clinicBranchAddress",
                    "clinicId",
                  ],
                  include: [
                    {
                      model: db.Clinics,
                      as: "clinics",
                      attributes: ["id", "name", "fullname"],
                    },
                  ],
                },
              ],
            },
          ],
        });

      const formattedData = healthCheckPackagesNotCurrentlyHaveSchedule.map(
        (item) => {
          return {
            packageId: item.packageId,
            packageName: item.packageName,
            packageTypeId: item.PackageType.id,
            packageTypeName: item.PackageType.name,
            image: item.image,
            slug: item.slug,
            clinic: {
              id: item.ClinicBranches_HealthCheckPackages[0].ClinicBranch
                .clinics.id,
              name: item.ClinicBranches_HealthCheckPackages[0].ClinicBranch
                .clinics.name,
              fullname:
                item.ClinicBranches_HealthCheckPackages[0].ClinicBranch.clinics
                  .fullname,
            },
            clinicBranches: item.ClinicBranches_HealthCheckPackages.map(
              (branch) => {
                return {
                  clinicBranchId: branch.ClinicBranch.clinicBranchId,
                  clinicBranchName: branch.ClinicBranch.clinicBranchName,
                  clinicBranchAddress: branch.ClinicBranch.clinicBranchAddress,
                  clinicId: branch.ClinicBranch.clinicId,
                };
              }
            ),
          };
        }
      );
      resolve({
        status: 200,
        message: "OK",
        data: formattedData,
      });
    } catch (error) {
      reject(error);
    }
  });
};

function getWeekRange(date = new Date()) {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Monday)

  // Calculate days to subtract to get to Monday
  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() + daysToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Format dates as YYYY-MM-DD
  const format = (d) => d.toISOString().split("T")[0];

  return {
    monday: format(monday),
    sunday: format(sunday),
    mondayDate: monday,
    sundayDate: sunday,
  };
}

const getHealthCheckPackageCurrentScheduleByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const weekRange = getWeekRange();
      const healthCheckPackageCurrentSchedule =
        await db.HealthCheckPackage_Schedules.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          where: {
            packageId: id,
            scheduleDate: {
              [Op.between]: [weekRange.monday, weekRange.sunday],
            },
          },
          order: [["scheduleDate", "ASC"]],
          include: [
            {
              model: db.Schedules,
              attributes: ["id", "time"],
            },
          ],
        });
      resolve({
        status: 200,
        message: "OK",
        data: healthCheckPackageCurrentSchedule,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createNewHealthCheckPackageSchedule = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const healthCheckPackageSchedule =
        await db.HealthCheckPackage_Schedules.bulkCreate(
          payload.schedules.map((schedule) => {
            // Build the raw SQL expression
            const packageIdPart = payload.packageId.substring(5, 8); // Get characters 6-8 (0-based index 5-7)
            const scheduleIdPart = schedule.id
              .substring(6, 12)
              .replace("_", ""); // Get characters 7-12 and remove underscores
            const datePart = schedule.scheduleDate.replace(/-/g, ""); // Remove all hyphens from date
            const concatString = `${packageIdPart}${scheduleIdPart}${datePart}`;

            return {
              packageScheduleId: db.sequelize.literal(
                `LEFT(SHA2('${concatString}', 256), 16)`
              ),
              packageId: payload.packageId,
              scheduleId: schedule.id,
              scheduleDate: schedule.scheduleDate,
            };
          }),
          {
            // Add this option to return the generated IDs
            returning: true,
          }
        );

      // Invalidate cache after successful transaction
      try {
        await redis.invalidateHealthPackagesCache();
      } catch (cacheError) {
        console.error("Cache invalidation failed:", cacheError);
        // Don't fail the operation if cache invalidation fails
      }

      resolve({
        status: 200,
        message: "OK",
        data: healthCheckPackageSchedule,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllHealthCheckPackagesWithTheseSchedules = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const weekRange = getWeekRange();

      // Generate cache key
      const cacheKey = redis.generateHealthPackagesKey(weekRange);

      // Try to get data from cache first
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log("Serving health packages from cache");
        return resolve({
          status: 200,
          message: "OK",
          data: cachedData,
        });
      }

      const healthCheckPackages = await db.Health_Check_Packages.findAll({
        attributes: {
          exclude: [
            "isManagedByDoctor",
            "managingDoctorId",
            "packageTypeId",
            "packageDetailInfo",
            "shortPackageInfo",
            "isDeleted",
            "createdAt",
            "updatedAt",
          ],
        },
        where: {
          isDeleted: false,
          "$HealthCheckPackage_Schedules.scheduleDate$": {
            [Op.between]: [weekRange.monday, weekRange.sunday],
          },
        },
        order: [["packageId", "ASC"]],
        include: [
          {
            model: db.PackageType,
            attributes: ["id", "name"],
          },
          {
            model: db.ClinicBranches_HealthCheckPackages,
            attributes: ["clinicBranchId", "packageId"],
            include: [
              {
                model: db.ClinicBranches,
                attributes: [
                  "clinicBranchId",
                  "clinicBranchName",
                  "clinicBranchAddress",
                  "clinicId",
                ],
                include: [
                  {
                    model: db.Clinics,
                    as: "clinics",
                    attributes: ["id", "name", "fullname"],
                  },
                ],
              },
            ],
          },
          {
            model: db.HealthCheckPackage_Schedules,
            attributes: ["scheduleDate", "scheduleId"],
            include: [
              {
                model: db.Schedules,
                attributes: ["id", "time"],
                include: [
                  {
                    model: db.Days,
                    as: "day",
                    attributes: ["id", "name"],
                  },
                ],
              },
            ],
          },
        ],
      });

      const formattedData = healthCheckPackages.map((item) => {
        return {
          packageId: item.packageId,
          packageName: item.packageName,
          packageTypeId: item.PackageType.id,
          packageTypeName: item.PackageType.name,
          image: item.image,
          slug: item.slug,
          clinic: {
            id: item.ClinicBranches_HealthCheckPackages[0].ClinicBranch.clinics
              .id,
            name: item.ClinicBranches_HealthCheckPackages[0].ClinicBranch
              .clinics.name,
            fullname:
              item.ClinicBranches_HealthCheckPackages[0].ClinicBranch.clinics
                .fullname,
          },
          clinicBranches: item.ClinicBranches_HealthCheckPackages.map(
            (branch) => {
              return {
                clinicBranchId: branch.ClinicBranch.clinicBranchId,
                clinicBranchName: branch.ClinicBranch.clinicBranchName,
                clinicBranchAddress: branch.ClinicBranch.clinicBranchAddress,
                clinicId: branch.ClinicBranch.clinicId,
              };
            }
          ),
          schedule: item.HealthCheckPackage_Schedules.map((item) => ({
            id: item.Schedule?.id,
            time: item.Schedule?.time,
            scheduleDate: item.scheduleDate,
            day: item.Schedule?.day.id,
            isTicked: true,
          })),
        };
      });

      // Cache the results for 1 hour (3600 seconds)
      await redis.set(cacheKey, formattedData, 3600);

      resolve({
        status: 200,
        message: "OK",
        data: formattedData,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateHealthCheckPackageSchedule = (payload) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction({
      timeout: 10000, // 10 seconds
    });
    try {
      const currentSchedule = await db.HealthCheckPackage_Schedules.findOne({
        where: {
          packageId: payload.packageId,
        },
      });

      if (currentSchedule) {
        await db.HealthCheckPackage_Schedules.destroy({
          where: {
            packageId: payload.packageId,
          },
          transaction: t,
        });
      }

      // Prepare the data for bulk insert
      const schedulesToCreate = payload.schedules.map((schedule) => {
        const packageIdPart = payload.packageId.substring(5, 8);
        const scheduleIdPart = schedule.id.substring(6, 12).replace("_", "");
        const datePart = schedule.scheduleDate.replace(/-/g, "");
        const concatString = `${packageIdPart}${scheduleIdPart}${datePart}`;

        return {
          packageScheduleId: db.sequelize.fn(
            "LEFT",
            db.sequelize.fn("SHA2", concatString, 256),
            16
          ),
          packageId: payload.packageId,
          scheduleId: schedule.id,
          scheduleDate: schedule.scheduleDate,
        };
      });

      // Perform the bulk insert with proper transaction handling
      const result = await db.HealthCheckPackage_Schedules.bulkCreate(
        schedulesToCreate,
        {
          transaction: t,
          returning: true,
        }
      );

      // Commit the transaction
      await t.commit();

      // Invalidate cache after successful transaction
      try {
        await redis.invalidateHealthPackagesCache();
      } catch (cacheError) {
        console.error("Cache invalidation failed:", cacheError);
        // Don't fail the operation if cache invalidation fails
      }

      resolve({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      await t.rollback();
      reject(err);
    }
  });
};

const getWeeklyHealthCheckPackageSchedulesByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Input validation
      if (!id) {
        return resolve({
          status: 400,
          message: "Package ID is required",
          data: null,
        });
      }

      const weekRange = getWeekRange();

      // Optimized query - only get schedules
      const healthCheckPackageSchedules =
        await db.HealthCheckPackage_Schedules.findAll({
          attributes: ["packageScheduleId", "scheduleDate", "scheduleId"],
          where: {
            packageId: id,
            scheduleDate: {
              [Op.between]: [weekRange.monday, weekRange.sunday],
            },
          },
          include: [
            {
              model: db.Schedules,
              attributes: ["id", "time"],
              include: [
                {
                  model: db.Days,
                  as: "day",
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
          order: [
            ["scheduleDate", "ASC"],
            ["scheduleId", "ASC"],
          ],
        });

      // Early return if no schedules found
      if (
        !healthCheckPackageSchedules ||
        healthCheckPackageSchedules.length === 0
      ) {
        return resolve({
          status: 200,
          message: "No schedules found for this package in the current week",
          data: [],
        });
      }

      // Format only schedule data
      const formattedSchedules = healthCheckPackageSchedules.map(
        (schedule) => ({
          packageScheduleId: schedule.packageScheduleId,
          scheduleId: schedule.scheduleId,
          scheduleDate: schedule.scheduleDate,
          time: schedule.Schedule?.time,
          dayId: schedule.Schedule?.day?.id,
          dayName: schedule.Schedule?.day?.name,
          isTicked: true,
        })
      );

      resolve({
        status: 200,
        message: "OK",
        data: {
          packageId: id,
          schedules: formattedSchedules,
          weekRange: {
            monday: weekRange.monday,
            sunday: weekRange.sunday,
          },
        },
      });
    } catch (err) {
      console.error("Error in getWeeklyHealthCheckPackageSchedulesByID:", err);
      reject(err);
    }
  });
};

export default {
  generateNewBookingPriceId,
  getAllCategories,
  getAllMedicalServices,
  getAllSpecialties,
  getAllClinics,
  getClinicBySlug,
  getAllSpecificMedicalServices,
  getAllSpecificMedicalServicesBySlug,
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
  getAllDataByPackageType,
  getHealthCheckPackageScheduleDatesInWeek,
  getHealthCheckPackageSchedules,
  getHealthCheckPackageSchedulesByDate,
  getDoctorBySlug,
  getAllPackageTypes,
  getHealthCheckPackageBookingTypes,
  getBookingScheduleByDoctorScheduleID,
  postSubmitBooking,
  getAllBookingOrders,
  getAllPatients,
  getAllDoctors,
  getAllRoles,
  getUserIsDoctorByID,
  getUserIsPatientByID,
  getMedicalHealthCheckPackageByID,
  getSpecificMedicalServiceByID,
  getAllUndeployPackages,
  getMedicalServicesByID,
  getClinicByID,
  getHealthCheckPackageBySlug,
  getBookingDetailsByDoctorScheduleID,
  getLatestHealthCheckPackage,
  getClinicBranchesByClinicId,
  getLatestSpecificMedicalService,
  getLatestDoctor,
  getLatestPatient,
  getLatestClinic,
  getSpecialtyByID,
  getSpecialtyBySlug,
  getAllHealthCheckPackagesBySpecialtySlug,
  getSpecificMedicalServiceBySlug,
  getAllHealthCheckPackagesBySpecificMedicalServiceSlug,
  createNewDoctor,
  updateDoctor,
  createNewSpecificMedicalService,
  updateSpecificMedicalService,
  createNewHealthCheckPackage,
  updateHealthCheckPackage,
  getAllBookingPrices,
  createNewClinic,
  updateClinic,
  getAllHealthCheckPackagesNotCurrentlyHaveSchedule,
  getHealthCheckPackageCurrentScheduleByID,
  createNewHealthCheckPackageSchedule,
  updateHealthCheckPackageSchedule,
  getAllHealthCheckPackagesWithTheseSchedules,
  getWeeklyHealthCheckPackageSchedulesByID,
};

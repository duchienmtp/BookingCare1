import db from "../../models/index.js";

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

export default {
  getAllCategories,
  getAllMedicalServices,
  getAllSpecialties,
  getAllClinics,
};

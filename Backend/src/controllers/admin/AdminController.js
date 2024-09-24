import SiteServices from "../../services/admin/SiteServices.mjs";

const getAllCategories = async (req, res) => {
  try {
    let categories = await SiteServices.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error in AdminController.getAllCategories: ", error);
  }
};

const getAllMedicalServices = async (req, res) => {
  try {
    let medicalServices = await SiteServices.getAllMedicalServices();
    return res.status(200).json(medicalServices);
  } catch (error) {
    console.error("Error in AdminController.getAllMedicalServices: ", error);
  }
};

const getAllSpecialties = async (req, res) => {
  try {
    let specialties = await SiteServices.getAllSpecialties();
    return res.status(200).json(specialties);
  } catch (error) {
    console.error("Error in AdminController.getAllSpecialties: ", error);
  }
};

const getAllClinics = async (req, res) => {
  try {
    let clinics = await SiteServices.getAllClinics();
    return res.status(200).json(clinics);
  } catch (error) {
    console.error("Error in AdminController.getAllClinics: ", error);
  }
};

export default {
  getAllCategories,
  getAllMedicalServices,
  getAllSpecialties,
  getAllClinics,
};

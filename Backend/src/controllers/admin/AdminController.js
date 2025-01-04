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

const getClinicBySlug = async (req, res) => {
  try {
    const clinicSlug = req.params.slug;
    const clinic = await SiteServices.getClinicBySlug(clinicSlug);
    return res.status(200).json(clinic);
  } catch (error) {
    console.error("Error in AdminController.getClinicBySlug: ", error);
  }
};

const getAllSpecificMedicalServices = async (req, res) => {
  try {
    let specificMedicalServices =
      await SiteServices.getAllSpecificMedicalServices();
    return res.status(200).json(specificMedicalServices);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllSpecificMedicalServices: ",
      error
    );
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let blogs = await SiteServices.getAllBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Error in AdminController.getAllBlogs: ", error);
  }
};

const getAllGuides = async (req, res) => {
  try {
    const blogsUploadedTo = await SiteServices.getAllBlogUploadedTo();
    let blogUploadedToId = blogsUploadedTo.data.filter(
      (item) => item.name === "Cẩm nang"
    )[0].id;
    let guides = await SiteServices.getAllBlogsByUploadedTo(blogUploadedToId);
    // let guides = await SiteServices.getAllGuides();
    return res.status(200).json(guides);
  } catch (error) {
    console.error("Error in AdminController.getAllGuides: ", error);
  }
};

const getAllLivingHealthyBlogPost = async (req, res) => {
  try {
    const blogsUploadedTo = await SiteServices.getAllBlogUploadedTo();
    let blogUploadedToId = blogsUploadedTo.data.filter(
      (item) => item.name === "Sống khỏe suốt đời"
    )[0].id;
    let livingHealthyBlogPost = await SiteServices.getAllBlogsByUploadedTo(
      blogUploadedToId
    );
    // let livingHealthyBlogPost =
    //   await SiteServices.getAllLivingHealthyBlogPost();
    return res.status(200).json(livingHealthyBlogPost);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllLivingHealthyBlogPost: ",
      error
    );
  }
};

const getAllForDoctorAndHealthFacilityBlogPost = async (req, res) => {
  try {
    const blogsUploadedTo = await SiteServices.getAllBlogUploadedTo();
    let blogUploadedToId = blogsUploadedTo.data.filter(
      (item) => item.name === "Dành cho bác sĩ và cơ sở y tế"
    )[0].id;
    let forDoctorAndHealthFacilityBlogPost =
      await SiteServices.getAllBlogsByUploadedTo(blogUploadedToId);
    // let forDoctorAndHealthFacilityBlogPost =
    //   await SiteServices.getAllForDoctorAndHealthFacilityBlogPost();
    return res.status(200).json(forDoctorAndHealthFacilityBlogPost);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllForDoctorAndHealthFacilityBlogPost: ",
      error
    );
  }
};

const getAllBlogUploadedTo = async (req, res) => {
  try {
    let blogUploadedTo = await SiteServices.getAllBlogUploadedTo();
    return res.status(200).json(blogUploadedTo);
  } catch (error) {
    console.error("Error in AdminController.getAllBlogUploadedTo: ", error);
  }
};

const getAllPackages = async (req, res) => {
  try {
    let packages = await SiteServices.getAllPackages();
    return res.status(200).json(packages);
  } catch (error) {
    console.error("Error in AdminController.getAllPackages: ", error);
  }
};

const getAllEndoscopicSurgeryPackages = async (req, res) => {
  try {
    const packageTypes = await SiteServices.getAllPackageTypes();
    let packageTypeId = packageTypes.data.filter(
      (item) => item.name === "Nội soi"
    )[0].id;
    let endoscopicSurgeryPackages = await SiteServices.getAllDataByPackageType([
      packageTypeId,
    ]);
    // let endoscopicSurgeryPackages =
    //   await SiteServices.getAllEndoscopicSurgeryPackages();
    return res.status(200).json(endoscopicSurgeryPackages);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllEndoscopicSurgeryPackages: ",
      error
    );
  }
};

const getAllMedicalImagingDiagnosticPackages = async (req, res) => {
  try {
    const packageTypes = await SiteServices.getAllPackageTypes();
    let packageTypeId = packageTypes.data.filter(
      (item) => item.name === "Chụp chiếu"
    )[0].id;
    let medicalImagingDiagnosticPackages =
      await SiteServices.getAllDataByPackageType([packageTypeId]);
    // let medicalImagingDiagnosticPackages =
    //   await SiteServices.getAllMedicalImagingDiagnosticPackages();
    return res.status(200).json(medicalImagingDiagnosticPackages);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllMedicalImagingDiagnosticPackages: ",
      error
    );
  }
};

const getAllMedicalExaminationPackages = async (req, res) => {
  try {
    const packageTypes = await SiteServices.getAllPackageTypes();
    let packageTypeId = packageTypes.data.filter(
      (item) => item.name === "Xét nghiệm"
    )[0].id;
    let medicalExaminationPackages = await SiteServices.getAllDataByPackageType(
      [packageTypeId]
    );
    // let medicalExaminationPackages =
    //   await SiteServices.getAllMedicalExaminationPackages();
    return res.status(200).json(medicalExaminationPackages);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllMedicalExaminationPackages: ",
      error
    );
  }
};

const getAllOperationPackages = async (req, res) => {
  try {
    const packageTypes = await SiteServices.getAllPackageTypes();
    let packageTypeId = packageTypes.data.filter(
      (item) => item.name === "Phẫu thuật"
    )[0].id;
    let operationPackages = await SiteServices.getAllDataByPackageType([
      packageTypeId,
    ]);
    // let operationPackages = await SiteServices.getAllOperationPackages();
    return res.status(200).json(operationPackages);
  } catch (error) {
    console.error("Error in AdminController.getAllOperationPackages: ", error);
  }
};

const getAllDiagnosticPackages = async (req, res) => {
  try {
    const packageTypes = await SiteServices.getAllPackageTypes();
    let packageTypeId = packageTypes.data
      .filter((item) => item.name === "Tổng quát" || item.name === "Khác")
      .map((item) => item.id);
    let diagnosticPackages = await SiteServices.getAllDataByPackageType(
      packageTypeId
    );
    // let diagnosticPackages = await SiteServices.getAllDiagnosticPackages();
    return res.status(200).json(diagnosticPackages);
  } catch (error) {
    console.error("Error in AdminController.getAllDiagnosticPackages: ", error);
  }
};

const getDoctorScheduleDatesInWeek = async (req, res) => {
  try {
    const doctorSlug = req.params.slug;
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    const formattedOneWeekLater = oneWeekLater.toISOString().split("T")[0];

    const doctorScheduleDates = await SiteServices.getDoctorScheduleDatesInWeek(
      doctorSlug,
      formattedToday,
      formattedOneWeekLater
    );

    return res.status(200).json(doctorScheduleDates);
  } catch (error) {
    console.error("Error in getDoctorScheduleDatesInWeekSSE: ", error);
    res.status(500).end();
  }
};

const getDoctorSchedules = async (req, res) => {
  try {
    const doctorSlug = req.params.slug;
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    const formattedOneWeekLater = oneWeekLater.toISOString().split("T")[0];

    const doctorSchedules = await SiteServices.getDoctorSchedules(
      doctorSlug,
      formattedToday,
      formattedOneWeekLater
    );

    return res.status(200).json(doctorSchedules);
  } catch (error) {
    console.error("Error in getDoctorSchedulesSSE: ", error);
    res.status(500).end();
  }
};

const getDoctorBySlug = async (req, res) => {
  try {
    const doctorSlug = req.params.slug;
    const doctor = await SiteServices.getDoctorBySlug(doctorSlug);
    return res.status(200).json(doctor);
  } catch (error) {
    console.error("Error in AdminController.getDoctorBySlug: ", error);
  }
};

const getAllClinicBookingTypes = async (req, res) => {
  try {
    let clinicBookingTypes = await SiteServices.getAllClinicBookingTypes();
    return res.status(200).json(clinicBookingTypes);
  } catch (error) {
    console.error("Error in AdminController.getAllClinicBookingTypes: ", error);
  }
}

export default {
  getAllCategories,
  getAllMedicalServices,
  getAllSpecialties,
  getAllClinics,
  getClinicBySlug,
  getAllSpecificMedicalServices,
  getAllBlogs,
  getAllGuides,
  getAllLivingHealthyBlogPost,
  getAllForDoctorAndHealthFacilityBlogPost,
  getAllBlogUploadedTo,
  getAllPackages,
  getAllEndoscopicSurgeryPackages,
  getAllMedicalImagingDiagnosticPackages,
  getAllOperationPackages,
  getAllMedicalExaminationPackages,
  getAllDiagnosticPackages,
  getDoctorScheduleDatesInWeek,
  getDoctorSchedules,
  getDoctorBySlug,
  getAllClinicBookingTypes,
};

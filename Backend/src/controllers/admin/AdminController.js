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

const getAllSpecificMedicalServicesBySlug = async (req, res) => {
  try {
    const specificMedicalServiceSlug = req.params.slug;
    const specificMedicalService =
      await SiteServices.getAllSpecificMedicalServicesBySlug(
        specificMedicalServiceSlug
      );
    return res.status(200).json(specificMedicalService);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllSpecificMedicalServicesBySlug: ",
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

const getHealthCheckPackageScheduleDatesInWeek = async (req, res) => {
  try {
    const packageSlug = req.params.slug;
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    const formattedOneWeekLater = oneWeekLater.toISOString().split("T")[0];

    const doctorScheduleDates =
      await SiteServices.getHealthCheckPackageScheduleDatesInWeek(
        packageSlug,
        formattedToday,
        formattedOneWeekLater
      );

    return res.status(200).json(doctorScheduleDates);
  } catch (error) {
    console.error("Error in getHealthCheckPackageScheduleDatesInWeek: ", error);
    res.status(500).end();
  }
};

const getHealthCheckPackageSchedules = async (req, res) => {
  try {
    const packageSlug = req.params.slug;
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    const formattedOneWeekLater = oneWeekLater.toISOString().split("T")[0];

    const packageSchedules = await SiteServices.getHealthCheckPackageSchedules(
      packageSlug,
      formattedToday,
      formattedOneWeekLater
    );

    return res.status(200).json(packageSchedules);
  } catch (error) {
    console.error("Error in getHealthCheckPackageSchedules: ", error);
    res.status(500).end();
  }
};

const getHealthCheckPackageSchedulesByDate = async (req, res) => {
  try {
    const { slug, date } = req.params;
    const packageSchedules =
      await SiteServices.getHealthCheckPackageSchedulesByDate(slug, date);
    return res.status(200).json(packageSchedules);
  } catch (error) {
    console.error("Error in getHealthCheckPackageSchedulesByDate: ", error);
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

const getHealthCheckPackageBookingTypes = async (req, res) => {
  try {
    const doctorSlug = req.params.slug;
    let doctorBookingTypes =
      await SiteServices.getHealthCheckPackageBookingTypes(doctorSlug);
    return res.status(200).json(doctorBookingTypes);
  } catch (error) {
    console.error(
      "Error in AdminController.getHealthCheckPackageBookingTypes: ",
      error
    );
  }
};

const getBookingScheduleByDoctorScheduleID = async (req, res) => {
  try {
    const doctorScheduleID = req.params.slug;
    let bookingSchedule =
      await SiteServices.getBookingScheduleByDoctorScheduleID(doctorScheduleID);
    return res.status(200).json(bookingSchedule);
  } catch (error) {
    console.error(
      "Error in AdminController.getBookingScheduleByDoctorScheduleID: ",
      error
    );
  }
};

const postSubmitBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    console.log("bookingData: ", bookingData);
    let response = await SiteServices.postSubmitBooking(bookingData);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in AdminController.postSubmitBooking: ", error);
  }
};

const getAllBookingOrders = async (req, res) => {
  try {
    let bookingOrders = await SiteServices.getAllBookingOrders();
    return res.status(200).json(bookingOrders);
  } catch (error) {
    console.error("Error in AdminController.getAllBookingOrders: ", error);
  }
};

const getAllPatients = async (req, res) => {
  try {
    let patients = await SiteServices.getAllPatients();
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error in AdminController.getAllPatients: ", error);
  }
};

const getAllDoctors = async (req, res) => {
  try {
    let doctors = await SiteServices.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error in AdminController.getAllDoctors: ", error);
  }
};

const getAllRoles = async (req, res) => {
  try {
    let roles = await SiteServices.getAllRoles();
    return res.status(200).json(roles);
  } catch (error) {
    console.error("Error in AdminController.getAllRoles: ", error);
  }
};

const getUserIsDoctorByID = async (req, res) => {
  try {
    let user = await SiteServices.getUserIsDoctorByID(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in AdminController.getUserByID: ", error);
  }
};

const getUserIsPatientByID = async (req, res) => {
  try {
    let patient = await SiteServices.getUserIsPatientByID(req.params.id);
    return res.status(200).json(patient);
  } catch (error) {
    console.error("Error in AdminController.getUserByID: ", error);
  }
};

const getMedicalHealthCheckPackageByID = async (req, res) => {
  try {
    let medicalHealthCheckPackage =
      await SiteServices.getMedicalHealthCheckPackageByID(req.params.id);
    return res.status(200).json(medicalHealthCheckPackage);
  } catch (error) {
    console.error(
      "Error in AdminController.getMedicalHealthCheckPackageByID: ",
      error
    );
  }
};

const getSpecificMedicalServiceByID = async (req, res) => {
  try {
    let specificMedicalService =
      await SiteServices.getSpecificMedicalServiceByID(req.params.id);
    return res.status(200).json(specificMedicalService);
  } catch (error) {
    console.error(
      "Error in AdminController.getSpecificMedicalServiceByID: ",
      error
    );
  }
};

const getAllPackageTypes = async (req, res) => {
  try {
    let packageTypes = await SiteServices.getAllPackageTypes();
    return res.status(200).json(packageTypes);
  } catch (error) {
    console.error("Error in AdminController.getAllPackageTypes: ", error);
  }
};

const getAllUndeployPackages = async (req, res) => {
  try {
    let undeployPackages = await SiteServices.getAllUndeployPackages();
    return res.status(200).json(undeployPackages);
  } catch (error) {
    console.error("Error in AdminController.getAllUndeployPackages: ", error);
  }
};

const getMedicalServicesByID = async (req, res) => {
  try {
    let medicalServices = await SiteServices.getMedicalServicesByID(
      req.params.id
    );
    return res.status(200).json(medicalServices);
  } catch (error) {
    console.error("Error in AdminController.getMedicalServicesByID: ", error);
  }
};

const getClinicByID = async (req, res) => {
  try {
    let clinic = await SiteServices.getClinicByID(req.params.id);
    return res.status(200).json(clinic);
  } catch (error) {
    console.error("Error in AdminController.getClinicByID: ", error);
  }
};

const getHealthCheckPackageBySlug = async (req, res) => {
  try {
    const healthCheckPackageSlug = req.params.slug;
    const healthCheckPackage = await SiteServices.getHealthCheckPackageBySlug(
      healthCheckPackageSlug
    );
    return res.status(200).json(healthCheckPackage);
  } catch (error) {
    console.error(
      "Error in AdminController.getHealthCheckPackageBySlug: ",
      error
    );
  }
};

const getHealthCheckPackageScheduleBookingDetailByID = async (req, res) => {
  try {
    const healthCheckPackageScheduleBookingDetailID = req.params.id;
    const healthCheckPackageScheduleBookingDetail =
      await SiteServices.getBookingDetailsByDoctorScheduleID(
        healthCheckPackageScheduleBookingDetailID
      );
    return res.status(200).json(healthCheckPackageScheduleBookingDetail);
  } catch (error) {
    console.error(
      "Error in AdminController.getHealthCheckPackageScheduleBookingDetailByID: ",
      error
    );
  }
};

const getLatestHealthCheckPackage = async (req, res) => {
  try {
    const latestHealthCheckPackage =
      await SiteServices.getLatestHealthCheckPackage();
    return res.status(200).json(latestHealthCheckPackage);
  } catch (error) {
    console.error(
      "Error in AdminController.getLatestHealthCheckPackage: ",
      error
    );
  }
};

const getClinicBranchesByClinicId = async (req, res) => {
  try {
    const clinicBranches = await SiteServices.getClinicBranchesByClinicId(
      req.params.id
    );
    return res.status(200).json(clinicBranches);
  } catch (error) {
    console.error(
      "Error in AdminController.getClinicBranchesByClinicId: ",
      error
    );
  }
};

const getLatestSpecificMedicalService = async (req, res) => {
  try {
    const latestSpecificMedicalService =
      await SiteServices.getLatestSpecificMedicalService();
    return res.status(200).json(latestSpecificMedicalService);
  } catch (error) {
    console.error(
      "Error in AdminController.getLatestSpecificMedicalService: ",
      error
    );
  }
};

const getLatestDoctor = async (req, res) => {
  try {
    const latestDoctor = await SiteServices.getLatestDoctor();
    return res.status(200).json(latestDoctor);
  } catch (error) {
    console.error("Error in AdminController.getLatestDoctor: ", error);
  }
};

const getLatestPatient = async (req, res) => {
  try {
    const latestPatient = await SiteServices.getLatestPatient();
    return res.status(200).json(latestPatient);
  } catch (error) {
    console.error("Error in AdminController.getLatestPatient: ", error);
  }
};

const getLatestClinic = async (req, res) => {
  try {
    const latestClinic = await SiteServices.getLatestClinic();
    return res.status(200).json(latestClinic);
  } catch (error) {
    console.error("Error in AdminController.getLatestClinic: ", error);
  }
};

const getSpecialtyByID = async (req, res) => {
  try {
    const specialty = await SiteServices.getSpecialtyByID(req.params.id);
    return res.status(200).json(specialty);
  } catch (error) {
    console.error("Error in AdminController.getSpecialtyByID: ", error);
  }
};

const getSpecialtyBySlug = async (req, res) => {
  try {
    const specialty = await SiteServices.getSpecialtyBySlug(req.params.slug);
    return res.status(200).json(specialty);
  } catch (error) {
    console.error("Error in AdminController.getSpecialtyBySlug: ", error);
  }
};

const getAllHealthCheckPackagesBySpecialtySlug = async (req, res) => {
  try {
    const healthCheckPackages =
      await SiteServices.getAllHealthCheckPackagesBySpecialtySlug(
        req.params.slug
      );
    return res.status(200).json(healthCheckPackages);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllHealthCheckPackagesBySpecialtySlug: ",
      error
    );
  }
};

const getSpecificMedicalServiceBySlug = async (req, res) => {
  try {
    const specificMedicalService =
      await SiteServices.getSpecificMedicalServiceBySlug(req.params.slug);
    return res.status(200).json(specificMedicalService);
  } catch (error) {
    console.error(
      "Error in AdminController.getSpecificMedicalServiceBySlug: ",
      error
    );
  }
};

const getAllHealthCheckPackagesBySpecificMedicalServiceSlug = async (
  req,
  res
) => {
  try {
    const healthCheckPackages =
      await SiteServices.getAllHealthCheckPackagesBySpecificMedicalServiceSlug(
        req.params.slug
      );
    return res.status(200).json(healthCheckPackages);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllHealthCheckPackagesBySpecificMedicalServiceSlug: ",
      error
    );
  }
};

const createNewDoctor = async (req, res) => {
  try {
    const file = req.file;
    const role = JSON.parse(req.body.role);
    const payload = {
      ...req.body,
      role,
      image: file,
    };
    const doctor = await SiteServices.createNewDoctor(payload);
    return res.status(200).json(doctor);
  } catch (error) {
    console.error("Error in AdminController.createNewDoctor: ", error);
  }
};

const updateDoctor = async (req, res) => {
  try {
    const file = req.file;
    const role = JSON.parse(req.body.role);
    const payload = {
      ...req.body,
      role,
      image: file,
    };
    const doctor = await SiteServices.updateDoctor(payload);
    return res.status(200).json(doctor);
  } catch (error) {
    console.error("Error in AdminController.updateDoctor: ", error);
  }
};

const createNewSpecificMedicalService = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      ...req.body,
      image: file,
    };
    const specificMedicalService =
      await SiteServices.createNewSpecificMedicalService(payload);
    return res.status(200).json(specificMedicalService);
  } catch (error) {
    console.error(
      "Error in AdminController.createNewSpecificMedicalService: ",
      error
    );
  }
};

const updateSpecificMedicalService = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      ...req.body,
      image: file,
    };
    const specificMedicalService =
      await SiteServices.updateSpecificMedicalService(payload);
    return res.status(200).json(specificMedicalService);
  } catch (error) {
    console.error(
      "Error in AdminController.updateSpecificMedicalService: ",
      error
    );
  }
};

const createNewHealthCheckPackage = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      ...req.body,
      isManagedByDoctor: req.body.isManagedByDoctor === "true",
      isSpecialty: req.body.isSpecialty === "true",
      packageType: JSON.parse(req.body.packageType),
      clinic: JSON.parse(req.body.clinic),
      specialties: JSON.parse(req.body.specialties),
      services: JSON.parse(req.body.services),
      branches: JSON.parse(req.body.branches),
      packagePrices: JSON.parse(req.body.packagePrices),
      image: file,
    };
    const healthCheckPackage = await SiteServices.createNewHealthCheckPackage(
      payload
    );
    return res.status(200).json(healthCheckPackage);
  } catch (error) {
    console.error(
      "Error in AdminController.createNewHealthCheckPackage: ",
      error
    );
  }
};

const updateHealthCheckPackage = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      ...req.body,
      isManagedByDoctor: req.body.isManagedByDoctor === "true",
      isSpecialty: req.body.isSpecialty === "true",
      packageType: JSON.parse(req.body.packageType),
      clinic: JSON.parse(req.body.clinic),
      specialties: req.body.specialties ? JSON.parse(req.body.specialties) : [],
      services: req.body.services ? JSON.parse(req.body.services) : [],
      branches: JSON.parse(req.body.branches),
      packagePrices: JSON.parse(req.body.packagePrices),
      image: file,
    };
    console.log("payload: ", payload);
    const healthCheckPackage = await SiteServices.updateHealthCheckPackage(
      payload
    );
    return res.status(200).json(healthCheckPackage);
  } catch (error) {
    console.error("Error in AdminController.updateHealthCheckPackage: ", error);
  }
};

const getAllBookingPrices = async (req, res) => {
  try {
    const bookingPrices = await SiteServices.getAllBookingPrices();
    return res.status(200).json(bookingPrices);
  } catch (error) {
    console.error("Error in AdminController.getAllBookingPrices: ", error);
  }
};

const createNewClinic = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      ...req.body,
      image: file,
      branches: req.body.branches ? JSON.parse(req.body.branches) : [],
    };
    const clinic = await SiteServices.createNewClinic(payload);
    return res.status(200).json(clinic);
  } catch (error) {
    console.error("Error in AdminController.createNewClinic: ", error);
  }
};

const updateClinic = async (req, res) => {
  try {
    const file = req.file;
    const payload = {
      ...req.body,
      image: file,
      branches: req.body.branches ? JSON.parse(req.body.branches) : [],
    };
    const clinic = await SiteServices.updateClinic(payload);
    return res.status(200).json(clinic);
  } catch (error) {
    console.error("Error in AdminController.updateClinic: ", error);
  }
};

const getAllHealthCheckPackagesNotCurrentlyHaveSchedule = async (req, res) => {
  try {
    const healthCheckPackagesNotCurrentlyHaveSchedule =
      await SiteServices.getAllHealthCheckPackagesNotCurrentlyHaveSchedule();
    return res.status(200).json(healthCheckPackagesNotCurrentlyHaveSchedule);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllHealthCheckPackagesNotCurrentlyHaveSchedule: ",
      error
    );
  }
};

const getHealthCheckPackageCurrentScheduleByID = async (req, res) => {
  try {
    const healthCheckPackageCurrentSchedule =
      await SiteServices.getHealthCheckPackageCurrentScheduleByID(
        req.params.id
      );
    return res.status(200).json(healthCheckPackageCurrentSchedule);
  } catch (error) {
    console.error(
      "Error in AdminController.getHealthCheckPackageCurrentScheduleByID: ",
      error
    );
  }
};

const createNewHealthCheckPackageSchedule = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      schedules: req.body.schedules ? JSON.parse(req.body.schedules) : [],
    };
    const healthCheckPackageSchedule =
      await SiteServices.createNewHealthCheckPackageSchedule(payload);
    return res.status(200).json(healthCheckPackageSchedule);
  } catch (error) {
    console.error(
      "Error in AdminController.createNewHealthCheckPackageSchedule: ",
      error
    );
  }
};

const getAllHealthCheckPackagesWithTheseSchedules = async (req, res) => {
  try {
    const healthCheckPackagesWithTheseSchedules =
      await SiteServices.getAllHealthCheckPackagesWithTheseSchedules(
        req.params.id
      );
    return res.status(200).json(healthCheckPackagesWithTheseSchedules);
  } catch (error) {
    console.error(
      "Error in AdminController.getAllHealthCheckPackagesWithTheseSchedules: ",
      error
    );
  }
};

const updateHealthCheckPackageSchedule = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      schedules: req.body.schedules ? JSON.parse(req.body.schedules) : [],
    };
    const healthCheckPackageSchedule =
      await SiteServices.updateHealthCheckPackageSchedule(payload);
    return res.status(200).json(healthCheckPackageSchedule);
  } catch (error) {
    console.error(
      "Error in AdminController.updateHealthCheckPackageSchedule: ",
      error
    );
  }
};

const getWeeklyHealthCheckPackageSchedulesByID = async (req, res) => {
  try {
    const result =
      await SiteServices.getWeeklyHealthCheckPackageSchedulesByID(
        req.params.id
      );
    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Error in AdminController.getWeeklyHealthCheckPackageSchedulesByID: ",
      error
    );
  }
};

export default {
  getAllCategories,
  getAllMedicalServices,
  getAllSpecialties,
  getAllClinics,
  getClinicBySlug,
  getAllSpecificMedicalServices,
  getAllSpecificMedicalServicesBySlug,
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
  getHealthCheckPackageScheduleDatesInWeek,
  getHealthCheckPackageSchedules,
  getHealthCheckPackageSchedulesByDate,
  getDoctorBySlug,
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
  getAllPackageTypes,
  getAllUndeployPackages,
  getMedicalServicesByID,
  getClinicByID,
  getHealthCheckPackageBySlug,
  getHealthCheckPackageScheduleBookingDetailByID,
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

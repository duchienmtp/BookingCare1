import { Router } from "express";
import AdminController from "../controllers/admin/AdminController.js";
import multer from "multer";

// Configure multer to handle file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png, and .webp formats are allowed"));
    }
  },
});

const router = Router();

router.get("/get-all-categories", AdminController.getAllCategories);
router.get("/get-all-medical-services", AdminController.getAllMedicalServices);
router.get("/get-all-specialties", AdminController.getAllSpecialties);
router.get("/get-all-clinics", AdminController.getAllClinics);
router.get(
  "/get-all-specific-medical-services",
  AdminController.getAllSpecificMedicalServices
);
router.get(
  "/get-all-specific-medical-services-by-slug/:slug",
  AdminController.getAllSpecificMedicalServicesBySlug
);
router.get("/get-all-blogs", AdminController.getAllBlogs);
router.get("/get-all-guides", AdminController.getAllGuides);
router.get(
  "/get-all-living-healthy-blog-post",
  AdminController.getAllLivingHealthyBlogPost
);
router.get(
  "/get-all-for-doctor-and-health-facility-blog-post",
  AdminController.getAllForDoctorAndHealthFacilityBlogPost
);
router.get("/get-all-blog-uploadedTo", AdminController.getAllBlogUploadedTo);
router.get("/get-all-packages", AdminController.getAllPackages);
router.get(
  "/get-all-endoscopic-surgery-packages",
  AdminController.getAllEndoscopicSurgeryPackages
);
router.get(
  "/get-all-medical-imaging-diagnostic-packages",
  AdminController.getAllMedicalImagingDiagnosticPackages
);
router.get(
  "/get-all-operation-packages",
  AdminController.getAllOperationPackages
);
router.get(
  "/get-all-medical-examination-packages",
  AdminController.getAllMedicalExaminationPackages
);
router.get(
  "/get-all-diagnostic-packages",
  AdminController.getAllDiagnosticPackages
);
router.get(
  "/get-health-check-package-schedule-dates-in-week/:slug",
  AdminController.getHealthCheckPackageScheduleDatesInWeek
);
router.get("/get-clinic-by-slug/:slug", AdminController.getClinicBySlug);
router.get(
  "/get-health-check-package-schedules-by-date/:slug/:date",
  AdminController.getHealthCheckPackageSchedulesByDate
);
router.get(
  "/get-health-check-package-schedules/:slug",
  AdminController.getHealthCheckPackageSchedules
);
router.get("/get-doctor-by-slug/:slug", AdminController.getDoctorBySlug);
router.get(
  "/get-health-check-package-booking-detail/:slug",
  AdminController.getHealthCheckPackageBookingTypes
);
router.get(
  "/get-doctor-booking-schedule/:slug",
  AdminController.getBookingScheduleByDoctorScheduleID
);
router.post("/submit-booking", AdminController.postSubmitBooking);
router.get("/get-all-booking-orders", AdminController.getAllBookingOrders);
router.get("/get-all-patients", AdminController.getAllPatients);
router.get("/get-all-doctors", AdminController.getAllDoctors);
router.get("/get-all-roles", AdminController.getAllRoles);
router.get("/get-doctor-user-by-id/:id", AdminController.getUserIsDoctorByID);
router.get("/get-patient-user-by-id/:id", AdminController.getUserIsPatientByID);
router.get(
  "/get-medical-health-check-package-by-id/:id",
  AdminController.getMedicalHealthCheckPackageByID
);
router.get(
  "/get-specific-medical-service-by-id/:id",
  AdminController.getSpecificMedicalServiceByID
);
router.get("/get-all-package-types", AdminController.getAllPackageTypes);
router.get(
  "/get-all-undeploy-packages",
  AdminController.getAllUndeployPackages
);
router.get(
  "/get-medical-service-by-id/:id",
  AdminController.getMedicalServicesByID
);
router.get("/get-clinic-by-id/:id", AdminController.getClinicByID);
router.get(
  "/get-health-check-package-by-slug/:slug",
  AdminController.getHealthCheckPackageBySlug
);
router.get(
  "/get-health-check-package-schedule-booking-detail/:id",
  AdminController.getHealthCheckPackageScheduleBookingDetailByID
);
router.get(
  "/get-latest-health-check-package",
  AdminController.getLatestHealthCheckPackage
);
router.get(
  "/get-clinic-branches-by-clinic-id/:id",
  AdminController.getClinicBranchesByClinicId
);
router.get(
  "/get-latest-specific-medical-service",
  AdminController.getLatestSpecificMedicalService
);
router.get("/get-latest-doctor", AdminController.getLatestDoctor);
router.get("/get-latest-patient", AdminController.getLatestPatient);
router.get("/get-latest-clinic", AdminController.getLatestClinic);
router.get("/get-specialty-by-id/:id", AdminController.getSpecialtyByID);
router.get("/get-specialty-by-slug/:slug", AdminController.getSpecialtyBySlug);
router.get(
  "/get-all-health-check-packages-by-specialty-slug/:slug",
  AdminController.getAllHealthCheckPackagesBySpecialtySlug
);
router.get(
  "/get-specific-medical-service-by-slug/:slug",
  AdminController.getSpecificMedicalServiceBySlug
);
router.get(
  "/get-all-health-check-packages-by-specific-medical-service-slug/:slug",
  AdminController.getAllHealthCheckPackagesBySpecificMedicalServiceSlug
);
router.post(
  "/create-new-doctor",
  upload.single("image"),
  AdminController.createNewDoctor
);
router.put(
  "/update-doctor",
  upload.single("image"),
  AdminController.updateDoctor
);
router.get(
  "/get-all-health-check-packages-by-specific-medical-service-slug/:slug",
  AdminController.getAllHealthCheckPackagesBySpecificMedicalServiceSlug
);
router.post(
  "/create-new-specific-medical-service",
  upload.single("image"),
  AdminController.createNewSpecificMedicalService
);
router.put(
  "/update-specific-medical-service",
  upload.single("image"),
  AdminController.updateSpecificMedicalService
);
router.post(
  "/create-new-health-check-package",
  upload.single("image"),
  AdminController.createNewHealthCheckPackage
);
router.put(
  "/update-health-check-package",
  upload.single("image"),
  AdminController.updateHealthCheckPackage
);
router.get("/get-all-booking-prices", AdminController.getAllBookingPrices);
router.post(
  "/create-new-clinic",
  upload.single("image"),
  AdminController.createNewClinic
);
router.put(
  "/update-clinic",
  upload.single("image"),
  AdminController.updateClinic
);
router.get(
  "/get-all-health-check-packages-not-currently-have-schedule",
  AdminController.getAllHealthCheckPackagesNotCurrentlyHaveSchedule
);
router.get(
  "/get-health-check-package-current-schedule-by-id/:id",
  AdminController.getHealthCheckPackageCurrentScheduleByID
);
router.post(
  "/create-new-health-check-package-schedule",
  upload.none(),
  AdminController.createNewHealthCheckPackageSchedule
);
router.put(
  "/update-health-check-package-schedule",
  upload.none(),
  AdminController.updateHealthCheckPackageSchedule
);
router.get(
  "/get-all-health-check-packages-with-these-schedules",
  AdminController.getAllHealthCheckPackagesWithTheseSchedules
);
router.get("/get-weekly-health-check-package-schedules-by-id/:id", AdminController.getWeeklyHealthCheckPackageSchedulesByID);

export default router;

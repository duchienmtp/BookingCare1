import express from "express";
import { Router } from "express";
import AdminController from "../controllers/admin/AdminController.js";

const router = Router();

router.get("/get-all-categories", AdminController.getAllCategories);
router.get("/get-all-medical-services", AdminController.getAllMedicalServices);
router.get("/get-all-specialties", AdminController.getAllSpecialties);
router.get("/get-all-clinics", AdminController.getAllClinics);
router.get(
  "/get-all-specific-medical-services",
  AdminController.getAllSpecificMedicalServices
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
  "/get-doctor-schedule-dates-in-week/:slug",
  AdminController.getDoctorScheduleDatesInWeek
);
router.get("/get-clinic-by-slug/:slug", AdminController.getClinicBySlug);
router.get("/get-doctor-schedules/:slug", AdminController.getDoctorSchedules);
router.get("/get-doctor-by-slug/:slug", AdminController.getDoctorBySlug);
router.get("/get-all-clinic-booking-types", AdminController.getAllClinicBookingTypes);

export default router;

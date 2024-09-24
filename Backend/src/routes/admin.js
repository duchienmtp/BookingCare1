import express from "express";
import { Router } from "express";
import AdminController from "../controllers/admin/AdminController.js";

const router = Router();

router.get("/get-all-categories", AdminController.getAllCategories);
router.get("/get-all-medical-services", AdminController.getAllMedicalServices);
router.get("/get-all-specialties", AdminController.getAllSpecialties);
router.get("/get-all-clinics", AdminController.getAllClinics);

export default router;

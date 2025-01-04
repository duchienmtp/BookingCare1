import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getAllCategories = async () => {
  return axios.get("/api/v1/admin/get-all-categories");
};

const getAllMedicalServices = async () => {
  return axios.get("/api/v1/admin/get-all-medical-services");
};

const getAllSpecialties = async () => {
  return axios.get("/api/v1/admin/get-all-specialties");
};

const getAllClinics = async () => {
  return axios.get("/api/v1/admin/get-all-clinics");
};

export const getClinicBySlug = async (clinicSlug) => {
  return axios.get(`/api/v1/admin/get-clinic-by-slug/${clinicSlug}`);
};

const getAllSpecificMedicalServices = async () => {
  return axios.get(`/api/v1/admin/get-all-specific-medical-services`);
};

const getAllBlogs = async () => {
  return axios.get(`/api/v1/admin/get-all-blogs`);
};

const getAllGuides = async () => {
  return axios.get(`/api/v1/admin/get-all-guides`);
};

const getAllLivingHealthyBlogPost = async () => {
  return axios.get(`/api/v1/admin/get-all-living-healthy-blog-post`);
};

const getAllForDoctorAndHealthFacilityBlogPost = async () => {
  return axios.get(
    `/api/v1/admin/get-all-for-doctor-and-health-facility-blog-post`
  );
};

const getAllPackages = async () => {
  return axios.get(`/api/v1/admin/get-all-packages`);
};

const getAllEndoscopicSurgeryPackages = async () => {
  return axios.get(`/api/v1/admin/get-all-endoscopic-surgery-packages`);
};

const getAllMedicalImagingDiagnosticPackages = async () => {
  return axios.get(`/api/v1/admin/get-all-medical-imaging-diagnostic-packages`);
};

const getAllOperationPackages = async () => {
  return axios.get(`/api/v1/admin/get-all-operation-packages`);
};

const getAllMedicalExaminationPackages = async () => {
  return axios.get(`/api/v1/admin/get-all-medical-examination-packages`);
};

const getAllDiagnosticPackages = async () => {
  return axios.get(`/api/v1/admin/get-all-diagnostic-packages`);
};

export const getAllDataBySlug = createAsyncThunk(
  "admin/getAllDataBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      let response = {};
      switch (slug) {
        case "medical-services":
          response = await getAllMedicalServices();
          break;
        case "specialties":
          response = await getAllSpecialties();
          break;
        case "clinics":
          response = await getAllClinics();
          break;
        case "specific-medical-services":
          response = await getAllSpecificMedicalServices();
          break;
        case "blogs":
          response = await getAllBlogs();
          break;
        case "guides":
          response = await getAllGuides();
          break;
        case "living-healthy-blog-post":
          response = await getAllLivingHealthyBlogPost();
          break;
        case "for-doctor-and-health-facility-blog-post":
          response = await getAllForDoctorAndHealthFacilityBlogPost();
          break;
        case "packages":
          response = await getAllPackages();
          break;
        case "endoscopic-surgery-packages":
          response = await getAllEndoscopicSurgeryPackages();
          break;
        case "medical-imaging-diagnostic-packages":
          response = await getAllMedicalImagingDiagnosticPackages();
          break;
        case "operation-packages":
          response = await getAllOperationPackages();
          break;
        case "medical-examination-packages":
          response = await getAllMedicalExaminationPackages();
          break;
        case "diagnostic-packages":
          response = await getAllDiagnosticPackages();
          break;
        default:
          throw new Error("Invalid slug");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getDoctorBySlug = async (doctorSlug) => {
  return axios.get(`/api/v1/admin/get-doctor-by-slug/${doctorSlug}`);
};

export const getDoctorScheduleDatesByDoctorSlug = async (doctorSlug) => {
  return axios.get(
    `/api/v1/admin/get-doctor-schedule-dates-in-week/${doctorSlug}`
  );
};

export const getDoctorSchedulesByDoctorSlug = async (doctorId) => {
  return axios.get(`/api/v1/admin/get-doctor-schedules/${doctorId}`);
};

export const getAllClinicBookingTypes = async () => {
  return axios.get(`/api/v1/admin/get-all-clinic-booking-types`);
};

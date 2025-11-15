import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import axiosExternal from "../../utils/axiosExternal";

export const getAllCategories = async () => {
  return axios.get("/api/v1/admin/get-all-categories");
};

export const getAllMedicalServices = async () => {
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

export const getAllSpecificMedicalServicesBySlug = async (slug) => {
  return axios.get(
    `/api/v1/admin/get-all-specific-medical-services-by-slug/${slug}`
  );
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

const getAllBookingOrders = async () => {
  return axios.get(`/api/v1/admin/get-all-booking-orders`);
};

const getAllPatients = async () => {
  return axios.get(`/api/v1/admin/get-all-patients`);
};

const getAllDoctors = async () => {
  return axios.get(`/api/v1/admin/get-all-doctors`);
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
        case "orders":
          response = await getAllBookingOrders();
          break;
        case "patients":
          response = await getAllPatients();
          break;
        case "doctors":
          response = await getAllDoctors();
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

// export const getHealthCheckPackageBookingDetail = createAsyncThunk(
//   "admin/getHealthCheckPackageBookingDetail",
//   async (doctorSlug, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `/api/v1/admin/get-doctor-booking-packages/${doctorSlug}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const getHealthCheckPackageBookingDetail = async (doctorSlug) => {
  return axios.get(
    `/api/v1/admin/get-health-check-package-booking-detail/${doctorSlug}`
  );
};

export const storeDoctorBookingPackage = createAsyncThunk(
  "app/storeDoctorBookingPackage",
  async (payload, { rejectWithValue }) => {
    try {
      return payload ? payload : {};
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getHealthCheckPackageBySlug = async (slug) => {
  return axios.get(`/api/v1/admin/get-health-check-package-by-slug/${slug}`);
};

export const getDoctorBySlug = async (doctorSlug) => {
  return axios.get(`/api/v1/admin/get-doctor-by-slug/${doctorSlug}`);
};

export const getHealthCheckPackageScheduleDatesByDoctorSlug = async (
  doctorSlug
) => {
  return axios.get(
    `/api/v1/admin/get-health-check-package-schedule-dates-in-week/${doctorSlug}`
  );
};

export const getHealthCheckPackageSchedulesByDoctorSlug = async (doctorId) => {
  return axios.get(
    `/api/v1/admin/get-health-check-package-schedules/${doctorId}`
  );
};

export const getBookingScheduleByDoctorScheduleID = async (
  doctorScheduleId
) => {
  return axios.get(
    `/api/v1/admin/get-doctor-booking-schedule/${doctorScheduleId}`
  );
};

export const getAllProvinces = async () => {
  return axiosExternal.get("https://provinces.open-api.vn/api/?depth=3");
};

export const submitBooking = async (payload) => {
  return axios.post("/api/v1/admin/submit-booking", payload);
};

export const getAllRoles = async () => {
  return axios.get("/api/v1/admin/get-all-roles");
};

export const getDoctorUserByID = async (userId) => {
  return axios.get(`/api/v1/admin/get-doctor-user-by-id/${userId}`);
};

export const getPatientUserByID = async (patientId) => {
  return axios.get(`/api/v1/admin/get-patient-user-by-id/${patientId}`);
};

export const getMedicalHealthCheckPackageByID = async (packageId) => {
  return axios.get(
    `/api/v1/admin/get-medical-health-check-package-by-id/${packageId}`
  );
};

export const getAllPackageTypes = async () => {
  return axios.get(`/api/v1/admin/get-all-package-types`);
};

export const getSpecificMedicalServiceByID = async (serviceId) => {
  return axios.get(
    `/api/v1/admin/get-specific-medical-service-by-id/${serviceId}`
  );
};

export const getAllUndeployPackages = async () => {
  return axios.get(`/api/v1/admin/get-all-undeploy-packages`);
};

export const getMedicalServicesByID = async (serviceId) => {
  return axios.get(`/api/v1/admin/get-medical-service-by-id/${serviceId}`);
};

export const getClinicByID = async (clinicId) => {
  return axios.get(`/api/v1/admin/get-clinic-by-id/${clinicId}`);
};

export const getHealthCheckPackageScheduleBookingDetail = async (
  bookingDetailId
) => {
  return axios.get(
    `/api/v1/admin/get-health-check-package-schedule-booking-detail/${bookingDetailId}`
  );
};

export const getLatestHealthCheckPackage = async () => {
  return axios.get("/api/v1/admin/get-latest-health-check-package");
};

export const getClinicBranchesByClinicId = async (clinicId) => {
  return axios.get(
    `/api/v1/admin/get-clinic-branches-by-clinic-id/${clinicId}`
  );
};

export const getLatestSpecificMedicalService = async () => {
  return axios.get("/api/v1/admin/get-latest-specific-medical-service");
};

export const getLatestDoctor = async () => {
  return axios.get("/api/v1/admin/get-latest-doctor");
};

export const getLatestClinic = async () => {
  return axios.get("/api/v1/admin/get-latest-clinic");
};

export const getSpecialtyByID = async (specialtyId) => {
  return axios.get(`/api/v1/admin/get-specialty-by-id/${specialtyId}`);
};

export const getSpecialtyBySlug = async (specialtySlug) => {
  return axios.get(`/api/v1/admin/get-specialty-by-slug/${specialtySlug}`);
};

export const getAllHealthCheckPackagesBySpecialtySlug = async (specialtySlug) => {
  return axios.get(`/api/v1/admin/get-all-health-check-packages-by-specialty-slug/${specialtySlug}`);
};

export const getSpecificMedicalServiceBySlug = async (slug) => {
  return axios.get(`/api/v1/admin/get-specific-medical-service-by-slug/${slug}`);
};

export const getAllHealthCheckPackagesBySpecificMedicalServiceSlug = async (slug) => {
  return axios.get(`/api/v1/admin/get-all-health-check-packages-by-specific-medical-service-slug/${slug}`);
};

export const createNewDoctor = async (payload) => {
  return axios.post(`/api/v1/admin/create-new-doctor`, payload);
};

export const updateDoctor = async (payload) => {
  return axios.put(`/api/v1/admin/update-doctor`, payload);
};

export const createNewSpecificMedicalService = async (payload) => {
  return axios.post(`/api/v1/admin/create-new-specific-medical-service`, payload);
};

export const updateSpecificMedicalService = async (payload) => {
  return axios.put(`/api/v1/admin/update-specific-medical-service`, payload);
};

export const createNewHealthCheckPackage = async (payload) => {
  return axios.post(`/api/v1/admin/create-new-health-check-package`, payload);
};

export const updateHealthCheckPackage = async (payload) => {
  return axios.put(`/api/v1/admin/update-health-check-package`, payload);
};

export const getAllBookingPrices = async () => {
  return axios.get(`/api/v1/admin/get-all-booking-prices`);
};

export const createNewClinic = async (payload) => {
  return axios.post(`/api/v1/admin/create-new-clinic`, payload);
};

export const updateClinic = async (payload) => {
  return axios.put(`/api/v1/admin/update-clinic`, payload);
};

export const getAllHealthCheckPackagesNotCurrentlyHaveSchedule = async () => {
  return axios.get(`/api/v1/admin/get-all-health-check-packages-not-currently-have-schedule`);
}

export const getHealthCheckPackageCurrentScheduleByID = async (packageId) => {
  return axios.get(`/api/v1/admin/get-health-check-package-current-schedule-by-id/${packageId}`);
};

export const createNewHealthCheckPackageSchedule = async (payload) => {
  return axios.post(`/api/v1/admin/create-new-health-check-package-schedule`, payload);
};

export const updateHealthCheckPackageSchedule = async (payload) => {
  return axios.put(`/api/v1/admin/update-health-check-package-schedule`, payload);
};

export const getAllHealthCheckPackagesWithTheseSchedules = async () => {
  return axios.get(`/api/v1/admin/get-all-health-check-packages-with-these-schedules`);
}

export const generateChatbotResponse = async (userMessage) => {
  return axios.post(`/api/v1/user/chat`, userMessage);
}
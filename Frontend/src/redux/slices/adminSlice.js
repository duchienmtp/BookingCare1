import { createSlice } from "@reduxjs/toolkit";
import { getAllDataBySlug } from "../../services/admin/SiteServices";
import { getHealthCheckPackageBookingDetail } from "../../services/admin/SiteServices";

const initialState = {
  medicalServices: [],
  specialties: [],
  clinics: [],
  specificMedicalServices: [],
  blogs: [],
  guides: [],
  livingHealthyBlogPosts: [],
  forDoctorAndHealthFacilityBlogPosts: [],
  endoscopicSurgeryPackages: [],
  medicalImagingDiagnosticPackages: [],
  operationPackages: [],
  medicalExaminationPackages: [],
  diagnosticPackages: [],
  packages: [],
  // doctorBookingPackages: [],
  orders: [],
  patients: [],
  doctors: [],
  isLoading: false,
  isError: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllDataBySlug.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllDataBySlug.fulfilled, (state, action) => {
        switch (action.meta.arg) {
          case "medical-services":
            state.medicalServices = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "specialties":
            state.specialties = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "clinics":
            state.clinics = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "specific-medical-services":
            state.specificMedicalServices = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "blogs":
            state.blogs = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "guides":
            state.guides = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "living-healthy-blog-post":
            state.livingHealthyBlogPosts = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "for-doctor-and-health-facility-blog-post":
            state.forDoctorAndHealthFacilityBlogPosts = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "endoscopic-surgery-packages":
            state.endoscopicSurgeryPackages = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "medical-imaging-diagnostic-packages":
            state.medicalImagingDiagnosticPackages = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "operation-packages":
            state.operationPackages = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "medical-examination-packages":
            state.medicalExaminationPackages = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "diagnostic-packages":
            state.diagnosticPackages = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "packages":
            state.packages = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "orders":
            state.orders = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "patients":
            state.patients = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          case "doctors":
            state.doctors = action.payload;
            state.isLoading = false;
            state.isError = false;
            break;
          default:
            break;
        }
      })
      .addCase(getAllDataBySlug.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    // .addCase(getHealthCheckPackageBookingDetail.pending, (state) => {
    //   state.isLoading = true;
    //   state.isError = false;
    // })
    // .addCase(
    //   getHealthCheckPackageBookingDetail.fulfilled,
    //   (state, action) => {
    //     state.doctorBookingPackages = action.payload;
    //     state.isLoading = false;
    //     state.isError = false;
    //   }
    // )
    // .addCase(getHealthCheckPackageBookingDetail.rejected, (state) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // });
  },
});

export const selectMedicalServices = (state) => state.admin.medicalServices;
export const selectSpecialties = (state) => state.admin.specialties;
export const selectClinics = (state) => state.admin.clinics;
export const selectSpecificMedicalServices = (state) =>
  state.admin.specificMedicalServices;
export const selectBlogs = (state) => state.admin.blogs;
export const selectGuides = (state) => state.admin.guides;
export const selectLivingHealthyBlogPosts = (state) =>
  state.admin.livingHealthyBlogPosts;
export const selectForDoctorAndHealthFacilityBlogPosts = (state) =>
  state.admin.forDoctorAndHealthFacilityBlogPosts;
export const selectEndoscopicSurgeryPackages = (state) =>
  state.admin.endoscopicSurgeryPackages;
export const selectMedicalImagingDiagnosticPackages = (state) =>
  state.admin.medicalImagingDiagnosticPackages;
export const selectOperationPackages = (state) => state.admin.operationPackages;
export const selectMedicalExaminationPackages = (state) =>
  state.admin.medicalExaminationPackages;
export const selectDiagnosticPackages = (state) =>
  state.admin.diagnosticPackages;
export const selectPackages = (state) => state.admin.packages;
export const selectOrders = (state) => state.admin.orders;
export const selectPatients = (state) => state.admin.patients;
export const selectDoctors = (state) => state.admin.doctors;

export default adminSlice.reducer;

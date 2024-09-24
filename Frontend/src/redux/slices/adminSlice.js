import { createSlice } from "@reduxjs/toolkit";
import { getAllDataBySlug } from "../../services/admin/SiteServices";

const initialState = {
  medicalServices: [],
  specialties: [],
  clinics: [],
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
          default:
            break;
        }
      })
      .addCase(getAllDataBySlug.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectMedicalServices = (state) => state.admin.medicalServices;
export const selectSpecialties = (state) => state.admin.specialties;
export const selectClinics = (state) => state.admin.clinics;

export default adminSlice.reducer;
